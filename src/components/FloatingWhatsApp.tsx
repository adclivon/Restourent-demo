import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FloatingWhatsAppProps {
  onOpenCart: () => void;
  cartCount: number;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenCart, cartCount }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="relative bg-stone-900 border border-stone-700/80 text-white text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 max-w-[210px] animate-bounce-subtle">
          <span className="text-[11px] leading-tight">
            Order directly or inquire on <strong className="text-emerald-400">WhatsApp</strong>!
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-white p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-stone-900 border-r border-b border-stone-700 rotate-45" />
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Assalam-o-Alaikum%20Food%20Palace%21%20I%20would%20like%20to%20inquire%20about%20your%20menu%20and%20orders.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/60 transition-all duration-300 hover:scale-105"
        aria-label="Chat and Order on WhatsApp"
      >
        {/* Soft pulse glow */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-20 group-hover:opacity-40 blur-sm animate-pulse" />
        
        <MessageSquare className="relative z-10 w-5 h-5 fill-white" />
        <span className="relative z-10 font-bold text-xs sm:text-sm tracking-wide hidden sm:inline whitespace-nowrap">
          Order on WhatsApp
        </span>
      </a>
    </div>
  );
};
