import React from 'react';
import { Calendar, Sparkles, Heart, Crown } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function Timeline() {
  const { timeline } = birthdayData;

  return (
    <section id="timeline" className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-4 mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-rose-400/30 text-rose-300 text-xs font-medium uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Life Journey</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
          {timeline.title}
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-light">
          {timeline.subtitle}
        </p>
      </div>

      {/* Vertical Timeline Structure */}
      <div className="relative">
        {/* Central glowing vertical track */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-rose-500/20 via-purple-500/50 to-amber-400/80 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.3)]" />

        <div className="space-y-12 sm:space-y-16">
          {timeline.milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            const isCurrentYear = item.year === '2026';

            return (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                } group`}
              >
                {/* Center Node / Icon Indicator */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg transition-all duration-300 shadow-xl group-hover:scale-125 ${
                      isCurrentYear
                        ? 'bg-gradient-to-br from-amber-400 to-rose-500 border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.6)] animate-bounce'
                        : 'bg-[#120924] border-rose-400/60 shadow-[0_0_15px_rgba(244,63,94,0.3)] text-white'
                    }`}
                  >
                    {isCurrentYear ? <Crown className="w-5 h-5 text-white" /> : item.icon}
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    isEven ? 'md:pr-12' : 'md:pl-12'
                  } w-full`}
                >
                  <div
                    className={`glass-card p-6 sm:p-8 rounded-3xl border transition-all duration-500 transform group-hover:-translate-y-1 ${
                      isCurrentYear
                        ? 'border-amber-400/40 bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-transparent shadow-[0_15px_40px_rgba(251,191,36,0.2)]'
                        : 'border-white/10 group-hover:border-rose-400/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-2xl sm:text-3xl font-serif font-black tracking-tight ${
                          isCurrentYear ? 'text-gradient-gold text-glow-gold' : 'text-rose-300'
                        }`}
                      >
                        {item.year}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-purple-200 border border-white/10">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2 group-hover:text-rose-200 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {item.description}
                    </p>

                    {isCurrentYear && (
                      <div className="mt-4 pt-3 border-t border-amber-400/20 flex items-center gap-2 text-xs font-semibold text-amber-300">
                        <Sparkles className="w-4 h-4" />
                        <span>Here's to celebrating Gopikaa's Golden 21st! 🎉</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
