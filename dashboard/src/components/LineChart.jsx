import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Static data for both CO₂ and Temperature
const data = [
  { timestamp: '8:00', co2: 120, temperature: 27 },
  { timestamp: '9:00', co2: 140, temperature: 26 },
  { timestamp: '10:00', co2: 240, temperature: 30 },
  { timestamp: '11:00', co2: 180, temperature: 28 },
  { timestamp: '12:00', co2: 220, temperature: 35 },
];

export default function LineChart() {
  return (
    <div className="bg-white/40 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Metrics Graph Over Time</h3>
      <ResponsiveContainer width="100%" height={270}>
        <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="timestamp" stroke="#374151" tick={{ fontSize: 13 }} />
          <YAxis yAxisId="left" stroke="#22c55e" tick={{ fontSize: 13 }} label={{ value: 'CO₂ (ppm)', angle: -90, position: 'insideLeft', fill: '#22c55e', fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" tick={{ fontSize: 13 }} label={{ value: 'Temp (°C)', angle: 90, position: 'insideRight', fill: '#f43f5e', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '10px', border: '1px solid #ccc' }}
            labelStyle={{ color: '#6b7280', fontWeight: '500' }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="co2"
            name="CO₂ (ppm)"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4, fill: '#22c55e' }}
            activeDot={{ r: 7 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="temperature"
            name="Temperature (°C)"
            stroke="#f43f5e"
            strokeWidth={3}
            dot={{ r: 4, fill: '#f43f5e' }}
            activeDot={{ r: 7 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
