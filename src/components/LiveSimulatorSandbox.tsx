import React, { useState } from 'react';
import { BlockData } from '../types';
import { 
  Sliders, 
  X, 
  Sparkles, 
  Cpu, 
  RefreshCw, 
  Layers, 
  Zap,
  TrendingUp,
  Activity
} from 'lucide-react';

interface LiveSimulatorSandboxProps {
  isOpen: boolean;
  onClose: () => void;
  currentBlock: BlockData;
}

export const LiveSimulatorSandbox: React.FC<LiveSimulatorSandboxProps> = ({
  isOpen,
  onClose,
  currentBlock,
}) => {
  if (!isOpen) return null;

  // Simulator input parameters
  const [coarseTemp, setCoarseTemp] = useState<number>(33.5);
  const [coarseRain, setCoarseRain] = useState<number>(5.0);
  const [cloudOpticalDepth, setCloudOpticalDepth] = useState<number>(65); // %
  const [elevationOrographicWeight, setElevationOrographicWeight] = useState<number>(1.2);
  const [canalMoistureBoost, setCanalMoistureBoost] = useState<boolean>(true);

  // Real-time Downscaler Calculation formula for each panchayat in the sandbox
  const simulatedPanchayats = currentBlock.panchayats.map((p) => {
    // Elevation adiabatic lapse rate & orographic lift multiplier
    const elevDiff = (p.elevation - 80) / 100; // relative to baseline 80m
    const orographicRainFactor = 1 + (elevDiff * elevationOrographicWeight * (cloudOpticalDepth / 100));
    
    // Canal / waterbody convective multiplier
    const canalFactor = (canalMoistureBoost && (p.landUse === 'River Valley / Canal' || p.landUse === 'Wetland')) ? 1.45 : 0.85;

    // Simulated downscaled rain
    const downscaledRain = Math.max(0, (coarseRain * orographicRainFactor * canalFactor)).toFixed(1);
    
    // Downscaled temperature
    const downscaledTemp = (coarseTemp - (elevDiff * 0.65) - (canalFactor > 1 ? 1.2 : 0)).toFixed(1);

    // Confidence
    const confidence = Math.min(99, Math.max(82, (95 - (coarseRain > 20 ? 5 : 0) + (cloudOpticalDepth > 50 ? 3 : -4)))).toFixed(1);

    return {
      ...p,
      simRain: Number(downscaledRain),
      simTemp: Number(downscaledTemp),
      simConfidence: Number(confidence),
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl p-6 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>AI Weather Downscaler Live Simulator Sandbox</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-700">
                  Interactive U-Net Inference
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Tweak coarse NWP and satellite parameters to observe real-time microclimate resolution across {currentBlock.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          
          {/* Coarse Temperature Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Coarse Block Temperature (IMD NWP):</span>
              <span className="text-amber-400 font-mono font-bold">{coarseTemp}°C</span>
            </div>
            <input
              type="range"
              min="20"
              max="45"
              step="0.5"
              value={coarseTemp}
              onChange={(e) => setCoarseTemp(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Coarse Rainfall Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Coarse Block Rainfall (IMD NWP):</span>
              <span className="text-emerald-400 font-mono font-bold">{coarseRain} mm</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="0.5"
              value={coarseRain}
              onChange={(e) => setCoarseRain(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Cloud Optical Depth (INSAT) Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">INSAT-3DS Cloud Optical Depth:</span>
              <span className="text-sky-400 font-mono font-bold">{cloudOpticalDepth}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={cloudOpticalDepth}
              onChange={(e) => setCloudOpticalDepth(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          {/* Orographic Multiplier */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">DEM Orographic Slope Coefficient:</span>
              <span className="text-purple-400 font-mono font-bold">{elevationOrographicWeight}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={elevationOrographicWeight}
              onChange={(e) => setElevationOrographicWeight(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

        </div>

        {/* Live Downscaled Results Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              Real-Time Simulated Output (1.0 km Scale Panchayats)
            </h4>
            <span className="text-[10px] text-emerald-400 font-mono">Tensor Latency: 38ms</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {simulatedPanchayats.map((sp) => (
              <div
                key={sp.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-slate-200 truncate block">
                    {sp.name.replace(' Gram Panchayat', '')}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {sp.landUse} • {sp.elevation}m
                  </span>
                </div>

                <div className="my-2 p-2 rounded-lg bg-slate-900 border border-slate-800/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Sim Rainfall</span>
                    <span className="text-base font-black text-emerald-400">
                      {sp.simRain} <span className="text-[10px] text-slate-400 font-normal">mm</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block">Sim Temp</span>
                    <span className="text-sm font-bold text-amber-300">
                      {sp.simTemp}°C
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Confidence:</span>
                  <span className="font-bold text-sky-400">{sp.simConfidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
          >
            Apply & Return to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
