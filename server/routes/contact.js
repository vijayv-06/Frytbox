const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const { saveLocalRecord, readLocalRecords } = require('../storageHelper');

// Generate reference ID for inquiry
function generateInquiryReference() {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `FBX-INQ-${year}-${random}`;
}

// POST /api/contact - Submit contact inquiry
router.post('/', async (req, res) => {
  try {
    const { fullName, companyName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields (Name, Email, Subject, Message).',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    const referenceId = generateInquiryReference();
    const payload = {
      referenceId,
      fullName,
      companyName: companyName || '',
      email,
      phone: phone || '',
      subject,
      message,
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    let savedToMongo = false;
    if (mongoose.connection.readyState === 1) {
      try {
        const doc = new Contact(payload);
        await doc.save();
        savedToMongo = true;
      } catch (dbErr) {
        console.warn('MongoDB save error for contact inquiry:', dbErr.message);
      }
    }

    saveLocalRecord('contacts.json', payload);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to FRYTBOX Worldwide Logistics. Our team will review your message promptly.',
      referenceId,
      data: payload,
      storedInDb: savedToMongo,
    });
  } catch (error) {
    console.error('Error in POST /api/contact:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry.',
      error: error.message,
    });
  }
});

// GET /api/contact - List inquiries
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const list = await Contact.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, data: list });
    }
    const local = readLocalRecords('contacts.json');
    return res.json({ success: true, count: local.length, data: local, source: 'local' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
