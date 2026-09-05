import React, { useState, useEffect, useRef } from 'react';
import { Camera, Plus, X, Heart, MapPin, Calendar, Sparkles, ZoomIn, Upload } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function MemoryGallery() {
  const { memories } = birthdayData;
  const [memoryList, setMemoryList] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const fileInputRef = useRef(null);

  // New Memory Form State
  const [newCaption, setNewCaption] = useState('');
  const [newPlace, setNewPlace] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gopikaa_birthday_memories');
    if (saved) {
      try {
        setMemoryList(JSON.parse(saved));
        return;
      } catch (e) {
        console.error(e);
      }
    }
    setMemoryList(memories.items);
  }, [memories.items]);

  const saveMemories = (items) => {
    setMemoryList(items);
    localStorage.setItem('gopikaa_birthday_memories', JSON.stringify(items));
  };

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!newImage && !newCaption) return;

    const newItem = {
      id: Date.now(),
      caption: newCaption || "Another unforgettable moment with Gopikaa 🌸",
      place: newPlace || "Special Place",
      date: newDate || "2026",
      image: newImage || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      note: "Saved to your personal birthday memory box."
    };

    const updated = [newItem, ...memoryList];
    saveMemories(updated);
    setShowAddModal(false);
    setNewCaption('');
    setNewPlace('');
    setNewDate('');
    setNewImage('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setNewImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset back to default memories?")) {
      localStorage.removeItem('gopikaa_birthday_memories');
      setMemoryList(memories.items);
    }
  };

  return (
    <section id="memories" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-purple-400/30 text-purple-300 text-xs font-medium uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Unforgettable Moments</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
          {memories.title}
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light">
          {memories.subtitle}
        </p>

        {/* Action buttons: Add Memory */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            id="add-memory-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-purple-600 shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add / Replace Memories</span>
          </button>
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2 rounded-full text-xs text-slate-400 hover:text-white glass-card transition-colors"
          >
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Masonry / Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {memoryList.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedMemory(item)}
            className="group cursor-pointer glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-rose-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(244,63,94,0.2)] flex flex-col"
          >
            {/* Image Container with Hover Zoom */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-950/40">
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0716] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-6 h-6 text-rose-300" />
                </span>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-purple-200 border border-white/10">
                <Calendar className="w-3 h-3 text-purple-300" />
                <span>{item.date}</span>
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-rose-300 font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.place}</span>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-rose-200 transition-colors">
                  {item.caption}
                </h3>
              </div>

              {item.note && (
                <p className="text-xs text-slate-300 line-clamp-2 font-light italic">
                  "{item.note}"
                </p>
              )}

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] text-purple-300/80">Memory #{index + 1}</span>
                <span className="inline-flex items-center gap-1 text-rose-300">
                  <Heart className="w-3 h-3 fill-rose-300" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="relative max-w-3xl w-full glass-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-rose-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/40 mb-4">
              <img
                src={selectedMemory.image}
                alt={selectedMemory.caption}
                className="w-full h-full object-contain sm:object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs text-purple-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedMemory.place}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedMemory.date}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {selectedMemory.caption}
              </h3>
              {selectedMemory.note && (
                <p className="text-sm sm:text-base text-slate-300 font-light italic">
                  "{selectedMemory.note}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="relative max-w-lg w-full glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-rose-400" />
                <h3 className="text-xl font-serif font-bold text-white">Add Your Memory</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemory} className="space-y-4">
              {/* Photo Input (Upload or URL) */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Memory Photo
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste image URL..."
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl glass-card text-xs font-semibold text-rose-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                {newImage && (
                  <div className="mt-2 w-full h-32 rounded-xl overflow-hidden border border-white/15">
                    <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. That one day we laughed until our stomachs hurt 😂"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              {/* Place & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Place / Event
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Our Favorite Spot"
                    value={newPlace}
                    onChange={(e) => setNewPlace(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Date / Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Summer 2024"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-purple-600 shadow-md hover:scale-105 transition-all"
                >
                  Save to Gallery 💖
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
