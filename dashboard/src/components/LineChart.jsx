import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from 'recharts';
  
  const data = [
    { time: '8:00', co2: 420 },
    { time: '9:00', co2: 460 },
    { time: '10:00', co2: 500 },
    { time: '11:00', co2: 620 },
    { time: '12:00', co2: 600 },
  ];
  
  export default function CO2LineChart() {
    return (
      <div className="bg-white/30 backdrop-blur-lg p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">CO₂ Levels Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#4b5563" tick={{ fontSize: 12 }} />
            <YAxis stroke="#4b5563" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '10px', border: '1px solid #ccc' }}
              labelStyle={{ color: '#6b7280', fontWeight: '500' }}
              itemStyle={{ color: '#22c55e' }}
            />
            <Line
              type="monotone"
              dataKey="co2"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  