import React, { useState } from 'react';
import { PanchayatData, AgroAdvisory, Language } from '../types';
import { 
  Sprout, 
  Droplet, 
  SprayCan, 
  Bug, 
  Clock, 
  Volume2, 
  VolumeX, 
  AlertCircle, 
  CheckCircle2, 
  Share2, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';

interface AgroAdvisoryPanelProps {
  panchayat: PanchayatData;
  language: Language;
  onOpenWhatsAppModal: () => void;
  onOpenFeedbackModal: () => void;
}

export const AgroAdvisoryPanel: React.FC<AgroAdvisoryPanelProps> = ({
  panchayat,
  language,
  onOpenWhatsAppModal,
  onOpenFeedbackModal,
}) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);

  // Filter advisories based on selected crop and category
  const filteredAdvisories = panchayat.advisories.filter((adv) => {
    const matchCrop = selectedCrop === 'all' || adv.crop === selectedCrop;
    const matchCategory = selectedCategory === 'all' || adv.category === selectedCategory;
    return matchCrop && matchCategory;
  });

  // Multilingual Speech Synthesis for Farmers
  const handlePlayVoice = (textToRead: string) => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      // Set language code based on selected language
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'mr') utterance.lang = 'mr-IN';
      else if (language === 'pa') utterance.lang = 'pa-IN';
      else if (language === 'te') utterance.lang = 'te-IN';
      else utterance.lang = 'en-IN';

      utterance.rate = audioSpeed;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  const getFullAdvisorySpeechText = () => {
    const pName = language === 'hi' ? panchayat.hindiName : panchayat.name;
    const weatherSummary = language === 'hi'
      ? `${pName} में आज का तापमान ${panchayat.weather.temp} डिग्री सेल्सियस और वर्षा ${panchayat.weather.rainfall} मिलीमीटर अनुमानित है।`
      : `Weather advisory for ${pName}. Today's downscaled temperature is ${panchayat.weather.temp} degrees Celsius with ${panchayat.weather.rainfall} millimeters of localized rainfall.`;
    
    const adviceSummaries = panchayat.advisories.map((a) => 
      language === 'hi' ? `${a.crop}: ${a.titleHi}. ${a.descriptionHi}` : `${a.crop}: ${a.title}. ${a.description}`
    ).join('. ');

    return `${weatherSummary} ${adviceSummaries}`;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-5">
      
      {/* Top Banner: Advisory Title & Audio Broadcast Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <span>Localized Agro-Meteorological Advisory</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                  Crop & Growth-Stage Specific
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Generated from AI Downscaled Microclimate for {panchayat.name}
              </p>
            </div>
          </div>
        </div>

        {/* Multilingual Voice Broadcast & WhatsApp Actions */}
        <div className="flex items-center gap-2">
          
          {/* Audio TTS Button */}
          <button
            onClick={() => handlePlayVoice(getFullAdvisorySpeechText())}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
              isPlayingAudio
                ? 'bg-red-950 text-red-300 border-red-700/80 animate-pulse'
                : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border-emerald-700/60'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span>Stop Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>🔊 {language === 'hi' ? 'सलाह सुनें (Audio)' : 'Listen Voice Advisory'}</span>
              </>
            )}
          </button>

          {/* WhatsApp Share Simulation */}
          <button
            onClick={onOpenWhatsAppModal}
            className="px-3 py-2 rounded-xl bg-green-950 hover:bg-green-900 text-green-300 border border-green-700/60 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Share2 className="w-4 h-4 text-green-400" />
            <span className="hidden sm:inline">WhatsApp Dispatch</span>
          </button>

          {/* Human Feedback Loop Trigger */}
          <button
            onClick={onOpenFeedbackModal}
            className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Agro-Scientist Human-in-the-Loop Review"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Expert Review</span>
          </button>

        </div>
      </div>

      {/* Filter Tabs (Crop & Category) */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Crop Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-400" /> Crop:
          </span>
          {['all', 'Paddy (Rice)', 'Vegetables / Tomato', 'Sugarcane', 'Mustard'].map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                selectedCrop === crop
                  ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {crop === 'all' ? '🌾 All Crops' : crop}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-semibold mr-1">Category:</span>
          {[
            { id: 'all', label: 'All Operations' },
            { id: 'irrigation', label: '💧 Irrigation' },
            { id: 'spraying', label: '🚜 Spraying' },
            { id: 'disease', label: '🦠 Disease Alert' },
            { id: 'harvest', label: '🌾 Harvest/Sowing' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white border-sky-500 font-bold shadow'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advisory Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAdvisories.map((advisory) => {
          const isHighPriority = advisory.priority === 'high';
          const titleText = language === 'hi' ? advisory.titleHi : advisory.title;
          const descText = language === 'hi' ? advisory.descriptionHi : advisory.description;

          return (
            <div
              key={advisory.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 ${
                isHighPriority
                  ? 'bg-gradient-to-b from-amber-950/20 to-slate-950 border-amber-600/50 shadow-lg shadow-amber-900/10'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Card Top Category & Priority Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-200">
                      {advisory.crop}
                    </span>
                    <span className="text-[10px] text-slate-500">•</span>
                    <span className="text-[10px] text-slate-400 font-medium truncate">
                      {advisory.stage}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    isHighPriority
                      ? 'bg-amber-950 text-amber-300 border border-amber-700'
                      : advisory.priority === 'medium'
                      ? 'bg-sky-950 text-sky-300 border border-sky-700'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {advisory.category}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-slate-100 leading-snug mb-2">
                  {titleText}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {descText}
                </p>
              </div>

              {/* Bottom Impact & Action Window */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-400" /> Action Window:
                  </span>
                  <span className="font-semibold text-slate-200">
                    {advisory.actionableWindow}
                  </span>
                </div>

                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-[10px] text-emerald-300 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Economic Value:</strong> {advisory.impactReason}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
