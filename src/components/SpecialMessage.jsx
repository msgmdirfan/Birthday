import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, Quote } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function SpecialMessage() {
  const { specialMessage } = birthdayData;
  const [revealedIndex, setRevealedIndex] = useState(-1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger gradual cascade of paragraphs
          specialMessage.paragraphs.forEach((_, idx) => {
            setTimeout(() => {
              setRevealedIndex((prev) => Math.max(prev, idx));
            }, idx * 350);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [specialMessage.paragraphs]);

  return (
    <section
      id="message"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 flex justify-center items-center overflow-hidden"
    >
      {/* Decorative ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full">
        {/* Section header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-rose-400/30 text-rose-300 text-xs font-medium uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-rose-300" />
            <span>From the Heart</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            {specialMessage.heading}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full mx-auto" />
        </div>

        {/* The Glassmorphism Love Letter Card */}
        <div className="glass-panel p-8 sm:p-12 md:p-16 rounded-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group">
          {/* Subtle watermarks and ornaments */}
          <div className="absolute -top-6 -right-6 text-white/5 pointer-events-none group-hover:text-rose-500/10 transition-colors duration-700">
            <Quote className="w-36 h-36 rotate-12" />
          </div>
          <div className="absolute -bottom-8 -left-8 text-white/5 pointer-events-none">
            <Heart className="w-32 h-32 fill-current -rotate-12" />
          </div>

          <div className="relative z-10 space-y-6 text-slate-200 text-lg sm:text-xl font-light leading-relaxed">
            {specialMessage.paragraphs.map((paragraph, index) => {
              const isHighlight =
                paragraph.includes('Happy Birthday, Gopikaa') ||
                paragraph.includes('celebrating YOU');

              return (
                <p
                  key={index}
                  className={`transition-all duration-700 transform ${
                    index <= revealedIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  } ${
                    isHighlight
                      ? 'text-xl sm:text-2xl font-serif font-semibold text-gradient-rose py-2'
                      : 'text-slate-200'
                  }`}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Letter Footer */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-rose-300 text-sm font-display italic">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Written with genuine love & warmth</span>
            </div>
            <div className="font-handwriting text-2xl sm:text-3xl text-rose-300 tracking-wide">
              Always by your side ❤️
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
