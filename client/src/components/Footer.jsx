import React from 'react';
import { Mail, ShieldAlert } from 'lucide-react';

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

const LinkedinIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Footer = ({ onOpenAdmin }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Brand/Info */}
        <div className="text-center md:text-left">
          <p className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-sans">
            Shubham Kumar
          </p>
          <p className="text-xs text-slate-450 mt-1">B.Tech CSE Student & Full Stack Developer</p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/shubhamverma20"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-panel hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            aria-label="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/shubham-kumar-a52737302"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-panel hover:bg-white/10 text-slate-400 hover:text-indigo-400 transition-all"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/ShubhamVer29572"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-panel hover:bg-white/10 text-slate-400 hover:text-sky-400 transition-all"
            aria-label="Twitter"
          >
            <TwitterIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:shubhamverma0299@gmail.com"
            className="p-2.5 rounded-full glass-panel hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-all"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright & Lock */}
        <div className="text-center md:text-right flex flex-col md:items-end gap-1">
          <p className="text-xs text-slate-500">
            &copy; 2026 Shubham Kumar. All rights reserved.
          </p>
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center space-x-1 text-[10px] text-slate-650 hover:text-emerald-500 transition-colors"
            title="Admin Login"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
