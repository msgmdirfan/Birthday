import React, { useState } from 'react';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';
import { audioManager } from '../utils/audioSynth';

export default function ReasonGenerator() {
  const { reasonsSpecial } = birthdayData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seenIndexes, setSeenIndexes] = useState(new Set([0]));
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextReason = () => {
    setIsAnimating(true);
    audioManager.playNote(523.25 + Math.random() * 200, 0.4, 0.3);

    setTimeout(() => {
      // Pick next index, preferably unvisited
      let nextIndex;
      const unvisited = reasonsSpecial
        .map((_, i) => i)
        .filter((i) => !seenIndexes.has(i));

      if (unvisited.length > 0) {
        nextIndex = unvisited[Math.floor(Math.random() * unvisited.length)];
      } else {
        do {
          nextIndex = Math.floor(Math.random() * reasonsSpecial.length);
        } while (nextIndex === currentIndex && reasonsSpecial.length > 1);
      }

      setCurrentIndex(nextIndex);
      const nextSeen = new Set(seenIndexes);
      nextSeen.add(nextIndex);
      setSeenIndexes(nextSeen);
      setIsAnimating(false);

      // Celebrate when unlocking many
      if (nextSeen.size === reasonsSpecial.length) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#fb7185', '#fde047', '#c084fc'],
        });
      }
    }, 220);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-rose-400/30 text-rose-300 text-xs font-medium uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-rose-300" />
          <span>Infinite Reasons</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Why You Mean So Much 💕
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-md mx-auto font-light">
          There are a million reasons, but here are just a few reminders of why you are completely unmatched.
        </p>
      </div>

      {/* Interactive Reason Card */}
      <div className="relative max-w-2xl mx-auto">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[220px] flex flex-col justify-between items-center relative overflow-hidden">
          {/* Subtle watermarks */}
          <div className="absolute top-4 right-4 text-white/5">
            <Sparkles className="w-16 h-16" />
          </div>

          <div className="w-full flex-1 flex items-center justify-center py-4">
            <p
              className={`text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-gradient-rose transition-all duration-300 transform ${
                isAnimating ? 'opacity-0 scale-95 -translate-y-2' : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              "{reasonsSpecial[currentIndex]}"
            </p>
          </div>

          {/* Unlock Progress */}
          <div className="pt-6 border-t border-white/10 w-full flex items-center justify-between text-xs text-slate-400">
            <span>
              Discovered: <strong className="text-rose-300">{seenIndexes.size}</strong> / {reasonsSpecial.length} reasons
            </span>
            <span className="text-purple-300/80 italic font-light">
              Tap below for another reminder ✨
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            onClick={handleNextReason}
            id="give-reason-btn"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base sm:text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(244,63,94,0.35)] hover:shadow-[0_0_45px_rgba(244,63,94,0.6)] bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600"
          >
            <RefreshCw className="w-5 h-5 text-rose-200 group-hover:rotate-180 transition-transform duration-500" />
            <span>Give Me A Reason 💖</span>
            <Heart className="w-5 h-5 text-rose-200 fill-rose-300 group-hover:scale-125 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
