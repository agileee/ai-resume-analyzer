import React from 'react';

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex gap-5 p-8 rounded-[2rem] border border-slate-100 bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group">
    <div className="p-4 bg-slate-50 rounded-2xl h-fit text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold mb-1 text-slate-900">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default FeatureItem;