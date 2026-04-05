import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
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
  Binary,
  Send,
  X,
  Bot
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'projects' | 'achievements' | 'skills' | 'contact'>('home');
  const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [typingText, setTypingText] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm Malvin's AI assistant. Ask me anything about his projects, skills, or background." }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const roles = ['System Architect', 'Mathematical Optimizer', 'Problem Solver', 'Algorithm Designer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing Effect Logic
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setTypingText(prev => prev + currentRole[charIndex]);
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypingText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex(prev => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = userInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setUserInput('');
    setIsTyping(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setChatMessages(prev => [...prev, { role: 'bot', text: "API Key missing. Please set GEMINI_API_KEY in your environment variables." }]);
        setIsTyping(false);
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are Malvin Kristanto Alim's AI assistant. 
        Malvin is a student at SMAK Frateran Surabaya, aiming for Universitas Surabaya (UBAYA) for Informatics.
        He is a "System Architect" and "Mathematical Optimizer".
        Key project: Anomani Project (logistics optimization using geometric algorithms and linear programming).
        Achievement: RAISE 2025 National Accounting Competition Finalist at Ciputra University.
        Skills: React, TypeScript, Tailwind CSS, Framer Motion, Mathematics, Problem Solving, JavaScript, Git.
        Location: Surabaya, Indonesia.
        Email: malvinkristantoalim1@gmail.com
        WhatsApp: +62 882-2666-4102
        Answer the following question about Malvin in a professional, concise, and helpful tone: ${userMsg}`,
      });

      setChatMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, { role: 'bot', text: "System error. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const mailtoLink = `mailto:malvinkristantoalim1@gmail.com?subject=Portfolio Inquiry from ${name}&body=From: ${name} (${email})%0D%0A%0D%0A${message}`;
    window.location.href = mailtoLink;
  };

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
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        staggerChildren: 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.02,
      y: -10,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-silver-dark font-sans selection:bg-emerald/30 selection:text-white grid-bg relative overflow-x-hidden transition-colors duration-500">
      
      {/* Background Glows */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald/10 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-emerald/5 blur-[100px] rounded-full" />
      </div>
      
      {/* Floating Navigation */}
      <nav className="nav-floating">
        <button onClick={() => setActiveTab('home')} className={`nav-item ${activeTab === 'home' ? 'nav-item-active' : ''}`}><Home size={20} /></button>
        <button onClick={() => setActiveTab('about')} className={`nav-item ${activeTab === 'about' ? 'nav-item-active' : ''}`}><User size={20} /></button>
        <button onClick={() => setActiveTab('projects')} className={`nav-item ${activeTab === 'projects' ? 'nav-item-active' : ''}`}><Briefcase size={20} /></button>
        <button onClick={() => setActiveTab('achievements')} className={`nav-item ${activeTab === 'achievements' ? 'nav-item-active' : ''}`}><Award size={20} /></button>
        <button onClick={() => setActiveTab('skills')} className={`nav-item ${activeTab === 'skills' ? 'nav-item-active' : ''}`}><Cpu size={20} /></button>
        <button onClick={() => setActiveTab('contact')} className={`nav-item ${activeTab === 'contact' ? 'nav-item-active' : ''}`}><Mail size={20} /></button>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-40">
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
              <motion.div 
                variants={itemVariants} 
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="md:col-span-8 bento-card flex flex-col justify-between min-h-[350px] md:min-h-[400px] metallic-shine"
              >
                <div className="space-y-8 relative z-10">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald/80">
                    <div className="status-dot" /> SYSTEM CORE: ACTIVE
                  </div>
                  <h1 className="text-5xl sm:text-6xl md:text-9xl font-display font-bold leading-[0.8] tracking-[-0.06em] text-silver">
                    MALVIN <br /> <span className="text-silver/90">KRISTANTO</span> <br /> <span className="text-emerald">ALIM</span>
                  </h1>
                  <div className="h-8 flex items-center">
                    <p className="text-xl md:text-2xl font-mono text-emerald/80 tracking-tight">
                      {typingText}<span className="animate-pulse">_</span>
                    </p>
                  </div>
                  <p className="text-lg md:text-xl text-silver-dark font-medium max-w-2xl leading-relaxed opacity-80">
                    Architecting <span className="text-silver">high-performance digital systems</span> through mathematical optimization and algorithmic precision.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-12 relative z-10">
                  <button onClick={() => setActiveTab('projects')} className="btn-primary w-full sm:w-auto justify-center group">
                    Explore Architecture <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => setActiveTab('contact')} className="btn-secondary w-full sm:w-auto text-center">Initiate Contact</button>
                  <a href="/cv.pdf" download className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver-dark hover:text-emerald transition-colors ml-0 sm:ml-4 flex items-center gap-2">
                    <Award size={14} /> Download CV
                  </a>
                </div>
                <div className="absolute top-12 right-12 text-emerald/[0.03] pointer-events-none">
                  <Cpu size={300} strokeWidth={0.5} />
                </div>
              </motion.div>

              {/* Profile Card */}
              <motion.div 
                variants={itemVariants} 
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="md:col-span-4 bento-card p-0 overflow-hidden group flex flex-col"
              >
                <div className="flex-1 overflow-hidden relative">
                  <img 
                    src={profileUrl} 
                    alt="Malvin" 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/malvin_bento/800/1200';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8 bg-obsidian relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver/30 mb-2">DEPLOYMENT HUB</div>
                  <div className="text-2xl font-display font-bold text-silver tracking-tight">SURABAYA, ID</div>
                </div>
              </motion.div>

              {/* Mathematical Precision Card */}
              <motion.div 
                variants={itemVariants} 
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="md:col-span-5 bento-card space-y-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald/5 border border-emerald/10 flex items-center justify-center">
                  <Activity className="text-emerald" size={20} />
                </div>
                <div className="space-y-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald/40">ALGORITHMIC CORE</div>
                  <h3 className="text-2xl font-display font-bold text-silver uppercase tracking-tight">Mathematical Precision</h3>
                  <p className="text-sm text-silver-dark/80 leading-relaxed">
                    Leveraging linear programming and algorithmic strategy to solve complex digital challenges with absolute efficiency.
                  </p>
                </div>
              </motion.div>

              {/* Core Stack Card */}
              <motion.div 
                variants={itemVariants} 
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="md:col-span-4 bento-card space-y-6"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                    <Layers className="text-white/80" size={20} />
                  </div>
                  <div className="flex gap-1.5 opacity-30">
                    <div className="w-1 h-1 rounded-full bg-white" />
                    <div className="w-1 h-1 rounded-full bg-white" />
                    <div className="w-1 h-1 rounded-full bg-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-silver uppercase tracking-tight">Core Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind', 'Framer'].map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-emerald/5 border border-emerald/10 text-[10px] font-bold text-emerald uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Socials & Time Card */}
              <motion.div 
                variants={itemVariants} 
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="md:col-span-3 bento-card flex flex-col justify-between"
              >
                <div className="flex gap-3">
                  <a href="https://github.com/MalvinKristantoAlim" target="_blank" className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-105 active:scale-95"><Github size={18} className="text-white/80" /></a>
                  <a href="mailto:malvinkristantoalim1@gmail.com" className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-105 active:scale-95"><Mail size={18} className="text-white/80" /></a>
                  <a href="https://wa.me/6288226664102" target="_blank" className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-105 active:scale-95"><Phone size={18} className="text-white/80" /></a>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">LOCAL TIME</div>
                  <div className="text-2xl font-mono font-medium text-white tracking-tighter">{localTime} <span className="text-[10px] text-white/20 ml-1">GMT+7</span></div>
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
              <motion.div variants={itemVariants} className="md:col-span-4 bento-card p-0 overflow-hidden">
                <img 
                  src={profileUrl} 
                  alt="Malvin Profile" 
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-8 bento-card space-y-10">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald/60">BIOGRAPHY</div>
                  <h2 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold leading-[0.8] tracking-[-0.06em] mb-4 uppercase text-silver">THE <br /> <span className="text-emerald">VISIONARY</span></h2>
                </div>
                <div className="space-y-8 text-lg md:text-xl text-silver-dark/80 font-medium leading-relaxed max-w-3xl">
                  <p>
                    I am <span className="text-silver">Malvin Kristanto Alim</span>, a dedicated student at <span className="text-silver font-bold">SMAK Frateran Surabaya</span>. As I approach graduation, my focus is set on <span className="text-silver font-bold">Universitas Surabaya (UBAYA)</span>, where I plan to deepen my expertise in informatics and mathematical optimization.
                  </p>
                  <p>
                    My academic journey is driven by a passion for solving complex problems through logic. Whether it's competing in national accounting competitions or developing efficiency-focused digital solutions, I strive for excellence in every project I undertake.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                  <div className="p-8 rounded-2xl bg-emerald/5 border border-emerald/10 space-y-2">
                    <div className="text-3xl font-display font-bold text-emerald mb-1 tracking-tighter">SMAK</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald/40">Frateran Surabaya</div>
                  </div>
                  <div className="p-8 rounded-2xl bg-emerald/5 border border-emerald/10 space-y-2">
                    <div className="text-3xl font-display font-bold text-silver mb-1 tracking-tighter">UBAYA</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver/20">Future Destination</div>
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
              <motion.div variants={itemVariants} className="md:col-span-5 bento-card p-0 overflow-hidden group/project relative">
                <img 
                  src={projectUrl} 
                  alt="Anomani Project" 
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover/project:grayscale-0 group-hover/project:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-emerald/20 opacity-0 group-hover/project:opacity-100 transition-opacity duration-500 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="text-center p-6 transform translate-y-4 group-hover/project:translate-y-0 transition-transform duration-500">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver/60 mb-2">PREVIEW MODE</div>
                    <div className="text-xl font-display font-bold text-silver tracking-tight">LOGISTICS OPTIMIZER</div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-7 bento-card flex flex-col justify-center space-y-10 spotlight-card">
                <div className="space-y-4">
                  <div className="px-4 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 text-[10px] font-bold text-emerald inline-block uppercase tracking-[0.2em]">PROJECT 2025</div>
                  <h2 className="text-5xl md:text-8xl font-display font-bold leading-[0.8] tracking-[-0.06em] text-silver uppercase">ANOMANI <br /> <span className="text-emerald">PROJECT</span></h2>
                </div>
                <div className="space-y-8">
                  <p className="text-lg md:text-xl text-silver-dark/80 font-medium leading-relaxed max-w-2xl">
                    The Anomani Project is a comprehensive study on logistics optimization. By applying <span className="text-silver">geometric algorithms</span> and <span className="text-silver">linear programming</span>, we redesigned the packaging for NIKI ECHO to minimize empty space during transit.
                  </p>
                  <p className="text-lg md:text-xl text-silver-dark/80 font-medium leading-relaxed max-w-2xl">
                    The system calculates optimal stacking patterns and material distribution, resulting in a significant reduction in carbon footprint and a <span className="text-emerald font-bold">15% improvement</span> in overall shipping efficiency.
                  </p>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => setSelectedProject('anomani')}
                    className="btn-primary w-full sm:w-auto justify-center group"
                  >
                    Technical Analysis <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
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
              <motion.div variants={itemVariants} className="md:col-span-5 bento-card p-0 overflow-hidden">
                <img 
                  src={raiseUrl} 
                  alt="RAISE 2025" 
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-7 bento-card flex flex-col justify-center space-y-10 spotlight-card">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald/5 border border-emerald/10 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald/60 w-fit">
                  <Award size={14} className="text-emerald" /> National Recognition
                </div>
                <h2 className="text-5xl md:text-8xl font-display font-bold leading-[0.8] tracking-[-0.06em] text-silver uppercase">RAISE 2025 <br /> <span className="text-emerald drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">FINALIST</span></h2>
                <p className="text-lg md:text-xl text-silver-dark/80 font-medium leading-relaxed max-w-2xl">
                  National Accounting Competition Finalist at Ciputra University. Recognized for analytical excellence and strategic problem solving in complex financial simulations, where I applied mathematical models to optimize resource allocation and financial forecasting.
                </p>
                <div className="flex justify-start pt-4">
                  <a 
                    href={certUrl} 
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary group"
                  >
                    View Certification <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
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
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { name: "React", percent: 95, icon: <Globe size={18} /> },
                { name: "TypeScript", percent: 90, icon: <Code2 size={18} /> },
                { name: "Tailwind CSS", percent: 98, icon: <Layers size={18} /> },
                { name: "Framer Motion", percent: 88, icon: <Sparkles size={18} /> },
                { name: "Mathematics", percent: 92, icon: <Calculator size={18} /> },
                { name: "Problem Solving", percent: 94, icon: <Zap size={18} /> },
                { name: "JavaScript", percent: 94, icon: <Binary size={18} /> },
                { name: "Git", percent: 92, icon: <Github size={18} /> }
              ].map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  variants={itemVariants}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="bento-card space-y-8 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-emerald/5 border border-emerald/10 flex items-center justify-center text-emerald/40 group-hover:text-emerald group-hover:border-emerald/20 transition-all duration-500">
                      {skill.icon}
                    </div>
                    <span className="text-2xl font-display font-bold text-silver/5 group-hover:text-emerald/20 transition-colors tracking-tighter">{skill.percent}%</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-display font-bold text-silver uppercase tracking-tight">{skill.name}</h3>
                    <div className="w-full h-1 bg-white/[0.02] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.percent}%` }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="h-full bg-emerald/40"
                      />
                    </div>
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
              <motion.div variants={itemVariants} className="md:col-span-8 bento-card flex flex-col justify-center py-20 md:py-32 space-y-12 metallic-shine">
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald/60">
                    <div className="status-dot" /> INITIATE PROTOCOL
                  </div>
                  <h2 className="text-6xl sm:text-7xl md:text-9xl font-display font-bold text-silver leading-[0.8] tracking-[-0.06em] uppercase">
                    LET'S <br /> <span className="text-emerald drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">OPTIMIZE</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-silver-dark/80 font-medium max-w-2xl leading-relaxed">
                    Ready to transform complex challenges into high-performance digital realities. Let's build something exceptional.
                  </p>
                </div>
                
                {/* Modern Contact Form */}
                <form onSubmit={handleContactSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver-dark/40 ml-1">IDENTIFIER</label>
                    <input name="name" type="text" required placeholder="Your Name" className="w-full bg-emerald/5 border border-emerald/10 rounded-xl px-5 py-4 text-silver placeholder:text-silver-dark/30 focus:outline-none focus:border-emerald/30 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver-dark/40 ml-1">ENDPOINT</label>
                    <input name="email" type="email" required placeholder="Email Address" className="w-full bg-emerald/5 border border-emerald/10 rounded-xl px-5 py-4 text-silver placeholder:text-silver-dark/30 focus:outline-none focus:border-emerald/30 transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver-dark/40 ml-1">TRANSMISSION DATA</label>
                    <textarea name="message" required rows={4} placeholder="Your Message" className="w-full bg-emerald/5 border border-emerald/10 rounded-xl px-5 py-4 text-silver placeholder:text-silver-dark/30 focus:outline-none focus:border-emerald/30 transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" className="btn-primary justify-center md:col-span-2 py-5 text-lg group">
                    Transmit Message <Zap size={20} className="group-hover:scale-125 transition-transform" />
                  </button>
                </form>

                <div className="absolute top-1/2 right-0 -translate-y-1/2 text-emerald/[0.02] pointer-events-none">
                  <Zap size={400} strokeWidth={0.5} />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="md:col-span-4 space-y-6">
                <div className="bento-card space-y-4 group">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver/20">DEPLOYMENT BASE</div>
                  <div className="text-xl font-display font-bold text-silver group-hover:text-emerald transition-all duration-500 tracking-tight">Surabaya, Indonesia</div>
                </div>
                <div className="bento-card space-y-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver/20">SOCIAL NETWORK</div>
                  <div className="flex gap-4">
                    {[
                      { icon: <Github size={20} />, href: "https://github.com/MalvinKristantoAlim" },
                      { icon: <Instagram size={20} />, href: "#" },
                      { icon: <Linkedin size={20} />, href: "#" }
                    ].map((social, i) => (
                      <a 
                        key={i}
                        href={social.href} 
                        target="_blank" 
                        className="w-12 h-12 rounded-2xl bg-emerald/5 border border-emerald/10 flex items-center justify-center hover:bg-emerald/10 hover:text-emerald transition-all duration-500 hover:border-emerald/20 hover:scale-110 active:scale-90"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="bento-card bg-emerald/[0.02] border-emerald/10 spotlight-card">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald/40 mb-3">AVAILABILITY</div>
                  <div className="text-silver/80 font-medium leading-relaxed text-sm">
                    Open for high-impact collaborations and innovative architectural projects.
                  </div>
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

      {/* ChatBot Toggle */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-24 right-8 z-[100] w-14 h-14 rounded-full bg-emerald shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all"
      >
        {isChatOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div
          className="fixed bottom-40 right-8 z-[100] w-[350px] max-w-[90vw] h-[500px] bento-card flex flex-col p-0 overflow-hidden shadow-2xl border-emerald/20"
        >
          <div className="p-4 bg-emerald/10 border-b border-emerald/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="status-dot" />
              <span className="text-xs font-bold uppercase tracking-widest text-silver">System Assistant</span>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-silver/30 hover:text-silver transition-colors">
              <X size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-emerald text-white' : 'bg-emerald/5 text-silver'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-emerald/5 p-3 rounded-2xl flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-emerald/5 border-t border-emerald/10 flex gap-2">
            <input 
              type="text" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about Malvin..." 
              className="flex-1 bg-emerald/5 border border-emerald/10 rounded-xl px-4 py-2 text-sm text-silver focus:outline-none focus:border-emerald/30 transition-all"
            />
            <button type="submit" className="w-10 h-10 rounded-xl bg-emerald flex items-center justify-center text-white hover:bg-emerald/90 transition-all">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm cursor-default"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl max-h-[90vh] bento-card overflow-y-auto space-y-12 p-8 md:p-12 metallic-shine"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald/60">CASE STUDY: {selectedProject.toUpperCase()}</div>
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-silver uppercase tracking-tighter">Architecture <br /> <span className="text-emerald">Deep Dive</span></h2>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-12 h-12 rounded-full bg-emerald/5 border border-emerald/10 flex items-center justify-center text-silver/50 hover:text-emerald transition-colors"
                >
                  <Zap size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver/30">01. PROBLEM</div>
                  <p className="text-silver-dark leading-relaxed">
                    Logistics systems often suffer from "air shipping" – transporting empty space due to inefficient packaging. This leads to increased costs and carbon emissions.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver/30">02. PROCESS</div>
                  <p className="text-silver-dark leading-relaxed">
                    Implemented a Simplex-based optimizer that calculates the 3D bin packing problem in real-time, considering weight distribution and fragile constraints.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver/30">03. RESULT</div>
                  <p className="text-silver-dark leading-relaxed">
                    Achieved a 15% reduction in total shipping volume and a 12% decrease in material waste across the entire NIKI ECHO supply chain.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-emerald/10">
                <button onClick={() => setSelectedProject(null)} className="btn-primary w-full justify-center">Close Protocol</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
