import React, { useState } from 'react';
import { X, Send, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: 'Web Development',
    budget: '$1k — $5k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitted(true);
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-2 text-blue-400 font-mono text-xs font-bold uppercase">
          <Mail size={16} /> CONTACT & CONSULTING
        </div>

        <h2 className="text-3xl font-bold font-display text-white mb-2">
          Let's build something <span className="font-serif italic text-blue-400">thoughtful</span> together.
        </h2>
        <p className="text-sm text-slate-300 mb-6">
          Have a product to ship, a role to discuss, or an architecture question? Send a message below.
        </p>

        {/* Quick Contact Buttons (Requirement #17) */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <a
            href={`https://wa.me/${PORTFOLIO_DATA.personal.whatsappNumber}?text=${encodeURIComponent(PORTFOLIO_DATA.personal.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#121a2d] border border-[#223252] text-emerald-400 text-xs font-bold font-mono flex items-center justify-center gap-1.5 hover:border-emerald-500 transition-colors"
          >
            <MessageSquare size={16} /> WhatsApp
          </a>

          <a
            href="tel:+254715641618"
            className="p-3 rounded-xl bg-[#121a2d] border border-[#223252] text-blue-400 text-xs font-bold font-mono flex items-center justify-center gap-1.5 hover:border-blue-500 transition-colors"
          >
            <Phone size={16} /> Call
          </a>

          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="p-3 rounded-xl bg-[#121a2d] border border-[#223252] text-purple-400 text-xs font-bold font-mono flex items-center justify-center gap-1.5 hover:border-purple-500 transition-colors"
          >
            <Mail size={16} /> Email
          </a>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-3">
            <CheckCircle2 size={48} className="text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-white">Message Received!</h3>
            <p className="text-xs text-emerald-300">
              Thank you {form.name}! Hiram will respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#0d1424] text-white text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#0d1424] text-white text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Category
                </label>
                <select
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#0d1424] text-white text-sm outline-none focus:border-blue-500"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="API Architecture">API Architecture</option>
                  <option value="M-Pesa Integrations">M-Pesa / Fintech Integrations</option>
                  <option value="DevOps / Monitoring">DevOps / Monitoring</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Budget Estimate
                </label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#0d1424] text-white text-sm outline-none focus:border-blue-500"
                >
                  <option value="< $1k">&lt; $1,000</option>
                  <option value="$1k — $5k">$1,000 — $5,000</option>
                  <option value="$5k — $15k">$5,000 — $15,000</option>
                  <option value="> $15k">$15,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Details / Message *
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your goals, timelines, or questions..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#0d1424] text-white text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button type="submit" className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
                SEND MESSAGE <Send size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
