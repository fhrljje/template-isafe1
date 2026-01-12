import React, { useState } from 'react';
import { SiteContent } from '../types';
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactProps {
  content: SiteContent['contact'];
}

const Contact: React.FC<ContactProps> = ({ content }) => {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', institution: '', email: '', service: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-darkblue-900 relative overflow-hidden">
      {/* Abstract Map Background Hint */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.5" className="text-primary-900" />
             <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900" />
          </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Info Side */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">{content.heading}</h2>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Office</h4>
                  <p className="text-slate-400 whitespace-pre-line">{content.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary-600 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{content.emailLabel}</h4>
                  <p className="text-slate-400">info@isafe-lab.id</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary-600 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{content.phoneLabel}</h4>
                  <p className="text-slate-400">+62 21 555-0199</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-darkblue-800/80 border border-darkblue-700 rounded-sm">
              <p className="text-sm font-mono text-primary-500">
                <span className="animate-pulse">●</span> SECURE CHANNEL ENCRYPTED
              </p>
              <p className="text-slate-500 text-xs mt-2">
                All communications through this form are protected by end-to-end TLS encryption standards.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-slate-850 p-8 rounded-sm border-t-4 border-primary-600 shadow-2xl">
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-900/50 border border-green-600 rounded flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-300">Message sent successfully!</span>
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-600 rounded flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-300">Failed to send message. Please try again.</span>
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{content.form.name}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-darkblue-900 border border-darkblue-700 rounded px-4 py-3 text-white focus:outline-none focus:border-primary-600 transition-colors" placeholder="John Doe" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{content.form.institution}</label>
                <input type="text" name="institution" value={formData.institution} onChange={handleChange} className="w-full bg-darkblue-900 border border-darkblue-700 rounded px-4 py-3 text-white focus:outline-none focus:border-primary-600 transition-colors" placeholder="Corp / Agency" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{content.form.email}</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-darkblue-900 border border-darkblue-700 rounded px-4 py-3 text-white focus:outline-none focus:border-primary-600 transition-colors" placeholder="john@company.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{content.form.service}</label>
                <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-darkblue-900 border border-darkblue-700 rounded px-4 py-3 text-white focus:outline-none focus:border-primary-600 transition-colors appearance-none">
                   <option value="">-- Select --</option>
                   <option value="forensics">Digital Forensics</option>
                   <option value="security">Cyber Security</option>
                   <option value="training">Training</option>
                   <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{content.form.message}</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full bg-darkblue-900 border border-darkblue-700 rounded px-4 py-3 text-white focus:outline-none focus:border-primary-600 transition-colors" placeholder="..."></textarea>
              </div>

              <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {status === 'loading' ? 'Sending...' : content.form.submit} <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
