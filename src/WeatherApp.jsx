import { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark Mode State

  const updateWeather = async (city) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

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
    }
  };

  return (
    // 1. TOP LEVEL WRAPPER (Handles Dark Mode Class)
    <div className={isDarkMode ? "dark" : ""}>
      
      {/* 2. BACKGROUND (Full Screen Gradient) */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500
                      bg-gradient-to-br from-cyan-400 to-blue-700
                      dark:from-gray-900 dark:to-gray-800">
        
        {/* Toggle Button */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        {/* 3. MAIN GLASS CARD */}
        <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl overflow-hidden relative
                        bg-white/20 backdrop-blur-xl border border-white/30
                        dark:bg-black/40 dark:border-white/10">
          
          <h1 className="text-center text-3xl font-bold text-white mb-8 drop-shadow-md">
            Weather App
          </h1>

          {/* Pass function to SearchBox */}
          <SearchBox updateWeather={updateWeather} />

          {/* Render InfoBox only if data exists */}
          {weatherInfo ? (
            <InfoBox info={weatherInfo} />
          ) : (
            <p className="text-center text-white/60 mt-8">Search for a city to begin...</p>
          )}

        </div>

      </div>
    </div>
  );
}