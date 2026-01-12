import React from 'react';
import { SiteContent } from '../types';
import { Shield } from 'lucide-react';

interface FooterProps {
  content: SiteContent['footer'];
  logoUrl?: string;
}

const Footer: React.FC<FooterProps> = ({ content, logoUrl }) => {
  return (
    <footer className="bg-darkblue-950 border-t border-darkblue-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-4 opacity-50 grayscale hover:grayscale-0 transition-all">
          {logoUrl ? (
            <img src={logoUrl} alt="ISAFE Logo" className="h-8 w-auto" />
          ) : (
            <Shield className="h-8 w-8 text-primary-600" />
          )}
          <span className="text-xl font-bold tracking-wider text-white">ISAFE</span>
        </div>

        <p className="text-primary-500/80 font-medium uppercase tracking-widest text-sm mb-8 text-center">
          {content.tagline}
        </p>

        <div className="h-px w-20 bg-darkblue-700 mb-8"></div>

        <p className="text-slate-600 text-sm text-center">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
