import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle2, MessageSquare, AlertCircle, Phone } from 'lucide-react';
import { submitContact } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await submitContact(formData);
      if (response.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(response.message || 'Submission failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please ensure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-900/20">
      {/* Background glowing shape */}
      <div className="absolute left-1/4 bottom-10 w-96 h-96 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

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
            Contact <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-400 mt-4 max-w-md mx-auto">
            Have a question or want to work together? Drop a message below and I will get back to you shortly.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-2xl font-bold text-white font-sans">Get in touch</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              I am open to discussions regarding full stack projects, freelance opportunities, open source collaborations, or job openings. Feel free to reach out!
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-2xl glass-panel bg-slate-900/10">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/15">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email Me</p>
                  <a href="mailto:shubhamverma0299@gmail.com" className="text-sm font-semibold text-slate-200 hover:text-indigo-400 transition-colors">
                    shubhamverma0299@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl glass-panel bg-slate-900/10">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/15">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-slate-200">From Patna, Bihar</p>
                  <p className="text-xs text-slate-400">Based in Jaipur, Rajasthan</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl glass-panel bg-slate-900/10">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/15">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Call / WhatsApp</p>
                  <a href="tel:+919263164858" className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors">
                    +91 9263164858
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl glass-panel bg-slate-900/10">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/15">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Availability</p>
                  <p className="text-sm font-semibold text-purple-400">Open for Work & Internships</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl glass-panel p-8 relative overflow-hidden bg-slate-900/35">
              
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4" />
                    <h4 className="text-xl font-bold text-white font-sans">Message Sent!</h4>
                    <p className="text-sm text-slate-400 mt-2 max-w-sm">
                      Thank you for contacting me. I have received your message and will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-6 px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="johndoe@example.com"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Collaboration"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
                      />
                    </div>

                    {error && (
                      <div className="flex items-center space-x-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 rounded-xl">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50 hover:shadow-indigo-500/35 transition-all text-sm"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
