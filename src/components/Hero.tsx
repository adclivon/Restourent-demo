import React from 'react';
import { ArrowRight, MessageSquare, Calendar, ShieldCheck, Flame, Award, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenCart }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end pt-28 pb-12 overflow-hidden bg-stone-950">
      {/* Background Image Layer with Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESTAURANT_INFO.heroImage}
          alt="Food Palace Royal Pakistani Feast Spread with Dum Biryani, Karahi, and Charcoal Kebabs"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        {/* Multi-layered cinematic gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/50 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Quiet clean metadata kicker - NO PILL */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400 mb-3">
            <span>Gulberg III · Lahore</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>Established 1994</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>100% Halal Hand-Slaughtered</span>
          </div>

          {/* Hero Headline with text-wrap: balance */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-5 text-balance">
            The Royal Taste of <span className="italic text-amber-400 font-normal">Authentic Pakistan</span>
          </h1>

          {/* Subtitle with measure constraint */}
          <p className="text-base sm:text-lg text-stone-200 leading-relaxed mb-8 max-w-2xl font-normal">
            Handcrafted Dum Biryanis infused with Kashmiri saffron, sizzling Shinwari Karahis in pure desi butter, and tender charcoal BBQ prepared with secret slow-roasted spices of Lahore.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-12">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Explore Royal Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg shadow-lg shadow-emerald-950/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Order via WhatsApp</span>
            </button>

            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-stone-200 bg-stone-900/80 hover:bg-stone-800/90 border border-stone-700/80 rounded-lg backdrop-blur-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book Table</span>
            </button>
          </div>
        </div>

        {/* Adjacency & Proof Strip - Full Width Strip below hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-stone-800/80 text-stone-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">Certification</p>
              <p className="text-sm font-semibold text-white">100% Halal Verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">Tandoor & Pit</p>
              <p className="text-sm font-semibold text-white">Natural Charcoal Grill</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">Heritage Recipe</p>
              <p className="text-sm font-semibold text-white">30+ Years Legacy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">Customer Love</p>
              <p className="text-sm font-semibold text-white tabular-nums">4.9★ (2,840+ Reviews)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
