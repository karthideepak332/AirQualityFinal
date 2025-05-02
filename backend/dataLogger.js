// dataLogger.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_PATH = path.join(__dirname, 'data.csv');

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

module.exports = router;
