import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

function FlyToUser({ userLocation }) {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.latitude, userLocation.longitude], 13, { animate: true });
    }
  }, [userLocation, map]);
  return null;
}

export default function Heatmap() {
  const [heatPoints, setHeatPoints] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError("Unable to retrieve your location.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatmapLayer points={heatPoints} />
        {userLocation && (
          <>
            <FlyToUser userLocation={userLocation} />
            <Marker position={[userLocation.latitude, userLocation.longitude]}>
              <Popup>Your Location</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
      {locationError && (
        <div className="text-red-500 absolute top-4 left-4 bg-white/80 p-2 rounded">{locationError}</div>
      )}
    </div>
  );
}
