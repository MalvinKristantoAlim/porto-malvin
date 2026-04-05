import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Instagram, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  Code2, 
  Calculator, 
  Award, 
  BookOpen, 
  User,
  ChevronRight,
  Binary,
  Cpu
} from 'lucide-react';
import { useLocalStorageImage } from './hooks/useLocalStorageImage';
import { ImageUploader } from './components/ImageUploader';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'achievements' | 'contact'>('home');

  // Local Sourced Images
  const profileUrl = "/profile.jpeg";
  const projectUrl = "/anomanfoto.jpeg";
  const raiseUrl = "/raisenomani.jpeg";
  const certUrl = "/sertifraise.pdf";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const MathSymbol = ({ children, className }: { children: ReactNode, className: string }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        y: [0, -20, 0],
        rotate: [0, 10, 0]
      }}
      transition={{ 
        duration: 5 + Math.random() * 5, 
        repeat: Infinity,
        ease: "easeInOut" 
      }}
      className={`absolute pointer-events-none font-mono text-emerald-primary/20 select-none ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen grid-bg relative overflow-x-hidden bg-obsidian">
      {/* Background Math Symbols */}
      <MathSymbol className="top-20 left-[10%] text-4xl">∑</MathSymbol>
      <MathSymbol className="top-40 right-[15%] text-3xl">Δ</MathSymbol>
      <MathSymbol className="bottom-40 left-[20%] text-5xl">∫</MathSymbol>
      <MathSymbol className="bottom-20 right-[10%] text-4xl">π</MathSymbol>
      <MathSymbol className="top-1/2 left-[5%] text-2xl">√</MathSymbol>
      <MathSymbol className="top-1/3 right-[5%] text-2xl">∞</MathSymbol>
      <MathSymbol className="bottom-1/3 left-[40%] text-3xl">λ</MathSymbol>

      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-dark/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-card px-6 py-3 flex items-center gap-6 md:gap-8 border-emerald-primary/10">
          <button 
            onClick={() => setActiveTab('home')}
            className={`text-xs md:text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-emerald-primary' : 'text-gray-400 hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`text-xs md:text-sm font-medium transition-colors ${activeTab === 'projects' ? 'text-emerald-primary' : 'text-gray-400 hover:text-white'}`}
          >
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('achievements')}
            className={`text-xs md:text-sm font-medium transition-colors ${activeTab === 'achievements' ? 'text-emerald-primary' : 'text-gray-400 hover:text-white'}`}
          >
            Achievements
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`text-xs md:text-sm font-medium transition-colors ${activeTab === 'contact' ? 'text-emerald-primary' : 'text-gray-400 hover:text-white'}`}
          >
            Contact
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-full"
            >
              {/* Profile Card */}
              <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 glass-card p-8 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 bg-emerald-primary/20 blur-xl rounded-2xl animate-pulse" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-emerald-primary/30 group-hover:border-emerald-primary transition-all duration-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                      <img 
                        src={profileUrl} 
                        alt="Malvin Kristanto Alim" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/malvin/400/400';
                        }}
                      />
                      {/* Scanning Effect */}
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-primary/50 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-[scan_3s_linear_infinite]" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-primary/10 border border-emerald-primary/20 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-primary mb-2">
                      <Binary size={12} /> System Architect
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      Malvin <br />
                      <span className="emerald-gradient-text">Kristanto Alim</span>
                    </h1>
                  </div>
                  
                  <p className="text-gray-400 max-w-md mt-6 leading-relaxed font-display text-lg">
                    Bridging the gap between <span className="text-emerald-primary">Mathematical Logic</span> and <span className="text-emerald-primary">Informatics</span>.
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-12 relative z-10">
                  <a href="https://github.com/MalvinKristantoAlim" target="_blank" className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-emerald-primary/10 text-gray-400 hover:text-emerald-primary transition-all group/link">
                    <Github size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">GitHub</span>
                  </a>
                  <a href="https://linkedin.com/in/malvin-k-a" target="_blank" className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-emerald-primary/10 text-gray-400 hover:text-emerald-primary transition-all group/link">
                    <Linkedin size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">LinkedIn</span>
                  </a>
                </div>

                <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Cpu size={300} className="text-emerald-primary" />
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div variants={itemVariants} className="md:col-span-2 glass-card p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                  <Binary size={80} className="text-emerald-primary" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-primary/60 mb-6">System Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Grade</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-2xl font-bold text-white">2026</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Graduate</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-2xl font-bold text-white">∞</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Logic</div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Informatics Proficiency</span>
                    <span className="text-emerald-primary">92%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-emerald-primary shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                    />
                  </div>
                </div>
              </motion.div>

              {/* Project Preview */}
              <motion.div 
                variants={itemVariants} 
                onClick={() => setActiveTab('projects')}
                className="md:col-span-1 glass-card group cursor-pointer overflow-hidden relative"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={projectUrl} 
                    alt="Anomani Project" 
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
                  {/* Scanning Effect */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-primary/30 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-[scan_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                  <BookOpen className="text-emerald-primary mb-4" />
                  <h3 className="font-bold mb-2">Anomani Project</h3>
                  <p className="text-[10px] text-gray-400 line-clamp-2 mb-4">Analisis packaging minuman cincau menggunakan konsep SPLDV.</p>
                  <div className="flex items-center text-[10px] text-emerald-primary font-bold uppercase tracking-widest">
                    View Project <ChevronRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>

              {/* Achievement Preview */}
              <motion.div 
                variants={itemVariants} 
                onClick={() => setActiveTab('achievements')}
                className="md:col-span-1 glass-card group cursor-pointer overflow-hidden relative"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={raiseUrl} 
                    alt="RAISE 2025" 
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
                  {/* Scanning Effect */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-primary/30 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-[scan_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                  <Award className="text-emerald-primary mb-4" />
                  <h3 className="font-bold mb-2">RAISE 2025</h3>
                  <p className="text-[10px] text-gray-400 line-clamp-2 mb-4">Finalis Kompetisi Accounting Nasional.</p>
                  <div className="flex items-center text-[10px] text-emerald-primary font-bold uppercase tracking-widest">
                    View Achievement <ChevronRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>

              {/* Technical Stack Card */}
              <motion.div variants={itemVariants} className="md:col-span-2 glass-card p-8 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Code2 size={120} className="text-emerald-primary" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-primary/60 mb-6">Technical Stack</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    { name: "React", percent: 95 },
                    { name: "TypeScript", percent: 90 },
                    { name: "Tailwind CSS", percent: 98 },
                    { name: "Framer Motion", percent: 88 },
                    { name: "Express.js", percent: 82 },
                    { name: "Node.js", percent: 85 },
                    { name: "JavaScript", percent: 94 },
                    { name: "HTML/CSS", percent: 96 }
                  ].map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-display font-medium text-white">{skill.name}</span>
                        <span className="text-[10px] font-mono text-emerald-primary">{skill.percent}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.percent}%` }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                          className="h-full bg-emerald-primary shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Card */}
              <motion.div 
                variants={itemVariants} 
                onClick={() => setActiveTab('contact')}
                className="md:col-span-2 glass-card p-8 flex flex-col justify-center relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-primary/5 to-transparent pointer-events-none group-hover:bg-emerald-primary/10 transition-colors" />
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-primary/60 mb-6">Communication Hub</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-emerald-primary/20 transition-all">
                    <Mail className="text-emerald-primary" size={18} />
                    <span className="text-xs font-medium truncate">malvinkristantoalim1@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-emerald-primary/20 transition-all">
                    <MessageCircle className="text-emerald-primary" size={18} />
                    <span className="text-xs font-medium">088226664102</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center text-xs text-emerald-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Contact Hub <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="glass-card overflow-hidden group relative">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={projectUrl} 
                    alt="Anomani Project" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/math/1200/675';
                    }}
                  />
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-emerald-primary/10 text-emerald-primary text-xs font-bold uppercase tracking-widest border border-emerald-primary/20">Case Study</span>
                    <span className="text-gray-500 text-sm">2025</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-6">ANOMANI PROJECT 2025</h2>
                  <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                    <p>
                      Proyek ini merupakan analisis mendalam terhadap packaging minuman cincau <span className="text-white font-medium">NIKI ECHO</span> menggunakan pendekatan matematis. Fokus utama adalah mengoptimalkan efisiensi produksi melalui pemodelan variabel.
                    </p>
                    <div className="p-6 rounded-2xl bg-emerald-primary/5 border border-emerald-primary/10">
                      <h4 className="text-emerald-primary font-bold mb-2 flex items-center gap-2">
                        <Calculator size={18} /> Mathematical Concept: SPLDV
                      </h4>
                      <p className="text-sm italic">
                        "Sistem Persamaan Linear Dua Variabel digunakan untuk menentukan titik optimal antara biaya bahan baku dan volume kemasan, memastikan keberlanjutan ekonomi tanpa mengorbankan kualitas produk."
                      </p>
                    </div>
                    <p>
                      Melalui analisis ini, ditemukan bahwa rasio dimensi tertentu dapat mengurangi limbah material hingga 12%, memberikan wawasan berharga bagi industri minuman lokal dalam mengelola sumber daya mereka secara lebih presisi.
                    </p>
                  </div>
                  <div className="mt-10 pt-10 border-t border-white/5 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-primary" /> Optimization
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-primary" /> Data Analysis
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-primary" /> Industrial Design
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="glass-card overflow-hidden group relative">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={raiseUrl} 
                    alt="RAISE 2025 Achievement" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/accounting/1200/675';
                    }}
                  />
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-emerald-primary/10 text-emerald-primary text-xs font-bold uppercase tracking-widest border border-emerald-primary/20">Competition</span>
                    <span className="text-gray-500 text-sm">National Level</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-6">Finalist RAISE 2025</h2>
                  <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                    <p>
                      Berhasil menjadi <span className="text-white font-medium">Finalis dalam Lomba RAISE 2025</span>, sebuah kompetisi Accounting Nasional yang bergengsi. Pencapaian ini membuktikan kemampuan analisis finansial dan ketelitian dalam mengelola data numerik yang kompleks.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="text-white font-bold mb-2">Critical Thinking</h4>
                        <p className="text-sm text-gray-500">Menganalisis laporan keuangan dengan standar akuntansi nasional.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="text-white font-bold mb-2">Numerical Precision</h4>
                        <p className="text-sm text-gray-500">Menyelesaikan studi kasus audit dengan tingkat akurasi tinggi.</p>
                      </div>
                    </div>
                    <p>
                      Kompetisi ini memperkuat fondasi saya dalam logika kuantitatif, yang sangat relevan dengan minat saya di bidang Informatika dan Matematika Terapan.
                    </p>
                  </div>
                  <div className="mt-10 flex justify-center">
                    <a 
                      href={certUrl} 
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-primary text-obsidian font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      View Certificate <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <div className="glass-card p-8 md:p-16 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-primary/5 to-transparent pointer-events-none" />
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex p-4 rounded-2xl bg-emerald-primary/10 text-emerald-primary mb-8">
                    <MessageCircle size={40} />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">Let's <span className="emerald-gradient-text">Collaborate</span></h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Let's build something extraordinary together.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <a href="mailto:malvinkristantoalim1@gmail.com" className="p-6 glass-card hover:bg-emerald-primary/10 group transition-all">
                    <Mail className="mx-auto mb-4 text-emerald-primary group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email</div>
                    <div className="text-sm font-bold truncate">malvinkristantoalim1@gmail.com</div>
                  </a>
                  <a href="https://wa.me/6288226664102" target="_blank" className="p-6 glass-card hover:bg-emerald-primary/10 group transition-all">
                    <MessageCircle className="mx-auto mb-4 text-emerald-primary group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">WhatsApp</div>
                    <div className="text-sm font-bold">088226664102</div>
                  </a>
                  <a href="https://instagram.com/heymalvin_" target="_blank" className="p-6 glass-card hover:bg-emerald-primary/10 group transition-all">
                    <Instagram className="mx-auto mb-4 text-emerald-primary group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Instagram</div>
                    <div className="text-sm font-bold">@heymalvin_</div>
                  </a>
                  <a href="https://github.com/MalvinKristantoAlim" target="_blank" className="p-6 glass-card hover:bg-emerald-primary/10 group transition-all">
                    <Github className="mx-auto mb-4 text-emerald-primary group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">GitHub</div>
                    <div className="text-sm font-bold">MalvinKristantoAlim</div>
                  </a>
                  <a href="https://linkedin.com/in/malvin-k-a" target="_blank" className="p-6 glass-card hover:bg-emerald-primary/10 group transition-all">
                    <Linkedin className="mx-auto mb-4 text-emerald-primary group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">LinkedIn</div>
                    <div className="text-sm font-bold">Malvin K. A</div>
                  </a>
                  <div className="p-6 glass-card bg-emerald-primary/5 border-emerald-primary/30 flex items-center justify-center">
                    <div className="text-emerald-primary font-bold tracking-tighter text-lg italic">Available for Hire</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-emerald-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-gray-500 font-display">
          © 2026 Malvin Kristanto Alim. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="https://github.com/MalvinKristantoAlim" target="_blank" className="text-gray-500 hover:text-emerald-primary transition-colors"><Github size={18} /></a>
          <a href="https://linkedin.com/in/malvin-k-a" target="_blank" className="text-gray-500 hover:text-emerald-primary transition-colors"><Linkedin size={18} /></a>
          <a href="https://instagram.com/heymalvin_" target="_blank" className="text-gray-500 hover:text-emerald-primary transition-colors"><Instagram size={18} /></a>
        </div>
      </footer>
    </div>
  );
}
