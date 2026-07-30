import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Mail, Briefcase, LogOut, Loader2, ArrowLeft } from 'lucide-react';
import { fetchProjects, deleteProject, fetchContacts } from '../services/api';
import ProjectManageModal from '../components/ProjectManageModal';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const loadProjects = async () => {
    try {
      setProjectsLoading(true);
      const data = await fetchProjects();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setProjectsLoading(false);
    }
  };

  const loadContacts = async () => {
    try {
      setContactsLoading(true);
      const data = await fetchContacts();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      setContactsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
    loadContacts();
  }, []);

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        loadProjects();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setIsManageModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedProject(null);
    setIsManageModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-slate-800 gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-sans">
              Admin Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">Manage project listings and check incoming communications</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onLogout}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 transition-all text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
              activeTab === 'projects'
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-md'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage Projects</span>
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
              activeTab === 'contacts'
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-md'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Messages ({contacts.length})</span>
          </button>
        </div>

        {/* Projects Management Content */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white font-sans">Projects Database</h2>
              <button
                onClick={handleAddClick}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm shadow-md hover:shadow-indigo-500/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {projectsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 glass-panel rounded-2xl">
                <p className="text-slate-400">No projects found. Seed or click Add Project.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="rounded-2xl glass-panel overflow-hidden relative group border border-slate-800 bg-slate-900/30">
                    <div className="h-40 overflow-hidden relative bg-slate-950">
                      <img 
                        src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400'} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-2 truncate font-sans">{project.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-xs bg-slate-900 px-2 py-0.5 rounded text-slate-300 border border-slate-800">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs text-slate-500">+{project.technologies.length - 3} more</span>
                        )}
                      </div>

                      <div className="flex space-x-3 pt-3 border-t border-slate-800/60">
                        <button
                          onClick={() => handleEditClick(project)}
                          className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold border border-indigo-500/20 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contacts Viewing Content */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white font-sans">Contact Submissions</h2>

            {contactsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-16 glass-panel rounded-2xl">
                <p className="text-slate-400">No contact messages received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact._id} className="p-6 rounded-2xl glass-panel relative group border border-slate-800/80 bg-slate-900/20 hover:bg-slate-900/30 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-850 pb-3 mb-4 gap-2">
                      <div>
                        <h4 className="font-bold text-white text-base">{contact.name}</h4>
                        <p className="text-xs text-indigo-400">{contact.email}</p>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {new Date(contact.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-200">
                        Subject: <span className="font-medium text-slate-350">{contact.subject}</span>
                      </p>
                      <p className="text-sm text-slate-400 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-850">
                        {contact.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Project Creation/Edit Modal */}
      <ProjectManageModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        project={selectedProject}
        onSaveSuccess={loadProjects}
      />
    </div>
  );
};

export default AdminDashboard;
