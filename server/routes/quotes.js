const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Quote = require('../models/Quote');
const { saveLocalRecord, readLocalRecords } = require('../storageHelper');

// Helper to generate official reference ID
function generateQuoteReference() {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `FBX-QT-${year}-${random}`;
}

// POST /api/quotes - Submit a freight quotation request
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      businessEmail,
      email,
      phone,
      country,
      serviceRequired,
      serviceType,
      originCountry,
      originCity,
      destinationCountry,
      destinationCity,
      cargoDescription,
      cargoWeight,
      estimatedWeightKg,
      cargoDimensions,
      estimatedVolumeCbm,
      shipmentType,
      preferredShippingDate,
      cargoReadyDate,
      additionalRequirements,
      specialRequirements,
      incoterm,
    } = req.body;

    const resolvedEmail = businessEmail || email;
    const resolvedCountry = country || originCountry || 'India';
    const resolvedService = serviceRequired || serviceType;
    const resolvedWeight = cargoWeight || (estimatedWeightKg ? `${estimatedWeightKg} kg` : 'Not specified');
    const resolvedDimensions = cargoDimensions || (estimatedVolumeCbm ? `${estimatedVolumeCbm} CBM` : 'Not specified');
    const resolvedDate = preferredShippingDate || cargoReadyDate;
    const resolvedNotes = additionalRequirements || specialRequirements || (incoterm ? `Incoterm: ${incoterm}` : '');

    // Strict validation
    if (!fullName || !companyName || !resolvedEmail || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required contact details.',
      });
    }

    if (!resolvedService || !originCountry || !originCity || !destinationCountry || !destinationCity || !cargoDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide complete shipment route and cargo details.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resolvedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid business email address.',
      });
    }

    const referenceId = generateQuoteReference();
    const payload = {
      referenceId,
      fullName,
      companyName,
      businessEmail: resolvedEmail,
      phone,
      country: resolvedCountry,
      serviceRequired: resolvedService,
      originCountry,
      originCity,
      destinationCountry,
      destinationCity,
      cargoDescription,
      cargoWeight: resolvedWeight,
      cargoDimensions: resolvedDimensions,
      shipmentType: shipmentType || 'Standard Freight',
      preferredShippingDate: resolvedDate || 'Flexible',
      additionalRequirements: resolvedNotes,
      status: 'Received',
      createdAt: new Date().toISOString(),
    };

    let savedToMongo = false;
    if (mongoose.connection.readyState === 1) {
      try {
        const quoteDoc = new Quote(payload);
        await quoteDoc.save();
        savedToMongo = true;
      } catch (dbErr) {
        console.warn('MongoDB save error, falling back to persistent file store:', dbErr.message);
      }
    }

    // Always store persistently in local store as well
    saveLocalRecord('quotes.json', payload);

    return res.status(201).json({
      success: true,
      message: 'Your freight quotation request has been securely registered.',
      referenceId,
      data: payload,
      storedInDb: savedToMongo,
    });
  } catch (error) {
    console.error('Error in POST /api/quotes:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your quote request.',
      error: error.message,
    });
  }
});

// GET /api/quotes - Retrieve submitted quotes (for internal review)
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const quotes = await Quote.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: quotes.length, data: quotes });
    }
    const localQuotes = readLocalRecords('quotes.json');
    return res.json({ success: true, count: localQuotes.length, data: localQuotes, source: 'local' });
  } catch (error) {
    console.error('Error in GET /api/quotes:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
