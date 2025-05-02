// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const mqttHandler = require('./mqttHandler');
const dataRouter = require('./dataLogger');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  

// Serve React build if you have one
app.use(express.static(path.join(__dirname, 'public')));

// API: return JSON array of all CSV records
app.use('/api/data', dataRouter);

// Start MQTT → CSV logging
mqttHandler();

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
