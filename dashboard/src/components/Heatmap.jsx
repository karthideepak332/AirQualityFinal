import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const heat = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    });
    heat.addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [points, map]);

  return null;
}

export default function Heatmap() {
  const [heatPoints, setHeatPoints] = useState([]);

  // useEffect(() => {
    // fetch('http://localhost:5000/api/sensors') // your backend endpoint
    //   .then(res => res.json())
    //   .then(data => {
    //     const formatted = data.map(d => [d.lat, d.lng, d.value / 1000]); // normalize if needed
    //     setHeatPoints(formatted);
    //   });
  // }, []);

  return (
    <div className="w-full h-screen bg-black">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatmapLayer points={heatPoints} />
      </MapContainer>
    </div>
  );
}
