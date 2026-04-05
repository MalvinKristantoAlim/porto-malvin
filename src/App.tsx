import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Instagram, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  Calculator, 
  Award, 
  User,
  ChevronRight,
  Zap,
  Globe,
  Layers,
  Home,
  Briefcase,
  Cpu,
  Phone,
  Activity,
  Code2,
  Sparkles,
  Binary
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'projects' | 'achievements' | 'skills' | 'contact'>('home');
  const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  // Update local time
  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Local Sourced Images
  const profileUrl = "/profile.jpeg";
  const projectUrl = "/anomanfoto.jpeg";
  const raiseUrl = "/raisenomani.jpeg";
  const certUrl = "/sertifraise.pdf";

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-silver-dark font-sans selection:bg-emerald/30 selection:text-white grid-bg">
      
      {/* Floating Navigation */}
      <nav className="nav-floating">
        <button onClick={() => setActiveTab('home')} className={`nav-item ${activeTab === 'home' ? 'nav-item-active' : ''}`}><Home size={20} /></button>
        <button onClick={() => setActiveTab('about')} className={`nav-item ${activeTab === 'about' ? 'nav-item-active' : ''}`}><User size={20} /></button>
        <button onClick={() => setActiveTab('projects')} className={`nav-item ${activeTab === 'projects' ? 'nav-item-active' : ''}`}><Briefcase size={20} /></button>
        <button onClick={() => setActiveTab('achievements')} className={`nav-item ${activeTab === 'achievements' ? 'nav-item-active' : ''}`}><Award size={20} /></button>
        <button onClick={() => setActiveTab('skills')} className={`nav-item ${activeTab === 'skills' ? 'nav-item-active' : ''}`}><Cpu size={20} /></button>
        <button onClick={() => setActiveTab('contact')} className={`nav-item ${activeTab === 'contact' ? 'nav-item-active' : ''}`}><Mail size={20} /></button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-40">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* Main Hero Card */}
              <motion.div variants={itemVariants} className="md:col-span-8 bento-card flex flex-col justify-between min-h-[400px]">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-emerald">
                    <div className="status-dot" /> SYSTEM STATUS: OPTIMIZED
                  </div>
                  <h1 className="text-6xl md:text-9xl font-display font-bold leading-[0.8] tracking-[-0.05em] text-white">
                    MALVIN <br /> KRISTANTO <br /> ALIM
                  </h1>
                  <p className="text-xl text-silver-dark font-medium max-w-2xl leading-relaxed">
                    System Architect & <span className="text-emerald">Mathematical Optimizer</span> specializing in <span className="text-white">high-performance digital infrastructures</span> and algorithmic precision.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-8">
                  <button onClick={() => setActiveTab('projects')} className="btn-primary">View Projects <ChevronRight size={18} /></button>
                  <button onClick={() => setActiveTab('contact')} className="btn-secondary">Contact Me</button>
                </div>
                <div className="absolute top-8 right-8 text-emerald/10">
                  <Cpu size={200} strokeWidth={1} />
                </div>
              </motion.div>

              {/* Profile Card */}
              <motion.div variants={itemVariants} className="md:col-span-4 bento-card p-0 overflow-hidden group">
                <img 
                  src={profileUrl} 
                  alt="Malvin" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/malvin_bento/800/1200';
                  }}
                />
                <div className="absolute bottom-8 left-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">BASED IN</div>
                  <div className="text-2xl font-display font-bold text-white">INDONESIA</div>
                </div>
              </motion.div>

              {/* Mathematical Precision Card */}
              <motion.div variants={itemVariants} className="md:col-span-5 bento-card space-y-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Activity className="text-emerald" size={24} />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">OPTIMIZATION ENGINE</div>
                  <h3 className="text-2xl font-display font-bold text-white uppercase">Mathematical Precision</h3>
                  <p className="text-sm text-silver-dark leading-relaxed">
                    Leveraging linear programming and algorithmic strategy to solve complex digital challenges.
                  </p>
                </div>
              </motion.div>

              {/* Core Stack Card */}
              <motion.div variants={itemVariants} className="md:col-span-4 bento-card space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Layers className="text-white" size={24} />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-white uppercase">Core Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind', 'Framer'].map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-white/50">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Socials & Time Card */}
              <motion.div variants={itemVariants} className="md:col-span-3 bento-card flex flex-col justify-between">
                <div className="flex gap-4">
                  <a href="https://github.com/MalvinKristantoAlim" target="_blank" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Github size={20} className="text-white" /></a>
                  <a href="mailto:malvinkristantoalim1@gmail.com" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Mail size={20} className="text-white" /></a>
                  <a href="https://wa.me/6288226664102" target="_blank" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Phone size={20} className="text-white" /></a>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">LOCAL TIME</div>
                  <div className="text-2xl font-mono font-medium text-white">{localTime} <span className="text-xs text-white/30">GMT+7</span></div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <motion.div variants={itemVariants} className="md:col-span-12 bento-card">
                <h2 className="text-6xl md:text-9xl font-display font-bold leading-[0.8] tracking-[-0.05em] mb-12">THE <br /> VISIONARY</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8 text-xl text-silver-dark font-medium leading-relaxed">
                    <p>
                      I am <span className="text-white">Malvin Kristanto Alim</span>, a 12th-grade visionary navigating the complex intersection of <span className="text-emerald">Mathematics</span> and <span className="text-emerald">Informatics</span>.
                    </p>
                    <p>
                      My approach is defined by mathematical rigor and digital creativity. From optimizing packaging efficiency in the <span className="text-white">Anomani Project</span> to competing as a national finalist in <span className="text-white">RAISE 2025</span>, I transform abstract logic into tangible impact.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bento-card bg-white/5 border-none">
                      <div className="text-4xl font-display font-bold text-emerald mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">12</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Current Grade</div>
                    </div>
                    <div className="bento-card bg-white/5 border-none">
                      <div className="text-4xl font-display font-bold text-white mb-2">2026</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Graduation</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <motion.div variants={itemVariants} className="md:col-span-12 bento-card p-0 overflow-hidden">
                <div className="aspect-video w-full overflow-hidden relative group">
                  <img 
                    src={projectUrl} 
                    alt="Anomani Project" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                    <div className="space-y-4">
                      <div className="px-4 py-1 rounded-full bg-emerald/20 border border-emerald/30 text-[10px] font-bold text-emerald inline-block">PROJECT 2025</div>
                      <h2 className="text-6xl md:text-9xl font-display font-bold leading-[0.8] tracking-[-0.05em] text-white">ANOMANI <br /> PROJECT</h2>
                    </div>
                    <div className="hidden md:block text-right max-w-md">
                      <p className="text-silver-dark font-medium leading-relaxed">
                        A deep mathematical exploration into packaging efficiency for NIKI ECHO beverages.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <motion.div variants={itemVariants} className="md:col-span-12 bento-card text-center space-y-12 py-24">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50">
                  <Award size={14} /> National Recognition
                </div>
                <h2 className="text-6xl md:text-9xl font-display font-bold leading-[0.8] tracking-[-0.05em] text-white uppercase">RAISE 2025 <br /> <span className="text-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]">FINALIST</span></h2>
                <p className="text-xl text-silver-dark font-medium max-w-3xl mx-auto leading-relaxed">
                  National Accounting Competition Finalist at Ciputra University. Recognized for analytical excellence and strategic problem solving.
                </p>
                <div className="flex justify-center pt-8">
                  <a 
                    href={certUrl} 
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    View Certificate <ExternalLink size={18} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {[
                { name: "React", percent: 95, icon: <Globe size={20} /> },
                { name: "TypeScript", percent: 90, icon: <Code2 size={20} /> },
                { name: "Tailwind CSS", percent: 98, icon: <Layers size={20} /> },
                { name: "Framer Motion", percent: 88, icon: <Sparkles size={20} /> },
                { name: "Mathematics", percent: 92, icon: <Calculator size={20} /> },
                { name: "Problem Solving", percent: 94, icon: <Zap size={20} /> },
                { name: "JavaScript", percent: 94, icon: <Binary size={20} /> },
                { name: "Git", percent: 92, icon: <Github size={20} /> }
              ].map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  variants={itemVariants}
                  className="md:col-span-3 bento-card space-y-8 group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-display font-bold text-white uppercase">{skill.name}</h3>
                    <span className="text-2xl font-display font-bold text-white/10 group-hover:text-emerald transition-colors">{skill.percent}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percent}%` }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className="h-full bg-emerald"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <motion.div variants={itemVariants} className="md:col-span-12 bento-card text-center py-32 space-y-12">
                <h2 className="text-7xl md:text-9xl font-display font-bold text-white leading-[0.8] tracking-[-0.05em]">
                  LET'S <br /> <span className="text-emerald drop-shadow-[0_0_20px_rgba(16,185,129,0.7)]">OPTIMIZE</span>
                </h2>
                <p className="text-2xl text-silver-dark font-medium max-w-2xl mx-auto leading-relaxed">
                  Ready to transform complex challenges into high-performance digital realities.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 pt-12">
                  <a href="mailto:malvinkristantoalim1@gmail.com" className="btn-primary">Send Email <Mail size={18} /></a>
                  <a href="https://wa.me/6288226664102" target="_blank" className="btn-secondary">Message WhatsApp</a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* System Version Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center opacity-30 text-[10px] font-bold uppercase tracking-widest">
        <div>SYSTEM VERSION: v4.0.26-STABLE</div>
        <div>© 2026 LOGIC ARCHITECT</div>
      </footer>
    </div>
  );
}
