import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminModal from './components/AdminModal';
import AdminDashboard from './pages/AdminDashboard';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Highly optimized cursor tracking values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for tracking delay
  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Glow tracker has a slightly heavier mass for a trailing parallax effect
  const glowConfig = { damping: 45, stiffness: 120, mass: 1.5 };
  const glowXSpring = useSpring(cursorX, glowConfig);
  const glowYSpring = useSpring(cursorY, glowConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // Check if already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  // Update theme class on body
  useEffect(() => {
    const bodyClass = document.body.classList;
    if (darkMode) {
      bodyClass.remove('light');
    } else {
      bodyClass.add('light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminDashboardOpen(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAdminAuthenticated(false);
    setIsAdminDashboardOpen(false);
  };

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminModalOpen(true);
    }
  };

  return (
    <div className={`min-h-screen text-slate-200 bg-slate-950 dark:text-slate-200 dark:bg-slate-950 ${darkMode ? '' : 'light text-slate-850 bg-slate-50'}`}>
      
      {/* Navbar always visible, controls Admin overlays */}
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        onOpenAdmin={handleOpenAdmin} 
      />

      <AnimatePresence mode="wait">
        {isAdminAuthenticated && isAdminDashboardOpen ? (
          <motion.div
            key="admin-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AdminDashboard onLogout={handleAdminLogout} />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio-site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Education />
              <Achievements />
              <Contact />
            </main>
            
            <Footer onOpenAdmin={handleOpenAdmin} />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Authorization Login Overlay */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <AdminModal 
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            onLoginSuccess={handleAdminLoginSuccess}
          />
        )}
      </AnimatePresence>

      {/* Interactive Cursor Follower Reticle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-500/30 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Trailing ambient background glow blob (Dynamic interactive backdrop) */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/[0.04] to-cyan-500/[0.04] blur-[100px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{
          x: glowXSpring,
          y: glowYSpring,
        }}
      />
    </div>
  );
}

export default App;
