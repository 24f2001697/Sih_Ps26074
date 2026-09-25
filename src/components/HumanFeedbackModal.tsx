import React, { useState } from 'react';
import { PanchayatData } from '../types';
import { 
  CheckCircle2, 
  X, 
  Sparkles, 
  UserCheck, 
  Send, 
  Star, 
  Database,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

interface HumanFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  panchayat: PanchayatData;
}

export const HumanFeedbackModal: React.FC<HumanFeedbackModalProps> = ({
  isOpen,
  onClose,
  panchayat,
}) => {
  if (!isOpen) return null;

  const [actualRainfallGauge, setActualRainfallGauge] = useState<string>('');
  const [advisoryRating, setAdvisoryRating] = useState<number>(5);
  const [expertRemarks, setExpertRemarks] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl flex flex-col gap-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Human-in-the-Loop Expert Validation
              </h3>
              <p className="text-xs text-slate-400">
                Agro-Extension / KVK Scientist Review for {panchayat.name}
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

        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3 animate-bounce" />
            <h4 className="text-base font-bold text-slate-100">Feedback Ingested Successfully!</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Observation added to active replay buffer for continuous model backpropagation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Predicted vs Ground Truth Input */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">AI Downscaled Rainfall</span>
                <span className="text-base font-black text-emerald-400">
                  {panchayat.weather.rainfall} mm
                </span>
              </div>

              <div className="w-40">
                <label className="text-[10px] text-slate-300 font-semibold block mb-1">
                  Ground Gauge AWS (mm):
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 19.2"
                  value={actualRainfallGauge}
                  onChange={(e) => setActualRainfallGauge(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>
            </div>

            {/* Quality Rating */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Advisory Relevance & Practicality Rating:
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setAdvisoryRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= advisoryRating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-slate-400 ml-2 font-medium">({advisoryRating} / 5 Stars)</span>
              </div>
            </div>

            {/* Field Notes */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Agronomist Field Notes / Remarks:
              </label>
              <textarea
                rows={3}
                placeholder="e.g., Canal valley humidity caused slight localized fog at 05:00 AM; recommended shifting spray window by 1 hour."
                value={expertRemarks}
                onChange={(e) => setExpertRemarks(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Field Calibration</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
