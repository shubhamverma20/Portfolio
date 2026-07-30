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
    </div>
  );
}

export default App;
