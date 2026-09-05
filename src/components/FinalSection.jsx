import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, PartyPopper, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';
import { audioManager } from '../utils/audioSynth';

export default function FinalSection() {
  const { finalSection } = birthdayData;
  const [revealedLevel, setRevealedLevel] = useState(0);
  const sectionRef = useRef(null);

  const launchGrandConfetti = () => {
    // Multi-angle fireworks
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fb7185', '#c084fc', '#fde047', '#38bdf8', '#f43f5e'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fb7185', '#c084fc', '#fde047', '#38bdf8', '#f43f5e'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    audioManager.playCelebrationChime();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Gradual cinematic reveal sequence
          setTimeout(() => setRevealedLevel(1), 400);   // One Last Thing...
          setTimeout(() => setRevealedLevel(2), 1200);  // Happy 21st Birthday, Gopikaa! 🎂❤️
          setTimeout(() => setRevealedLevel(3), 2200);  // May your smile stay bright...
          setTimeout(() => setRevealedLevel(4), 3200);  // This is just the beginning...
          setTimeout(() => {
            setRevealedLevel(5);                        // Grand Title & Heart
            launchGrandConfetti();
          }, 4200);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="final"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-transparent via-[#100824]/60 to-[#07030e]"
    >
      {/* Deep starry space radial backdrop */}
      <div className="absolute inset-0 bg-radial-aurora opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-rose-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Step 1: One Last Thing... */}
        <div
          className={`transition-all duration-1000 transform ${
            revealedLevel >= 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-rose-300 border border-rose-500/20 backdrop-blur-md">
            {finalSection.tagline}
          </span>
        </div>

        {/* Step 2: Happy 21st Birthday, Gopikaa! 🎂❤️ */}
        <div
          className={`transition-all duration-1000 transform ${
            revealedLevel >= 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white tracking-tight">
            {finalSection.highlight}
          </h2>
        </div>

        {/* Step 3: May your smile stay bright... */}
        <div
          className={`transition-all duration-1000 transform ${
            revealedLevel >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-lg sm:text-2xl text-purple-200/90 font-light max-w-2xl mx-auto leading-relaxed">
            "{finalSection.wishParagraph}"
          </p>
        </div>

        {/* Step 4: This is just the beginning of another amazing chapter. ✨ */}
        <div
          className={`transition-all duration-1000 transform ${
            revealedLevel >= 4
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-base sm:text-xl text-amber-200/80 font-display italic">
            {finalSection.chapterText}
          </p>
        </div>

        {/* Step 5: Grand Finale Heart and Title */}
        <div
          className={`pt-6 transition-all duration-1000 transform ${
            revealedLevel >= 5
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90'
          }`}
        >
          {/* Pulsing Giant Animated Heart */}
          <div className="relative inline-block my-6">
            <div className="absolute inset-0 bg-rose-500/40 blur-3xl rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_60px_rgba(244,63,94,0.7)] animate-bounce" style={{ animationDuration: '2.5s' }}>
              <Heart className="w-16 h-16 sm:w-20 sm:h-20 fill-white drop-shadow-lg" />
            </div>
          </div>

          <h3 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-gradient-rose text-glow-rose tracking-tight mt-2">
            {finalSection.grandTitle}
          </h3>

          <p className="mt-4 text-sm sm:text-base text-slate-300 font-handwriting text-2xl sm:text-3xl text-purple-200">
            Made with all the love in the universe, just for you. ✨
          </p>
        </div>

        {/* Celebratory Buttons */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={launchGrandConfetti}
            id="celebrate-again-btn"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-rose-500 to-purple-600 shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            <PartyPopper className="w-5 h-5 text-yellow-300" />
            <span>Celebrate Again! 🎉</span>
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-slate-300 glass-card hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Copyright / Love Tag */}
        <div className="pt-16 text-xs text-slate-400 font-light space-y-1">
          <p>September 6, 2005 — Forever Special</p>
          <p>A Little World Made Just for Gopikaa 💖</p>
        </div>
      </div>
    </section>
  );
}
