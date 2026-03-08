"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "PaperX",
    description: "A paper trading platform for Indian markets with ₹10L virtual capital.",
    tech: "Next.js, TypeScript, Upstox API, Drizzle ORM",
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    ]
  },
  {
    title: "RedCircle",
    description: "Platform to tokenize Reddit posts as tradable assets for creators.",
    tech: "React, Node.js, Express, PostgreSQL, Reddit API",
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542382257-80dedb725088?q=80&w=800&auto=format&fit=crop",
    ]
  },
  {
    title: "ReviewIQ",
    description: "An AI platform to analyze GitHub Pull Requests with code insights.",
    tech: "React, TanStack, Express, Docker, AI API",
    images: [
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=800&auto=format&fit=crop",
    ]
  },
  {
    title: "Devbond",
    description: "Developer networking platform with real-time WebSocket communication.",
    tech: "MERN Stack, REST APIs, JWT, WebSockets",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
    ]
  }
];

export default function SelectedWork() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const panels = gsap.utils.toArray(".project-panel");
      
      panels.forEach((panel: any, i) => {
        // Setup text animation
        gsap.fromTo(panel.querySelector('.project-info'), 
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            scrollTrigger: {
              trigger: panel,
              start: "top center",
              end: "bottom center",
              toggleActions: "play reverse play reverse",
            }
          }
        );

        // Setup image stacks pinning
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "+=400%", // Much longer scroll distance for the pin so we have plenty of time to see everything
          pin: true,
          pinSpacing: true,
          id: `pin-${i}`
        });

        // Setup image crossfade within the pin
        const images = panel.querySelectorAll('.project-image');
        
        // With a 400% scroll duration, we have lots of room
        images.forEach((img: any, j: number) => {
            if(j === 0) return; // leave first image visible
            
            gsap.fromTo(img,
              { opacity: 0, scale: 1.05 },
              { 
                opacity: 1, 
                scale: 1,
                scrollTrigger: {
                  trigger: panel,
                  start: `top+=${j * 100}% top`, // trigger at 100%, 200%, 300% of the pin distance
                  end: `top+=${j * 100 + 40}% top`, // smoother fade over 40% scroll duration
                  scrub: 1, // Add easing to scrub
                }
              }
            );
        });

      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020000] text-zinc-300 w-full overflow-x-hidden pt-32">
       <div className="max-w-7xl mx-auto px-6 mb-24">
         <h2 className="text-4xl md:text-7xl font-serif font-black text-red-600 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] border-b-2 border-red-900/50 pb-8 inline-block">
            Selected Work
         </h2>
       </div>

       {projects.map((project, index) => (
         <div key={index} className="project-panel relative min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-12 border-t border-red-900/20">
            
            {/* Left Content (Text) */}
            <div className="project-info w-full md:w-1/3 flex flex-col z-10 mb-12 md:mb-0">
                <span className="text-red-700 font-mono text-sm mb-4">0{index + 1} // 04</span>
                <h3 className="text-5xl md:text-7xl font-serif font-black text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mb-6">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-lg md:text-xl mb-6 font-light">
                  {project.description}
                </p>
                <div className="text-sm font-mono text-red-500/80 uppercase tracking-wider">
                  {project.tech}
                </div>
            </div>

            {/* Right Content (Stacked Images) */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] relative rounded-xl overflow-hidden border border-red-900/30 shadow-[0_0_30px_rgba(220,38,38,0.15)] bg-[#050505]">
                {project.images.map((imgSrc, imgIndex) => (
                   <div 
                      key={imgIndex} 
                      className={`project-image absolute inset-0 w-full h-full ${imgIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
                      style={{ zIndex: imgIndex }}
                   >
                     {/* Using next/image requires adding domains to next.config.ts, so we use standard img for dummy fast prototyping */}
                     <img 
                       src={imgSrc} 
                       alt={`${project.title} slide ${imgIndex + 1}`} 
                       className="w-full h-full object-cover opacity-80 mix-blend-luminosity grayscale hover:grayscale-0 transition-opacity duration-700"
                     />
                     <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay"></div>
                   </div>
                ))}
            </div>

         </div>
       ))}
    </div>
  );
}
