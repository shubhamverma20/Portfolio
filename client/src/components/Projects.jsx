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

const FALLBACK_PROJECTS = [
  {
    _id: 'fallback_0',
    title: 'TaskSync - Full Stack Task Management Application',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    description: 'A modern Full Stack Task Management Application built with the MERN Stack.',
    github: 'https://github.com/shubhamverma20/Task-mangement-project',
    liveDemo: 'https://task-mangement-project.vercel.app',
    image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=600'
  },
  {
    _id: 'fallback_1',
    title: 'FreshCart',
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'Razorpay'],
    description: 'Responsive e-commerce grocery shopping website with clean UI, cart management, and online payment integration.',
    github: 'https://github.com/shubhamverma20/FreshCart',
    liveDemo: 'https://freshcart-grocery-delivery.vercel.app/',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600'
  },
  {
    _id: 'fallback_2',
    title: 'Amul Kool Website',
    technologies: ['Vanilla JS', 'Tailwind CSS', 'HTML5 Canvas', 'Node.js', 'Express.js'],
    description: 'Modern, highly dynamic splash landing page with interactive canvas animations and responsive design.',
    github: 'https://github.com/shubhamverma20/amul-kool-rose-website',
    liveDemo: 'https://amul-kool-rose-website-chi.vercel.app/',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=600'
  },
  {
    _id: 'fallback_3',
    title: 'Fake Headline Generator',
    technologies: ['Python', 'NLP', 'CLI'],
    description: 'Python application that generates random funny and engaging headlines for social media.',
    github: 'https://github.com/shubhamverma20/fake-headline-generator',
    liveDemo: '',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600'
  },
  {
    _id: 'fallback_4',
    title: 'Hotel Menu Project',
    technologies: ['Python', 'Data Structures'],
    description: 'Console-based Hotel Billing and Menu Management System with dynamic order calculations.',
    github: 'https://github.com/shubhamverma20/hotel-menu',
    liveDemo: '',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600'
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      } catch (err) {
        console.warn('Backend API connection unavailable, displaying client fallback projects.', err);
        setProjects(FALLBACK_PROJECTS);
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
            A curated showcase of applications I have built, fetched dynamically from PostgreSQL.
          </p>
        </div>

        {/* Loader or Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-slate-400 text-sm">Fetching projects...</p>
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
