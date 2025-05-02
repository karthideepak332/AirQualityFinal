const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'data.csv');

// Ensure CSV header exists
if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(
    DATA_PATH,
    'timestamp,co2,pm25,pm10,temperature,humidity\n',
    'utf8'
  );
}

module.exports = function mqttHandler() {
  const client = mqtt.connect('mqtt://test.mosquitto.org'); // Replace with your broker URL

  client.on('connect', () => {
    console.log('MQTT connected');
    client.subscribe([
      'esp8266/gas',
      'esp8266/dht/temp',
      'esp8266/dht/hum',
      'esp8266/bmp/temp',
      'esp8266/bmp/pres',
    ]);
  });

  const metrics = {
    co2: 0,
    pm25: 0,
    pm10: 0,
    temperature: 0,
    humidity: 0,
  };

  client.on('message', (topic, message) => {
    const value = parseFloat(message.toString());

    if (topic === 'esp8266/gas') metrics.co2 = value;
    else if (topic === 'esp8266/dht/temp') metrics.temperature = value;
    else if (topic === 'esp8266/dht/hum') metrics.humidity = value;
    else if (topic === 'esp8266/bmp/temp') metrics.pm25 = value;
    else if (topic === 'esp8266/bmp/pres') metrics.pm10 = value;

    // Save the latest row to CSV
    const row = `${new Date().toISOString()},${metrics.co2},${metrics.pm25},${metrics.pm10},${metrics.temperature},${metrics.humidity}\n`;
    fs.appendFile(DATA_PATH, row, (err) => {
      if (err) console.error('Error writing to CSV:', err);
    });
  });
};
