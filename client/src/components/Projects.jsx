import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Loader2 } from 'lucide-react';
import { fetchProjects } from '../services/api';

const GithubIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (err) {
        setError('Failed to fetch projects. Please ensure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans"
          >
            My <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-400 mt-4 max-w-md mx-auto">
            A curated showcase of applications I have built, fetched dynamically from MongoDB.
          </p>
        </div>

        {/* Loader, Error, or Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-slate-400 text-sm">Fetching projects database...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 glass-panel rounded-2xl max-w-md mx-auto border border-red-500/20">
            <p className="text-red-400 font-semibold mb-2">Notice</p>
            <p className="text-xs text-slate-400 leading-relaxed px-4">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl max-w-md mx-auto">
            <p className="text-slate-400 text-sm">No projects stored in database yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="rounded-2xl glass-panel overflow-hidden border border-slate-800/80 bg-slate-900/30 flex flex-col h-full group"
              >
                {/* Project Image Frame */}
                <div className="h-48 relative overflow-hidden bg-slate-950/80">
                  <img 
                    src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600'} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 group-hover:brightness-100 transition-all duration-750"
                  />
                  <div className="absolute top-3 right-3 py-1 px-2 text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-slate-950/80 border border-slate-800 rounded-md backdrop-blur-md">
                    Dynamic DB
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-tight font-sans">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-[11px] font-semibold bg-slate-950/40 text-slate-350 px-2.5 py-1 rounded-md border border-slate-850"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions Links buttons */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-slate-800/50">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center space-x-2 py-2 px-3 rounded-xl border border-slate-700/60 hover:border-slate-400 bg-slate-900/20 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveDemo ? (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold shadow-md hover:shadow-indigo-500/25 hover:brightness-105 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <span className="flex-1 text-center py-2 text-xs font-medium text-slate-500 italic">
                        Console / Python App
                      </span>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
