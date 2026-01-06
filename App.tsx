import React, { useState } from 'react';
import { Language } from './types';
import { CONTENT } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ID');
  const content = CONTENT[language];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar 
        content={content.nav} 
        language={language} 
        setLanguage={setLanguage} 
      />
      
      <main>
        <Hero content={content.hero} intro={content.intro} />
        <About content={content.about} />
        <Services content={content.services} />
        <WhyUs content={content.whyUs} />
        <Contact content={content.contact} />
      </main>

      <Footer content={content.footer} />
    </div>
  );
};

export default App;