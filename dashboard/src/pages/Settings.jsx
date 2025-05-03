import React, { useEffect, useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#form_submitted') {
      setShowThankYou(true);
      // Optionally clear the hash so it doesn't show again
      window.location.hash = '';
    }
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-black bg-gradient-to-br from-sky-900 via-black to-gray-900 text-white dark:text-white p-0 m-0">
      <div className="flex flex-col flex-shrink-0 items-start w-[480px]">
        {showThankYou && (
          <div className="ml-10 mb-6 p-4 bg-green-700 text-white rounded-xl shadow text-lg font-semibold">
            Thanks for your Response, Keep World Better
          </div>
        )}
        <div className="w-full bg-gray-900/80 py-6 px-10 shadow-md flex items-center mb-10">
          <h2 className="text-3xl font-extrabold text-sky-900 tracking-tight drop-shadow">😊 Responses</h2>
        </div>
        {/* Theme Section */}
        {/* <div className="ml-10 mt-4 bg-gray-900/80 rounded-xl p-8 shadow-xl w-[400px] mb-8">
          <h3 className="text-xl font-bold mb-6 text-sky-200">Theme</h3>
          <div className="flex items-center gap-3">
            <span className="text-gray-300">🌙</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode((v) => !v)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-400 rounded-full peer dark:bg-gray-700 peer-checked:bg-cyan-500 transition-all duration-300"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">{darkMode ? 'Dark' : 'Light'} Mode</span>
            </label>
            <span className="text-yellow-400">☀️</span>
          </div>
        </div> */}
        {/* Submit Details Section */}
        <div className="ml-10 bg-gray-900/80 rounded-xl p-8 shadow-xl w-[400px] mb-8">
          <h3 className="text-xl font-bold mb-6 text-sky-200">Submit Your Details</h3>
          <p className="mb-4 text-gray-300">Please use the Google Form below to submit your current information and location.</p>
          <a
            href="https://forms.gle/u5cGi1C55kXsiTZ28"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow font-semibold text-lg"
          >
            Fill Google Form
          </a>
        </div>
      </div>
      <div className="flex-1 relative flex items-stretch">
        <div className="relative w-full h-full flex flex-col justify-start items-center">
          <div className="absolute top-0 left-0 w-full bg-black/60 py-6 px-8 z-10 rounded-t-xl flex justify-center">
            <span className="text-2xl font-bold italic text-yellow-300 drop-shadow-lg text-center">"Clean air is a human right, not a privilege."</span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
            alt="Air quality background"
            className="w-full h-full object-cover rounded-l-xl"
            style={{ minHeight: '100vh' }}
          />
        </div>
      </div>
    </div>
  );
}
