import React, { useState } from 'react';
import { PanchayatData, Language } from '../types';
import { 
  X, 
  Send, 
  Share2, 
  CheckCheck, 
  Phone, 
  Video, 
  MoreVertical, 
  Mic, 
  Paperclip, 
  Smile,
  Copy,
  Check
} from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  panchayat: PanchayatData;
  language: Language;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  panchayat,
  language,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState<boolean>(false);

  const formattedWhatsAppText = `🌾 *डार्क व्योम (Dark Vyom) - अति-स्थानीय मौसम व कृषि सलाह*
📍 *ग्राम पंचायत:* ${panchayat.name} (${panchayat.hindiName})
📅 *दिनांक:* 25 सितम्बर 2026 | समय: 14:00 IST

🌡️ *अनुमानित तापमान:* ${panchayat.weather.temp}°C (न्यूनतम: ${panchayat.weather.tempMin}°, अधिकतम: ${panchayat.weather.tempMax}°)
🌧️ *स्थानीय वर्षा:* ${panchayat.weather.rainfall} मिमी (${panchayat.weather.rainfall > 10 ? 'भारी बारिश की संभावना' : 'हल्की फुल्की बूंदें'})
💧 *हवा में नमी:* ${panchayat.weather.humidity}% | हवा की गति: ${panchayat.weather.windSpeed} किमी/घंटा
🎯 *AI विश्वसनीयता स्कोर:* ${panchayat.weather.confidenceScore}%

🚨 *मुख्य कृषि परामर्श:*
${panchayat.advisories.map((a, i) => `${i + 1}. *${a.crop} (${a.category.toUpperCase()}):* ${a.titleHi || a.title}\n➡️ ${a.descriptionHi || a.description}\n⏱️ *कार्य समय:* ${a.actionableWindow}`).join('\n\n')}

📞 *किसान हेल्पलाइन / KVK सहायता:* 1800-180-1551
_स्मार्ट इंडिया हैकाथॉन 2026 - PS26074_`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedWhatsAppText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0b141a] border border-[#222e35] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* WhatsApp Mobile Header */}
        <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between text-white border-b border-[#222e35]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm shadow">
              DV
            </div>
            <div>
              <h4 className="text-sm font-semibold leading-tight flex items-center gap-1.5">
                <span>Dark Vyom Krishi Bot</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </h4>
              <p className="text-[11px] text-[#8696a0]">
                {panchayat.name} Official Broadcast
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#aebac1]">
            <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
            <Video className="w-4 h-4 cursor-pointer hover:text-white" />
            <button onClick={onClose} className="p-1 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="p-4 overflow-y-auto flex-1 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px] space-y-3">
          
          {/* Security Banner */}
          <div className="text-center">
            <span className="bg-[#182229] text-[#ffd279] text-[10px] px-3 py-1 rounded-lg shadow-sm border border-[#222e35]">
              🔒 AI Downscaling Model Output Verified by KVK Scientist
            </span>
          </div>

          {/* Incoming Message Bubble */}
          <div className="bg-[#005c4b] text-white p-3 rounded-lg rounded-tl-none max-w-[90%] shadow-md ml-0 mr-auto text-xs leading-relaxed space-y-2">
            
            <div className="border-b border-[#128c7e] pb-1 font-bold text-emerald-200 flex items-center justify-between">
              <span>🌾 Dark Vyom Krishi Advisory</span>
              <span className="text-[10px] text-emerald-300">1.0 km Grid</span>
            </div>

            <div>
              <p className="font-semibold text-slate-100">
                📍 {panchayat.hindiName || panchayat.name}
              </p>
              <p className="text-[11px] text-emerald-100 mt-0.5">
                🌧️ वर्षा: <strong className="text-white">{panchayat.weather.rainfall} मिमी</strong> | 🌡️ तापमान: <strong className="text-white">{panchayat.weather.temp}°C</strong>
              </p>
            </div>

            {panchayat.advisories.slice(0, 2).map((adv, idx) => (
              <div key={idx} className="bg-[#024a3c] p-2 rounded border border-[#0d6e5d] text-[11px]">
                <div className="font-bold text-amber-200">
                  {adv.crop}: {adv.titleHi || adv.title}
                </div>
                <p className="text-slate-200 text-[10px] mt-0.5">
                  {adv.descriptionHi || adv.description}
                </p>
              </div>
            ))}

            <div className="flex items-center justify-between text-[9px] text-[#8696a0] pt-1">
              <span>Confidence: {panchayat.weather.confidenceScore}%</span>
              <span className="flex items-center gap-1">
                14:02 IST <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
              </span>
            </div>
          </div>

          {/* Audio Note Simulator */}
          <div className="bg-[#005c4b] text-white p-2.5 rounded-lg rounded-tl-none max-w-[80%] shadow-md ml-0 mr-auto text-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="h-1.5 bg-[#128c7e] rounded-full w-full overflow-hidden">
                <div className="h-full bg-white w-2/3"></div>
              </div>
              <div className="flex justify-between text-[9px] text-emerald-200 mt-1">
                <span>0:24</span>
                <span>Voice Advisory (Hindi)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Actions Bar */}
        <div className="bg-[#202c33] p-3 border-t border-[#222e35] flex items-center justify-between gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2 px-3 rounded-xl bg-[#00a884] hover:bg-[#029070] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Advisory Text</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-[#2a3942] hover:bg-[#32444f] text-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
