import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, Zap, Terminal, Cpu, ArrowUpRight } from "lucide-react";

/* ================== Data ================== */
const testimonials = [
  {
    id: 1,
    name: "Naora Silviana",
    role: "Director @ Meta",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
    text: "The architectural approach to the UI exceeded our expectations. Reduced our time-to-market by 40% using their modular engine.",
    metric: "40% Faster",
    tag: "Performance",
  },
  {
    id: 2,
    name: "Martin Salosa",
    role: "Lead Creative @ Apple",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80",
    text: "Incredible attention to precision. Their aesthetics transformed our footprint completely. It's not just design; it's engineering.",
    metric: "Next-Gen UI",
    tag: "Aesthetics",
  },
  {
    id: 3,
    name: "Ryan Mahrez",
    role: "Engineering @ Stripe",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
    text: "Code quality is top-tier. They anticipated our needs at every step, delivering a fluid user experience that scales effortlessly.",
    metric: "99.9% Uptime",
    tag: "Reliability",
  }
];

/* ================== Responsive Card Component ================== */
const TestimonialCard = ({ item, isEven }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: isEven ? -10 : 10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full md:w-[46%] perspective-[1000px] ${isEven ? 'md:ml-auto' : ''}`}
    >
      <div className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 overflow-hidden">
        {/* Glow Layer */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Terminal className="text-emerald-400 w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
              <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{item.tag}</span>
            </div>
            <ShieldCheck className="text-slate-600 group-hover:text-emerald-400 transition-colors" size={16} />
          </div>

          <p className="text-base md:text-lg text-slate-200 font-medium leading-relaxed italic mb-8 group-hover:text-white transition-colors">
            "{item.text}"
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 md:gap-4">
              <img src={item.image} className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
              <div>
                <h4 className="text-white font-bold text-[11px] md:text-xs">{item.name}</h4>
                <p className="text-emerald-400 text-[8px] md:text-[9px] font-bold uppercase tracking-widest">{item.role}</p>
              </div>
            </div>
            <ArrowUpRight size={14} className="text-slate-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ================== Main Layout ================== */
export default function ResponsiveSpineTestimonials() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  const tipY = useTransform(scaleY, [0, 1], ["0%", "100%"]);
  const tipOpacity = useTransform(scaleY, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <>
      {/* CSS to hide scroller globally for this section */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <section 
        ref={containerRef} 
        className="hide-scrollbar relative min-h-screen bg-[#020617] pt-12 pb-24 px-4 sm:px-6 md:pb-32 overflow-x-hidden"
      >
        
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-emerald-500/[0.05] blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Cpu className="text-emerald-400 w-3 h-3" />
              <span className="text-emerald-400 font-bold text-[8px] md:text-[9px] uppercase tracking-[0.4em]">Integrated Success</span>
            </motion.div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Flow.</span>
            </h2>
          </div>

          <div className="relative">
            
            {/* THE GLOWING INTERACTIVE SPINE - Visible on all screens, but centered */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 z-0">
              {/* Liquid Glow Line */}
              <motion.div 
                style={{ scaleY, originY: 0 }}
                className="absolute inset-0 w-full bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-500 shadow-[0_0_20px_#10b981]"
              />
              {/* Glowing Head */}
              <motion.div 
                style={{ top: tipY, opacity: tipOpacity }}
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 z-20"
              >
                  <div className="w-full h-full bg-white rounded-full blur-[2px] shadow-[0_0_15px_#fff,0_0_25px_#10b981]" />
              </motion.div>
            </div>

            {/* Testimonial Rows */}
            <div className="space-y-20 md:space-y-44 relative z-10">
              {testimonials.map((item, idx) => {
                const isEven = idx % 2 !== 0;
                return (
                  <div key={item.id} className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
                    
                    {/* Content Side (Metric) */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={`w-full md:w-[40%] flex flex-col ${isEven ? 'md:order-last md:text-left items-start md:items-start' : 'md:text-right items-center md:items-end'}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="text-emerald-400 w-4 h-4" />
                        <span className="text-white font-black text-xl md:text-2xl tracking-tighter">{item.metric}</span>
                      </div>
                      <h3 className="text-white text-lg md:text-2xl font-bold mb-2 tracking-tight">Success Outcome.</h3>
                      <p className="text-slate-500 text-[12px] md:text-sm leading-relaxed max-w-[250px] md:max-w-sm">
                        High-performance logic deployment for {item.name.split(' ')[0]}.
                      </p>
                    </motion.div>

                    {/* Card Side */}
                    <TestimonialCard item={item} isEven={isEven} />

                    {/* Intersection Node Dot */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="w-2 h-2 bg-slate-950 border-2 border-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-24 md:mt-32 flex flex-col items-center">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(52, 211, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-950 px-8 md:px-10 py-3 md:py-4 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]"
              >
                Start Integration
              </motion.button>
          </div>
        </div>
      </section>
    </>
  );
}