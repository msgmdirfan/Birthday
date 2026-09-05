import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function ThingsAboutYou() {
  const { thingsAboutYou } = birthdayData;
  const [activeCardId, setActiveCardId] = useState(null);

  const toggleCard = (id) => {
    setActiveCardId(activeCardId === id ? null : id);
  };

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-rose-400/30 text-rose-300 text-xs font-medium uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-rose-300" />
          <span>8 Priceless Qualities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
          {thingsAboutYou.title}
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-light">
          {thingsAboutYou.subtitle}
        </p>
        <p className="text-xs text-rose-300/80 italic">
          Hover over the cards to feel their magic, or tap to read the deeper note ✨
        </p>
      </div>

      {/* Interactive Floating Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {thingsAboutYou.cards.map((card, idx) => {
          const isFlipped = activeCardId === card.id;

          return (
            <div
              key={card.id}
              onClick={() => toggleCard(card.id)}
              style={{ animationDelay: `${idx * 150}ms` }}
              className={`group cursor-pointer glass-card rounded-2xl p-6 border border-white/10 transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 hover:border-rose-400/50 hover:shadow-[0_15px_35px_rgba(244,63,94,0.25)] flex flex-col justify-between min-h-[220px] relative overflow-hidden select-none ${
                isFlipped ? 'ring-2 ring-rose-400/60 bg-white/10' : ''
              }`}
            >
              {/* Subtle card glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Top Emoji Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner">
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-rose-200 transition-colors mb-2">
                  {card.title}
                </h3>

                {/* Highlight Badge */}
                <span className="inline-block text-[11px] font-medium text-purple-300 bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/20 mb-3">
                  {card.highlight}
                </span>

                {/* Deep note */}
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card Footer indicator */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-rose-300/80 font-medium">#{card.id} Quality</span>
                <span className="text-purple-300 group-hover:translate-x-1 transition-transform">
                  Tap to feel ❤️
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
