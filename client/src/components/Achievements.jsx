import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Zap, Server, GitBranch, Target } from 'lucide-react';

const achievements = [
  {
    title: 'Cisco Virtual Internship - Python',
    description: 'Successfully completed the Cisco Networking Academy Partner: PCAP - Programming Essentials in Python program, covering OOPs, coding logic, and file handling. (Aug 2024)',
    icon: <Award className="w-6 h-6 text-yellow-400" />
  },
  {
    title: 'Cisco Virtual Internship - Cybersecurity',
    description: 'Gained credentials in network threat analysis, encryption models, vulnerability patching, and cybersecurity fundamentals via Cisco Academy. (Dec 2023)',
    icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />
  },
  {
    title: 'Full Stack MERN Developer',
    description: 'Expertise in developing highly scalable and dynamic web applications using React.js, Node.js, Express.js, and MongoDB.',
    icon: <Zap className="w-6 h-6 text-indigo-400" />
  },
  {
    title: 'Responsive Web Development',
    description: 'Deep understanding of liquid grids, media queries, mobile-first design, and frameworks like Tailwind CSS & Bootstrap.',
    icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />
  },
  {
    title: 'REST API Development',
    description: 'Skilled in designing RESTful architectural patterns, configuring Express routing, request controllers, and error handlers.',
    icon: <Server className="w-6 h-6 text-purple-400" />
  },
  {
    title: 'Database Management',
    description: 'Proficiency in schema design, model creation, relationships, and queries using Mongoose for MongoDB and SQL for MySQL.',
    icon: <Award className="w-6 h-6 text-emerald-400" />
  },
  {
    title: 'Git & GitHub Version Control',
    description: 'Experienced in collaborative repositories, commit workflows, branching, merge conflict resolution, and open source commits.',
    icon: <GitBranch className="w-6 h-6 text-orange-400" />
  },
  {
    title: 'Basic Problem Solving',
    description: 'Analytical mindset focusing on algorithm optimization, logic structures, data structures, and dry-running code.',
    icon: <Target className="w-6 h-6 text-pink-400" />
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 relative bg-slate-900/10">
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
            My <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Achievements</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl glass-panel relative group"
            >
              {/* Highlight background light */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white font-sans group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
