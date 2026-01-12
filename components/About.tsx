import React from 'react';
import { SiteContent } from '../types';
import { Target, Eye, Activity } from 'lucide-react';

interface AboutProps {
  content: SiteContent['about'];
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <section id="about" className="py-24 bg-darkblue-800 border-t border-darkblue-700 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Company Profile */}
        <div className="mb-20">
          <div className="flex items-center space-x-2 mb-6">
            <Activity className="h-5 w-5 text-primary-600" />
            <h2 className="text-primary-500 font-mono text-sm uppercase tracking-widest">Profile</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">{content.heading}</h3>
          <div className="grid md:grid-cols-2 gap-12 text-slate-300 leading-relaxed font-body">
            {content.body.map((paragraph, idx) => (
              <p key={idx} className="text-lg text-justify">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Vision */}
          <div className="bg-slate-850 p-8 rounded-sm border border-darkblue-700 hover:border-primary-600/30 transition-colors group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-darkblue-900 rounded border border-darkblue-700 group-hover:border-primary-600/50 transition-colors">
                <Eye className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-2xl font-bold text-white">{content.vision.title}</h4>
            </div>
            <p className="text-slate-400">
              {content.vision.text}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-slate-850 p-8 rounded-sm border border-darkblue-700 hover:border-primary-600/30 transition-colors group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-darkblue-900 rounded border border-darkblue-700 group-hover:border-primary-600/50 transition-colors">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-2xl font-bold text-white">{content.mission.title}</h4>
            </div>
            <ul className="space-y-4">
              {content.mission.items.map((item, idx) => (
                <li key={idx} className="flex items-start text-slate-400">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 bg-primary-600 rounded-full flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
