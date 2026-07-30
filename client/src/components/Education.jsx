import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, Award } from 'lucide-react';

const courses = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Database Management Systems (DBMS)',
  'Web Development (MERN Stack)',
  'Computer Networks & Security',
  'Software Engineering Principles'
];

const Education = () => {
  return (
    <section id="education" className="py-24 relative bg-slate-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans"
          >
            My <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Education</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-12 max-w-2xl mx-auto"
        >
          {/* Timeline Dot */}
          <div className="absolute left-[-17px] top-1.5 p-1 bg-slate-950 border border-slate-800 rounded-full text-indigo-450 z-10">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
          </div>

          {/* Education Card */}
          <div className="p-6 rounded-2xl glass-panel relative group">
            {/* Glowing Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-white font-sans">Bachelor of Technology (B.Tech)</h3>
                <p className="text-indigo-400 text-sm font-semibold mt-0.5">Computer Science & Engineering</p>
              </div>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
                <Calendar className="w-3.5 h-3.5" />
                <span>2023 - 2027</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Currently pursuing a comprehensive Computer Science curriculum, combining theoretical foundations in algorithms and databases with hands-on practice in modern software design patterns and full-stack web architectures.
            </p>

            {/* Course Details Grid */}
            <div>
              <h4 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Core Academic Coursework</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {courses.map((course) => (
                  <div key={course} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mt-2" />
                    <span className="text-xs text-slate-300">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights bar */}
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center space-x-2 text-xs text-slate-400">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Maintaining a stellar GPA with a focus on project-driven software development.</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Education;
