import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { audioManager } from '../utils/audioSynth';

export default function IntroScreen({ onEnter }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { intro } = birthdayData;

  useEffect(() => {
    // Step progression timers
    const timer1 = setTimeout(() => setCurrentStep(1), 1200);
    const timer2 = setTimeout(() => setCurrentStep(2), 2600);
    const timer3 = setTimeout(() => setCurrentStep(3), 4200);
    const timer4 = setTimeout(() => setCurrentStep(4), 5800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleEnterClick = () => {
    setIsExiting(true);
    // Start gentle music on first user gesture
    audioManager.init();
    audioManager.togglePlay();
    audioManager.playCelebrationChime();

    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 transition-all duration-1000 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      } bg-[#0b0716] text-white select-none`}
    >
      {/* Ambient background aura */}
      <div className="absolute inset-0 bg-radial-aurora pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute top-16 left-1/4 animate-float opacity-30 text-rose-300">
        <Heart className="w-8 h-8 fill-rose-300" />
      </div>
      <div className="absolute bottom-24 right-1/4 animate-float-delayed opacity-30 text-purple-300">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
        {/* Step 0 & 1: Hey Gopikaa... */}
        <div
          className={`transition-all duration-1000 transform ${
            currentStep >= 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-white/10 text-rose-300 border border-rose-500/20 mb-4 backdrop-blur-md">
            A Secret Surprise
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-gradient-rose tracking-tight">
            Hey Gopikaa... 💫
          </h1>
        </div>

        {/* Step 2: I made a little something for you */}
        <div
          className={`transition-all duration-1000 transform ${
            currentStep >= 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xl sm:text-2xl text-slate-300 font-light leading-relaxed">
            I made a little something for you.
          </p>
        </div>

        {/* Step 3: Because today isn't just another day... */}
        <div
          className={`transition-all duration-1000 transform ${
            currentStep >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-lg sm:text-xl text-purple-200/80 italic font-display">
            Because today isn't just another day...
          </p>
        </div>

        {/* Step 4: It's YOUR day. ❤️ */}
        <div
          className={`transition-all duration-1000 transform ${
            currentStep >= 4
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95'
          }`}
        >
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white text-glow-rose">
            It's YOUR day. <span className="inline-block animate-pulse text-rose-500">❤️</span>
          </h2>
        </div>

        {/* Step 4: Enter Button */}
        <div
          className={`pt-8 transition-all duration-1000 delay-300 transform ${
            currentStep >= 4
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <button
            onClick={handleEnterClick}
            id="enter-surprise-btn"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base sm:text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(244,63,94,0.45)] hover:shadow-[0_0_50px_rgba(244,63,94,0.7)] bg-gradient-to-r from-rose-500 via-purple-600 to-rose-500 bg-[length:200%_auto] hover:bg-right"
          >
            <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform duration-300" />
            <span>{intro.buttonText}</span>
            <Heart className="w-5 h-5 text-rose-200 fill-rose-300 group-hover:scale-110 transition-transform duration-300" />
          </button>
          <p className="mt-4 text-xs text-slate-400 font-light tracking-wide">
            Turn your sound on for the best experience 🎵
          </p>
        </div>
      </div>
    </div>
  );
}
