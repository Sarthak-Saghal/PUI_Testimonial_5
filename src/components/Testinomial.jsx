import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { ShieldCheck, Zap, Terminal, Cpu, ArrowUpRight, Activity, Share2 } from "lucide-react";

/* ================== Data ================== */
const testimonials = [
  {
    id: "01",
    name: "Naora Silviana",
    role: "Director @ Meta",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
    text: "The architectural approach to the UI exceeded our expectations. Reduced our time-to-market by 40% using their modular engine.",
    metric: "40%+",
    tag: "VELOCITY",
    color: "#10b981", // Emerald
  },
  {
    id: "02",
    name: "Martin Salosa",
    role: "Lead Creative @ Apple",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80",
    text: "Incredible attention to precision. Their aesthetics transformed our footprint completely. It's not just design; it's engineering.",
    metric: "GEN-Z",
    tag: "AESTHETICS",
    color: "#06b6d4", // Cyan
  },
  {
    id: "03",
    name: "Ryan Mahrez",
    role: "Engineering @ Stripe",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
    text: "Code quality is top-tier. They anticipated our needs at every step, delivering a fluid user experience that scales effortlessly.",
    metric: "99.9%",
    tag: "RELIABILITY",
    color: "#6366f1", // Indigo
  }
];

/* ================== Hyper-3D Card Component ================== */
const TestimonialModule = ({ item }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Rotation Values
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Internal Parallax Layers (Z-Axis Depth)
  const layer1X = useTransform(mouseXSpring, [-0.5, 0.5], ["20px", "-20px"]);
  const layer1Y = useTransform(mouseYSpring, [-0.5, 0.5], ["20px", "-20px"]);
  const layer2X = useTransform(mouseXSpring, [-0.5, 0.5], ["40px", "-40px"]);
  const layer2Y = useTransform(mouseYSpring, [-0.5, 0.5], ["40px", "-40px"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, perspective: 1200, transformStyle: "preserve-3d" }}
      className="relative w-full md:w-[42%] group"
    >
      {/* 3D Glowing Border */}
      <div className="relative p-[1px] rounded-[2.5rem] bg-white/10 overflow-hidden transition-all group-hover:bg-white/20">
        <div 
          className="absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-[spin_4s_linear_infinite]" 
          style={{ background: `conic-gradient(from 0deg, transparent, ${item.color}, transparent 60%)` }}
        />

        {/* Card Body */}
        <div className="relative z-10 bg-[#05070a]/95 backdrop-blur-3xl rounded-[2.4rem] p-8 md:p-12 border border-white/5 overflow-hidden">
          
          {/* Holographic Sweep Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_5s_infinite] pointer-events-none" />

          {/* LAYER 1: Text Content (Mid Depth) */}
          <motion.div style={{ x: layer1X, y: layer1Y, transformZ: "40px" }} className="relative z-20">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all">
                  <Cpu size={22} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase mb-1">Sector_0{item.id}</div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-white/60">{item.tag}</div>
                </div>
              </div>
              <ShieldCheck size={20} className="text-white/20 group-hover:text-white transition-colors" />
            </div>

            <p className="text-xl md:text-2xl font-medium text-white/90 leading-snug italic mb-12 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              "{item.text}"
            </p>
          </motion.div>

          {/* LAYER 2: Profile Section (Max Depth) */}
          <motion.div 
            style={{ x: layer2X, y: layer2Y, transformZ: "80px" }}
            className="flex items-center gap-5 pt-8 border-t border-white/5 relative z-30"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-all" style={{ backgroundColor: item.color }} />
              <img src={item.image} className="w-16 h-16 rounded-full border-2 border-white/20 object-cover shadow-2xl relative z-10" alt={item.name} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#05070a]" />
            </div>
            <div>
              <h4 className="text-white font-black text-lg tracking-tight">{item.name}</h4>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">{item.role}</p>
            </div>
            <ArrowUpRight className="ml-auto text-white/10 group-hover:text-white transition-all" size={18} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ================== Main Section ================== */
export default function SingularityUI() {
  const containerRef = useRef(null);
  const spineRef = useRef(null);

  // FIXED: Line completion logic - starts at center, ends at center of viewport
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Dynamic color for the spine energy
  const activeColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#10b981", "#06b6d4", "#6366f1"]);
  const tipY = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-[#020408] py-40 px-6 overflow-hidden text-white font-sans selection:bg-white selection:text-black"
    >
      {/* 1. HUD BACKGROUND ENVIRONMENT */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(1000px)_rotateX(60deg)] opacity-20 origin-top" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-950/10 blur-[200px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* TITAN HEADER */}
        <div className="text-center mb-64">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="flex items-center justify-center gap-3 mb-8">
            <Activity size={16} className="text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.8em] text-cyan-400 uppercase">Core_System_Integrity_Confirmed</span>
          </motion.div>
          <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none italic uppercase">
             TI<span className="text-transparent stroke-text">TAN</span>IC
          </h2>
        </div>

        <div ref={spineRef} className="relative">
          
          {/* 2. THE VOLUMETRIC PLASMA SPINE */}
          <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-0">
            {/* Glass Tube Outer Case */}
            <div className="absolute inset-0 bg-white/5 rounded-full border-x border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" />
            
            {/* 3D Specular Highlight Line */}
            <div className="absolute left-1.5 top-0 bottom-0 w-[2px] bg-white/15 rounded-full blur-[0.5px]" />

            {/* The Dynamic Energy Core */}
            <motion.div 
              style={{ scaleY, originY: 0, backgroundColor: activeColor }}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[10px] rounded-full shadow-[0_0_40px_var(--tw-shadow-color)] transition-colors duration-500"
            >
              {/* Internal Liquid Shine */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-white/60 rounded-full blur-[1px]" />
            </motion.div>

            {/* DATA PROBE (HEAD FLARE) */}
            <motion.div 
              style={{ top: tipY, backgroundColor: activeColor }} 
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 z-20 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-inherit rounded-full blur-3xl opacity-60 animate-pulse" />
              <div className="relative w-5 h-5 bg-white rounded-full shadow-[0_0_30px_#fff]" />
              <div className="absolute w-10 h-10 border border-white/30 rounded-full animate-spin-slow" />
            </motion.div>

            {/* Traveling Data Photons */}
            {[...Array(4)].map((_, i) => (
               <motion.div
                 key={i}
                 animate={{ top: ["-10%", "110%"] }}
                 transition={{ duration: 3 + i, repeat: Infinity, ease: "linear", delay: i }}
                 className="absolute left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent blur-[1px]"
               />
            ))}
          </div>

          {/* CONTENT MODULES */}
          <div className="space-y-64 md:space-y-96 relative z-10">
            {testimonials.map((item, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <div key={item.id} className={`flex flex-col md:flex-row items-center justify-between gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Floating Metric Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`w-full md:w-[35%] flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}
                  >
                    <div className="relative mb-8">
                       <span className="text-8xl md:text-[14rem] font-black opacity-[0.03] absolute -top-24 left-0 tracking-tighter" style={{ color: item.color }}>{item.metric}</span>
                       <h3 className="text-6xl md:text-9xl font-black text-white relative z-10 drop-shadow-2xl italic tracking-tighter">{item.metric}</h3>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                       <Zap size={20} style={{ color: item.color }} className="animate-bounce" />
                       <span className="text-[11px] font-mono tracking-[0.4em] text-white/40 uppercase">Metrics_Validated</span>
                    </div>
                    <p className="text-slate-500 text-xs md:text-sm max-w-[240px] leading-relaxed uppercase tracking-widest font-bold">
                       Successful integration cluster for <span className="text-white">NODE_00{item.id}</span> system architecture.
                    </p>
                  </motion.div>

                  {/* 3D Testimonial Module */}
                  <TestimonialModule item={item} />

                  {/* Center Node Anchor */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block">
                     <motion.div 
                        whileInView={{ scale: [0, 1.2, 1], opacity: [0, 1] }}
                        className="w-14 h-14 border border-white/10 rounded-full bg-[#020408]/80 backdrop-blur-xl flex items-center justify-center shadow-2xl"
                     >
                        <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_20px_#fff]" />
                     </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mt-80 flex flex-col items-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 80px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="relative px-20 py-7 bg-white text-black font-black text-xs uppercase tracking-[0.6em] rounded-full transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-3">
                ProjectUI  Protocol <Share2 size={14} />
              </span>
            </motion.button>
            <div className="mt-16 h-32 w-[1px] bg-gradient-to-b from-white/30 via-white/5 to-transparent" />
            
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.2); }
        .animate-spin-slow { animation: spin 6s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% -200%; } 100% { background-position: 200% 200%; } }
      `}} />
    </section>
  );
}