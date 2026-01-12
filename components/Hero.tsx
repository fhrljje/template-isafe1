import React from 'react';
import { SiteContent } from '../types';
import { ChevronRight, ShieldCheck, Binary } from 'lucide-react';
import HeroCarousel, { CarouselSlide } from './HeroCarousel';

interface HeroProps {
  content: SiteContent['hero'];
  intro: string;
  carouselSlides?: CarouselSlide[];
}

const Hero: React.FC<HeroProps> = ({ content, intro, carouselSlides = [] }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Carousel Background */}
      <HeroCarousel slides={carouselSlides} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        <div className="inline-flex items-center space-x-2 bg-darkblue-900/50 border border-darkblue-700 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
          </span>
          <span className="text-xs font-mono text-primary-500 tracking-wide uppercase">System Operational</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl drop-shadow-lg">
          <span className="block mb-2">{content.headline.split('&')[0]} &</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-darkblue-600">
             {content.headline.split('&')[1] || "Cyber Security"}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-300 font-light leading-relaxed drop-shadow">
          {content.subheadline}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
             onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
             className="group relative flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold uppercase tracking-wider rounded-sm transition-all shadow-[0_0_20px_rgba(219,2,18,0.3)] hover:shadow-[0_0_30px_rgba(219,2,18,0.5)]"
          >
            {content.cta}
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
             onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
             className="flex items-center justify-center px-8 py-3 bg-darkblue-800/50 border border-darkblue-600 hover:border-primary-500/50 text-slate-300 hover:text-primary-400 font-medium rounded-sm transition-all backdrop-blur-sm"
          >
            Explore Services
          </button>
        </div>

        <div className="mt-20 max-w-3xl border-l-2 border-primary-600/30 pl-6 text-left bg-darkblue-900/30 py-4 pr-4 rounded-r backdrop-blur-sm">
          <p className="text-slate-300 font-mono text-sm leading-relaxed">
            <span className="text-primary-500 mr-2">{'>'}</span>
            {intro}
          </p>
        </div>
      </div>

      {/* Decorative Icons */}
      <Binary className="absolute left-10 top-40 text-darkblue-700 h-24 w-24 opacity-30 z-10" />
      <ShieldCheck className="absolute right-10 bottom-40 text-darkblue-700 h-32 w-32 opacity-30 z-10" />

    </section>
  );
};

export default Hero;
