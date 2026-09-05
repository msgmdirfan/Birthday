import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Wind, RotateCcw, Award } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { audioManager } from '../utils/audioSynth';

export default function InteractiveCake() {
  const { cake } = birthdayData;
  const totalCandles = cake.candlesCount || 21;

  // Track lit state for all 21 candles (true = lit, false = blown out)
  const [candles, setCandles] = useState(Array(totalCandles).fill(true));
  const [isWishMade, setIsWishMade] = useState(false);

  const litCount = candles.filter(Boolean).length;
  const blownCount = totalCandles - litCount;

  const triggerConfettiCelebration = () => {
    // Stage 1: Burst from bottom center
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#fb7185', '#c084fc', '#fde047', '#f43f5e', '#ffffff'],
    });

    // Stage 2: Left and right fireworks
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fb7185', '#fde047', '#38bdf8'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#c084fc', '#f43f5e', '#fde047'],
      });
    }, 400);

    // Audio chime
    audioManager.playCelebrationChime();
  };

  const handleBlowCandle = (index) => {
    if (!candles[index]) return; // already blown

    audioManager.playCandleBlow();

    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    // If this was the last candle
    if (newCandles.filter(Boolean).length === 0) {
      setIsWishMade(true);
      triggerConfettiCelebration();
    }
  };

  const handleBlowAll = () => {
    audioManager.playCandleBlow();
    setCandles(Array(totalCandles).fill(false));
    setIsWishMade(true);
    triggerConfettiCelebration();
  };

  const handleRelight = () => {
    setCandles(Array(totalCandles).fill(true));
    setIsWishMade(false);
  };

  return (
    <section id="wish" className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-rose-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-rose-400/30 text-rose-300 text-xs font-medium uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Interactive Birthday Wish</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
          {cake.title}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-light">
          {cake.instruction}
        </p>

        {/* Status ticker */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-purple-200">
          <span>
            Flames extinguished: <strong className="text-rose-300">{blownCount}</strong> / {totalCandles}
          </span>
          {litCount > 0 && (
            <span className="animate-pulse text-amber-300">({litCount} remaining)</span>
          )}
        </div>
      </div>

      {/* The 21 Candles Interactive Cake */}
      <div className="relative max-w-2xl mx-auto py-8">
        {/* The 21 Candles Arrangement */}
        <div className="relative z-10 flex flex-wrap justify-center items-end gap-1.5 sm:gap-2.5 max-w-xl mx-auto px-4 mb-1">
          {candles.map((isLit, idx) => (
            <button
              key={idx}
              onClick={() => handleBlowCandle(idx)}
              aria-label={`Candle ${idx + 1}`}
              className="group relative flex flex-col items-center p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              {/* Flame or Smoke Puff */}
              <div className="h-7 flex items-end justify-center">
                {isLit ? (
                  <div className="w-3 h-6 bg-gradient-to-t from-orange-500 via-yellow-300 to-white rounded-full flame-active shadow-[0_0_12px_#f59e0b] group-hover:scale-125 transition-transform" />
                ) : (
                  <div className="text-[11px] smoke-puff select-none opacity-60">
                    💨
                  </div>
                )}
              </div>

              {/* Candle Wick */}
              <div className="w-0.5 h-1.5 bg-neutral-400" />

              {/* Candle Stick */}
              <div
                className={`w-2.5 sm:w-3.5 h-12 sm:h-14 rounded-t-sm shadow-md transition-all ${
                  isLit
                    ? 'bg-gradient-to-b from-rose-200 via-pink-400 to-purple-500'
                    : 'bg-gradient-to-b from-slate-600 to-slate-700 opacity-60'
                }`}
              >
                <div className="w-full h-full flex flex-col justify-between py-1 items-center">
                  <div className="w-1.5 h-0.5 bg-white/40 rounded-full" />
                  <span className="text-[8px] text-white/70 font-mono font-bold leading-none">
                    {idx + 1}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 3-Tiered Decorated Cake Body */}
        <div className="relative mx-auto max-w-lg">
          {/* Cake Tier 1 (Top) */}
          <div className="w-72 sm:w-96 mx-auto h-12 sm:h-14 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 rounded-t-2xl shadow-xl relative border-b-4 border-rose-400/50 flex items-center justify-around px-6">
            <span className="text-sm select-none">🍓</span>
            <span className="text-xs font-serif font-semibold text-rose-900 tracking-wider">
              MAKE A WISH
            </span>
            <span className="text-sm select-none">🍓</span>
            <span className="text-xs font-serif font-semibold text-rose-900 tracking-wider">
              GOPIKAA
            </span>
            <span className="text-sm select-none">🍓</span>
          </div>

          {/* Cake Tier 2 (Middle) */}
          <div className="w-84 sm:w-[28rem] mx-auto h-14 sm:h-16 bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300 rounded-t-lg shadow-2xl relative border-b-4 border-purple-400/50 flex items-center justify-center px-4">
            <div className="flex items-center gap-3">
              <span className="text-base select-none">🌸</span>
              <span className="text-sm sm:text-base font-serif font-black tracking-widest text-purple-900 uppercase">
                Happy 21st Birthday
              </span>
              <span className="text-base select-none">🌸</span>
            </div>
          </div>

          {/* Cake Tier 3 (Base) */}
          <div className="w-96 sm:w-[32rem] mx-auto h-16 sm:h-20 bg-gradient-to-r from-rose-500 via-purple-600 to-rose-500 rounded-b-3xl shadow-2xl relative flex items-center justify-center px-6 border-t-2 border-white/20">
            <div className="text-center">
              <span className="text-sm sm:text-base font-display italic font-semibold text-white tracking-widest">
                September 6, 2005 ✨ A Star Was Born
              </span>
            </div>
          </div>

          {/* Cake Stand Glass Plate */}
          <div className="w-[104%] -ml-[2%] h-4 sm:h-5 bg-white/20 backdrop-blur-md rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/30 mt-1" />
          <div className="w-36 h-8 mx-auto bg-gradient-to-b from-white/20 to-white/5 rounded-b-xl border-x border-b border-white/10" />
        </div>

        {/* Quick Action Controls */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          {litCount > 0 && (
            <button
              onClick={handleBlowAll}
              id="blow-all-candles-btn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-purple-600 shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              <Wind className="w-4 h-4 animate-bounce" />
              <span>Blow Out All 21 Candles 🌬️</span>
            </button>
          )}

          {isWishMade && (
            <button
              onClick={handleRelight}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-slate-200 glass-card hover:text-white hover:bg-white/15 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-purple-300" />
              <span>Relight Candles & Wish Again</span>
            </button>
          )}
        </div>

        {/* Revealed Birthday Wish Card */}
        {isWishMade && (
          <div className="mt-10 max-w-xl mx-auto p-8 sm:p-10 rounded-3xl glass-panel border border-amber-400/40 shadow-[0_0_50px_rgba(251,191,36,0.3)] animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 mx-auto flex items-center justify-center text-3xl shadow-lg mb-4 animate-pulse">
              ✨
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif font-black text-gradient-gold text-glow-gold mb-3">
              {cake.wishMadeTitle}
            </h3>
            <p className="text-lg sm:text-xl font-serif text-rose-200 leading-relaxed">
              {cake.wishMadeSubtitle}
            </p>
            <p className="mt-4 text-xs text-purple-200/80 italic font-light">
              Your wish has been whispered to the universe. May every single piece of it come true! ❤️
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
