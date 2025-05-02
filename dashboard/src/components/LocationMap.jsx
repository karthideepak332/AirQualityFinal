import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function LocationMap({ location }) {
  // location is expected to be an object: { latitude, longitude }
  const lat = parseFloat(location.latitude);
  const lng = parseFloat(location.longitude);

  if (isNaN(lat) || isNaN(lng)) {
    return <div>Invalid location data</div>;
  }

  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
}