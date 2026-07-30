import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Layout, Server, Database, Wrench, HeartHandshake } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <Terminal className="w-6 h-6 text-indigo-400" />,
    skills: ['Python', 'JavaScript', 'C', 'C++']
  },
  {
    title: 'Frontend Development',
    icon: <Layout className="w-6 h-6 text-cyan-400" />,
    skills: ['HTML5', 'CSS3', 'React.js', 'Tailwind CSS']
  },
  {
    title: 'Backend Development',
    icon: <Server className="w-6 h-6 text-purple-400" />,
    skills: ['Node.js', 'Express.js']
  },
  {
    title: 'Databases',
    icon: <Database className="w-6 h-6 text-emerald-400" />,
    skills: ['MongoDB', 'MySQL']
  },
  {
    title: 'Tools & Platforms',
    icon: <Wrench className="w-6 h-6 text-orange-400" />,
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Netlify', 'Render', 'MongoDB Atlas']
  },
  {
    title: 'Soft Skills',
    icon: <HeartHandshake className="w-6 h-6 text-pink-400" />,
    skills: [
      'Problem Solving & Logical Thinking',
      'Teamwork & Collaboration',
      'Communication Skills',
      'Quick Learner',
      'Adaptability',
      'Time Management',
      'Self-Motivated'
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Light glow accents */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-96 h-96 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
          >
            My <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-sans">Skills</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl glass-panel relative group overflow-hidden"
            >
              {/* Animated hover gradient border overlay */}
              <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex items-center space-x-4 mb-6 relative z-10">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white font-sans">{category.title}</h3>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-slate-900/60 dark:bg-slate-950/60 text-slate-300 dark:text-slate-300 border border-slate-800/80 hover:border-indigo-500/40 hover:text-white hover:bg-slate-900 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
