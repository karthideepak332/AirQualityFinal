import React from 'react';

const staticRows = [
  { timestamp: '2025-05-02T12:10:45.477Z', co2: 204, pm25: 12, pm10: 20, temperature: 30, humidity: 22 },
  { timestamp: '2025-05-02T12:10:47.552Z', co2: 213, pm25: 15, pm10: 22, temperature: 29, humidity: 23 },
  { timestamp: '2025-05-02T12:10:49.947Z', co2: 209, pm25: 10, pm10: 18, temperature: 33, humidity: 21 },
];

export default function AlertsTable() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-900 via-black to-gray-900 text-white p-0 m-0">
      {/* White header above the table */}
      <div className="w-full bg-black py-6 px-10 shadow-md flex items-center">
        <h2 className="text-3xl font-extrabold text-sky-900 tracking-tight drop-shadow">🚨 Alert Table</h2>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-11/12 max-w-6xl bg-gray-900/90 rounded-xl shadow-2xl ml-10 mt-8 border border-gray-700">
          <thead>
            <tr className="bg-sky-950/80">
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-sky-200">Timestamp</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-green-200">CO₂</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-amber-200">PM2.5</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-fuchsia-200">PM10</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-rose-200">Temperature</th>
              <th className="px-6 py-4 text-lg font-semibold tracking-wide text-sky-200">Humidity</th>
            </tr>
          </thead>
          <tbody>
            {staticRows.map((row, idx) => (
              <tr key={idx} className={
                `text-center border-t border-gray-800 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-gray-800/60' : 'bg-gray-900/60'} hover:bg-sky-900/40`
              }>
                <td className="px-6 py-3 font-mono text-sky-100">{row.timestamp}</td>
                <td className="px-6 py-3 text-green-300 font-semibold">{row.co2}</td>
                <td className="px-6 py-3 text-amber-300 font-semibold">{row.pm25}</td>
                <td className="px-6 py-3 text-fuchsia-300 font-semibold">{row.pm10}</td>
                <td className="px-6 py-3 text-rose-300 font-semibold">{row.temperature}°C</td>
                <td className="px-6 py-3 text-sky-300 font-semibold">{row.humidity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-10 ml-10 text-gray-400 text-sm italic">
        <span>Showing recent alert records. For more details, contact your system administrator.</span>
      </div> */}
    </div>
  );
}
