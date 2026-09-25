import React, { useState } from 'react';
import { ML_MODELS_BENCHMARK, FEATURE_IMPORTANCE_DATA } from '../data/mockData';
import { 
  Cpu, 
  BarChart2, 
  TrendingUp, 
  Zap, 
  Layers, 
  Target, 
  ShieldCheck, 
  Brain, 
  Sparkles,
  GitBranch,
  Terminal,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter
} from 'recharts';

export const MLWorkbench: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'mae' | 'r2' | 'f1'>('mae');
  const [activeArchitecture, setActiveArchitecture] = useState<string>('all');

  // Chart data for model comparison
  const modelChartData = ML_MODELS_BENCHMARK.map(m => ({
    name: m.name.split(' ')[0] + ' ' + (m.name.split(' ')[1] || ''),
    fullName: m.name,
    mae: m.maeRainfall,
    rmse: m.rmseRainfall,
    r2: (m.r2Score * 100).toFixed(1),
    f1: (m.f1RainfallEvents * 100).toFixed(1),
    type: m.type,
  }));

  // Hourly ground truth vs downscaled validation curve
  const validationTimeline = [
    { hour: '00:00', imdCoarse: 1.0, darkVyomFine: 0.2, groundTruthAWS: 0.0 },
    { hour: '04:00', imdCoarse: 1.5, darkVyomFine: 0.5, groundTruthAWS: 0.4 },
    { hour: '08:00', imdCoarse: 2.0, darkVyomFine: 4.8, groundTruthAWS: 5.2 },
    { hour: '12:00', imdCoarse: 3.2, darkVyomFine: 14.5, groundTruthAWS: 16.0 },
    { hour: '16:00', imdCoarse: 3.5, darkVyomFine: 22.8, groundTruthAWS: 24.1 },
    { hour: '20:00', imdCoarse: 2.8, darkVyomFine: 7.2, groundTruthAWS: 6.8 },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <span>AI & ML Downscaling Diagnostic Workbench</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-700/60">
                  Model Verification & Validation
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Comparative benchmarks across DeepSD (CNN), ConvLSTM, U-Net, XGBoost & Coarse NWP
              </p>
            </div>
          </div>
        </div>

        {/* Quick Metric Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 px-1 font-medium">Metric:</span>
          <button
            onClick={() => setSelectedMetric('mae')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedMetric === 'mae'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            MAE (Error mm)
          </button>
          <button
            onClick={() => setSelectedMetric('r2')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedMetric === 'r2'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            R² Score (%)
          </button>
          <button
            onClick={() => setSelectedMetric('f1')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedMetric === 'f1'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Event F1 Score
          </button>
        </div>
      </div>

      {/* Top 3 Metric Summary Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        
        <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Rainfall MAE (Dark Vyom)</span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-2xl font-black text-emerald-400">1.34 mm</span>
            <span className="text-[11px] font-bold text-emerald-500">(-78.4% error)</span>
          </div>
          <span className="text-[10px] text-slate-400">vs 6.20 mm Raw IMD Baseline</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/30 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">R² Coefficient of Determination</span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-2xl font-black text-sky-400">0.932</span>
            <span className="text-[11px] font-bold text-sky-500">(Near Perfect Fit)</span>
          </div>
          <span className="text-[10px] text-slate-400">vs 0.528 Coarse NWP</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/30 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Heavy Rain Event Detection F1</span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-2xl font-black text-purple-400">0.915</span>
            <span className="text-[11px] font-bold text-purple-500">(Precision 93%)</span>
          </div>
          <span className="text-[10px] text-slate-400">Captures Localized Flash Rain</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Quantized Model Latency</span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-2xl font-black text-amber-400">42 ms</span>
            <span className="text-[11px] font-bold text-amber-500">(148 MB INT8)</span>
          </div>
          <span className="text-[10px] text-slate-400">FastAPI ONNX Runtime / CPU Ready</span>
        </div>

      </div>

      {/* Grid: Benchmark Chart & Ground Truth Comparison Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: Model Comparison Bar Chart */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              Model Architecture Comparison (Lower MAE / Higher R² is Better)
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">5000+ Test Panchayats</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
                {selectedMetric === 'mae' && (
                  <Bar dataKey="mae" fill="#10b981" radius={[4, 4, 0, 0]} name="MAE (mm)" />
                )}
                {selectedMetric === 'r2' && (
                  <Bar dataKey="r2" fill="#38bdf8" radius={[4, 4, 0, 0]} name="R² Score (%)" />
                )}
                {selectedMetric === 'f1' && (
                  <Bar dataKey="f1" fill="#a855f7" radius={[4, 4, 0, 0]} name="F1-Score (%)" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-400 mt-2">
            The Dark Vyom Hybrid Multi-Source U-Net outperforms standalone baseline models by directly capturing topographic boundary constraints.
          </p>
        </div>

        {/* Right: Real-Time Ground Truth AWS Validation Curve */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              Ground Truth AWS vs Dark Vyom vs Coarse IMD Baseline
            </h4>
            <span className="text-[10px] text-emerald-400 font-mono">Pindra Testbed Gauge</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={validationTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="groundTruthAWS" name="Actual Ground Station (AWS)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="darkVyomFine" name="Dark Vyom AI Downscaled" stroke="#10b981" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="imdCoarse" name="Coarse Block NWP Baseline" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-400 mt-2">
            Notice how the coarse model misses the 24.1mm localized thunderstorm peak entirely (predicting only 3.5mm), while Dark Vyom tracks ground truth closely (22.8mm).
          </p>
        </div>

      </div>

      {/* SHAP Feature Importance Table / Attribution Section */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Explainable AI (XAI) & SHAP Feature Attribution Weights
          </h4>
          <span className="text-[10px] text-purple-300 font-mono">TreeSHAP + DeepExplainer</span>
        </div>

        <div className="space-y-3">
          {FEATURE_IMPORTANCE_DATA.map((feat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  {feat.feature}
                </span>
                <span className="font-mono font-black text-purple-400">
                  {feat.importance}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${feat.importance}%` }}
                />
              </div>

              <p className="text-[10px] text-slate-400">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
