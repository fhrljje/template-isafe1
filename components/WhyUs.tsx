import React from 'react';
import { SiteContent } from '../types';
import { CheckCircle2, Lock, Scale, Microscope } from 'lucide-react';

interface WhyUsProps {
  content: SiteContent['whyUs'];
}

const WhyUs: React.FC<WhyUsProps> = ({ content }) => {

  const icons = [
    <Microscope className="h-8 w-8" />,
    <Scale className="h-8 w-8" />,
    <Lock className="h-8 w-8" />,
    <CheckCircle2 className="h-8 w-8" />
  ];

  return (
    <section id="why-us" className="py-24 bg-darkblue-800 border-y border-darkblue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{content.heading}</h2>
          <p className="text-slate-400 max-w-2xl">
            We adhere to strict international protocols to ensure every byte of evidence stands up to scrutiny in a court of law.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((item, idx) => (
            <div key={idx} className="p-6 bg-darkblue-900/50 border border-darkblue-700 rounded hover:bg-darkblue-900 hover:border-primary-600/30 transition-colors group">
              <div className="mb-4 text-slate-600 group-hover:text-primary-600 transition-colors">
                {icons[idx] || icons[3]}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
