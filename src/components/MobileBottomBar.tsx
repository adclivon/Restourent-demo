import React from 'react';
import { Phone, MessageSquare, Utensils, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface MobileBottomBarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ cartCount, onOpenCart }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 px-3 py-2 flex items-center justify-around h-14">
      {/* 1. Call Us */}
      <a
        href={`tel:${RESTAURANT_INFO.phone}`}
        className="flex flex-col items-center justify-center text-stone-300 hover:text-amber-400 transition-colors w-16"
      >
        <Phone className="w-4 h-4 mb-0.5 text-stone-400" />
        <span className="text-[10px] font-medium">Call Us</span>
      </a>

      {/* 2. Menu */}
      <a
        href="#menu"
        className="flex flex-col items-center justify-center text-stone-300 hover:text-amber-400 transition-colors w-16"
      >
        <Utensils className="w-4 h-4 mb-0.5 text-stone-400" />
        <span className="text-[10px] font-medium">Menu</span>
      </a>

      {/* 3. WhatsApp Direct Order */}
      <a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Assalam-o-Alaikum%20Food%20Palace%21%20I%20would%20like%20to%20order.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors w-20"
      >
        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
          <MessageSquare className="w-3.5 h-3.5 fill-white" />
        </div>
        <span className="text-[10px] font-bold text-emerald-400 mt-0.5">WhatsApp</span>
      </a>

      {/* 4. Cart Drawer Trigger */}
      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center justify-center text-stone-300 hover:text-amber-400 transition-colors w-16 cursor-pointer"
        aria-label="View basket"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 mb-0.5 text-stone-400" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-amber-400 text-stone-950 text-[9px] font-bold flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium">Basket</span>
      </button>
    </div>
  );
};
