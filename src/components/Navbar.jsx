import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      const sections = [
        'hero',
        'message',
        'about',
        'wish',
        'secret',
        'final',
      ];

      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4 sm:gap-8 max-w-4xl w-full ${
          isScrolled
            ? 'glass-panel bg-[#0b0716]/80 shadow-[0_8px_30px_rgba(0,0,0,0.6)] border-white/15'
            : 'bg-white/5 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 text-left group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-purple-500 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div className="hidden sm:block">
            <span className="font-serif font-bold text-sm sm:text-base text-white group-hover:text-rose-300 transition-colors">
              Gopikaa
            </span>
            <span className="text-[10px] block text-purple-300 -mt-1 font-medium">
              Turns 21 ✨
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {birthdayData.navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <button
                key={link.label}
                onClick={() => scrollToSection(sectionId)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white font-semibold bg-white/15 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-rose-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSection('wish')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Make a Wish</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
            id="mobile-nav-toggle"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 z-50 glass-card bg-[#120924]/95 p-6 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-2xl pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-2 gap-3">
            {birthdayData.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(sectionId)}
                  className={`p-3 rounded-xl text-sm font-medium text-left transition-all ${
                    isActive
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
