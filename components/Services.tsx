import React from 'react';
import { SiteContent, Service } from '../types';
import { HardDrive, ShieldAlert, GraduationCap, ChevronRight } from 'lucide-react';

interface ServicesProps {
  content: SiteContent['services'];
}

const getIcon = (id: string) => {
  switch (id) {
    case 'forensics': return <HardDrive className="h-10 w-10" />;
    case 'cybersec': return <ShieldAlert className="h-10 w-10" />;
    case 'training': return <GraduationCap className="h-10 w-10" />;
    default: return <HardDrive className="h-10 w-10" />;
  }
};

const Services: React.FC<ServicesProps> = ({ content }) => {
  return (
    <section id="services" className="py-24 bg-darkblue-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{content.heading}</h2>
          <div className="h-1 w-24 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {content.items.map((service: Service) => (
            <div key={service.id} className="bg-slate-850 border border-darkblue-700 p-8 rounded-sm hover:border-primary-600/50 transition-all duration-300 group">
              <div className="mb-6 text-primary-600 group-hover:text-primary-500 transition-colors">
                {getIcon(service.id)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 mb-8 min-h-[48px]">{service.description}</p>

              {service.points.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-darkblue-700">
                  {service.points.map((point, idx) => (
                    <div key={idx}>
                      <h5 className="text-sm font-bold text-slate-200 uppercase tracking-wide mb-1">{point.title}</h5>
                      <p className="text-sm text-slate-500">{point.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {service.points.length === 0 && (
                 <div className="pt-6 border-t border-darkblue-700">
                   <p className="text-sm font-mono text-primary-600/70">
                     // Curriculum under active development by field experts.
                   </p>
                 </div>
              )}

              <div className="mt-8 flex justify-end">
                 <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-500 flex items-center text-sm font-bold uppercase tracking-wider">
                   Learn More <ChevronRight className="h-4 w-4 ml-1" />
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
