import React, { useState } from 'react';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';
import { StickyStackCard } from './StickyStackCard';
import { CaseStudyModal } from './CaseStudyModal';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('0 → 1');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects = PORTFOLIO_DATA.projects;

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 border-t border-[#1e2e4a]">
      <ScrollReveal>
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            SELECTED WORK
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            What I've shipped
          </h2>
        </div>
      </ScrollReveal>

      {/* Category Filter Pills */}
      <ScrollReveal delay={100}>
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
          {['0 → 1', 'RESEARCH', 'GROWTH', 'ALL'].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <MagneticButton
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-bold ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-lg scale-105'
                    : 'bg-[#121a2d] text-slate-400 border border-[#223252] hover:text-white hover:border-blue-500'
                }`}
              >
                {filter}
              </MagneticButton>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Featured Projects List with Sticky-Stack Receding Scroll Cards */}
      <div className="relative space-y-4">
        {filteredProjects.map((project, idx) => (
          <StickyStackCard key={project.id} index={idx} totalCards={filteredProjects.length} topOffset={100}>
            <TiltCard maxTilt={3}>
              <div className="project-card-interactive rounded-3xl bg-[#141d33] border border-[#202f4d] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl backdrop-blur-xl">
                
                {/* Left Preview Banner */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#0d1424] border border-[#1e2d4a] min-h-[300px] flex items-center justify-center cursor-pointer group"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="image-zoom w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-mono font-bold bg-slate-950/80 text-white backdrop-blur-md border border-slate-700">
                    {project.year}
                  </span>
                  
                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-blue-600 text-white font-mono text-xs font-bold shadow-xl flex items-center gap-1.5">
                      <Layers size={14} /> VIEW CASE STUDY
                    </span>
                  </div>
                </div>

                {/* Right Details Column */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#1e2d4a] text-blue-400 border border-blue-500/30">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <MagneticButton
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[#0d1424] text-slate-300 hover:text-white border border-[#1e2d4a]"
                            title="GitHub Repository"
                          >
                            <Github size={16} />
                          </MagneticButton>
                        )}
                        {project.liveUrl && (
                          <MagneticButton
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-md"
                            title="Live Demo"
                          >
                            <ExternalLink size={16} />
                          </MagneticButton>
                        )}
                      </div>
                    </div>

                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-3xl font-bold font-display text-white hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      {project.tagline}
                    </p>

                    {/* Tech Chips Grid */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-[#0b1220] text-slate-300 border border-[#1e2d4a]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2 pt-2">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Case Study Trigger Button */}
                  <div className="pt-2 border-t border-[#1e2d4a]/60">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-5 py-2.5 rounded-full bg-[#121b2d] hover:bg-[#18243c] text-blue-400 border border-[#203152] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Layers size={14} /> EXPLORE CASE STUDY & ARCHITECTURE →
                    </button>
                  </div>
                </div>

              </div>
            </TiltCard>
          </StickyStackCard>
        ))}
      </div>

      {/* Case Study Deep Dive Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
