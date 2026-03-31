import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component Imports
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ScoreCard from '../components/Dashboard/ScoreCard';
import DomainRow from '../components/Dashboard/DomainRow';
import FeatureItem from '../components/Upload/FeatureItem';

// Icon Imports
import { 
  Upload, Briefcase, GraduationCap, Code2, 
  Zap, Sparkles, Binary, Target, Construction, BookOpen, 
  AlignLeft, Award, Loader2, ClipboardList, Shield, Globe, CheckCircle2, FileText 
} from 'lucide-react';

const UploadResume = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [domainScores, setDomainScores] = useState(null);
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [atsScore, setAtsScore] = useState(0);
  const [jdMatch, setJdMatch] = useState(0);
  const [filename, setFilename] = useState("");
  const [status, setStatus] = useState('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (analysis) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [analysis]);

  const truncate = (text, limit = 150) => text ? (text.length > limit ? text.substring(0, limit) + "..." : text) : "";

  const uploadFile = async () => {
    if (!file || !jobDescription.trim()) return;
    setStatus('uploading');
    setUploadProgress(10);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription); 

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${apiUrl}/upload/`, formData, {
        onUploadProgress: (e) => setUploadProgress(Math.round((e.loaded * 100) / e.total))
      });
      
      setAnalysis(response.data.analysis);
      setDomainScores(response.data.domain_scores);
      setGapAnalysis(response.data.gap_analysis);
      setAtsScore(response.data.ats_score || 0);
      setJdMatch(response.data.jd_match || 0);
      setFilename(response.data.filename);
      setStatus('success');
    } catch (err) {
      console.error("Analysis Failed:", err);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setFile(null);
    setJobDescription("");
    setAnalysis(null);
    setStatus('idle');
    setCurrentPage('home');
  };

  // --- COMPREHENSIVE LEGAL PAGES ---
  const LegalLayout = ({ title, children }) => (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar onReset={resetForm} isDashboard={false} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow max-w-4xl mx-auto py-20 px-8 w-full">
        <div className="mb-12 border-b border-slate-100 pb-8">
            <h1 className="text-5xl font-black tracking-tighter mb-4 text-slate-900">{title}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Effective Date: March 2026</p>
        </div>
        <div className="space-y-10 text-slate-600 leading-relaxed text-lg">
            {children}
        </div>
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );

  if (currentPage === 'privacy') return (
    <LegalLayout title="Privacy Policy">
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-3">1. Data Minimization & Sovereignty</h2>
        <p>ResumeIntelligence operates on a "Zero-Persistence" model. We do not store original PDF files. Once the neural engine extracts the necessary features, the raw file is purged from volatile memory.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-3">2. Processing Infrastructure</h2>
        <p>Your data is processed using AES-256 encryption in transit. Our neural matching algorithms run in isolated environments to ensure that no third-party data leakage occurs during the parsing phase.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-3">3. User Rights</h2>
        <p>As we do not maintain a permanent database of resumes, your right to erasure is executed automatically at the end of each session. We do not sell or monetize candidate data.</p>
      </section>
    </LegalLayout>
  );

  if (currentPage === 'terms') return (
    <LegalLayout title="Terms of Service">
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
        <p>By accessing ResumeIntelligence, you agree to be bound by these high-fidelity processing standards. This tool is designed for professional resume analysis and job description calibration.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-3">2. Neural Accuracy Disclaimer</h2>
        <p>Matching scores and gap analyses are generated via probabilistic neural models. While highly accurate, these results should serve as a diagnostic guide and not as the sole criterion for hiring or career decisions.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-3">3. Intellectual Property</h2>
        <p>The proprietary neural parsing logic and UI architecture are the sole property of ResumeIntelligence AI. Users may export analysis results for personal or internal recruitment use only.</p>
      </section>
    </LegalLayout>
  );

  // --- MAIN APP RENDER ---
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      <Navbar onReset={resetForm} isDashboard={!!analysis} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex-grow">
        {!analysis ? (
          <>
            <header className="relative pt-16 pb-20 px-6 overflow-hidden text-center">
              <div className="max-w-4xl mx-auto relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
                  <Sparkles size={14} className="text-blue-600" />
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-widest text-nowrap">Neural Engine v2.0 Live</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-8">
                  Hire smarter with <br />
                  <span className="text-blue-600">Resume Intelligence.</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
                  The industry standard for high-fidelity resume parsing. Map candidate DNA to job descriptions with AI precision.
                </p>
              </div>
            </header>

            <section id="upload-section" className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 pb-32">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-10">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3"><AlignLeft size={14} /> 1. Target Job Description</label>
                    <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste Job Description..." className="w-full h-40 p-5 bg-slate-50 border border-slate-200 rounded-3xl text-sm outline-none resize-none focus:ring-4 focus:ring-blue-50 transition-all"/>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3"><Upload size={14} /> 2. Upload Resume</label>
                    <label className={`group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-3xl cursor-pointer transition-all ${file ? 'border-blue-400 bg-blue-50/30' : 'border-slate-200 hover:border-blue-300'}`}>
                      <div className="flex flex-col items-center">
                        <div className={`p-3 rounded-xl mb-3 ${file ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}><FileText size={24} /></div>
                        <p className="text-sm font-bold text-slate-700">{file ? file.name : "Choose PDF File"}</p>
                      </div>
                      <input type="file" className="hidden" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                  </div>
                  <button onClick={uploadFile} disabled={!file || !jobDescription.trim() || status === 'uploading'} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl flex justify-center items-center gap-3 transition-all disabled:opacity-40">
                    {status === 'uploading' ? <Loader2 className="animate-spin" /> : <Zap size={20} fill="currentColor" />}
                    Generate Match Report
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 pt-4">
                 <FeatureItem icon={<Shield size={24} />} title="Bank-Grade Security" desc="Data is encrypted and purged post-analysis." />
                 <FeatureItem icon={<Globe size={24} />} title="Global Support" desc="Handles international resume formats seamlessly." />
                 <FeatureItem icon={<CheckCircle2 size={24} />} title="ATS Compatible" desc="Structured output for modern recruitment stacks." />
              </div>
            </section>
          </>
        ) : (
          <main className="max-w-7xl mx-auto w-full p-8 lg:p-12 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScoreCard label="ATS Compatibility" score={atsScore} total="/100" icon={<Award size={14}/>} />
              <ScoreCard label="JD Synergy Match" score={jdMatch} total="%" subtext={`Target: ${gapAnalysis?.best_role}`} icon={<Target size={14}/>} isProgress />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-12">
                <Section icon={<Target size={20}/>} title="Market Domain Fit">
                  <div className="grid gap-4 max-h-[460px] overflow-y-auto pr-4 custom-scrollbar">
                    {domainScores && Object.entries(domainScores).map(([role, score], i) => (
                      <DomainRow key={i} role={role} score={score} isBest={role === gapAnalysis?.best_role} />
                    ))}
                  </div>
                </Section>

                <Section icon={<Construction size={20}/>} title="Skill Gap Analysis">
                  <div className="space-y-8">
                    <div className="flex flex-wrap gap-2">
                      {gapAnalysis?.missing_skills.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 uppercase">{skill}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(gapAnalysis?.recommendations || {}).map(([skill, course], i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-black text-blue-600 uppercase mb-2">Course for {skill}</p>
                          <p className="text-sm font-bold text-slate-800 line-clamp-1">{course}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Section>

                <Section icon={<Briefcase size={20}/>} title="Experience Records">
                  <div className="space-y-4">
                    {analysis.experience.map((exp, i) => (
                      <div key={i} className="group relative pl-6 pb-2 border-l-2 border-slate-100 hover:border-blue-500">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-200 group-hover:border-blue-500" />
                        <p className="text-slate-600 text-sm font-medium pt-0.5 leading-relaxed">{truncate(exp, 200)}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>

              {/* Sidebar: Integrated Education & Skills */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full -mr-24 -mt-24 blur-[80px]" />
                  <div className="relative text-nowrap">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-3xl mb-8 uppercase tracking-tighter shadow-lg shadow-blue-600/20">{filename?.charAt(0)}</div>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.3em] mb-2">Neural Profile</p>
                    <h4 className="font-bold text-2xl mb-10 leading-tight truncate">{filename}</h4>
                    <div className="space-y-6 pt-8 border-t border-white/10">
                        <div className="flex justify-between items-center"><span className="text-slate-400 text-xs font-bold uppercase">Skills</span><span className="font-black text-3xl tracking-tighter">{analysis.skills.length}</span></div>
                        <div className="flex justify-between items-center"><span className="text-slate-400 text-xs font-bold uppercase">Entries</span><span className="font-black text-3xl tracking-tighter">{analysis.experience.length}</span></div>
                    </div>
                  </div>
                </div>

                {/* Academic Profile Section */}
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                  <h3 className="text-[11px] font-black text-slate-400 mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
                    <GraduationCap size={16} className="text-blue-500" /> Academic Profile
                  </h3>
                  <div className="space-y-4">
                    {analysis.education.map((edu, i) => (
                      <div key={i} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-start gap-3">
                        <Binary size={14} className="text-slate-400 mt-1 shrink-0" />
                        <span className="text-xs font-bold text-slate-700 leading-snug">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack Section */}
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                  <h3 className="text-[11px] font-black text-slate-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
                    <Code2 size={16} className="text-blue-500" /> Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-black rounded-xl border border-slate-100 uppercase tracking-wide hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                    <h3 className="text-[11px] font-black text-slate-400 mb-6 flex items-center gap-2 uppercase tracking-[0.2em]"><ClipboardList size={16} className="text-blue-500" /> Reference JD</h3>
                    <div className="bg-slate-50 p-5 rounded-3xl text-[11px] font-medium text-slate-500 italic leading-relaxed border border-slate-100 line-clamp-[6]">"{jobDescription}"</div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

const Section = ({ icon, title, children }) => (
  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-12 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4 mb-10">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">{icon}</div>
      <h3 className="text-2xl font-black tracking-tight text-slate-800">{title}</h3>
    </div>
    {children}
  </div>
);

export default UploadResume;