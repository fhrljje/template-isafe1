import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { Language, SiteContent } from '../types';

interface NavbarProps {
  content: SiteContent['nav'];
  language: Language;
  setLanguage: (lang: Language) => void;
  logoUrl?: string;
}

const Navbar: React.FC<NavbarProps> = ({ content, language, setLanguage, logoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: content.home },
    { id: 'about', label: content.about },
    { id: 'services', label: content.services },
    { id: 'why-us', label: content.whyUs },
    { id: 'contact', label: content.contact },
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-darkblue-900/95 backdrop-blur-md border-darkblue-700 py-3' : 'bg-transparent border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo Area */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('home')}>
            {logoUrl ? (
              <img src={logoUrl} alt="ISAFE Logo" className="h-10 w-auto" />
            ) : (
              <Shield className="h-8 w-8 text-primary-600" />
            )}
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white">ISAFE</span>
              <span className="text-[0.6rem] uppercase tracking-widest text-primary-500 font-mono hidden sm:block">Evidence Lab</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm uppercase tracking-wide font-medium text-slate-300 hover:text-primary-500 transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="flex items-center ml-4 border-l border-darkblue-600 pl-4 space-x-2">
              <button
                onClick={() => setLanguage('ID')}
                className={`text-xs font-bold px-2 py-1 rounded ${language === 'ID' ? 'bg-primary-600/20 text-primary-500' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage('EN')}
                className={`text-xs font-bold px-2 py-1 rounded ${language === 'EN' ? 'bg-primary-600/20 text-primary-500' : 'text-slate-500 hover:text-slate-300'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => scrollTo('contact')}
              className="bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold uppercase tracking-wider py-2 px-5 rounded-sm transition-all"
            >
              {content.cta}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <div className="mr-4 flex space-x-1">
              <button onClick={() => setLanguage('ID')} className={`text-xs font-bold ${language === 'ID' ? 'text-primary-500' : 'text-slate-500'}`}>ID</button>
              <span className="text-slate-600">/</span>
              <button onClick={() => setLanguage('EN')} className={`text-xs font-bold ${language === 'EN' ? 'text-primary-500' : 'text-slate-500'}`}>EN</button>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-darkblue-900 border-b border-darkblue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-slate-300 hover:text-primary-500 hover:bg-darkblue-800 rounded-md"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
