import React, { useState, useEffect } from 'react';
import { Language, SiteContent } from './types';
import { CONTENT } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CarouselSlide } from './components/HeroCarousel';

interface MediaData {
  logo?: {
    url: string;
    alt?: string;
  };
  carousel?: CarouselSlide[];
}

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ID');
  const [dynamicContent, setDynamicContent] = useState<Record<Language, SiteContent> | null>(null);
  const [media, setMedia] = useState<MediaData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load content from CMS API (proxied in dev, direct in prod)
        const contentResponse = await fetch('/api/content');
        if (contentResponse.ok) {
          const data = await contentResponse.json();
          setDynamicContent(data);
        }

        // Load media from CMS API
        const mediaResponse = await fetch('/api/media');
        if (mediaResponse.ok) {
          const mediaData = await mediaResponse.json();
          setMedia(mediaData);
        }
      } catch (error) {
        console.log('Using default content - CMS may not be running');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const content = dynamicContent ? dynamicContent[language] : CONTENT[language];

  if (loading) {
    return (
      <div className="min-h-screen bg-darkblue-900 flex items-center justify-center">
        <div className="text-primary-500 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkblue-900 text-slate-200 font-sans selection:bg-primary-600/30 selection:text-primary-100">
      <Navbar
        content={content.nav}
        language={language}
        setLanguage={setLanguage}
        logoUrl={media.logo?.url}
      />

      <main>
        <Hero
          content={content.hero}
          intro={content.intro}
          carouselSlides={media.carousel}
        />
        <About content={content.about} />
        <Services content={content.services} />
        <WhyUs content={content.whyUs} />
        <Contact content={content.contact} />
      </main>

      <Footer content={content.footer} logoUrl={media.logo?.url} />
    </div>
  );
};

export default App;
