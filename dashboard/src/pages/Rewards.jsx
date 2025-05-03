import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { FaCoins, FaUser, FaMapMarkerAlt, FaPhoneAlt, FaUpload } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export default function Rewards() {
  const [userName, setUserName] = useState('');
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState('');
  const [mobile, setMobile] = useState('');
  const fileInputRef = useRef();
  const coins = images.length * 100;
  const locationObj = useLocation();

  // Load from localStorage on mount and on navigation
  useEffect(() => {
    const savedName = localStorage.getItem('rewardsUserName') || '';
    const savedImages = JSON.parse(localStorage.getItem('rewardsImages') || '[]');
    const savedLocation = localStorage.getItem('rewardsLocation') || '';
    const savedMobile = localStorage.getItem('rewardsMobile') || '';
    setUserName(savedName);
    setImages(savedImages);
    setLocation(savedLocation);
    setMobile(savedMobile);
  }, [locationObj.pathname]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('rewardsUserName', userName);
    localStorage.setItem('rewardsImages', JSON.stringify(images));
    localStorage.setItem('rewardsLocation', location);
    localStorage.setItem('rewardsMobile', mobile);
  }, [userName, images, location, mobile]);

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
  const handleMobileChange = (e) => setMobile(e.target.value);

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
      <div className="flex-1 min-h-screen bg-gradient-to-br from-sky-900 via-black to-gray-900 relative overflow-y-auto">
        {/* Header with background image and overlay */}
        <div className="relative w-full h-56 flex items-center justify-center mb-10">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="rewards-bg" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col items-center w-full">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-2">Rewards</h2>
            <span className="text-lg md:text-2xl italic text-yellow-300 font-semibold drop-shadow">"Celebrate your green actions!"</span>
          </div>
          <div className="absolute top-6 right-10 flex items-center gap-2 bg-yellow-400 text-yellow-900 px-5 py-2 rounded-full shadow-lg text-xl font-bold">
            <FaCoins className="text-2xl" />
            {coins}
          </div>
        </div>
        {/* Upload Form Card */}
        <div className="max-w-2xl mx-auto bg-gray-900/90 rounded-2xl shadow-2xl p-8 mb-10 border border-gray-800">
          <h3 className="text-2xl font-bold mb-6 text-cyan-300 flex items-center gap-2"><FaUpload /> Upload Your Green Moments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base mb-2 font-semibold flex items-center gap-2"><FaUser /> User Name:</label>
              <input
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
                type="text"
                value={userName}
                onChange={handleNameChange}
                placeholder="Enter your name"
              />
              <label className="block text-base mb-2 font-semibold flex items-center gap-2"><FaMapMarkerAlt /> Location:</label>
              <input
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter your location"
              />
              <label className="block text-base mb-2 font-semibold flex items-center gap-2"><FaPhoneAlt /> Mobile No:</label>
              <input
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
                type="tel"
                value={mobile}
                onChange={handleMobileChange}
                placeholder="Enter your mobile number"
                pattern="[0-9]{10,15}"
                maxLength={15}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <label className="block text-base mb-2 font-semibold">Upload Image:</label>
              <input
                ref={fileInputRef}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 mb-4"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              
            </div>
          </div>
        </div>
        {/* Uploaded Images Gallery */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-cyan-200">Your Uploaded Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {images.map((img, idx) => (
              <div key={idx} className="bg-gray-900/80 rounded-xl shadow-lg p-4 flex flex-col items-center border border-gray-800 hover:shadow-2xl transition-all duration-300 group relative">
                <img src={img} alt={`reward-${idx}`} className="w-full h-48 object-cover rounded mb-3 border-2 border-cyan-700 group-hover:scale-105 transition-transform duration-300" />
                <span className="text-base font-semibold text-cyan-300 mb-1 flex items-center gap-1"><FaUser /> {userName}</span>
                <span className="text-xs text-gray-400 mb-1 flex items-center gap-1"><FaMapMarkerAlt /> {location}</span>
                <span className="text-xs text-gray-400 mb-2 flex items-center gap-1"><FaPhoneAlt /> {mobile}</span>
                <button
                  className="mt-2 px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded shadow font-semibold transition-colors duration-200"
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
