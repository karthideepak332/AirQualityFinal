// import { useEffect, useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import InfoCard from '../components/InfoCard';
// import StatusCard from '../components/StatusCard';
// import CO2LineChart from '../components/LineChart';
// import StatusPieChart from '../components/PieChart';
// import mqtt from 'mqtt';

// export default function Dashboard() {
//   const [time, setTime] = useState(() => new Date().toLocaleTimeString());

//   // Sensor data state
//   const [metrics, setMetrics] = useState({
//     co2: 0,
//     pm25: 0,
//     pm10: 0,
//     temperature: 0,
//     humidity: 0,
//   });

//   useEffect(() => {
//     const client = mqtt.connect('wss://test.mosquitto.org:8081');

//     client.on('connect', () => {
//       console.log('Connected to MQTT broker');
//       client.subscribe('esp8266/gas');
//       client.subscribe('esp8266/dht/temp');
//       client.subscribe('esp8266/dht/hum');
//       client.subscribe('esp8266/bmp/temp');
//       client.subscribe('esp8266/bmp/pres');
//     });

//     client.on('message', (topic, message) => {
//       const value = parseFloat(message.toString());

//       if (topic === 'esp8266/gas') {
//         setMetrics((prev) => ({ ...prev, co2: value }));
//       } else if (topic === 'esp8266/dht/temp') {
//         setMetrics((prev) => ({ ...prev, temperature: value }));
//       } else if (topic === 'esp8266/dht/hum') {
//         setMetrics((prev) => ({ ...prev, humidity: value }));
//       } else if (topic === 'esp8266/bmp/temp') {
//         setMetrics((prev) => ({ ...prev, pm25: value }));
//       } else if (topic === 'esp8266/bmp/pres') {
//         setMetrics((prev) => ({ ...prev, pm10: value }));
//       }
//     });

//     const interval = setInterval(() => {
//       setTime(new Date().toLocaleTimeString());
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//       client.end();
//     };
//   }, []);

//   const thresholds = {
//     co2: 200,
//     pm25: 35,
//     pm10: 50,
//     temperature: 35,
//     humidity: 70,
//   };

//   const getStatusProps = (key, value) => {
//     const isDanger = value > thresholds[key];
//     const colors = {
//       co2: isDanger ? 'bg-red-600' : 'bg-cyan-600',
//       pm25: isDanger ? 'bg-red-600' : 'bg-amber-500',
//       pm10: isDanger ? 'bg-red-600' : 'bg-fuchsia-600',
//       temperature: isDanger ? 'bg-red-600' : 'bg-rose-500',
//       humidity: isDanger ? 'bg-red-600' : 'bg-sky-500',
//     };
//     return {
//       color: colors[key],
//       alert: isDanger ? '⚠️ Danger' : null,
//     };
//   };

//   // 🔴 New: check if any metric exceeds threshold
//   const isAnyDanger = Object.keys(metrics).some(
//     (key) => metrics[key] > thresholds[key]
//   );

//   return (
//     <div className="flex font-sans bg-black text-white min-h-screen">
//       <Sidebar />
//       <div className="flex-1 p-8 overflow-y-auto bg-black">
//         <header className="mb-8">
//           <h2 className="text-4xl font-bold mb-1 text-white drop-shadow">Air Quality Dashboard</h2>
//           <p className="text-gray-400 text-sm">📍 Chennai &nbsp; | &nbsp; 🕛 Time: {time}</p>
//         </header>

//         {/* 🆕 StatusCard receives danger state */}
//         <StatusCard isDanger={isAnyDanger} />

//         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
//           <InfoCard
//             title="Latest CO₂"
//             value={`${metrics.co2} ppm`}
//             icon="🌿"
//             color={getStatusProps('co2', metrics.co2).color}
//             alert={getStatusProps('co2', metrics.co2).alert}
//           />
//           <InfoCard
//             title="PM2.5"
//             value={`${metrics.pm25} µg/m³`}
//             icon="🌫️"
//             color={getStatusProps('pm25', metrics.pm25).color}
//             alert={getStatusProps('pm25', metrics.pm25).alert}
//           />
//           <InfoCard
//             title="PM10"
//             value={`${metrics.pm10} µg/m³`}
//             icon="🌀"
//             color={getStatusProps('pm10', metrics.pm10).color}
//             alert={getStatusProps('pm10', metrics.pm10).alert}
//           />
//           <InfoCard
//             title="Temperature"
//             value={`${metrics.temperature} °C`}
//             icon="🌡️"
//             color={getStatusProps('temperature', metrics.temperature).color}
//             alert={getStatusProps('temperature', metrics.temperature).alert}
//           />
//           <InfoCard
//             title="Humidity"
//             value={`${metrics.humidity}%`}
//             icon="💧"
//             color={getStatusProps('humidity', metrics.humidity).color}
//             alert={getStatusProps('humidity', metrics.humidity).alert}
//           />
//         </section>

//         <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
//           <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
//             <h3 className="text-2xl font-semibold mb-4 text-white">📈 CO₂ Over Time</h3>
//             <CO2LineChart />
//           </div>

//           <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
//             <h3 className="text-2xl font-semibold mb-4 text-white">📊 Status Summary</h3>
//             <StatusPieChart />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import InfoCard from '../components/InfoCard';
import StatusCard from '../components/StatusCard';
import CO2LineChart from '../components/LineChart';
import StatusPieChart from '../components/PieChart';
import mqtt from 'mqtt';

export default function Dashboard() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  // Sensor data state
  const [metrics, setMetrics] = useState({
    co2: 0,
    pm25: 0,
    pm10: 0,
    temperature: 0,
    humidity: 0,
  });

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
    temperature: 35,
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

  // 🔴 New: check if any metric exceeds threshold
  const isAnyDanger = Object.keys(metrics).some(
    (key) => metrics[key] > thresholds[key]
  );

  return (
    <div className="flex font-sans bg-black text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto bg-black">
        <header className="mb-8">
          <h2 className="text-4xl font-bold mb-1 text-white drop-shadow">Air Quality Dashboard</h2>
          <p className="text-gray-400 text-sm">📍 Chennai &nbsp; | &nbsp; 🕛 Time: {time}</p>
        </header>

        {/* 🆕 StatusCard receives danger state */}
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
            <CO2LineChart />
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">📊 Status Summary</h3>
            <StatusPieChart />
          </div>
        </section>
      </div>
    </div>
  );
}

