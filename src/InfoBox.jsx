export default function InfoBox({ info }) {
  return (
    <div className="mt-8 text-white text-center">
      
      {/* City & Temp */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2 drop-shadow-md">
          {info.city}
          {/* Dynamic Icon based on temp (Logic helper) */}
          <span>{info.temp > 20 ? "☀️" : info.temp < 10 ? "❄️" : "☁️"}</span>
        </h2>
        <h1 className="text-6xl font-extrabold my-2 drop-shadow-lg">
          {info.temp}°
        </h1>
        <p className="text-lg capitalize opacity-90">{info.weather}</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/30 w-full my-6"></div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Humidity */}
        <div className="flex flex-col items-center bg-white/10 p-3 rounded-lg border border-white/10">
          <span className="text-2xl font-bold">{info.humidity}%</span>
          <span className="text-xs uppercase tracking-wider opacity-80">Humidity</span>
        </div>

        {/* Feels Like */}
        <div className="flex flex-col items-center bg-white/10 p-3 rounded-lg border border-white/10">
          <span className="text-2xl font-bold">{info.feelsLike}°</span>
          <span className="text-xs uppercase tracking-wider opacity-80">Feels Like</span>
        </div>

      </div>
    </div>
  );
}