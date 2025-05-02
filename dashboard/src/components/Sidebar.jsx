import { useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaExclamationCircle, FaMap } from 'react-icons/fa';

const links = [
  { to: '/',   label: 'Dashboard', icon: FaTachometerAlt, color: 'text-cyan-400' },
  { to: '/alerts', label: 'Alerts',    icon: FaExclamationCircle, color: 'text-yellow-400' },
  { to: '/map',    label: 'Map',       icon: FaMap, color: 'text-green-400' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white w-64 h-screen p-6 shadow-lg flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
          AirSense
        </h1>

        <nav className="space-y-4 text-lg">
          {links.map(({ to, label, icon: Icon, color }) => {
            const isActive = pathname === to;
            return (
              <div
                key={to}
                onClick={() => navigate(to)}
                className={`
                  flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300
                  ${isActive ? 'bg-gray-800' : 'hover:bg-gray-800'}
                `}
              >
                <Icon className={`${color} ${isActive ? '' : ''}`} size={24} />
                <span className={isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}>
                  {label}
                </span>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-xs text-center text-gray-500">© 2025 AirSense</p>
      </div>
    </div>
  );
}
