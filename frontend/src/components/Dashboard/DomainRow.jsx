import React from 'react';

const DomainRow = ({ role, score, isBest }) => (
  <div className={`p-6 rounded-2xl border transition-all duration-300 ${
    isBest ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200'
  }`}>
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <span className={`font-bold tracking-tight ${isBest ? 'text-blue-700' : 'text-slate-700'}`}>
          {role}
        </span>
        {isBest && (
          <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-black uppercase rounded-md tracking-tighter">
            Best Match
          </span>
        )}
      </div>
      <span className="text-sm font-black text-slate-900">{score}%</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-1000 ease-out ${
          isBest ? 'bg-blue-600' : 'bg-slate-400'
        }`} 
        style={{ width: `${score}%` }} 
      />
    </div>
  </div>
);

export default DomainRow;