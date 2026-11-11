const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// MongoDB Atlas Connection
const MONGODB_URI = process.env.MONGODB_URI;

let mongoConnected = false;
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      mongoConnected = true;
      console.log('✅ Connected to MongoDB Atlas cluster (frytbox_logistics)');
    })
    .catch((err) => {
      console.warn('⚠️  MongoDB Atlas direct connection failed or offline:', err.message);
      console.log('📦 Operating with reliable persistent file backup storage for quote requests.');
    });
} else {
  console.log('ℹ️  No MONGODB_URI supplied. Operating with local JSON storage engine.');
}

// Routes
const quotesRouter = require('./routes/quotes');
const contactRouter = require('./routes/contact');

app.use('/api/quotes', quotesRouter);
app.use('/api/contact', contactRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'FRYTBOX Worldwide Logistics API',
    company: 'FRYTBOX WORLDWIDE LOGISTICS PRIVATE LIMITED',
    timestamp: new Date().toISOString(),
    database: {
      provider: 'MongoDB Atlas',
      connected: mongoose.connection.readyState === 1,
    },
  });
});

// Serve frontend in production
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('FRYTBOX Worldwide Logistics API is running. Client build in progress.');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 FRYTBOX Server running on http://0.0.0.0:${PORT}`);
});
