import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Heatmap from './components/map';
import AlertsTable from './components/AlertsTable';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<Heatmap />} />
        <Route path="/alerts" element={<AlertsTable />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}