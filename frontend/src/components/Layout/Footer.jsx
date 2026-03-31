import { Zap } from 'lucide-react';

const Footer = ({ setCurrentPage }) => (
  <footer className="bg-white border-t border-slate-100 pt-8 pb-6">
    <div className="max-w-7xl mx-auto px-8">
      {/* Top Row: Brand on Left, Legal on Right */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        
        {/* Brand Side */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-slate-900 p-1 rounded-lg text-white">
              <Zap size={14} fill="currentColor" />
            </div>
            <span className="text-xs font-black tracking-tight text-slate-900 uppercase">ResumeIntelligence</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-400 font-bold uppercase tracking-wider max-w-[300px]">
            Advancing recruitment through high-fidelity neural 
            parsing and probabilistic matching engines.
          </p>
        </div>

        {/* Legal Links (Stacked Vertically) */}
        <div className="flex flex-col md:items-end gap-2">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-1">Legal Infrastructure</span>
          <button 
            onClick={() => { setCurrentPage('terms'); window.scrollTo(0,0); }} 
            className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
          >
            Terms of Service
          </button>
          <button 
            onClick={() => { setCurrentPage('privacy'); window.scrollTo(0,0); }} 
            className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Status */}
      <div className="pt-6 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">
          © 2026 ResumeIntelligence AI. All Rights Reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">System Status: Operational</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;