import React, { useState } from 'react';
import { Lock, Unlock, Mail, Heart, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { audioManager } from '../utils/audioSynth';

export default function SecretMessage() {
  const { secretMessage } = birthdayData;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      audioManager.playUnlockSound();
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="secret" className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-purple-400/30 text-purple-300 text-xs font-medium uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5" />
          <span>Private & Confidential</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
          {secretMessage.heading}
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-lg mx-auto font-light">
          A sealed personal note reserved exclusively for your eyes.
        </p>
      </div>

      {/* Sealed Envelope / Unlocked Letter Container */}
      <div className="relative max-w-2xl mx-auto">
        {!isOpen ? (
          /* Sealed Envelope Presentation */
          <div
            onClick={handleToggle}
            className="cursor-pointer group glass-panel p-10 sm:p-14 rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-rose-400/50"
          >
            {/* Envelope flap visual */}
            <div className="w-full h-32 border-b-2 border-dashed border-white/20 mb-8 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 shadow-[0_0_30px_rgba(244,63,94,0.4)] group-hover:rotate-12 transition-transform duration-500">
                <div className="w-full h-full rounded-full bg-[#160b29] flex items-center justify-center text-rose-300">
                  <Lock className="w-8 h-8 group-hover:scale-110 transition-transform text-amber-300" />
                </div>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Sealed with affection
            </h3>
            <p className="text-sm text-slate-300 font-light mb-8 max-w-sm mx-auto">
              Tap the wax seal below to break the stamp and read what's inside.
            </p>

            <button
              id="open-secret-btn"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-rose-500 via-purple-600 to-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.4)] group-hover:shadow-[0_0_40px_rgba(244,63,94,0.7)] hover:scale-105 active:scale-95 transition-all"
            >
              <Unlock className="w-5 h-5 text-amber-300" />
              <span>{secretMessage.buttonClosed}</span>
            </button>
          </div>
        ) : (
          /* Unfolded Parchment Letter Presentation */
          <div className="glass-panel p-8 sm:p-12 md:p-16 rounded-3xl border border-amber-300/30 shadow-[0_30px_70px_rgba(0,0,0,0.7)] text-left relative overflow-hidden animate-in fade-in zoom-in-95 duration-500 bg-gradient-to-b from-[#180e2b]/95 to-[#120822]/95">
            {/* Top decorative badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
              <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>Personal Letter • Gopikaa</span>
              </div>
              <button
                onClick={handleToggle}
                className="text-xs text-slate-400 hover:text-white glass-card px-3 py-1 rounded-full transition-colors"
              >
                {secretMessage.buttonOpened}
              </button>
            </div>

            {/* Salutation */}
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gradient-rose mb-6">
              {secretMessage.salutation}
            </h3>

            {/* Letter Paragraphs */}
            <div className="space-y-4 text-slate-200 text-base sm:text-lg font-light leading-relaxed">
              {secretMessage.letterBody.map((line, idx) => {
                const isShort = line.startsWith('Keep') || line.startsWith('Happy Birthday');
                return (
                  <p
                    key={idx}
                    className={
                      isShort
                        ? 'font-medium text-rose-200 text-lg sm:text-xl py-0.5'
                        : 'text-slate-200'
                    }
                  >
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Handwritten Signature */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="font-handwriting text-2xl sm:text-4xl text-rose-300 tracking-wide font-bold">
                {secretMessage.signature}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>September 6, 2026</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
