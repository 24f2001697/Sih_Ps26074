import React from 'react';
import { 
  X, 
  FileText, 
  Award, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Cpu, 
  BookOpen, 
  Sparkles,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface ReferenceDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceDocsModal: React.FC<ReferenceDocsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl p-6 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Smart India Hackathon 2026 • SIH26074</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                  Team Dark Vyom (138235)
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Downscaling of weather forecast from Block to Panchayat level for agro-meteorological advisory services
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

        {/* Content Section: 6 Slide Highlights */}
        <div className="space-y-6 text-xs text-slate-300">
          
          {/* Section 1: Title & Theme */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Problem Statement & Theme Overview
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-400">
              <div>
                <strong className="text-slate-200">PS ID:</strong> SIH26074 (Software Category)<br />
                <strong className="text-slate-200">Theme:</strong> Agriculture, FoodTech & Rural Development<br />
                <strong className="text-slate-200">Team:</strong> Dark Vyom (Team ID: 138235)
              </div>
              <div>
                <strong className="text-slate-200">Core Objective:</strong> Infer high-resolution weather variables (1km scale) from low-resolution coarse block data (12.5-25km) to deliver precision agro-meteorological advisories.
              </div>
            </div>
          </div>

          {/* Section 2: Innovation & Uniqueness */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Key Innovations (PPT Slide 2)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-emerald-300 block mb-1">1. Multi-Source Spatial Fusion</span>
                Combines IMD NWP, INSAT-3DS satellite infrared, ERA5-Land historical data, and SRTM 30m Digital Elevation Models (DEM).
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-sky-300 block mb-1">2. Spatio-Temporal AI Super-Resolution</span>
                Deep Convolutional U-Net + ConvLSTM models learn fine-scale micro-topographic rainfall patterns and cloud convection.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-purple-300 block mb-1">3. Uncertainty-Aware Predictions</span>
                Every downscaled metric comes with a calibrated Confidence Score (%) and 95% Bayesian Confidence Intervals.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-amber-300 block mb-1">4. Weather-to-Advisory Engine</span>
                Converts microclimate figures into actionable crop-stage decisions (irrigation, spraying window, disease warnings) with multilingual audio.
              </div>
            </div>
          </div>

          {/* Section 3: Technical Stack & Models */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              Technical Stack & ML Architectures (PPT Slide 3 & 6)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="font-bold text-slate-200 block mb-1">Data & GIS:</span>
                GeoPandas, Rasterio, GDAL, Shapefile/GeoJSON, Xarray, INSAT-3D/3DS (MOSDAC), ERA5-Land.
              </div>
              <div>
                <span className="font-bold text-slate-200 block mb-1">ML / AI Models:</span>
                PyTorch, CNN / U-Net (DeepSD), ConvLSTM Nowcasting, Transformers, LightGBM / XGBoost Regressors.
              </div>
              <div>
                <span className="font-bold text-slate-200 block mb-1">Frontend & Backend:</span>
                FastAPI, PostgreSQL / PostGIS, React, TypeScript, Tailwind CSS, Leaflet/MapLibre.
              </div>
            </div>
          </div>

          {/* Section 4: Research Papers & Dataset References */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              Research Papers & Benchmark References (PPT Slide 6)
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
              <li className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> <strong>DeepSD:</strong> Deep Learning for Climate Downscaling (Vandal et al., KDD)</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> <strong>ConvLSTM:</strong> Spatio-Temporal Nowcasting (Shi et al., NeurIPS)</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> <strong>SRDRN:</strong> Super-Resolution Deep Residual Networks for Precipitation</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> <strong>MOSDAC:</strong> ISRO Satellite Data Portal (INSAT-3D/3DS)</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> <strong>AgERA5 & ERA5-Land:</strong> ECMWF Copernicus Climate Reanalysis</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> <strong>IMD Agromet:</strong> National Gridded Rainfall & Agro-advisory Database</li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Specifications
          </button>
        </div>

      </div>
    </div>
  );
};
