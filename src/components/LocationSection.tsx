import React from 'react';
import { MapPin, Clock, Phone, MessageSquare, Navigation, Car, ShieldAlert } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  // Lahore Gulberg coordinates: 31.5204° N, 74.3587° E
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=31.520370,74.358747&destination_place_id=ChIJ8_c_wV4EGTkRLgUe0o5x1gQ`;

  return (
    <section id="location" className="py-20 lg:py-28 bg-stone-900/60 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            Visit Food Palace
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 text-balance">
            Prime Gulberg Location, Open 7 Days a Week
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Conveniently situated in the heart of Lahore with dedicated valet parking, spacious royal dining halls, and fast delivery dispatch.
          </p>
        </div>

        {/* 2-Column Location & Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Details & Hours (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Address & Landmark Card */}
            <div className="p-6 bg-stone-900 border border-stone-800 rounded-2xl shadow-lg">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white mb-1">
                    Food Palace Restaurant
                  </h3>
                  <p className="text-sm text-stone-300 font-medium">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs text-stone-400">
                    {RESTAURANT_INFO.city} ({RESTAURANT_INFO.landmark})
                  </p>
                </div>
              </div>

              {/* Get Directions CTA */}
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps / Get Turn-by-Turn Directions</span>
              </a>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 bg-stone-900 border border-stone-800 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 text-white font-heading text-base font-bold mb-4">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Dining & Kitchen Timings</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-stone-800">
                  <span className="text-stone-400">Monday – Thursday</span>
                  <span className="font-semibold text-stone-200 tabular-nums">12:00 PM – 12:30 AM</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-stone-800">
                  <span className="text-stone-400">Friday – Sunday (Weekend)</span>
                  <span className="font-semibold text-amber-400 tabular-nums">12:00 PM – 01:30 AM</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-400">Delivery Kitchen Dispatch</span>
                  <span className="font-semibold text-emerald-400">Active Daily from 12 PM</span>
                </div>
              </div>
            </div>

            {/* Valet & Parking Highlight */}
            <div className="p-4 bg-stone-950/70 border border-stone-800 rounded-xl flex items-center gap-3 text-xs text-stone-300">
              <Car className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold text-white block">Complimentary Valet Parking</span>
                <span className="text-stone-400">Safe, monitored parking for up to 60 vehicles right at front entrance.</span>
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Map (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-950 min-h-[420px] relative">
            <iframe
              title="Food Palace Restaurant Lahore Location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13606.326262446755!2d74.34874747768436!3d31.52037042571732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045a55555555%3A0x8e8e8e8e8e8e8e8e!2sMain%20Blvd%20Gulberg%2C%20Gulberg%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter invert-[90%] hue-rotate-180 contrast-[1.1] opacity-95"
            />

            {/* Overlay Map Badge */}
            <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md border border-stone-800 px-4 py-2.5 rounded-xl shadow-lg pointer-events-none">
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Food Palace Gulberg</span>
              </p>
              <p className="text-[11px] text-stone-400">Main Boulevard · Lahore</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
