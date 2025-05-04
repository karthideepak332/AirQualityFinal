import React from 'react';
import { FaRegClock, FaCloud, FaTemperatureHigh, FaTint, FaExclamationTriangle } from 'react-icons/fa';

const staticRows = [
  { timestamp: '2025-05-02T12:10:45.477Z', co2: 204, pm25: 12, pm10: 20, temperature: 30, humidity: 22 },
  { timestamp: '2025-05-02T12:10:47.552Z', co2: 213, pm25: 15, pm10: 22, temperature: 29, humidity: 23 },
  { timestamp: '2025-05-02T12:10:49.947Z', co2: 209, pm25: 10, pm10: 18, temperature: 33, humidity: 21 },
  { timestamp: '2025-05-02T12:13:49.947Z', co2: 211, pm25: 10, pm10: 18, temperature: 33, humidity: 21 },
  { timestamp: '2025-05-02T12:14:49.947Z', co2: 180, pm25: 10, pm10: 18, temperature: 33, humidity: 21 },
  { timestamp: '2025-05-02T12:15:05.947Z', co2: 200, pm25: 10, pm10: 18, temperature: 28, humidity: 21 },
];

export default function AlertsTable() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-900 via-black to-gray-900 text-white p-0 m-0">
      <div className="w-full bg-black py-6 px-10 shadow-md flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-sky-900 tracking-tight drop-shadow flex items-center gap-3">
          <FaExclamationTriangle className="text-yellow-400 text-4xl" />
          Alert Table
        </h2>
        <span className="text-gray-400 text-base font-mono">Recent Alerts</span>
      </div>
      <div className="overflow-x-auto w-full flex justify-center">
        <table className="w-11/12 max-w-6xl bg-gray-900/90 rounded-xl shadow-2xl mt-8 border border-gray-700">
          <thead className="sticky top-0 z-10">
            <tr className="bg-sky-950/90">
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-sky-200 text-left"><FaRegClock className="inline mr-2 text-sky-300" />Timestamp</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-green-200 text-left"><FaCloud className="inline mr-2 text-green-300" />CO₂</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-amber-200 text-left">PM2.5</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-fuchsia-200 text-left">PM10</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-rose-200 text-left"><FaTemperatureHigh className="inline mr-2 text-rose-300" />Temp</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-sky-200 text-left"><FaTint className="inline mr-2 text-sky-300" />Humidity</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-yellow-200 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {staticRows.map((row, idx) => {
              const isDanger = row.co2 > 200;
              return (
                <tr key={idx} className={`border-t border-gray-800 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-gray-800/60' : 'bg-gray-900/60'} hover:bg-sky-900/40`}> 
                  <td className="px-6 py-3 font-mono text-sky-100 whitespace-nowrap">{row.timestamp}</td>
                  <td className="px-6 py-3 text-green-300 font-semibold whitespace-nowrap">{row.co2}</td>
                  <td className="px-6 py-3 text-amber-300 font-semibold whitespace-nowrap">{row.pm25}</td>
                  <td className="px-6 py-3 text-fuchsia-300 font-semibold whitespace-nowrap">{row.pm10}</td>
                  <td className="px-6 py-3 text-rose-300 font-semibold whitespace-nowrap">{row.temperature}°C</td>
                  <td className="px-6 py-3 text-sky-300 font-semibold whitespace-nowrap">{row.humidity}%</td>
                  <td className="px-6 py-3">
                    {isDanger ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-700/80 text-white text-xs font-bold shadow"><FaExclamationTriangle className="text-yellow-300" /> Danger</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-700/80 text-white text-xs font-bold shadow">Normal</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
