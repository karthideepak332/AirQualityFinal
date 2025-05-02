import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
// import InfoCard from '../components/InfoCard';
import StatusCard from '../components/StatusCard';
import CO2LineChart from '../components/LineChart';
import StatusPieChart from '../components/PieChart';
import mqtt from 'mqtt';

// export default function InfoCard() {
//   // … existing hooks …

//   // ➊ New: state for today's average AQ
//   const [avgAQ, setAvgAQ] = useState(null);

//   useEffect(() => {
//     // ➋ Fetch all data
//     fetch('http://localhost:5000/api/data')
//       .then(res => res.json())
//       .then(data => {
//         // ➌ Filter entries from today
//         const today = new Date().toDateString();
//         const todays = data.filter(({ timestamp }) =>
//           new Date(timestamp).toDateString() === today
//         );

//         if (todays.length) {
//           // ➍ Compute average CO2
//           const sum = todays.reduce((acc, { co2 }) => acc + parseFloat(co2), 0);
//           setAvgAQ((sum / todays.length).toFixed(1));
//         } else {
//           setAvgAQ('—');
//         }
//       })
//       .catch(console.error);
//   }, []);
  
//   // … rest of your existing code …

//   return (
//     <div className="flex font-sans bg-black text-white min-h-screen">
//       <Sidebar />
//       <div className="flex-1 p-8 overflow-y-auto bg-black">
//         {/* … header, StatusCard, main metrics grid … */}

//         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
//           {/* your existing InfoCards */}
//           <InfoCard
//             title="Average (AQ)"
//             value={avgAQ !== null ? `${avgAQ} ppm` : 'Loading...'}
//             icon="📊"
//             color="bg-indigo-500"
//           />
//         </section>

//         {/* … the rest (charts, etc.) … */}
//       </div>
//     </div>
//   );
// }

export default function InfoCard({ title, value, icon, color, alert }) {
  return (
    <div className={`text-white rounded-2xl shadow-lg p-5 flex items-center gap-4 hover:shadow-xl transition duration-300 ease-in-out ${color}`}>
      <div className="text-white text-3xl">{icon}</div>
      <div>
        <h4 className="text-sm text-white">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
        {alert && <p className="text-sm text-yellow-300 mt-1 font-semibold">{alert}</p>}
      </div>
    </div>
  );
}

