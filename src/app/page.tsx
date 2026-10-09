"use client";

import React, { useState, useEffect } from 'react';
import SecretLoginTrigger from '@/components/SecretLoginTrigger';
import { motion, Variants } from 'framer-motion';
import { useRetroSound } from '@/hooks/useRetroSound';

export default function Home() {
  const [time, setTime] = useState("");
  const { playSound } = useRetroSound();

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const int = setInterval(update, 1000);
    return () => clearInterval(int);
  }, []);

  const windowVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: (custom: number) => ({
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { delay: custom * 0.15, type: "spring", stiffness: 100 }
    })
  };

  const itemHover = {
    scale: 1.02,
    transition: { type: "spring" as const, stiffness: 400 }
  };

  return (
    <div className="crt min-h-screen flex flex-col font-mono selection:bg-os-text selection:text-os-bg">
      {/* OS Header */}
      <header className="flex justify-between items-center border-b-2 border-os-border bg-os-header px-4 py-2 text-sm md:text-base font-bold sticky top-0 z-50">
        <div className="flex gap-6 items-center">
          <SecretLoginTrigger>
            <span 
              onMouseEnter={() => playSound("hover")}
              onClick={() => playSound("click")}
              className="cursor-pointer hover:bg-os-text hover:text-os-bg px-2 py-1 uppercase border-2 border-transparent hover:border-os-text"
            >
              OWL-OS v1.0
            </span>
          </SecretLoginTrigger>
          <nav className="hidden md:flex gap-4">
            <a href="#profil" onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} className="hover:bg-os-text hover:text-os-bg px-2 py-1">Profil.sys</a>
            <a href="#parcours" onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} className="hover:bg-os-text hover:text-os-bg px-2 py-1">Parcours.log</a>
            <a href="#projets" onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} className="hover:bg-os-text hover:text-os-bg px-2 py-1">Projets.vol</a>
            <a href="#contact" onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} className="hover:bg-os-text hover:text-os-bg px-2 py-1">Contact.app</a>
          </nav>
        </div>
        <div className="flex gap-4 items-center">
          <div className="hidden sm:block opacity-80">STATUS: ONLINE</div>
          <div className="w-24 text-right">{time}</div>
        </div>
      </header>

      {/* Main Desktop Area */}
      <main className="flex-1 p-4 md:p-8 flex flex-col gap-10 max-w-5xl mx-auto w-full pt-8">
        
        {/* Intro Window */}
        <motion.section 
          custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={windowVariants}
          id="profil" className="border-2 border-os-border bg-os-bg shadow-[8px_8px_0_0_var(--os-text)]"
        >
          <div className="border-b-2 border-os-border bg-os-header px-3 py-1 flex justify-between items-center">
            <span className="font-bold uppercase tracking-widest text-xs md:text-sm">profil.sys</span>
            <div className="flex gap-2">
              <div onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} className="w-3 h-3 border border-os-border hover:bg-os-text cursor-pointer"></div>
              <div onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} className="w-3 h-3 border border-os-border hover:bg-os-text cursor-pointer"></div>
              <div onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} className="w-3 h-3 border border-os-border hover:bg-os-text cursor-pointer"></div>
            </div>
          </div>
          <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex-1 space-y-6">
              <div>
                <p className="text-xs uppercase opacity-70 mb-1">&gt; WHOAMI</p>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Kerl Jan<br/>Sumontao</h1>
                <h2 className="text-lg md:text-xl mt-2 uppercase opacity-90">&gt; Game Developer / AI Explorer</h2>
              </div>
              <p className="leading-relaxed opacity-90 max-w-xl">
                A BSIT student at Bukidnon State University obsessed with building things that actually matter — games, simulations, and AI systems that push what's technically possible.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-sm">
                <span onMouseEnter={() => playSound("hover")} className="border border-os-border px-3 py-1 hover:bg-os-text hover:text-os-bg transition-colors cursor-pointer">Python</span>
                <span onMouseEnter={() => playSound("hover")} className="border border-os-border px-3 py-1 hover:bg-os-text hover:text-os-bg transition-colors cursor-pointer">Unity</span>
                <span onMouseEnter={() => playSound("hover")} className="border border-os-border px-3 py-1 hover:bg-os-text hover:text-os-bg transition-colors cursor-pointer">React</span>
                <span onMouseEnter={() => playSound("hover")} className="border border-os-border px-3 py-1 hover:bg-os-text hover:text-os-bg transition-colors cursor-pointer">Machine Learning</span>
              </div>
            </div>
            {/* ASCII Owl Art */}
            <motion.div 
              whileHover={{ rotate: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } }}
              onHoverStart={() => playSound("hover")}
              className="hidden lg:block whitespace-pre text-[10px] md:text-xs leading-tight font-black opacity-80 border-2 border-os-border p-4 bg-os-header cursor-pointer"
            >
{`    , _ ,
   ( o o )
  /'\` ' \`'\\
  |'''''''|
  |\\\\'''//|
     """`}
            </motion.div>
          </div>
        </motion.section>

        {/* Parcours / Git Log Timeline */}
        <motion.section 
          custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={windowVariants}
          id="parcours" className="border-2 border-os-border bg-os-bg shadow-[8px_8px_0_0_var(--os-text)]"
        >
          <div className="border-b-2 border-os-border bg-os-header px-3 py-1 flex justify-between items-center">
            <span className="font-bold uppercase tracking-widest text-xs md:text-sm">parcours.log</span>
            <div className="flex gap-2">
              <div onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} className="w-3 h-3 border border-os-border hover:bg-os-text cursor-pointer"></div>
            </div>
          </div>
          <div className="p-6 md:p-10 overflow-hidden">
            <div className="mb-8 opacity-70 text-sm">
              <span>user@owl-os:~$</span> git log --graph --all
            </div>
            
            <div className="relative border-l-2 border-os-border ml-3 md:ml-6 pl-8 space-y-12 py-4">
              
              <motion.div whileHover={itemHover} onHoverStart={() => playSound("hover")} className="relative group">
                <div className="absolute w-4 h-4 bg-os-bg border-2 border-os-border rounded-full -left-[41px] top-1 group-hover:bg-os-text transition-colors"></div>
                <div className="text-xs opacity-70 mb-1">commit c0b020</div>
                <h3 className="text-xl md:text-2xl font-bold uppercase cursor-pointer text-os-border group-hover:underline">BSIT Student</h3>
                <p className="text-sm opacity-80 mb-3">Bukidnon State University • Present</p>
                <p className="text-sm opacity-90 max-w-2xl">Currently completing my final year in BS Information Technology. Focusing on advanced game development and machine learning architectures.</p>
              </motion.div>

              <motion.div whileHover={itemHover} onHoverStart={() => playSound("hover")} className="relative group">
                <div className="absolute w-4 h-4 bg-os-bg border-2 border-os-border rounded-full -left-[41px] top-1 group-hover:bg-os-text transition-colors"></div>
                <div className="text-xs opacity-70 mb-1">commit a7e017</div>
                <h3 className="text-xl md:text-2xl font-bold uppercase cursor-pointer text-os-border group-hover:underline">Simulation Engineer</h3>
                <p className="text-sm opacity-80 mb-3">Project-X • 2024</p>
                <p className="text-sm opacity-90 max-w-2xl">Built a PAD Simulation System visualizing blood flow and arterial blockages using Python. Translated complex medical data into intuitive technical simulations.</p>
              </motion.div>

              <motion.div whileHover={itemHover} onHoverStart={() => playSound("hover")} className="relative group">
                <div className="absolute w-4 h-4 bg-os-bg border-2 border-os-border rounded-full -left-[41px] top-1 group-hover:bg-os-text transition-colors"></div>
                <div className="text-xs opacity-70 mb-1">commit d1c018</div>
                <h3 className="text-xl md:text-2xl font-bold uppercase cursor-pointer text-os-border group-hover:underline">Game Developer</h3>
                <p className="text-sm opacity-80 mb-3">Independent Projects • 2023 - Present</p>
                <p className="text-sm opacity-90 max-w-2xl">Developed "NetGame" (Netacad-style learning for ADHD) and "Escape" (Horror escape utilizing OOP & DSA principles).</p>
              </motion.div>

            </div>
          </div>
        </motion.section>

        {/* Projects Grid */}
        <motion.section 
          custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={windowVariants}
          id="projets" className="border-2 border-os-border bg-os-bg shadow-[8px_8px_0_0_var(--os-text)]"
        >
          <div className="border-b-2 border-os-border bg-os-header px-3 py-1 flex justify-between items-center">
            <span className="font-bold uppercase tracking-widest text-xs md:text-sm">projets.vol</span>
            <div className="flex gap-2">
              <div onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} className="w-3 h-3 border border-os-border hover:bg-os-text cursor-pointer"></div>
            </div>
          </div>
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <motion.a whileHover={itemHover} onHoverStart={() => playSound("hover")} onClick={() => playSound("click")} href="https://github.com/Kurljan/NetGame" target="_blank" className="border-2 border-os-border p-5 hover:bg-os-header transition-colors group block">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold uppercase group-hover:underline">&gt; NetGame</h3>
                  <span className="text-[10px] md:text-xs border border-os-border px-2 py-1">CODED</span>
                </div>
                <p className="text-sm opacity-80">Netacad-style learning game for people with ADHD — gamified networking concepts.</p>
              </motion.a>

              <motion.a whileHover={itemHover} onHoverStart={() => playSound("hover")} onClick={() => playSound("click")} href="https://github.com/Kurljan/Project-X" target="_blank" className="border-2 border-os-border p-5 hover:bg-os-header transition-colors group block">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold uppercase group-hover:underline">&gt; Project-X</h3>
                  <span className="text-[10px] md:text-xs border border-os-border px-2 py-1">CODED</span>
                </div>
                <p className="text-sm opacity-80">PAD Simulation System — visualizes blood flow & arterial blockages in Python.</p>
              </motion.a>

              <motion.a whileHover={itemHover} onHoverStart={() => playSound("hover")} onClick={() => playSound("click")} href="https://github.com/Kurljan/Escape" target="_blank" className="border-2 border-os-border p-5 hover:bg-os-header transition-colors group block">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold uppercase group-hover:underline">&gt; Escape</h3>
                  <span className="text-[10px] md:text-xs border border-os-border px-2 py-1">CODED</span>
                </div>
                <p className="text-sm opacity-80">Horror escape game built on OOP & DSA principles. Survive. Solve. Escape.</p>
              </motion.a>

              <motion.a whileHover={itemHover} onHoverStart={() => playSound("hover")} onClick={() => playSound("click")} href="https://github.com/Kurljan/Barangay-Health-Center-Information-System" target="_blank" className="border-2 border-os-border p-5 hover:bg-os-header transition-colors group block">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold uppercase group-hover:underline">&gt; BHC-IS</h3>
                  <span className="text-[10px] md:text-xs border border-os-border px-2 py-1">CODED</span>
                </div>
                <p className="text-sm opacity-80">Information system integrating System Architecture, IPT2, ADS & Security.</p>
              </motion.a>

            </div>
          </div>
        </motion.section>

        {/* Contact App */}
        <motion.section 
          custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={windowVariants}
          id="contact" className="border-2 border-os-border bg-os-bg shadow-[8px_8px_0_0_var(--os-text)]"
        >
          <div className="border-b-2 border-os-border bg-os-header px-3 py-1 flex justify-between items-center">
            <span className="font-bold uppercase tracking-widest text-xs md:text-sm">contact.app</span>
            <div className="flex gap-2">
              <div onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} className="w-3 h-3 border border-os-border hover:bg-os-text cursor-pointer"></div>
            </div>
          </div>
          <div className="p-6 md:p-10 flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4">&gt; Init_Connection</h3>
              <p className="text-sm opacity-80 mb-8 max-w-sm">Have an idea? Want to collaborate on something great? Let's connect and build something that matters.</p>
              <div className="space-y-4 font-bold">
                <p className="text-sm hover:underline cursor-pointer">&gt; EMAIL: <a onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} href="mailto:sumontaokerljan@gmail.com">sumontaokerljan@gmail.com</a></p>
                <p className="text-sm hover:underline cursor-pointer">&gt; GITHUB: <a onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} href="https://github.com/kurljan" target="_blank">github.com/kurljan</a></p>
                <p className="text-sm hover:underline cursor-pointer">&gt; LINKEDIN: <a onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} href="https://linkedin.com/in/kerljan" target="_blank">linkedin.com/in/kerljan</a></p>
              </div>
            </div>
            <form className="flex-1 flex flex-col gap-5 border-2 border-os-border p-6 bg-os-header" action="https://formspree.io/f/mppwajpv" method="POST">
              <input onKeyDown={() => playSound("type")} onFocus={() => playSound("hover")} type="text" name="name" placeholder="[ ENTER NAME ]" required className="bg-transparent border-b-2 border-os-border p-2 outline-none placeholder:text-os-text placeholder:opacity-50" />
              <input onKeyDown={() => playSound("type")} onFocus={() => playSound("hover")} type="email" name="email" placeholder="[ ENTER EMAIL ]" required className="bg-transparent border-b-2 border-os-border p-2 outline-none placeholder:text-os-text placeholder:opacity-50" />
              <textarea onKeyDown={() => playSound("type")} onFocus={() => playSound("hover")} name="message" placeholder="[ MESSAGE PAYLOAD ]" required rows={4} className="bg-transparent border-b-2 border-os-border p-2 outline-none placeholder:text-os-text placeholder:opacity-50 resize-none"></textarea>
              <button onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")} type="submit" className="border-2 border-os-border py-3 font-bold uppercase hover:bg-os-text hover:text-os-bg transition-colors mt-2">
                Transmit
              </button>
            </form>
          </div>
        </motion.section>

      </main>
      
      {/* Footer */}
      <footer className="border-t-2 border-os-border text-center py-6 text-xs opacity-70 mt-10">
        © 2025 Kerl Jan Sumontao. OWL-OS System Ready.
      </footer>
    </div>
  );
}
