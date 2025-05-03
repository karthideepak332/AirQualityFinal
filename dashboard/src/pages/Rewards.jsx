import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { FaCoins } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export default function Rewards() {
  const [userName, setUserName] = useState('');
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState('');
  const fileInputRef = useRef();
  const coins = images.length * 100;
  const locationObj = useLocation();

  // Load from localStorage on mount and on navigation
  useEffect(() => {
    const savedName = localStorage.getItem('rewardsUserName') || '';
    const savedImages = JSON.parse(localStorage.getItem('rewardsImages') || '[]');
    const savedLocation = localStorage.getItem('rewardsLocation') || '';
    setUserName(savedName);
    setImages(savedImages);
    setLocation(savedLocation);
  }, [locationObj.pathname]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('rewardsUserName', userName);
    localStorage.setItem('rewardsImages', JSON.stringify(images));
    localStorage.setItem('rewardsLocation', location);
  }, [userName, images, location]);

  // Autofill location using geolocation API
  useEffect(() => {
    if (!location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
          setLocation(loc);
        },
        () => {},
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, [location]);

  const handleNameChange = (e) => setUserName(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages(prev => [...prev, ev.target.result]);
      };
      reader.readAsDataURL(file);
    });
    // Reset file input so same file can be uploaded again if needed
    fileInputRef.current.value = '';
  };

  const handleDeleteImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex font-sans bg-black text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto bg-black relative">
        <div className="absolute top-8 right-8 flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full shadow-lg">
          <FaCoins className="text-2xl" />
          <span className="font-bold text-lg">{coins}</span>
        </div>
        <header className="mb-8">
          <h2 className="text-4xl font-bold mb-1 text-white drop-shadow">Rewards</h2>
        </header>
        <div className="mb-6">
          <label className="block text-lg mb-2">User Name:</label>
          <input
            className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:border-cyan-400"
            type="text"
            value={userName}
            onChange={handleNameChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg mb-2">Location:</label>
          <input
            className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:border-cyan-400"
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter your location"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg mb-2">Upload Image:</label>
          <input
            ref={fileInputRef}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-white">Uploaded Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg p-2 flex flex-col items-center">
                <img src={img} alt={`reward-${idx}`} className="w-full h-40 object-cover rounded mb-2" />
                <span className="text-sm text-gray-300">{userName}</span>
                <span className="text-xs text-gray-500">{location}</span>
                <button
                  className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
                  onClick={() => handleDeleteImage(idx)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
