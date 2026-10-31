import React from 'react';
import { Sparkles, Clock, CheckCircle2, HeartHandshake } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface AboutProps {
  onOpenReservation: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenReservation }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-stone-900/60 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Principles (7 cols) */}
          <div className="lg:col-span-7">
            {/* Unboxed category label */}
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Our Heritage & Philosophy
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6 text-balance">
              Three Decades of Mughal & Punjabi Culinary Mastery
            </h2>

            <div className="space-y-4 text-stone-300 text-base sm:text-lg leading-relaxed font-normal mb-8">
              <p>
                Founded in Lahore in 1994, <strong className="text-white font-medium">Food Palace</strong> was built on a single, sacred commitment: to honor the authentic slow-cooking traditions of the Indian subcontinent without shortcuts, artificial tenderizers, or commercial spice mixes.
              </p>
              <p>
                Every morning at 6:00 AM, our master <em>Ustads</em> hand-grind whole spices—wild cumin from Quetta, dried fenugreek leaves from Kasur, and saffron from Kashmir. Our clay handis are sealed with fresh whole-wheat dough to trap the gentle fragrant steam, coaxing rich bone broths and tender meats into dishes worthy of emperors.
              </p>
            </div>

            {/* 3 Pillars / Heritage Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-800 mb-8">
              <div>
                <p className="text-sm font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>8-Hour Simmering</span>
                </p>
                <p className="text-xs text-stone-400 leading-normal">
                  Authentic Nihari and Kunna Gosht slowly stewed overnight to unlock rich marrow collagen.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Pure Desi Ghee</span>
                </p>
                <p className="text-xs text-stone-400 leading-normal">
                  Cooked exclusively with artisanal churned butter and cold-pressed mustard oils.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-white mb-1 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-amber-400" />
                  <span>Royal Hospitality</span>
                </p>
                <p className="text-xs text-stone-400 leading-normal">
                  Private family cabins, dedicated majlis lounges, and celebratory banquet catering.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={onOpenReservation}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Reserve a Royal Table
              </button>
              <div className="text-xs text-stone-400">
                <span className="text-stone-200 font-medium">Head Chef:</span> Ustad Farooq Ahmed & Team
              </div>
            </div>
          </div>

          {/* Right Column: Ambiance Image & Feature Overlay (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-950 group">
              <img
                src={RESTAURANT_INFO.ambianceImage}
                alt="Food Palace Luxury Dining Room with Mughal Arches and Brass Filigree Lanterns"
                className="w-full h-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                  Ambiance & Atmosphere
                </p>
                <h3 className="font-heading text-lg font-bold">
                  Warm Brass Lanterns & Mughal Arches
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                  Designed for intimate family dinners, business lunches, and milestone celebrations with traditional Pakistani warmth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
