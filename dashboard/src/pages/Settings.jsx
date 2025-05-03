import React from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });
  const [emailToggle, setEmailToggle] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailSent, setEmailSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    setEmailSent(false);
    try {
      await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setEmailSent(true);
    } catch (err) {
      setError('Failed to send email.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black bg-gradient-to-br from-sky-900 via-black to-gray-900 text-white dark:text-white p-0 m-0 flex flex-col items-start">
      <div className="w-full bg-gray-900/80 py-6 px-10 shadow-md flex items-center mb-10">
        <h2 className="text-3xl font-extrabold text-sky-900 tracking-tight drop-shadow">⚙️ Settings</h2>
      </div>
      {/* Theme Section */}
      <div className="ml-10 mt-4 bg-gray-900/80 rounded-xl p-8 shadow-xl w-[400px] mb-8">
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
      </div>
      {/* Email Alerts Section */}
      <div className="ml-10 bg-white/90 rounded-xl p-8 shadow-xl w-[400px] border border-cyan-200">
        <h3 className="text-xl font-bold mb-4 text-cyan-800 flex items-center gap-2">
          <span>📧</span>Email Alerts
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailToggle}
              onChange={() => { setEmailToggle((v) => !v); setEmailSent(false); setError(''); }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-400 rounded-full peer dark:bg-gray-700 peer-checked:bg-cyan-500 transition-all duration-300"></div>
            <span className="ml-3 text-sm font-medium text-cyan-900">Enable Email Alerts</span>
          </label>
        </div>
        {emailToggle && (
          <form onSubmit={handleSendEmail} className="flex flex-col gap-4 mt-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded bg-gray-100 text-gray-900 border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded transition"
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Test Email'}
            </button>
            {emailSent && <span className="text-green-600">Email sent successfully!</span>}
            {error && <span className="text-red-500">{error}</span>}
          </form>
        )}
      </div>
    </div>
  );
}
