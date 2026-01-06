import React from 'react';
import { SiteContent } from '../types';
import { Shield } from 'lucide-react';

interface FooterProps {
  content: SiteContent['footer'];
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="bg-navy-950 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-4 opacity-50 grayscale hover:grayscale-0 transition-all">
          <Shield className="h-8 w-8 text-cyan-500" />
          <span className="text-xl font-bold tracking-wider text-white">ISAFE</span>
        </div>
        
        <p className="text-cyan-500/80 font-medium uppercase tracking-widest text-sm mb-8 text-center">
          {content.tagline}
        </p>

        <div className="h-px w-20 bg-slate-800 mb-8"></div>

        <p className="text-slate-600 text-sm text-center">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;