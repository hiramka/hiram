import React from 'react';
import { Mail, Phone, MessageSquare, Linkedin, Github, Instagram } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { MagneticButton } from './MagneticButton';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenContactModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContactModal }) => {
  const serviceTags = [
    'Full Stack Engineering',
    'API Architecture',
    'M-Pesa Integrations',
    'DevRel / Mentoring',
    'Consultancy',
  ];

  return (
    <section id="contact" className="py-24 border-t border-[#1e2e4a] text-center">
      <ScrollReveal>
        {/* Service Category Tags (Matching Screenshot 4) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {serviceTags.map((tag, idx) => (
            <span
              key={idx}
              className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#121a2d] text-slate-300 border border-[#223252] shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </ScrollReveal>

      {/* Giant Editorial Headline (Matching Screenshot 4) */}
      <ScrollReveal delay={100}>
        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display text-white leading-tight tracking-tight flex items-center justify-center flex-wrap gap-x-3">
            <span>Let's build something</span>
            <span className="inline-flex items-center gap-2">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-[#2563eb] inline-block fill-current transform -rotate-12" viewBox="0 0 24 24">
                <path d="M3 3l7 18 3-7 7-3L3 3z" />
              </svg>
              <span className="font-serif italic bg-gradient-to-r from-[#ff9980] via-[#ff77aa] to-[#77bbff] bg-clip-text text-transparent">
                thoughtful
              </span>
            </span>
            <span>together.</span>
          </h2>
        </div>
      </ScrollReveal>

      {/* Action Buttons Group (Matching Screenshot 4) */}
      <ScrollReveal delay={200}>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          {/* Multi-action Pill Bar */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#121a2d] border border-[#223252] shadow-2xl">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${PORTFOLIO_DATA.personal.whatsappNumber}?text=${encodeURIComponent(PORTFOLIO_DATA.personal.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition-transform hover:scale-105"
            >
              <MessageSquare size={16} /> W.app
            </a>

            {/* Call */}
            <a
              href="tel:+254715641618"
              className="px-5 py-2.5 rounded-full text-slate-300 font-bold text-xs flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone size={16} /> Call
            </a>

            {/* Email */}
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="px-5 py-2.5 rounded-full bg-slate-200 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-white transition-transform hover:scale-105"
            >
              <Mail size={16} /> Email
            </a>
          </div>

          {/* Let's Talk Primary Button */}
          <MagneticButton
            onClick={onOpenContactModal}
            className="px-7 py-3.5 rounded-full bg-white text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 hover:bg-gray-100"
          >
            <Mail size={16} /> LET'S TALK
          </MagneticButton>
        </div>
      </ScrollReveal>

      {/* Social Links Footer Bar (Matching Screenshot 4) */}
      <ScrollReveal delay={300}>
        <div className="space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            ALSO FIND ME ON
          </div>

          <div className="flex items-center justify-center gap-4">
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#121a2d] border border-[#223252] text-slate-400 hover:text-blue-400 hover:border-blue-500 transition-all cursor-pointer shadow-md"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#121a2d] border border-[#223252] text-slate-400 hover:text-white hover:border-slate-400 transition-all cursor-pointer shadow-md"
              title="GitHub"
            >
              <Github size={18} />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#121a2d] border border-[#223252] text-slate-400 hover:text-pink-400 hover:border-pink-500 transition-all cursor-pointer shadow-md"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
