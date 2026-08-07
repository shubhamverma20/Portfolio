import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, GraduationCap, Flame } from 'lucide-react';

const stats = [
  {
    icon: <GraduationCap className="w-6 h-6 text-indigo-400" />,
    title: 'Education',
    value: 'B.Tech CSE',
    desc: 'Focus on Web Tech & Algorithms'
  },
  {
    icon: <Code2 className="w-6 h-6 text-cyan-400" />,
    title: 'Projects',
    value: '5+ Completed',
    desc: 'MERN Stack & Python Apps'
  },
  {
    icon: <User className="w-6 h-6 text-purple-400" />,
    title: 'Role',
    value: 'MERN Developer',
    desc: 'Full-Stack Developer'
  },
  {
    icon: <Flame className="w-6 h-6 text-emerald-400" />,
    title: 'Passion',
    value: 'Problem Solving',
    desc: 'Clean Code & UI Design'
  }
];

const About = () => {
  return (
    <section id="about" className="relative py-24 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
          >
            About <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-sans">Me</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-2xl font-bold text-white font-sans">
              Who is Shubham Kumar?
            </h3>

            <p className="text-slate-400 dark:text-slate-400 leading-relaxed text-lg">
              I am a dedicated **Bachelor of Technology (B.Tech) Computer Science Engineering** student, deeply passionate about software development and web technologies. My core expertise lies in the MERN Stack (MongoDB, Express.js, React.js, Node.js), but I am also highly comfortable with Python and classical languages like C and C++.
            </p>

            <p className="text-slate-400 dark:text-slate-400 leading-relaxed">
              I enjoy translating complex problems into elegant, responsive, and scalable web solutions. As a CSE student, I focus heavily on underlying logic, structured design systems, and writing reusable components. I am continuously learning and adapting to stay at the cutting edge of full stack engineering.
            </p>

            <div className="p-4 rounded-2xl glass-panel border-l-4 border-indigo-500 bg-slate-900/40">
              <p className="text-sm italic text-slate-300">
                "The best way to predict the future is to create it. I strive to build applications that deliver rich user experiences and solve real-world problems."
              </p>
            </div>
          </motion.div>

          {/* Stats Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.title}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl glass-panel relative group"
              >
                {/* Floating highlight glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.title}</p>
                    <h4 className="text-xl font-bold text-white mt-0.5">{stat.value}</h4>
                  </div>
                </div>
                <p className="text-sm text-slate-400 dark:text-slate-400 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
