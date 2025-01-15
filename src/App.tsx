import React, { useState, useRef } from 'react';
import { Download, Music2, Loader2, Search, Headphones, Volume2, Radio, Mic2, Music4, Shield, Clipboard, X, Zap, Globe, Lock, Download as DownloadIcon, Heart, Clock, Share2, Award } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      showNotification('URL pasted successfully!', 'success');
    } catch (err) {
      showNotification('Failed to paste URL', 'error');
    }
  };

  const clearInput = () => {
    setUrl('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.includes('spotify.com/track/')) {
      showNotification('Please enter a valid Spotify track URL', 'error');
      return;
    }

    setLoading(true);
    try {
      const encodedUrl = encodeURIComponent(url);
      const response = await fetch(`https://spotify-downloader9.p.rapidapi.com/downloadSong?songId=${encodedUrl}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '2f5f8f1ed6msha939c8e6949b10ep16c31bjsnb07bb964bbbb',
          'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
        showNotification('Track found successfully!', 'success');
      } else {
        showNotification('Failed to fetch song details', 'error');
      }
    } catch (err) {
      showNotification('An error occurred while processing your request', 'error');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <Headphones className="w-6 h-6" />, title: 'High Quality Audio', description: 'Download tracks in premium audio quality' },
    { icon: <Volume2 className="w-6 h-6" />, title: 'Lossless Format', description: 'Preserve the original sound quality' },
    { icon: <Radio className="w-6 h-6" />, title: 'Fast Download', description: 'Quick and efficient download process' },
    { icon: <Mic2 className="w-6 h-6" />, title: 'All Genres', description: 'Support for all music genres' },
    { icon: <Music4 className="w-6 h-6" />, title: 'Playlist Support', description: 'Coming soon: Download entire playlists' },
    { icon: <Shield className="w-6 h-6" />, title: 'Secure Downloads', description: 'Safe and encrypted downloads' },
    { icon: <Zap className="w-6 h-6" />, title: 'Instant Processing', description: 'Convert tracks within seconds' },
    { icon: <Globe className="w-6 h-6" />, title: 'Worldwide Access', description: 'Available from any location' },
    { icon: <Lock className="w-6 h-6" />, title: 'Privacy First', description: 'No personal data collection' },
    { icon: <Award className="w-6 h-6" />, title: 'Premium Quality', description: 'Best-in-class audio conversion' }
  ];

  const steps = [
    { title: 'Copy URL', description: 'Copy the Spotify song URL from your browser or app' },
    { title: 'Paste & Convert', description: 'Paste the URL and click the download button' },
    { title: 'Download', description: 'Click the download button to save your song' }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Notification Alert */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-500 transform ${showAlert ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={`px-6 py-4 rounded-lg shadow-lg ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white flex items-center space-x-2 animate-bounce-subtle`}>
          <span className="text-sm font-medium">{alertMessage}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#1DB954] to-[#121212] pt-20 pb-40 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNCAtMTQgMTQgNi4yNjggMTQgMTQtNi4yNjggMTQtMTQgMTR6IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')] animate-spin-slow opacity-10"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white p-4 rounded-full shadow-xl transform hover:scale-110 transition-transform duration-300 animate-float">
              <img src="/spotify.svg" alt="Spotify Logo" className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Spotify Downloader
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in-delayed">
            Download your favorite Spotify songs in high quality
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-[#282828] rounded-xl p-6 md:p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste Spotify song URL here..."
                  className="w-full bg-[#3E3E3E] text-white placeholder-gray-400 pl-12 pr-12 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all duration-300 hover:bg-[#4A4A4A]"
                />
                <button
                  type="button"
                  onClick={url ? clearInput : handlePaste}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {url ? (
                    <X className="w-5 h-5 hover:rotate-90 transition-transform duration-300" />
                  ) : (
                    <Clipboard className="w-5 h-5 hover:scale-110 transition-transform duration-300" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1DB954] text-white px-8 py-4 rounded-lg hover:bg-[#1ed760] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl min-w-[160px] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download
                </>
              )}
            </button>
          </form>

          {!result && (
            <div className="mt-12 animate-fade-in">
              <h2 className="text-2xl font-bold text-center mb-8">How to Download</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-[#3E3E3E] p-6 rounded-xl transform hover:scale-105 transition-all duration-300 group hover:bg-[#4A4A4A] hover:shadow-xl"
                  >
                    <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center group-hover:text-[#1DB954] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-center text-sm group-hover:text-white transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8 animate-fade-in">
              <div className="relative overflow-hidden bg-[#3E3E3E] rounded-xl p-6 group hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1DB954]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                  <div className="relative group/image">
                    <div className="absolute inset-0 bg-black/20 rounded-lg transform group-hover/image:scale-105 transition-transform duration-300"></div>
                    <img
                      src={result.cover}
                      alt={result.title}
                      className="w-56 h-56 rounded-lg shadow-2xl transform group-hover/image:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <Music2 className="w-12 h-12 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col items-center md:items-start">
                      <h3 className="text-3xl font-bold mb-3 group-hover:text-[#1DB954] transition-colors duration-300 text-center md:text-left">{result.title}</h3>
                      <p className="text-xl text-gray-300 mb-4">{result.artist}</p>
                      <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
                        <span className="flex items-center gap-2 text-sm text-gray-400">
                          <Music4 className="w-4 h-4" /> {result.album}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" /> {result.releaseDate}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={result.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#1DB954] text-white px-8 py-4 rounded-full hover:bg-[#1ed760] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group/button relative overflow-hidden"
                          onClick={() => showNotification('Download started!', 'success')}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000"></div>
                          <DownloadIcon className="w-5 h-5 group-hover/button:animate-bounce" />
                          Download Track
                        </a>
                        <button
                          className="inline-flex items-center gap-2 bg-[#3E3E3E] text-white px-6 py-4 rounded-full hover:bg-[#4A4A4A] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group/share"
                          onClick={() => {
                            navigator.clipboard.writeText(url);
                            showNotification('Track URL copied to clipboard!', 'success');
                          }}
                        >
                          <Share2 className="w-5 h-5 group-hover/share:rotate-12 transition-transform duration-300" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Instructions after result */}
              <div className="mt-12 animate-fade-in">
                <h2 className="text-2xl font-bold text-center mb-8">Download Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="bg-[#3E3E3E] p-6 rounded-xl transform hover:scale-105 transition-all duration-300 group hover:bg-[#4A4A4A]"
                    >
                      <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-center group-hover:text-[#1DB954] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-center text-sm group-hover:text-white transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#282828] p-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl group cursor-pointer hover:bg-[#2A2A2A]"
            >
              <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center group-hover:text-[#1DB954] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center text-sm group-hover:text-white transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;