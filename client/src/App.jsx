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
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
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
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-500/35 pointer-events-none z-50 hidden lg:block"
        style={{
          transform: 'translate3d(calc(var(--mouse-x, -100px) - 50%), calc(var(--mouse-y, -100px) - 50%), 0)',
          transition: 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50 hidden lg:block"
        style={{
          transform: 'translate3d(calc(var(--mouse-x, -100px) - 50%), calc(var(--mouse-y, -100px) - 50%), 0)',
          transition: 'transform 0.01s linear',
        }}
      />

      {/* Trailing ambient background glow blob (Dynamic interactive backdrop) */}
      <div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/[0.03] to-cyan-500/[0.03] blur-[100px] pointer-events-none z-0 hidden lg:block"
        style={{
          transform: 'translate3d(calc(var(--mouse-x, -100px) - 50%), calc(var(--mouse-y, -100px) - 50%), 0)',
          transition: 'transform 0.2s cubic-bezier(0.1, 0.5, 0.3, 1)',
        }}
      />
    </div>
  );
}

export default App;
