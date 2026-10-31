import React from 'react';
import { Utensils, Phone, Mail, MapPin, MessageSquare, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation, onOpenCart }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                Food Palace
              </span>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Celebrating genuine Mughal and Lahori culinary heritage since 1994. Freshly ground spices, slow Dum cooking, and uncompromising Halal authenticity.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 rounded-lg transition-colors text-xs font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Kitchen Desk</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-white font-semibold uppercase tracking-wider text-xs">
              Quick Links
            </p>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">Our Heritage</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">Full Food Menu</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">Palace Gallery</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">Diner Reviews</a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">Google Maps & Hours</a>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Table Reservation
                </button>
              </li>
            </ul>
          </div>

          {/* Timings & Service (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-white font-semibold uppercase tracking-wider text-xs">
              Service Hours
            </p>
            <div className="space-y-2 text-stone-400 text-xs">
              <div>
                <span className="text-stone-200 block font-medium">Lunch Service</span>
                <span>{RESTAURANT_INFO.timings.lunchService}</span>
              </div>
              <div>
                <span className="text-stone-200 block font-medium">Dinner & BBQ</span>
                <span>{RESTAURANT_INFO.timings.dinnerService}</span>
              </div>
              <div>
                <span className="text-stone-200 block font-medium">Weekends</span>
                <span className="text-amber-400">{RESTAURANT_INFO.timings.weekends}</span>
              </div>
            </div>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-white font-semibold uppercase tracking-wider text-xs">
              Restaurant Front Desk
            </p>
            <div className="space-y-2 text-stone-400 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-900 bg-stone-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-stone-400">
          <p>
            © {new Date().getFullYear()} Food Palace Restaurant. All rights reserved. 100% Halal Certified.
          </p>
          <div className="flex items-center gap-4">
            <span>Crafted with Authentic Lahori Taste</span>
            <span aria-hidden="true">·</span>
            <span>Netlify Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
