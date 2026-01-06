import React from 'react';
import { SiteContent } from '../types';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

interface ContactProps {
  content: SiteContent['contact'];
}

const Contact: React.FC<ContactProps> = ({ content }) => {
  return (
    <section id="contact" className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Abstract Map Background Hint */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.5" className="text-cyan-900" />
             <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-900" />
          </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">{content.heading}</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-cyan-500 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Office</h4>
                  <p className="text-slate-400 whitespace-pre-line">{content.address}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-cyan-500 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{content.emailLabel}</h4>
                  <p className="text-slate-400">info@isafe-lab.id</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-cyan-500 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{content.phoneLabel}</h4>
                  <p className="text-slate-400">+62 21 555-0199</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-slate-900/80 border border-slate-700 rounded-sm">
              <p className="text-sm font-mono text-cyan-400">
                <span className="animate-pulse">●</span> SECURE CHANNEL ENCRYPTED
              </p>
              <p className="text-slate-500 text-xs mt-2">
                All communications through this form are protected by end-to-end TLS encryption standards.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-slate-900 p-8 rounded-sm border-t-4 border-cyan-600 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{content.form.name}</label>
                <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{content.form.institution}</label>
                <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Corp / Agency" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{content.form.email}</label>
                <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="john@company.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{content.form.service}</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none">
                   <option value="">-- Select --</option>
                   <option value="forensics">Digital Forensics</option>
                   <option value="security">Cyber Security</option>
                   <option value="training">Training</option>
                   <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{content.form.message}</label>
                <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="..."></textarea>
              </div>

              <button type="submit" className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 uppercase tracking-wider transition-all">
                {content.form.submit} <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;