import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { X, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'dishes', label: 'Signature Dishes' },
    { id: 'ambiance', label: 'Royal Ambiance' },
    { id: 'tandoor', label: 'Charcoal & Tandoor' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-stone-900/40 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            Visual Culinary Experience
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 text-balance">
            Palace Moments, Tandoor Fire & Royal Feasts
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Take a glance into our kitchen craftsmanship, sizzling cast-iron karahis, and the warm Mughal hospitality that awaits you.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 cursor-pointer shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Zoom icon on hover */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-950/80 border border-stone-700 flex items-center justify-center text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-100 scale-75">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                  {photo.category}
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div
            className="fixed inset-0 bg-stone-950/90 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          />

          <div className="relative z-10 w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-950/80 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-stone-950">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-stone-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block mb-1">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-heading text-xl font-bold text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  {selectedPhoto.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-2 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
