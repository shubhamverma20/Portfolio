import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';

const titles = [
  "B.Tech Computer Science Engineering",
  "Full Stack MERN Developer",
  "Software Engineering Student",
  "Creative Problem Solver"
];

const Hero = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const activeTitle = titles[currentTitleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedText(activeTitle.slice(0, displayedText.length + 1));
        setTypingSpeed(100);

        if (displayedText === activeTitle) {
          // Pause before deleting
          setIsDeleting(true);
          setTypingSpeed(2000);
        }
      } else {
        setDisplayedText(activeTitle.slice(0, displayedText.length - 1));
        setTypingSpeed(55);

        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Glowing Shapes */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7 text-center md:text-left space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel text-sm text-indigo-400 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>Welcome to my Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-sans">
              Shubham Kumar
            </span>
          </h1>

          {/* Typing Effect Container */}
          <div className="h-8 sm:h-10 text-lg sm:text-xl md:text-2xl font-semibold text-slate-400 dark:text-slate-300">
            <span className="border-r-2 border-indigo-500 pr-1 animate-pulse">
              {displayedText}
            </span>
          </div>

          <p className="text-slate-400 dark:text-slate-400 text-base sm:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
            Passionate Full Stack Developer skilled in building responsive and scalable web applications using modern web technologies. I enjoy solving real-world problems through clean, efficient, and user-friendly solutions.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-lg shadow-indigo-500/20 hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <span>View Projects</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold glass-panel hover:bg-white/10 text-slate-300 hover:text-white transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Me</span>
            </motion.a>

            <motion.a
              href="/Shubham_Kumar_Tech_Resume.pdf"
              download="Shubham_Kumar_Tech_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-300 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Hero Graphic / Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 50 }}
          className="md:col-span-5 flex justify-center"
        >
          <div className="relative group">
            {/* Glowing borders */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-30 blur group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
            
            {/* Main Picture Frame */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden glass-panel p-3 bg-slate-900/50 backdrop-blur-xl">
              <div className="w-full h-full rounded-2xl overflow-hidden relative bg-slate-950 flex items-center justify-center">
                <img 
                  src="/profile.jpg" 
                  alt="Shubham Kumar" 
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                />
                
                {/* Floating overlay chip */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel py-2.5 px-4 rounded-xl text-center">
                  <p className="text-sm font-semibold text-white font-sans">Shubham Kumar</p>
                  <p className="text-xs text-cyan-400">B.Tech CSE Student</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
