import React, { useState } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpecialMessage from './components/SpecialMessage';
import ThingsAboutYou from './components/ThingsAboutYou';
import InteractiveCake from './components/InteractiveCake';
import SecretMessage from './components/SecretMessage';
import ReasonGenerator from './components/ReasonGenerator';
import FinalSection from './components/FinalSection';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0716] text-slate-100 relative overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      {/* Dynamic Background Effects Canvas */}
      <BackgroundEffects />

      {/* Cinematic Opening Screen Overlay */}
      {!hasEntered ? (
        <IntroScreen onEnter={() => setHasEntered(true)} />
      ) : (
        /* Main Interactive Website */
        <main className="relative z-10 animate-in fade-in duration-1000">
          <Navbar />
          <Hero />
          <SpecialMessage />
          <ThingsAboutYou />
          <InteractiveCake />
          <SecretMessage />
          <ReasonGenerator />
          <FinalSection />
          <MusicPlayer />
        </main>
      )}
    </div>
  );
}
