import React from 'react';
import { PanchayatData, BlockData } from '../types';
import { 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  Gauge, 
  ShieldCheck, 
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Share2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface PanchayatWeatherCardProps {
  panchayat: PanchayatData;
  block: BlockData;
  onOpenWhatsAppModal: () => void;
  onPlayAudioAdvisory: () => void;
  isPlayingAudio: boolean;
}

export const PanchayatWeatherCard: React.FC<PanchayatWeatherCardProps> = ({
  panchayat,
  block,
  onOpenWhatsAppModal,
  onPlayAudioAdvisory,
  isPlayingAudio,
}) => {
  const rainDelta = (panchayat.weather.rainfall - block.coarseForecast.rainfall).toFixed(1);
  const tempDelta = (panchayat.weather.temp - block.coarseForecast.temp).toFixed(1);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-5">
      
      {/* Top Header & Panchayat Identity */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-slate-100 tracking-tight">
              {panchayat.name}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              AI Downscaled (1.0 km)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {panchayat.hindiName} • Elevation: <strong className="text-slate-300">{panchayat.elevation}m</strong> • Terrain: <strong className="text-slate-300">{panchayat.landUse}</strong> • Soil: <strong className="text-slate-300">{panchayat.soilType}</strong>
          </p>
        </div>

        {/* Confidence Badge & Quick Actions */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-medium">Confidence Score</div>
              <div className="text-xs font-extrabold text-emerald-400">
                {panchayat.weather.confidenceScore}% (High)
              </div>
            </div>
          </div>

          <button
            onClick={onOpenWhatsAppModal}
            className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition-colors"
            title="Simulate WhatsApp Advisory Dispatch to Farmers"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Weather Grid & Coarse Comparison Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Rainfall Card */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 p-4 rounded-xl border border-emerald-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
              <CloudRain className="w-4 h-4 text-emerald-400" />
              Downscaled Rainfall
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              Prob: {panchayat.weather.rainProbability}%
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-100">
                {panchayat.weather.rainfall}
              </span>
              <span className="text-sm font-semibold text-slate-400">mm / 24h</span>
            </div>
            
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span>95% CI Range:</span>
              <strong className="text-slate-300 font-mono">
                {panchayat.weather.uncertaintyRange.rainfallMin} - {panchayat.weather.uncertaintyRange.rainfallMax} mm
              </strong>
            </div>
          </div>

          {/* Block vs Panchayat Comparison Pill */}
          <div className="pt-2 border-t border-slate-800 text-[11px] flex items-center justify-between">
            <span className="text-slate-400">Coarse Block Forecast:</span>
            <span className="font-semibold text-slate-300">{block.coarseForecast.rainfall} mm</span>
            <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
              Number(rainDelta) > 0 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-300'
            }`}>
              {Number(rainDelta) > 0 ? `+${rainDelta} mm` : `${rainDelta} mm`}
            </span>
          </div>
        </div>

        {/* Temperature Card */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 p-4 rounded-xl border border-amber-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-amber-300">
              <Thermometer className="w-4 h-4 text-amber-400" />
              Surface Temperature
            </span>
            <span className="text-[11px] text-slate-400">
              Min: {panchayat.weather.tempMin}° | Max: {panchayat.weather.tempMax}°
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-100">
                {panchayat.weather.temp}
              </span>
              <span className="text-sm font-semibold text-slate-400">°C</span>
            </div>
            
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span>Thermal Sensor:</span>
              <strong className="text-slate-300 font-mono">
                INSAT-3DS TIR-1 Aligned
              </strong>
            </div>
          </div>

          {/* Block vs Panchayat Comparison Pill */}
          <div className="pt-2 border-t border-slate-800 text-[11px] flex items-center justify-between">
            <span className="text-slate-400">Coarse Block Forecast:</span>
            <span className="font-semibold text-slate-300">{block.coarseForecast.temp}°C</span>
            <span className="font-bold px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
              {Number(tempDelta) > 0 ? `+${tempDelta}°C` : `${tempDelta}°C`}
            </span>
          </div>
        </div>

        {/* Relative Humidity & Soil Moisture Card */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/40 p-4 rounded-xl border border-sky-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-sky-300">
              <Droplets className="w-4 h-4 text-sky-400" />
              Humidity & Soil Moisture
            </span>
            <span className="text-[11px] font-mono text-sky-400">
              NDVI: {panchayat.ndvi}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2">
            <div>
              <div className="text-[10px] text-slate-400">Relative Humidity</div>
              <div className="text-2xl font-black text-slate-100">
                {panchayat.weather.humidity}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Soil Moisture</div>
              <div className="text-2xl font-black text-teal-400">
                {panchayat.weather.soilMoisture}%
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] flex items-center justify-between text-slate-400">
            <span>Wind: <strong className="text-slate-200">{panchayat.weather.windSpeed} km/h {panchayat.weather.windDirection}</strong></span>
            <span>Solar: <strong className="text-slate-200">{panchayat.weather.solarRadiation} W/m²</strong></span>
          </div>
        </div>

      </div>

      {/* Hourly Trend Bar Strip */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            24-Hour Spatio-Temporal Prediction Curve
          </span>
          <span className="text-[10px] text-slate-500">ConvLSTM Nowcast Feed</span>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {panchayat.weather.hourlyForecast.map((h, i) => (
            <div key={i} className="flex flex-col items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-center">
              <span className="text-[10px] text-slate-400 font-mono">{h.time}</span>
              <span className="text-xs font-bold text-slate-200 mt-1">{h.temp}°C</span>
              
              <div className="my-1 flex items-center gap-0.5">
                <CloudRain className={`w-3 h-3 ${h.rainfall > 0 ? 'text-emerald-400' : 'text-slate-600'}`} />
                <span className={`text-[10px] font-bold ${h.rainfall > 0 ? 'text-emerald-300' : 'text-slate-500'}`}>
                  {h.rainfall} mm
                </span>
              </div>

              <span className="text-[9px] text-slate-400">RH {h.humidity}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Day High-Resolution Forecast Strip */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300">
            5-Day Micro-Forecast for {panchayat.name.replace(' Gram Panchayat', '')}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">U-Net Multi-Day Recursive</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {panchayat.weather.dailyForecast.map((day, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border flex flex-col justify-between ${
                idx === 0 
                  ? 'bg-emerald-950/30 border-emerald-700/60' 
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{day.day}</span>
                <span className="text-[10px] text-slate-400">{day.date}</span>
              </div>

              <div className="my-1.5">
                <div className="text-[11px] text-slate-300 font-medium truncate">
                  {day.condition}
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-xs font-bold text-emerald-400">
                    {day.rainfall > 0 ? `${day.rainfall} mm` : '0 mm'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {day.tempMin}° - {day.tempMax}°C
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
