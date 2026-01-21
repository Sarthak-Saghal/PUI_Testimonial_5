import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { ShieldCheck, Zap, Terminal, Cpu, ArrowUpRight, Activity, Share2 } from "lucide-react";

/* ================== Data ================== */
const testimonials = [
  {
    id: "01",
    name: "Naora Silviana",
    role: "Director @ Meta",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    text: "The architectural approach to the UI exceeded our expectations. Reduced time-to-market by 40% using their modular engine.",
    metric: "40%+",
    tag: "VELOCITY",
    color: "#10b981", 
  },
  {
    id: "02",
    name: "Martin Salosa",
    role: "Lead Creative @ Apple",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    text: "Incredible attention to precision. Their aesthetics transformed our footprint completely. Pure engineering.",
    metric: "GEN-Z",
    tag: "AESTHETICS",
    color: "#06b6d4",
  },
  {
    id: "03",
    name: "Ryan Mahrez",
    role: "Engineering @ Stripe",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    text: "Code quality is top-tier. They anticipated our needs at every step, delivering a fluid user experience.",
    metric: "99.9%",
    tag: "RELIABILITY",
    color: "#6366f1",
  }
];

/* ================== Compact 3D Card Component ================== */
const TestimonialModule = ({ item }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const layer1X = useTransform(mouseXSpring, [-0.5, 0.5], ["10px", "-10px"]);
  const layer1Y = useTransform(mouseYSpring, [-0.5, 0.5], ["10px", "-10px"]);
  const layer2X = useTransform(mouseXSpring, [-0.5, 0.5], ["20px", "-20px"]);
  const layer2Y = useTransform(mouseYSpring, [-0.5, 0.5], ["20px", "-20px"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      className="relative w-full md:w-[38%] group"
    >
      <div className="relative p-[1px] rounded-[1.5rem] bg-white/10 overflow-hidden transition-all group-hover:bg-white/20">
        <div 
          className="absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-[spin_4s_linear_infinite]" 
          style={{ background: `conic-gradient(from 0deg, transparent, ${item.color}, transparent 60%)` }}
        />

        <div className="relative z-10 bg-[#05070a]/95 backdrop-blur-2xl rounded-[1.4rem] p-6 md:p-8 border border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_5s_infinite] pointer-events-none" />

          <motion.div style={{ x: layer1X, y: layer1Y, transformZ: "20px" }} className="relative z-20">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <Cpu size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-[8px] font-mono tracking-widest text-white/30 uppercase">ID_0{item.id}</div>
                  <div className="text-[9px] font-bold tracking-widest text-white/60 uppercase">{item.tag}</div>
                </div>
              </div>
              <ShieldCheck size={16} className="text-white/20" />
            </div>

            <p className="text-sm md:text-base font-medium text-white/90 leading-relaxed mb-8 italic">
              "{item.text}"
            </p>
          </motion.div>

          <motion.div 
            style={{ x: layer2X, y: layer2Y, transformZ: "40px" }}
            className="flex items-center gap-4 pt-6 border-t border-white/5 relative z-30"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-lg opacity-40" style={{ backgroundColor: item.color }} />
              <img src={item.image} className="w-10 h-10 rounded-full border border-white/20 object-cover relative z-10" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm tracking-tight">{item.name}</h4>
              <p className="text-[9px] font-mono uppercase opacity-40">{item.role}</p>
            </div>
            <ArrowUpRight className="ml-auto text-white/20 group-hover:text-white transition-all" size={14} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ================== Main Section ================== */
export default function CompactSingularity() {
  const containerRef = useRef(null);
  const spineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const activeColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#10b981", "#06b6d4", "#6366f1"]);
  const tipY = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-[#020408] py-20 px-6 overflow-hidden text-white font-sans"
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-950/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* TITAN HEADER */}
        <div className="text-center mb-32">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-[9px] font-mono tracking-[0.4em] text-cyan-400 uppercase">Integrity_Verified</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase">
             TI<span className="text-transparent stroke-text">TAN</span>IC
          </h2>
        </div>

        <div ref={spineRef} className="relative">
          
          {/* THE SLIM PLASMA SPINE */}
          <div className="absolute left-1/2 top-0 bottom-0 w-5 -translate-x-1/2 z-0">
            <div className="absolute inset-0 bg-white/5 rounded-full border-x border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]" />
            <motion.div 
              style={{ scaleY, originY: 0, backgroundColor: activeColor }}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[5px] rounded-full shadow-[0_0_25px_var(--tw-shadow-color)]"
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-white/50 rounded-full blur-[0.5px]" />
            </motion.div>

            {/* SLIM PROBE */}
            <motion.div 
              style={{ top: tipY, backgroundColor: activeColor }} 
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 z-20 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-inherit rounded-full blur-2xl opacity-60 animate-pulse" />
              <div className="relative w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#fff]" />
              <div className="absolute w-6 h-6 border border-white/20 rounded-full animate-spin-slow" />
            </motion.div>
          </div>

          {/* CONTENT MODULES */}
          <div className="space-y-32 md:space-y-48 relative z-10">
            {testimonials.map((item, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <div key={item.id} className={`flex flex-col md:flex-row items-center justify-between gap-12 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Floating Metric Side */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className={`w-full md:w-[32%] flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}
                  >
                    <div className="relative mb-4">
                       <span className="text-6xl md:text-7xl font-black text-white italic tracking-tighter drop-shadow-xl">{item.metric}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                       <Zap size={14} style={{ color: item.color }} className="animate-bounce" />
                       <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">Node_Secure</span>
                    </div>
                    <p className="text-slate-500 text-[10px] max-w-[180px] leading-relaxed uppercase tracking-widest font-bold">
                       Validated for <span className="text-white">{item.name.split(' ')[0]}</span> architecture.
                    </p>
                  </motion.div>

                  <TestimonialModule item={item} />

                  {/* Slim Center Node */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block">
                     <motion.div 
                        whileInView={{ scale: [0, 1.1, 1], opacity: [0, 1] }}
                        className="w-10 h-10 border border-white/10 rounded-full bg-[#020408]/80 backdrop-blur-md flex items-center justify-center"
                     >
                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                     </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPACT CTA */}
        <div className="mt-48 flex flex-col items-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.15)" }}
              className="relative px-12 py-5 bg-white text-black font-black text-[9px] uppercase tracking-[0.4em] rounded-full group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">Initiate Contact <Share2 size={12} /></span>
            </motion.button>
            <div className="mt-12 h-20 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.15); }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% -200%; } 100% { background-position: 200% 200%; } }
      `}} />
    </section>
  );
}