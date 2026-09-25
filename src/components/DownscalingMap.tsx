import React, { useState } from 'react';
import { BlockData, PanchayatData } from '../types';
import { 
  Layers, 
  Eye, 
  Maximize2, 
  MapPin, 
  Mountain, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets,
  Satellite, 
  Sparkles, 
  Info,
  TrendingUp,
  Compass,
  CheckCircle
} from 'lucide-react';

interface DownscalingMapProps {
  currentBlock: BlockData;
  selectedPanchayat: PanchayatData;
  onSelectPanchayat: (p: PanchayatData) => void;
  activeLayer: 'downscaled' | 'coarse' | 'dem' | 'satellite' | 'ndvi';
  setActiveLayer: (l: 'downscaled' | 'coarse' | 'dem' | 'satellite' | 'ndvi') => void;
  comparisonMode: 'single' | 'split' | 'difference';
  setComparisonMode: (mode: 'single' | 'split' | 'difference') => void;
}

export const DownscalingMap: React.FC<DownscalingMapProps> = ({
  currentBlock,
  selectedPanchayat,
  onSelectPanchayat,
  activeLayer,
  setActiveLayer,
  comparisonMode,
  setComparisonMode,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showContours, setShowContours] = useState(true);

  // Compute variance across panchayats in the block
  const rainValues = currentBlock.panchayats.map(p => p.weather.rainfall);
  const minRain = Math.min(...rainValues);
  const maxRain = Math.max(...rainValues);
  const rainDiff = (maxRain - minRain).toFixed(1);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-4">
      
      {/* Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>Spatio-Temporal Downscaled GIS Map</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                1.0 km Scale
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {currentBlock.name}, {currentBlock.district}, {currentBlock.state} • {currentBlock.panchayats.length} Panchayats
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setComparisonMode('single')}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              comparisonMode === 'single'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Downscaled Grid
          </button>
          <button
            onClick={() => setComparisonMode('split')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              comparisonMode === 'split'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Side-by-Side (Coarse vs Fine)</span>
          </button>
          <button
            onClick={() => setComparisonMode('difference')}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              comparisonMode === 'difference'
                ? 'bg-violet-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Microclimate Anomaly Δ
          </button>
        </div>
      </div>

      {/* Layer Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium mr-1">Layer:</span>
          
          <button
            onClick={() => setActiveLayer('downscaled')}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
              activeLayer === 'downscaled'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600 shadow-sm'
                : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rainfall & Temp Surface</span>
          </button>

          <button
            onClick={() => setActiveLayer('dem')}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
              activeLayer === 'dem'
                ? 'bg-amber-950 text-amber-300 border-amber-600 shadow-sm'
                : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Mountain className="w-3.5 h-3.5 text-amber-400" />
            <span>DEM 30m Elevation</span>
          </button>

          <button
            onClick={() => setActiveLayer('satellite')}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
              activeLayer === 'satellite'
                ? 'bg-sky-950 text-sky-300 border-sky-600 shadow-sm'
                : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Satellite className="w-3.5 h-3.5 text-sky-400" />
            <span>INSAT-3DS Cloud IR</span>
          </button>

          <button
            onClick={() => setActiveLayer('ndvi')}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
              activeLayer === 'ndvi'
                ? 'bg-green-950 text-green-300 border-green-600 shadow-sm'
                : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-green-400" />
            <span>NDVI & Soil Moisture</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showContours}
              onChange={(e) => setShowContours(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-[11px]">Panchayat Boundary Contours</span>
          </label>
        </div>
      </div>

      {/* Main Map Visualizer Canvas Container */}
      <div className="relative w-full h-[430px] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
        
        {/* Background Grid Lines & Coordinate Lattice */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] [background-size:60px_60px]" />

        {/* Coarse vs Downscaled Split View Rendering */}
        {comparisonMode === 'split' ? (
          <div className="absolute inset-0 grid grid-cols-2 divide-x divide-slate-700">
            {/* Left: Coarse Block Forecast */}
            <div className="relative p-4 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
              <div className="absolute top-3 left-3 z-10 bg-slate-950/90 border border-amber-500/40 px-2.5 py-1 rounded-md">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  Baseline: Coarse IMD Block Forecast (12.5 km)
                </span>
                <p className="text-[11px] text-slate-400">
                  Rain: {currentBlock.coarseForecast.rainfall} mm (Uniform across all {currentBlock.panchayats.length} Panchayats)
                </p>
              </div>

              {/* Pixelated Chunky Low-Res Block Grid visual */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-48 h-48 rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-2xl font-black text-amber-300">
                    {currentBlock.coarseForecast.temp}°C
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    Rainfall: {currentBlock.coarseForecast.rainfall} mm
                  </span>
                  <span className="text-[10px] text-slate-400 mt-2">
                    Uniform Average (No micro-elevation, no river-bed bias awareness)
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-amber-300/80 bg-amber-950/40 p-2 rounded border border-amber-900/50">
                ⚠️ Fails to capture localized cloud bursts or dry pockets within the block.
              </div>
            </div>

            {/* Right: Fine AI Downscaled Panchayat Forecast */}
            <div className="relative p-4 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950">
              <div className="absolute top-3 left-3 z-10 bg-slate-950/90 border border-emerald-500/40 px-2.5 py-1 rounded-md">
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  AI Downscaled Panchayat Grid (1.0 km)
                </span>
                <p className="text-[11px] text-slate-400">
                  Fine Variance: {minRain} mm → {maxRain} mm (Δ {rainDiff} mm variation!)
                </p>
              </div>

              {/* High-res micro-climate cells visual */}
              <div className="w-full h-full flex items-center justify-center gap-2 p-4">
                <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                  {currentBlock.panchayats.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onSelectPanchayat(p)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex flex-col ${
                        p.id === selectedPanchayat.id
                          ? 'bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105'
                          : 'bg-slate-900/80 border-slate-700/80 hover:border-emerald-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-200 truncate">
                          {p.name.replace(' Gram Panchayat', '')}
                        </span>
                        {p.id === selectedPanchayat.id && (
                          <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-sm font-extrabold text-emerald-400">
                          {p.weather.rainfall} <span className="text-[10px] font-normal">mm</span>
                        </span>
                        <span className="text-[11px] font-semibold text-sky-300">
                          {p.weather.temp}°C
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-0.5 truncate">
                        {p.landUse} • Elev {p.elevation}m
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-emerald-300/90 bg-emerald-950/50 p-2 rounded border border-emerald-800/50 flex items-center justify-between">
                <span>✅ Multi-source neural fusion captures micro-climate divergence.</span>
                <span className="font-bold text-emerald-400">{selectedPanchayat.weather.confidenceScore}% Conf</span>
              </div>
            </div>
          </div>
        ) : (
          /* Single / Anomaly GIS Visualizer */
          <div className="relative w-full h-full p-4 flex flex-col justify-between">
            
            {/* Top Overlay Legend & Status */}
            <div className="flex items-center justify-between z-10 pointer-events-none">
              <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-md border border-slate-700/80 px-3 py-2 rounded-xl text-xs flex items-center gap-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    activeLayer === 'downscaled' ? 'bg-emerald-400' :
                    activeLayer === 'dem' ? 'bg-amber-400' :
                    activeLayer === 'satellite' ? 'bg-sky-400' : 'bg-green-400'
                  } animate-pulse`} />
                  <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                    {activeLayer === 'downscaled' ? 'Fine AI Precipitation & Thermal Surface' :
                     activeLayer === 'dem' ? 'SRTM 30m Digital Elevation & Orographic Gradient' :
                     activeLayer === 'satellite' ? 'ISRO INSAT-3DS Thermal IR Channel (10.8μm)' : 'Sentinel-2 NDVI & Soil Moisture Index'}
                  </span>
                </div>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">
                  Target: <strong className="text-slate-200">{selectedPanchayat.name}</strong>
                </span>
              </div>

              {/* Live Mini Map Stats */}
              <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Rainfall Variance (Δ)</div>
                  <div className="text-xs font-extrabold text-emerald-400">
                    {minRain} - {maxRain} mm
                  </div>
                </div>
                <div className="text-right pl-2 border-l border-slate-800">
                  <div className="text-[10px] text-slate-400">Elevation Range</div>
                  <div className="text-xs font-extrabold text-amber-400">
                    {Math.min(...currentBlock.panchayats.map(p => p.elevation))}m - {Math.max(...currentBlock.panchayats.map(p => p.elevation))}m
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Panchayat Interactive Node Layout */}
            <div className="relative w-full h-full flex items-center justify-around px-6 z-10">
              {currentBlock.panchayats.map((panchayat, idx) => {
                const isSelected = panchayat.id === selectedPanchayat.id;
                const isAnomaly = Math.abs(panchayat.weather.rainfall - currentBlock.coarseForecast.rainfall) > 5;
                
                // Color mapping based on active layer
                let gradientClass = 'from-emerald-500/30 to-teal-900/60 border-emerald-500/40';
                if (activeLayer === 'dem') {
                  gradientClass = panchayat.elevation > 200 
                    ? 'from-amber-600/30 to-amber-950/80 border-amber-500/60'
                    : 'from-amber-400/20 to-slate-900/60 border-amber-400/40';
                } else if (activeLayer === 'satellite') {
                  gradientClass = panchayat.weather.humidity > 80
                    ? 'from-sky-500/30 to-blue-950/80 border-sky-400/60'
                    : 'from-blue-400/20 to-slate-900/60 border-blue-400/30';
                } else if (activeLayer === 'ndvi') {
                  gradientClass = panchayat.ndvi > 0.7
                    ? 'from-emerald-600/30 to-green-950/80 border-green-400/60'
                    : 'from-yellow-600/20 to-slate-900/60 border-yellow-500/30';
                }

                return (
                  <div
                    key={panchayat.id}
                    onClick={() => onSelectPanchayat(panchayat)}
                    className={`relative cursor-pointer transition-all duration-300 p-3 rounded-2xl border-2 flex flex-col justify-between w-48 bg-gradient-to-b ${gradientClass} ${
                      isSelected 
                        ? 'ring-4 ring-emerald-400/40 shadow-2xl shadow-emerald-500/40 scale-110 -translate-y-2 z-30'
                        : 'hover:scale-105 hover:border-slate-400 opacity-90 hover:opacity-100 z-10'
                    }`}
                  >
                    {/* Top Tag */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[11px] font-bold text-slate-100 truncate">
                        {panchayat.name.replace(' Gram Panchayat', '')}
                      </span>
                      {isAnomaly && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-red-950 text-red-300 border border-red-700/60 animate-pulse">
                          Micro-Surge
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] text-slate-300 font-medium truncate">
                      {panchayat.landUse} • {panchayat.elevation}m
                    </p>

                    {/* Metric Rows */}
                    <div className="my-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-[9px] text-slate-400">Rainfall (Downscaled)</div>
                        <div className="text-base font-black text-emerald-400 flex items-baseline gap-1">
                          {panchayat.weather.rainfall}
                          <span className="text-[10px] text-slate-400 font-normal">mm</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[9px] text-slate-400">Confidence</div>
                        <div className="text-xs font-bold text-sky-300">
                          {panchayat.weather.confidenceScore}%
                        </div>
                      </div>
                    </div>

                    {/* Comparison Delta with Coarse Block Forecast */}
                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-700/50">
                      <span className="text-slate-400">vs Block Forecast:</span>
                      <span className={`font-bold ${
                        panchayat.weather.rainfall > currentBlock.coarseForecast.rainfall
                          ? 'text-emerald-400'
                          : panchayat.weather.rainfall < currentBlock.coarseForecast.rainfall
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}>
                        {panchayat.weather.rainfall > currentBlock.coarseForecast.rainfall ? '+' : ''}
                        {(panchayat.weather.rainfall - currentBlock.coarseForecast.rainfall).toFixed(1)} mm
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <MapPin className="w-2.5 h-2.5" /> Selected
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Map Floating Details & Legend Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 z-10 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-xl text-xs">
              {/* Scale spectrum legend */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-medium">Precipitation Scale (mm):</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-400">0</span>
                  <div className="w-28 h-2.5 rounded-full bg-gradient-to-r from-amber-500 via-sky-400 via-teal-400 to-emerald-400" />
                  <span className="text-[10px] text-slate-400">70+</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>Coordinates: <strong className="text-slate-300 font-mono">{selectedPanchayat.lat.toFixed(4)}°N, {selectedPanchayat.lng.toFixed(4)}°E</strong></span>
                <span>•</span>
                <span>Terrain Slope: <strong className="text-slate-300">DEM SRTM 30m Res</strong></span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">AI Kriging & U-Net Tensor Active</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
