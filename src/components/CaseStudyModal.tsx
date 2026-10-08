import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Server, Layers } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content p-6 sm:p-8 max-w-4xl relative overflow-y-auto max-h-[90vh]">
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors cursor-pointer rounded-full bg-[#0d1424] border border-[#1e2e4a]"
          title="Close Case Study"
        >
          <X size={20} />
        </button>

        {/* Category & Badge Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#1e2d4a] text-blue-400 border border-blue-500/30">
            {project.category}
          </span>
          <span className="text-xs font-mono text-slate-400">
            • Released {project.year}
          </span>
          {project.awardBadge && (
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {project.awardBadge}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-2">
          {project.title}
        </h2>
        <p className="text-sm font-mono text-blue-400 mb-6">
          {project.tagline}
        </p>

        {/* Large Cover Preview */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-[#0d1424] border border-[#1e2d4a] mb-8">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Case Study Details Grid */}
        <div className="space-y-8 text-slate-300 text-xs sm:text-sm">
          
          {/* Executive Overview */}
          <div className="p-5 rounded-2xl bg-[#0d1526] border border-[#1e2d4a] space-y-2">
            <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-blue-400 flex items-center gap-2">
              <Layers size={16} /> EXECUTIVE OVERVIEW
            </h3>
            <p className="leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key System Highlights */}
          <div className="space-y-3">
            <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> KEY SYSTEM HIGHLIGHTS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((h, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#0e1628] border border-slate-800 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span className="text-xs leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Architecture */}
          <div className="space-y-3">
            <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <Cpu size={16} /> TECHNOLOGY ARCHITECTURE
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-[#121b2d] text-slate-200 border border-[#203152]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#1e2e4a]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:bg-blue-500 transition-colors"
              >
                LIVE DEMO <ExternalLink size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#121a2d] border border-[#223252] text-slate-200 font-bold text-xs flex items-center gap-2 hover:bg-[#16223d] transition-colors"
              >
                GITHUB REPO <Github size={14} />
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
