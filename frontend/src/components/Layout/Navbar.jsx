import { Zap } from 'lucide-react';

const Navbar = ({ onReset, isDashboard, currentPage, setCurrentPage }) => {
  const handleGetStarted = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-5 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onReset}>
        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
          <Zap size={20} fill="currentColor" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">ResumeIntelligence</span>
      </div>
      
      {currentPage === 'home' && !isDashboard && (
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <span>Neural Engine v2.0</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span>Precision Analytics</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span>Enterprise Grade</span>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button 
          onClick={handleGetStarted}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          {isDashboard ? 'New Analysis' : 'Get Started'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;