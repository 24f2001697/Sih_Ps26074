import React, { useState } from 'react';
import { DATASET_SOURCES } from '../data/mockData';
import { 
  Database, 
  Cpu, 
  GitMerge, 
  ShieldCheck, 
  Send, 
  Layers, 
  Satellite, 
  Activity, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Terminal,
  Zap
} from 'lucide-react';

export const MultiSourcePipeline: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(3); // 0 to 4

  const runLiveSimulation = () => {
    setIsSimulating(true);
    setPipelineStep(0);
    
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setPipelineStep(current);
      if (current >= 4) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1200);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <span>Multi-Source Spatial Fusion & AI Pipeline</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-700/60">
                  End-to-End Workflow Architecture
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Block-Scale NWP (12-25 km) → Neural Tensor Ingestion → Panchayat Resolution (1.0 km)
              </p>
            </div>
          </div>
        </div>

        {/* Live Pipeline Test Trigger */}
        <button
          onClick={runLiveSimulation}
          disabled={isSimulating}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
            isSimulating
              ? 'bg-sky-950 text-sky-300 border border-sky-600 animate-pulse'
              : 'bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white shadow-sky-900/30'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Executing Pipeline Run...' : 'Simulate Live Ingestion Run'}</span>
        </button>
      </div>

      {/* 5-Stage Interactive Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        
        {/* Step 1: Data Sources */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
          pipelineStep >= 0
            ? 'bg-slate-950 border-sky-500/60 ring-2 ring-sky-500/20 shadow-lg'
            : 'bg-slate-950/50 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">Stage 01</span>
              <Database className="w-4 h-4 text-sky-400" />
            </div>
            <h4 className="text-xs font-bold text-slate-100 mb-1">Multi-Source Ingestion</h4>
            <ul className="text-[11px] text-slate-300 space-y-1 mt-2">
              <li className="flex items-center gap-1"><span className="text-sky-400">•</span> IMD Block GFS (12km)</li>
              <li className="flex items-center gap-1"><span className="text-sky-400">•</span> INSAT-3DS Satellite TIR</li>
              <li className="flex items-center gap-1"><span className="text-sky-400">•</span> ERA5-Land Reanalysis</li>
              <li className="flex items-center gap-1"><span className="text-sky-400">•</span> SRTM 30m DEM Elevation</li>
            </ul>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-sky-400 font-mono">
            Status: 5 Feeds Synced
          </div>
        </div>

        {/* Step 2: Spatial-Temporal Preprocessing */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
          pipelineStep >= 1
            ? 'bg-slate-950 border-teal-500/60 ring-2 ring-teal-500/20 shadow-lg'
            : 'bg-slate-950/50 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-teal-400 font-bold uppercase">Stage 02</span>
              <GitMerge className="w-4 h-4 text-teal-400" />
            </div>
            <h4 className="text-xs font-bold text-slate-100 mb-1">Spatial Alignment & Kriging</h4>
            <ul className="text-[11px] text-slate-300 space-y-1 mt-2">
              <li className="flex items-center gap-1"><span className="text-teal-400">•</span> EPSG:4326 Reprojection</li>
              <li className="flex items-center gap-1"><span className="text-teal-400">•</span> Cloud/Noise Masking</li>
              <li className="flex items-center gap-1"><span className="text-teal-400">•</span> Orographic Slope Vector</li>
              <li className="flex items-center gap-1"><span className="text-teal-400">•</span> GeoJSON Panchayat Bounds</li>
            </ul>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-teal-400 font-mono">
            Grid Tensor: [64, 64, 8]
          </div>
        </div>

        {/* Step 3: AI/ML Downscaling */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
          pipelineStep >= 2
            ? 'bg-slate-950 border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-lg'
            : 'bg-slate-950/50 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Stage 03</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-bold text-slate-100 mb-1">Deep Learning Downscaling</h4>
            <ul className="text-[11px] text-slate-300 space-y-1 mt-2">
              <li className="flex items-center gap-1"><span className="text-emerald-400">•</span> U-Net Super-Resolution</li>
              <li className="flex items-center gap-1"><span className="text-emerald-400">•</span> ConvLSTM Temporal Flow</li>
              <li className="flex items-center gap-1"><span className="text-emerald-400">•</span> XGBoost Residual Head</li>
              <li className="flex items-center gap-1"><span className="text-emerald-400">•</span> Latency: 42ms / Block</li>
            </ul>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-mono">
            Res: 1.0 km Fine Grid
          </div>
        </div>

        {/* Step 4: Uncertainty & Bias Correction */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
          pipelineStep >= 3
            ? 'bg-slate-950 border-amber-500/60 ring-2 ring-amber-500/20 shadow-lg'
            : 'bg-slate-950/50 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Stage 04</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-xs font-bold text-slate-100 mb-1">Uncertainty & Validation</h4>
            <ul className="text-[11px] text-slate-300 space-y-1 mt-2">
              <li className="flex items-center gap-1"><span className="text-amber-400">•</span> Quantile Bias Mapping</li>
              <li className="flex items-center gap-1"><span className="text-amber-400">•</span> Bayesian 95% CI Range</li>
              <li className="flex items-center gap-1"><span className="text-amber-400">•</span> Confidence: 94.8%</li>
              <li className="flex items-center gap-1"><span className="text-amber-400">•</span> Ground AWS Cross-Check</li>
            </ul>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-amber-400 font-mono">
            MAE: 1.34 mm
          </div>
        </div>

        {/* Step 5: Agro Delivery */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
          pipelineStep >= 4
            ? 'bg-slate-950 border-purple-500/60 ring-2 ring-purple-500/20 shadow-lg'
            : 'bg-slate-950/50 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">Stage 05</span>
              <Send className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="text-xs font-bold text-slate-100 mb-1">Advisory & Farmer Delivery</h4>
            <ul className="text-[11px] text-slate-300 space-y-1 mt-2">
              <li className="flex items-center gap-1"><span className="text-purple-400">•</span> Crop-Stage Advisory</li>
              <li className="flex items-center gap-1"><span className="text-purple-400">•</span> Multilingual Voice Audio</li>
              <li className="flex items-center gap-1"><span className="text-purple-400">•</span> WhatsApp / SMS Dispatch</li>
              <li className="flex items-center gap-1"><span className="text-purple-400">•</span> KVK Scientist Dashboard</li>
            </ul>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-purple-400 font-mono">
            Delivery: Real-Time
          </div>
        </div>

      </div>

      {/* Dataset Sources Table */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Satellite className="w-4 h-4 text-sky-400" />
            Ingested Multi-Source Observational & Satellite Datasets (ISRO MOSDAC / IMD / ECMWF)
          </span>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live Ingestion Feeds Connected
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="pb-2">Dataset Name</th>
                <th className="pb-2">Provider / Agency</th>
                <th className="pb-2">Data Type & Resolution</th>
                <th className="pb-2">Update Frequency</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {DATASET_SOURCES.map((ds, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-2.5 font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {ds.name}
                  </td>
                  <td className="py-2.5 text-slate-400">{ds.provider}</td>
                  <td className="py-2.5 text-slate-300">{ds.type}</td>
                  <td className="py-2.5 text-slate-400 font-mono text-[11px]">{ds.frequency}</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {ds.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
