import { useState } from "react";

export default function SearchBox({ updateWeather }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWeather(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center w-full">
      {/* Glass Input Field */}
      <input
        type="text"
        placeholder="Enter City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        className="flex-1 p-3 rounded-xl outline-none text-white placeholder-gray-200
                   bg-white/10 border border-white/30 backdrop-blur-sm
                   focus:bg-white/20 focus:border-white/50 transition-all"
      />
      
      {/* Glass Button */}
      <button 
        type="submit"
        className="px-6 py-3 rounded-xl font-semibold text-white 
                   bg-blue-600/60 hover:bg-blue-600/80 transition-all
                   border border-white/20 shadow-lg"
      >
        Search
      </button>
    </form>
  );
}