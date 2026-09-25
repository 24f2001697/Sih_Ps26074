import React from 'react';
import { UserRole, Language } from '../types';
import { 
  CloudRain, 
  Cpu, 
  UserCheck, 
  Layers, 
  Globe, 
  Sparkles, 
  Radio, 
  HelpCircle,
  Volume2,
  Sliders
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenDocs: () => void;
  onOpenSimulator: () => void;
  onOpenFeedback: () => void;
  activePanchayatName: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  setCurrentRole,
  language,
  setLanguage,
  onOpenDocs,
  onOpenSimulator,
  onOpenFeedback,
  activePanchayatName,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & App Branding */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-500 p-0.5 shadow-lg shadow-emerald-900/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <CloudRain className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-sky-400 bg-clip-text text-transparent">
                  AgriSense AI
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                AI Weather Downscaling (Block → Panchayat) & Agro-Advisory
              </p>
            </div>
          </div>

          {/* Center: Live Pipeline Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Multi-Source Fusion: Active</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">INSAT-3DS + ERA5 + DEM</span>
            <span className="text-slate-600">|</span>
            <span className="text-sky-300 font-mono text-[11px] font-semibold">
              Res: 1.0 km²
            </span>
          </div>

          {/* Right Actions: Persona Selector, Language & Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Persona Switcher Dropdown */}
            <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-lg p-1 text-xs">
              <span className="text-slate-400 px-1 hidden lg:inline font-medium text-[11px]">Persona:</span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as UserRole)}
                className="bg-transparent text-emerald-300 font-semibold focus:outline-none cursor-pointer py-1 px-1.5"
              >
                <option value="farmer" className="bg-slate-900 text-slate-200">👨‍🌾 Farmer View</option>
                <option value="extension_officer" className="bg-slate-900 text-slate-200">🧑‍🔬 Agri-Extension / KVK</option>
                <option value="panchayat_admin" className="bg-slate-900 text-slate-200">🏛️ Panchayat / Disaster</option>
                <option value="ml_scientist" className="bg-slate-900 text-slate-200">🧠 AI / ML Workbench</option>
              </select>
            </div>

            {/* Language Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1 hidden sm:block" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer py-1 px-1.5"
              >
                <option value="en" className="bg-slate-900">EN (English)</option>
                <option value="hi" className="bg-slate-900">HI (हिंदी)</option>
                <option value="mr" className="bg-slate-900">MR (मराठी)</option>
                <option value="pa" className="bg-slate-900">PA (ਪੰਜਾਬੀ)</option>
                <option value="te" className="bg-slate-900">TE (తెలుగు)</option>
              </select>
            </div>

            {/* Live Sandbox Simulator Button */}
            <button
              onClick={onOpenSimulator}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-950/80 text-sky-300 border border-sky-700/60 hover:bg-sky-900/60 transition-colors shadow-sm"
              title="Open AI Weather Downscaling Simulator Sandbox"
            >
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">AI Sandbox</span>
            </button>


          </div>

        </div>
      </div>
    </header>
  );
};
