import React from 'react';
import Sidebar from '../components/Sidebar';
import { FaLeaf, FaBicycle, FaBus, FaPlug, FaRecycle, FaTree } from 'react-icons/fa';

export default function CarbonFootprint() {
  return (
    <div className="flex font-sans bg-black text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gradient-to-br from-lime-900 via-black to-gray-900 p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col items-center">
          <FaLeaf className="text-lime-400 text-5xl mb-2" />
          <h2 className="text-4xl font-extrabold mb-2 text-white drop-shadow">Carbon Footprint Tracker</h2>
          <span className="text-lg italic text-lime-300 font-semibold drop-shadow">"Every action counts for a greener planet!"</span>
        </header>
        <section className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900/90 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-lime-700">
            <FaBicycle className="text-lime-400 text-4xl mb-3" />
            <h3 className="text-xl font-bold mb-2 text-lime-200">Use Eco-friendly Transport</h3>
            <p className="text-gray-300 text-center">Walk, cycle, or use public transport to reduce your carbon emissions from daily commutes.</p>
          </div>
          <div className="bg-gray-900/90 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-lime-700">
            <FaPlug className="text-lime-400 text-4xl mb-3" />
            <h3 className="text-xl font-bold mb-2 text-lime-200">Save Electricity</h3>
            <p className="text-gray-300 text-center">Turn off lights and unplug devices when not in use. Switch to energy-efficient appliances.</p>
          </div>
          <div className="bg-gray-900/90 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-lime-700">
            <FaRecycle className="text-lime-400 text-4xl mb-3" />
            <h3 className="text-xl font-bold mb-2 text-lime-200">Recycle & Reuse</h3>
            <p className="text-gray-300 text-center">Recycle paper, plastic, and electronics. Reuse bags, bottles, and containers to cut down waste.</p>
          </div>
          <div className="bg-gray-900/90 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-lime-700">
            <FaTree className="text-lime-400 text-4xl mb-3" />
            <h3 className="text-xl font-bold mb-2 text-lime-200">Plant Trees</h3>
            <p className="text-gray-300 text-center">Participate in tree plantation drives or grow plants at home to offset carbon emissions.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
