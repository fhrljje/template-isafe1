import React from 'react';
import { SiteContent } from '../types';
import { ChevronRight, ShieldCheck, Binary } from 'lucide-react';

interface HeroProps {
  content: SiteContent['hero'];
  intro: string;
}

const Hero: React.FC<HeroProps> = ({ content, intro }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-navy-950">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-navy-950 to-transparent z-10"></div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center space-x-2 bg-slate-900/50 border border-slate-700 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-mono text-cyan-400 tracking-wide uppercase">System Operational</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl">
          <span className="block mb-2">{content.headline.split('&')[0]} &</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
             {content.headline.split('&')[1] || "Cyber Security"}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-400 font-light leading-relaxed">
          {content.subheadline}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
             onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
             className="group relative flex items-center justify-center px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-wider rounded-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          >
            {content.cta}
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
             onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
             className="flex items-center justify-center px-8 py-3 bg-transparent border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 font-medium rounded-sm transition-all"
          >
            Explore Services
          </button>
        </div>

        <div className="mt-20 max-w-3xl border-l-2 border-cyan-500/30 pl-6 text-left">
          <p className="text-slate-400 font-mono text-sm leading-relaxed">
            <span className="text-cyan-500 mr-2">{'>'}</span>
            {intro}
          </p>
        </div>
      </div>
      
      {/* Decorative Icons */}
      <Binary className="absolute left-10 top-40 text-slate-800 h-24 w-24 opacity-20" />
      <ShieldCheck className="absolute right-10 bottom-40 text-slate-800 h-32 w-32 opacity-20" />

    </section>
  );
};

export default Hero;