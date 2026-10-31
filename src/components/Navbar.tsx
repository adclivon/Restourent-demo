import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Utensils, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800 shadow-xl py-3.5'
          : 'bg-gradient-to-b from-stone-950/90 via-stone-950/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
          <a
            href="#"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
            aria-label="Food Palace Home"
          >
            <div className="w-9 h-9 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-500/20 transition-all">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Food Palace
              </span>
            </div>
          </a>

          {/* Zone 2: Clean 4–5 single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
            <a
              href="#about"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Our Heritage
            </a>
            <a
              href="#menu"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Menu & Pricing
            </a>
            <a
              href="#gallery"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Palace Gallery
            </a>
            <a
              href="#reviews"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Guest Reviews
            </a>
            <a
              href="#location"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Find Us
            </a>
            <a
              href="#contact"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Cart affordance */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Table Reservation Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm hover:shadow-amber-500/20 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            {/* Shopping Cart / WhatsApp Order Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 hover:text-amber-400 hover:border-amber-500/40 transition-colors cursor-pointer"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold flex items-center justify-center tabular-nums shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-800 bg-stone-950/98 backdrop-blur-xl px-5 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col gap-3.5 text-base font-medium text-stone-300 mb-5">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-stone-900 hover:text-amber-400 transition-colors"
            >
              Our Heritage
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-stone-900 hover:text-amber-400 transition-colors"
            >
              Menu & Pricing
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-stone-900 hover:text-amber-400 transition-colors"
            >
              Palace Gallery
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-stone-900 hover:text-amber-400 transition-colors"
            >
              Guest Reviews
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-stone-900 hover:text-amber-400 transition-colors"
            >
              Location & Hours
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-stone-900 hover:text-amber-400 transition-colors"
            >
              Contact & Catering
            </a>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold uppercase tracking-wider text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Reserve a Table
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full py-2.5 px-4 text-center text-sm font-medium text-stone-300 bg-stone-900 hover:bg-stone-800 rounded-lg border border-stone-800 flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Front Desk: {RESTAURANT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
