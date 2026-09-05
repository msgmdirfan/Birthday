import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Upload, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audioSynth';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [trackTitle, setTrackTitle] = useState("Dreamy Birthday Piano");
  const [showControls, setShowControls] = useState(false);
  const fileInputRef = useRef(null);

  const togglePlay = () => {
    const playing = audioManager.togglePlay();
    setIsPlaying(playing);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioManager.setVolume(val);
  };

  const handleCustomFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      audioManager.loadCustomAudioFile(file);
      setIsPlaying(true);
      setTrackTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Expanded Controls Card */}
      {showControls && (
        <div className="mb-3 glass-panel p-4 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-2xl w-64 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5 text-xs text-rose-300 font-semibold">
              <Music className="w-3.5 h-3.5" />
              <span>Soundtrack</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-purple-200">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>

          <p className="text-xs text-slate-200 truncate font-medium">
            🎵 {trackTitle}
          </p>

          {/* Volume Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-400"
            />
          </div>

          {/* Replace Song Button */}
          <div className="pt-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl glass-card text-[11px] text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Upload className="w-3 h-3 text-rose-300" />
              <span>Use My Own Song (MP3)</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleCustomFile}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Floating Pill Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          id="music-toggle-btn"
          aria-label="Toggle background music"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-full glass-card border shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
            isPlaying
              ? 'border-rose-400/50 bg-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
              : 'border-white/15 bg-white/10 hover:border-white/30'
          }`}
        >
          {isPlaying ? (
            <>
              {/* Equalizer animation bars */}
              <div className="flex items-end gap-0.5 h-4 w-4">
                <span className="w-1 bg-rose-400 rounded-full eq-bar-1" />
                <span className="w-1 bg-purple-400 rounded-full eq-bar-2" />
                <span className="w-1 bg-amber-400 rounded-full eq-bar-3" />
                <span className="w-1 bg-rose-300 rounded-full eq-bar-4" />
              </div>
              <span className="text-xs font-semibold text-rose-200 hidden sm:inline">
                Music Playing
              </span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-purple-300 fill-purple-300" />
              <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
                Play Music
              </span>
            </>
          )}
        </button>

        {/* Mini settings toggle */}
        <button
          onClick={() => setShowControls(!showControls)}
          aria-label="Music settings"
          className="p-2.5 rounded-full glass-card border border-white/15 text-slate-300 hover:text-white hover:border-white/30 transition-all"
        >
          <Music className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
