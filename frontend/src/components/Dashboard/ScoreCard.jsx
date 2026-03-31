
import React from 'react';

const ScoreCard = ({ label, score, total, icon, isProgress, subtext }) => (
  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm flex flex-col justify-between min-h-[220px]">
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
        {icon} {label}
      </p>
      <div className="flex items-end gap-2">
        <h2 className="text-6xl font-black text-slate-900 leading-none">{score}</h2>
        <span className="text-2xl text-slate-300 font-medium pb-1">{total}</span>
      </div>
      {subtext && <p className="mt-4 text-sm font-bold text-emerald-600">{subtext}</p>}
    </div>
    {isProgress && (
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mt-8">
        <div 
          className="h-full bg-emerald-500 transition-all duration-1000 ease-out" 
          style={{ width: `${score}%` }} 
        />
      </div>
    )}
  </div>
);

export default ScoreCard;