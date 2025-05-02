import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Good', value: 62.5 },
  { name: 'Warn', value: 25 },
  { name: 'Crit', value: 12.5 },
];

const COLORS = ['#1d4ed8', '#f59e0b', '#dc2626'];

export default function StatusPieChart() {
  return (
    <div className="bg-white/30 backdrop-blur-lg p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Air Quality Status</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '10px', border: '1px solid #ccc' }}
            labelStyle={{ color: '#6b7280', fontWeight: '500' }}
            itemStyle={{ fontWeight: '500' }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
