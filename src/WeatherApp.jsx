import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false); // <--- 1. NEW LOADING STATE

  // Theme State Logic
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const updateWeather = async (city) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    setLoading(true); // <--- 2. START LOADING
    setWeatherInfo(null); // Optional: Clear old data while searching

    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const result = {
        city: data.name,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        weather: data.weather[0].description,
      };

      setWeatherInfo(result);
    } catch (error) {
      alert(error.message || "City not found!");
    } finally {
      setLoading(false); // <--- 3. STOP LOADING (Always runs)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500
                    bg-gradient-to-br from-cyan-400 to-blue-700
                    dark:from-gray-900 dark:to-gray-800">
      
      {/* Animated Dark Mode Toggle */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg 
                   hover:bg-white/30 hover:scale-110 active:scale-90 transition-all duration-300"
      >
        <div className={`text-xl transition-transform duration-700 ease-in-out ${isDarkMode ? "rotate-[360deg]" : "rotate-0"}`}>
          {isDarkMode ? "☀️" : "🌙"}
        </div>
      </button>

      {/* Main Card */}
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl overflow-hidden relative
                      bg-white/20 backdrop-blur-xl border border-white/30
                      dark:bg-black/40 dark:border-white/10 transition-colors duration-500">
        
        <h1 className="text-center text-3xl font-bold text-white mb-8 drop-shadow-md">
          Weather App
        </h1>

        <SearchBox updateWeather={updateWeather} />

        {/* --- 4. CONDITIONAL RENDERING FOR SPINNER --- */}
        {loading ? (
          <div className="flex justify-center mt-12 mb-4">
            {/* The Tailwind Spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
          </div>
        ) : weatherInfo ? (
          <InfoBox info={weatherInfo} />
        ) : (
          <p className="text-center text-white/60 mt-8">Search for a city to begin...</p>
        )}
        {}

      </div>
    </div>
  );
}