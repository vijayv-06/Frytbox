const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    businessEmail: {
      type: String,
      required: [true, 'Business email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    serviceRequired: {
      type: String,
      required: [true, 'Service required is mandatory'],
      enum: [
        'Air Freight',
        'Sea Freight',
        'Project Logistics',
        'Road Logistics',
        'Warehousing & Value-Added Services',
        'Customs Clearance',
        'International Transportation & Distribution',
        'Multimodal Freight'
      ],
    },
    originCountry: {
      type: String,
      required: [true, 'Origin country is required'],
      trim: true,
    },
    originCity: {
      type: String,
      required: [true, 'Origin city is required'],
      trim: true,
    },
    destinationCountry: {
      type: String,
      required: [true, 'Destination country is required'],
      trim: true,
    },
    destinationCity: {
      type: String,
      required: [true, 'Destination city is required'],
      trim: true,
    },
    cargoDescription: {
      type: String,
      required: [true, 'Cargo description is required'],
      trim: true,
    },
    cargoWeight: {
      type: String,
      trim: true,
    },
    cargoDimensions: {
      type: String,
      trim: true,
    },
    shipmentType: {
      type: String,
      trim: true,
      default: 'Standard Freight',
    },
    preferredShippingDate: {
      type: String,
      trim: true,
    },
    additionalRequirements: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Received', 'Reviewing', 'Quote Prepared', 'Contacted'],
      default: 'Received',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);
