import React from 'react';
import { Sparkles, Heart, ChevronDown, Calendar, Clock, Star } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function Hero() {
  const { recipient } = birthdayData;

  const scrollToNext = () => {
    const nextEl = document.getElementById('message');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden"
    >
      {/* Floating balloons */}
      <div className="absolute top-1/4 left-6 sm:left-16 pointer-events-none animate-float opacity-80">
        <div className="w-14 h-18 sm:w-20 sm:h-26 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-tr from-pink-500/50 to-rose-400/80 backdrop-blur-md shadow-[0_10px_30px_rgba(244,63,94,0.3)] relative">
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-white/20" />
        </div>
      </div>
      <div className="absolute top-1/3 right-8 sm:right-20 pointer-events-none animate-float-delayed opacity-75">
        <div className="w-16 h-20 sm:w-22 sm:h-28 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-tr from-purple-500/50 to-indigo-400/80 backdrop-blur-md shadow-[0_10px_30px_rgba(147,51,234,0.3)] relative">
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-white/20" />
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-1/4 left-28 pointer-events-none animate-float-slow opacity-60">
        <div className="w-14 h-18 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-tr from-amber-400/50 to-rose-300/80 backdrop-blur-md shadow-[0_10px_30px_rgba(251,191,36,0.25)] relative">
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-14 bg-white/20" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Milestone Age Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-rose-400/30 text-rose-200 text-sm font-medium shadow-[0_0_25px_rgba(244,63,94,0.2)] animate-pulse-slow">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{recipient.ageCelebration}</span>
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
        </div>

        {/* Main Hero Greeting */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold tracking-tight">
            <span className="block text-white drop-shadow-lg">Happy Birthday,</span>
            <span className="block text-gradient-rose text-glow-rose mt-1">
              Gopikaa! 🎂💖
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-purple-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            {recipient.subtitle}
          </p>
        </div>

        {/* Prominent Visual Milestone "21" Showcase */}
        <div className="py-4">
          <div className="inline-block relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/30 via-purple-500/30 to-amber-500/30 blur-2xl rounded-3xl" />
            <div className="relative glass-card px-8 sm:px-12 py-6 rounded-3xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl sm:text-8xl font-serif font-black text-gradient-gold text-glow-gold tracking-tighter">
                  21
                </span>
                <span className="text-xl sm:text-2xl font-semibold text-rose-300">
                  Years of Magic
                </span>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/15" />
              <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-white">7,670+</span>
                  <span className="text-[11px] text-slate-300 uppercase tracking-wider">Days Lived</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-rose-300">184,000+</span>
                  <span className="text-[11px] text-slate-300 uppercase tracking-wider">Hours of Joy</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-purple-300">Infinite</span>
                  <span className="text-[11px] text-slate-300 uppercase tracking-wider">Memories</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Cake Preview */}
        <div className="relative py-2 max-w-xs mx-auto">
          <div className="flex justify-center items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((c) => (
              <div key={c} className="flex flex-col items-center">
                <div className="w-2.5 h-5 bg-gradient-to-t from-orange-400 via-yellow-300 to-white rounded-full flame-active shadow-[0_0_10px_#f59e0b]" />
                <div className="w-1.5 h-6 bg-gradient-to-b from-rose-300 to-purple-400 rounded-sm" />
              </div>
            ))}
          </div>
          {/* Cake Layers */}
          <div className="w-44 h-8 mx-auto bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 rounded-t-lg shadow-md border-b-2 border-rose-400/40 relative">
            <span className="absolute inset-x-0 bottom-1 flex justify-around text-[10px] text-rose-800">🍓 🍒 🍓</span>
          </div>
          <div className="w-56 h-10 mx-auto bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300 rounded-t-md shadow-lg border-b-2 border-purple-400/40 relative">
            <span className="absolute inset-x-0 bottom-1.5 flex justify-around text-[10px] text-purple-900">🌸 ✨ 🌸 ✨ 🌸</span>
          </div>
          <div className="w-68 h-12 mx-auto bg-gradient-to-r from-rose-400 via-purple-400 to-rose-400 rounded-b-xl shadow-xl flex items-center justify-center">
            <span className="text-xs font-serif font-bold text-white tracking-widest uppercase">Gopikaa • 21</span>
          </div>
          <div className="w-72 h-3 mx-auto bg-white/20 rounded-full blur-[1px] mt-1 shadow-inner" />
        </div>

        {/* Start The Journey CTA */}
        <div className="pt-4">
          <button
            onClick={scrollToNext}
            id="start-journey-btn"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base sm:text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(244,63,94,0.35)] hover:shadow-[0_0_45px_rgba(244,63,94,0.6)] bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600"
          >
            <span>Start the Journey 💌</span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
