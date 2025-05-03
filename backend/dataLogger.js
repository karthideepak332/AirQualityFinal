// dataLogger.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const router = express.Router();

const DATA_PATH = path.join(__dirname, 'data.csv');

router.use(express.json()); // Ensure JSON body parsing for POST requests

router.get('/', (req, res) => {
  fs.readFile(DATA_PATH, 'utf8', (err, csv) => {
    if (err) {
      console.error('Failed to read CSV:', err);
      return res.status(500).json({ error: 'Could not read data' });
    }

    const lines = csv.trim().split('\n');
    // first line is header, so skip it
    const records = lines.slice(1).map((line) => {
      const [timestamp, co2, pm25, pm10, temperature, humidity] = line.split(',');
      return {
        timestamp,
        co2: parseFloat(co2),
        pm25: parseFloat(pm25),
        pm10: parseFloat(pm10),
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
      };
    });

    res.json(records);
  });
});

// POST /api/send-email
router.post('/send-email', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Configure your SMTP transporter (example: Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // set in your environment variables
      pass: process.env.EMAIL_PASS, // set in your environment variables
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Air Quality Alert Test',
    text: 'This is a test email from your Air Quality Monitoring System.',
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
