import React, { useState } from 'react';
import { BlockData, PanchayatData } from '../types';
import { 
  AlertOctagon, 
  Flame, 
  CloudLightning, 
  Wind, 
  Waves, 
  Radio, 
  Bell, 
  Send, 
  CheckCircle2, 
  ShieldAlert,
  Megaphone
} from 'lucide-react';

interface DisasterAlertCenterProps {
  currentBlock: BlockData;
  selectedPanchayat: PanchayatData;
}

export const DisasterAlertCenter: React.FC<DisasterAlertCenterProps> = ({
  currentBlock,
  selectedPanchayat,
}) => {
  const [broadcastStatus, setBroadcastStatus] = useState<'idle' | 'broadcasting' | 'sent'>('idle');
  const [broadcastTarget, setBroadcastTarget] = useState<'all' | 'selected'>('all');

  const handleTriggerBroadcast = () => {
    setBroadcastStatus('broadcasting');
    setTimeout(() => {
      setBroadcastStatus('sent');
      setTimeout(() => setBroadcastStatus('idle'), 4000);
    }, 1500);
  };

  // Collect all active alerts across all panchayats in the current block
  const allAlerts = currentBlock.panchayats.flatMap(p => p.alerts);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <span>Panchayat Early Warning & Extreme Weather Defense</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-700/60">
                  Disaster Mitigation Portal
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Panchayat-scale convective storm, flash flood, and micro-frost alarms
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Alert Broadcast Button */}
        <button
          onClick={handleTriggerBroadcast}
          disabled={broadcastStatus !== 'idle'}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
            broadcastStatus === 'sent'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
              : broadcastStatus === 'broadcasting'
              ? 'bg-amber-950 text-amber-300 border border-amber-600 animate-pulse'
              : 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/30'
          }`}
        >
          {broadcastStatus === 'sent' ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Broadcast Sent to 1,420 Villagers & Mukhiyas!</span>
            </>
          ) : broadcastStatus === 'broadcasting' ? (
            <>
              <Radio className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Broadcasting CAP Siren & SMS...</span>
            </>
          ) : (
            <>
              <Megaphone className="w-4 h-4 text-white" />
              <span>Simulate Emergency Disaster Alert Broadcast</span>
            </>
          )}
        </button>
      </div>

      {/* Active Alerts List */}
      <div className="space-y-3">
        {allAlerts.length > 0 ? (
          allAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                alert.severity === 'critical'
                  ? 'bg-red-950/30 border-red-600/60 shadow-lg shadow-red-950/20'
                  : 'bg-amber-950/30 border-amber-600/60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg mt-0.5 ${
                  alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  <AlertOctagon className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-100">
                      {alert.headline}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-red-900 text-red-200 border border-red-700">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {alert.description}
                  </p>
                  <div className="text-[11px] text-slate-400 mt-2 flex flex-wrap items-center gap-2">
                    <span>Affected Panchayats: <strong className="text-slate-200">{alert.affectedPanchayats.join(', ')}</strong></span>
                    <span>•</span>
                    <span>Valid Until: <strong className="text-slate-200">{alert.validUntil}</strong></span>
                  </div>
                </div>
              </div>

              <div className="sm:shrink-0 flex sm:flex-col gap-2 justify-end">
                <button
                  onClick={handleTriggerBroadcast}
                  className="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700/60 text-xs font-bold"
                >
                  Trigger Siren SMS
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center flex flex-col items-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
            <h4 className="text-sm font-bold text-slate-200">No Extreme Disaster Alarms Active</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Current micro-climate parameters for {currentBlock.name} are within safe thresholds. Continuous monitoring is active.
            </p>
          </div>
        )}
      </div>

      {/* Panchayat Vulnerability Matrix Table */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
        <h4 className="text-xs font-bold text-slate-200 mb-3 flex items-center gap-2">
          <Waves className="w-4 h-4 text-sky-400" />
          Panchayat Hazard & Vulnerability Rating (Based on DEM Elevation & Soil Drainage)
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="pb-2">Gram Panchayat</th>
                <th className="pb-2">Elevation & Slope</th>
                <th className="pb-2">Soil Moisture</th>
                <th className="pb-2">Flash Flood Risk</th>
                <th className="pb-2">Micro-Heatwave Risk</th>
                <th className="pb-2">Disaster Readiness Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {currentBlock.panchayats.map((p) => {
                const floodRisk = p.weather.rainfall > 20 || p.elevation < 85 ? 'HIGH' : p.weather.rainfall > 10 ? 'MODERATE' : 'LOW';
                const heatRisk = p.weather.temp > 34 ? 'MODERATE' : 'LOW';

                return (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-2.5 font-bold text-slate-100">{p.name}</td>
                    <td className="py-2.5 text-slate-400">{p.elevation}m ({p.landUse})</td>
                    <td className="py-2.5 text-slate-300 font-mono">{p.weather.soilMoisture}%</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        floodRisk === 'HIGH' ? 'bg-red-950 text-red-300 border border-red-800' :
                        floodRisk === 'MODERATE' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}>
                        {floodRisk}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                        {heatRisk}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      {floodRisk === 'HIGH' ? 'Clear canal gates & low-lying bunds' : 'Standard field surveillance'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
