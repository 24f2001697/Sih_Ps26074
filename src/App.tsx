import React, { useState } from 'react';
import { ALL_BLOCKS } from './data/mockData';
import { BlockData, PanchayatData, UserRole, Language } from './types';
import { Header } from './components/Header';
import { DownscalingMap } from './components/DownscalingMap';
import { PanchayatWeatherCard } from './components/PanchayatWeatherCard';
import { AgroAdvisoryPanel } from './components/AgroAdvisoryPanel';
import { MultiSourcePipeline } from './components/MultiSourcePipeline';
import { MLWorkbench } from './components/MLWorkbench';
import { DisasterAlertCenter } from './components/DisasterAlertCenter';
import { LiveSimulatorSandbox } from './components/LiveSimulatorSandbox';
import { HumanFeedbackModal } from './components/HumanFeedbackModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ReferenceDocsModal } from './components/ReferenceDocsModal';
import { 
  MapPin, 
  ChevronRight, 
  Layers, 
  Sparkles, 
  CloudRain, 
  Cpu, 
  Sprout, 
  ShieldAlert, 
  HelpCircle,
  Download,
  Share2,
  Calendar
} from 'lucide-react';

export function App() {
  // Global States
  const [currentRole, setCurrentRole] = useState<UserRole>('farmer');
  const [language, setLanguage] = useState<Language>('en');
  
  // Geographic Hierarchy
  const [selectedBlockId, setSelectedBlockId] = useState<string>(ALL_BLOCKS[0].id);
  const currentBlock = ALL_BLOCKS.find(b => b.id === selectedBlockId) || ALL_BLOCKS[0];

  const [selectedPanchayatId, setSelectedPanchayatId] = useState<string>(currentBlock.panchayats[0].id);
  const selectedPanchayat = currentBlock.panchayats.find(p => p.id === selectedPanchayatId) || currentBlock.panchayats[0];

  // Map Controls
  const [activeLayer, setActiveLayer] = useState<'downscaled' | 'coarse' | 'dem' | 'satellite' | 'ndvi'>('downscaled');
  const [comparisonMode, setComparisonMode] = useState<'single' | 'split' | 'difference'>('single');

  // Modals
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);

  // Switch block handler
  const handleBlockChange = (blockId: string) => {
    setSelectedBlockId(blockId);
    const newBlock = ALL_BLOCKS.find(b => b.id === blockId) || ALL_BLOCKS[0];
    setSelectedPanchayatId(newBlock.panchayats[0].id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white pb-16">
      
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        language={language}
        setLanguage={setLanguage}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        activePanchayatName={selectedPanchayat.name}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full flex flex-col gap-6">
        
        {/* Breadcrumb & Geographic Selector Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
          
          {/* Location Hierarchy Selectors */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <MapPin className="w-4 h-4" />
              <span>Target Region:</span>
            </div>

            {/* Block Selector */}
            <select
              value={selectedBlockId}
              onChange={(e) => handleBlockChange(e.target.value)}
              className="bg-slate-950 text-slate-100 border border-slate-700 rounded-lg px-3 py-1.5 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {ALL_BLOCKS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.state} → {b.district} District → {b.name}
                </option>
              ))}
            </select>

            <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />

            {/* Panchayat Quick Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2 sm:mt-0">
              <span className="text-slate-400 font-medium hidden md:inline">Panchayat:</span>
              {currentBlock.panchayats.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPanchayatId(p.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    p.id === selectedPanchayat.id
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                      : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {p.name.replace(' Gram Panchayat', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400">
            <span>Coarse Block NWP: <strong className="text-amber-400">{currentBlock.coarseForecast.temp}°C | {currentBlock.coarseForecast.rainfall} mm</strong></span>
            <span>•</span>
            <span>Downscaled Target: <strong className="text-emerald-400">{selectedPanchayat.weather.temp}°C | {selectedPanchayat.weather.rainfall} mm</strong></span>
          </div>

        </div>

        {/* Persona Guidance Banner */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/40 border border-emerald-800/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {currentRole === 'farmer' && <Sprout className="w-5 h-5" />}
              {currentRole === 'extension_officer' && <Layers className="w-5 h-5" />}
              {currentRole === 'panchayat_admin' && <ShieldAlert className="w-5 h-5" />}
              {currentRole === 'ml_scientist' && <Cpu className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Active Persona: {
                  currentRole === 'farmer' ? '👨‍🌾 Smallholder Farmer Dashboard' :
                  currentRole === 'extension_officer' ? '🧑‍🔬 Agri-Extension & KVK Officer Portal' :
                  currentRole === 'panchayat_admin' ? '🏛️ Panchayat & Disaster Mitigation Authority' : '🧠 AI / ML Downscaling Diagnostic Workbench'
                }</span>
              </h4>
              <p className="text-xs text-slate-400">
                {currentRole === 'farmer' && 'Hyper-local downscaled weather, crop-stage action cards, voice audio in regional language, and WhatsApp dispatch.'}
                {currentRole === 'extension_officer' && 'Multi-panchayat spatial monitoring, disease outbreak thresholds, localized advisories, and expert validation feedback.'}
                {currentRole === 'panchayat_admin' && 'Extreme weather early warning sirens, convective rainfall flash-flood alerts, and emergency CAP broadcast.'}
                {currentRole === 'ml_scientist' && 'U-Net vs ConvLSTM vs DeepSD benchmarks, ground AWS validation, SHAP feature importance, and continuous feedback training.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-slate-800/70 text-slate-300 text-xs font-medium border border-slate-700">
              AI-powered crop & weather intelligence
            </div>
          </div>
        </div>

        {/* Dynamic Views Based on Persona */}

        {/* 1. Farmer View */}
        {currentRole === 'farmer' && (
          <div className="space-y-6">
            <PanchayatWeatherCard
              panchayat={selectedPanchayat}
              block={currentBlock}
              onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
              onPlayAudioAdvisory={() => {}}
              isPlayingAudio={false}
            />

            <AgroAdvisoryPanel
              panchayat={selectedPanchayat}
              language={language}
              onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
              onOpenFeedbackModal={() => setIsFeedbackOpen(true)}
            />

            <DownscalingMap
              currentBlock={currentBlock}
              selectedPanchayat={selectedPanchayat}
              onSelectPanchayat={(p) => setSelectedPanchayatId(p.id)}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer}
              comparisonMode={comparisonMode}
              setComparisonMode={setComparisonMode}
            />
          </div>
        )}

        {/* 2. Agri-Extension Officer View */}
        {currentRole === 'extension_officer' && (
          <div className="space-y-6">
            <DownscalingMap
              currentBlock={currentBlock}
              selectedPanchayat={selectedPanchayat}
              onSelectPanchayat={(p) => setSelectedPanchayatId(p.id)}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer}
              comparisonMode={comparisonMode}
              setComparisonMode={setComparisonMode}
            />

            <AgroAdvisoryPanel
              panchayat={selectedPanchayat}
              language={language}
              onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
              onOpenFeedbackModal={() => setIsFeedbackOpen(true)}
            />

            <PanchayatWeatherCard
              panchayat={selectedPanchayat}
              block={currentBlock}
              onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
              onPlayAudioAdvisory={() => {}}
              isPlayingAudio={false}
            />

            <MultiSourcePipeline />
          </div>
        )}

        {/* 3. Panchayat Admin & Disaster Management View */}
        {currentRole === 'panchayat_admin' && (
          <div className="space-y-6">
            <DisasterAlertCenter
              currentBlock={currentBlock}
              selectedPanchayat={selectedPanchayat}
            />

            <DownscalingMap
              currentBlock={currentBlock}
              selectedPanchayat={selectedPanchayat}
              onSelectPanchayat={(p) => setSelectedPanchayatId(p.id)}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer}
              comparisonMode={comparisonMode}
              setComparisonMode={setComparisonMode}
            />

            <PanchayatWeatherCard
              panchayat={selectedPanchayat}
              block={currentBlock}
              onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
              onPlayAudioAdvisory={() => {}}
              isPlayingAudio={false}
            />
          </div>
        )}

        {/* 4. ML / AI Scientist Workbench */}
        {currentRole === 'ml_scientist' && (
          <div className="space-y-6">
            <MLWorkbench />

            <MultiSourcePipeline />

            <DownscalingMap
              currentBlock={currentBlock}
              selectedPanchayat={selectedPanchayat}
              onSelectPanchayat={(p) => setSelectedPanchayatId(p.id)}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer}
              comparisonMode={comparisonMode}
              setComparisonMode={setComparisonMode}
            />
          </div>
        )}

      </main>

      {/* Interactive Modals */}
      <LiveSimulatorSandbox
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        currentBlock={currentBlock}
      />

      <HumanFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        panchayat={selectedPanchayat}
      />

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        panchayat={selectedPanchayat}
        language={language}
      />

      <ReferenceDocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 py-6 text-xs text-slate-500 max-w-7xl mx-auto px-4 w-full flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left text-slate-400">
          AI weather downscaling and agri-risk intelligence platform
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400">
          <button onClick={() => setIsDocsOpen(true)} className="hover:text-emerald-400 transition-colors">
            Research Citations
          </button>
          <span className="text-slate-600">•</span>
          <button onClick={() => setIsSimulatorOpen(true)} className="hover:text-sky-400 transition-colors">
            AI Ingestion Sandbox
          </button>
        </div>
      </footer>

    </div>
  );
}

export default App;
