import { useEffect, useState } from 'react';
import React from 'react';
import Sidebar from '../components/Sidebar';
import InfoCard from '../components/InfoCard';
import StatusCard from '../components/StatusCard';
import Co2LineChart from '../components/Co2LineChart';
import TemperatureLineChart from '../components/TemperatureLineChart';
import StatusPieChart from '../components/PieChart';
import HumidityLineChart from '../components/HumidityLineChart';
import mqtt from 'mqtt';
import axios from 'axios';

export default function Dashboard() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState(null);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [alertIntervalId, setAlertIntervalId] = useState(null);

  // Static alert data
  const staticRows = [
    { timestamp: '2025-05-02T12:10:45.477Z', co2: 144, pm25: 12, pm10: 20, temperature: 24, humidity: 22 },
    { timestamp: '2025-05-02T12:10:47.552Z', co2: 147, pm25: 15, pm10: 22, temperature: 25, humidity: 23 },
    { timestamp: '2025-05-02T12:10:49.947Z', co2: 139, pm25: 10, pm10: 18, temperature: 23, humidity: 21 },
  ];

  // Sensor data state
  const [metrics, setMetrics] = useState({
    co2: 0,
    pm25: 0,
    pm10: 0,
    temperature: 0,
    humidity: 0,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(location);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setLocationError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setLocationError("An unknown error occurred.");
              break;
            default:
              setLocationError("Failed to retrieve location.");
          }
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const client = mqtt.connect('wss://test.mosquitto.org:8081');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('esp8266/gas');
      client.subscribe('esp8266/dht/temp');
      client.subscribe('esp8266/dht/hum');
      client.subscribe('esp8266/bmp/temp');
      client.subscribe('esp8266/bmp/pres');
    });

    client.on('message', (topic, message) => {
      const value = parseFloat(message.toString());

      if (topic === 'esp8266/gas') {
        setMetrics((prev) => ({ ...prev, co2: value }));
      } else if (topic === 'esp8266/dht/temp') {
        setMetrics((prev) => ({ ...prev, temperature: value }));
      } else if (topic === 'esp8266/dht/hum') {
        setMetrics((prev) => ({ ...prev, humidity: value }));
      } else if (topic === 'esp8266/bmp/temp') {
        setMetrics((prev) => ({ ...prev, pm25: value }));
      } else if (topic === 'esp8266/bmp/pres') {
        setMetrics((prev) => ({ ...prev, pm10: value }));
      }
    });

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
      client.end();
    };
  }, []);

  const thresholds = {
    co2: 200,
    pm25: 35,
    pm10: 50,
    temperature: 30,
    humidity: 70,
  };

  const getStatusProps = (key, value) => {
    const isDanger = value > thresholds[key];
    const colors = {
      co2: isDanger ? 'bg-red-600' : 'bg-cyan-600',
      pm25: isDanger ? 'bg-red-600' : 'bg-amber-500',
      pm10: isDanger ? 'bg-red-600' : 'bg-fuchsia-600',
      temperature: isDanger ? 'bg-red-600' : 'bg-rose-500',
      humidity: isDanger ? 'bg-red-600' : 'bg-sky-500',
    };
    return {
      color: colors[key],
      alert: isDanger ? '⚠️ Danger' : null,
    };
  };

  const isAnyDanger = Object.keys(metrics).some(
    (key) => metrics[key] > thresholds[key]
  );

  useEffect(() => {
    if (isAnyDanger) {
      if ('speechSynthesis' in window && !alertIntervalId) {
        const speak = () => {
          window.speechSynthesis.cancel();
          const utter = new window.SpeechSynthesisUtterance('Danger, Stay Alert');
          window.speechSynthesis.speak(utter);
        };
        speak();
        const id = setInterval(speak, 3000);
        setAlertIntervalId(id);
      }
    } else if (alertIntervalId) {
      clearInterval(alertIntervalId);
      setAlertIntervalId(null);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  }, [isAnyDanger, alertIntervalId]);

  return (
    <div className="flex font-sans bg-black text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto bg-black">
        <header className="mb-8">
          <h2 className="text-4xl font-bold mb-1 text-white drop-shadow">Air Quality Dashboard</h2>
          <p className="text-gray-400 text-sm">📍 Covai &nbsp; | &nbsp; 🕛 Time: {time}</p>
        </header>

        <StatusCard isDanger={isAnyDanger} />

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          <InfoCard
            title="Latest CO₂"
            value={`${metrics.co2} ppm`}
            icon="🌿"
            color={getStatusProps('co2', metrics.co2).color}
            alert={getStatusProps('co2', metrics.co2).alert}
          />
          <InfoCard
            title="PM2.5"
            value={`${metrics.pm25} µg/m³`}
            icon="🌫️"
            color={getStatusProps('pm25', metrics.pm25).color}
            alert={getStatusProps('pm25', metrics.pm25).alert}
          />
          <InfoCard
            title="PM10"
            value={`${metrics.pm10} µg/m³`}
            icon="🌀"
            color={getStatusProps('pm10', metrics.pm10).color}
            alert={getStatusProps('pm10', metrics.pm10).alert}
          />
          <InfoCard
            title="Temperature"
            value={`${metrics.temperature} °C`}
            icon="🌡️"
            color={getStatusProps('temperature', metrics.temperature).color}
            alert={getStatusProps('temperature', metrics.temperature).alert}
          />
          <InfoCard
            title="Humidity"
            value={`${metrics.humidity}%`}
            icon="💧"
            color={getStatusProps('humidity', metrics.humidity).color}
            alert={getStatusProps('humidity', metrics.humidity).alert}
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">📈 CO₂ Over Time</h3>
            <Co2LineChart />
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">🌡️ Temperature Over Time</h3>
            <TemperatureLineChart />
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">💧 Humidity Over Time</h3>
            <HumidityLineChart />
          </div>
        </section>
      </div>
    </div>
  );
}