import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('4');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('20:00');
  const [seatingArea, setSeatingArea] = useState('family_cabin');
  const [occasion, setOccasion] = useState('Family Dinner');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `FP-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setStep('confirmed');
  };

  const handleSendReservationToWhatsApp = () => {
    let msg = `*Assalam-o-Alaikum Food Palace!* 👑\n`;
    msg += `I would like to confirm my table reservation request:\n\n`;
    msg += `*Booking Reference:* ${bookingRef}\n`;
    msg += `*Name:* ${name}\n`;
    msg += `*Phone:* ${phone}\n`;
    msg += `*Guests:* ${guests} People\n`;
    msg += `*Date:* ${date}\n`;
    msg += `*Time:* ${time}\n`;
    msg += `*Seating Area:* ${
      seatingArea === 'family_cabin'
        ? 'Private Family Cabin'
        : seatingArea === 'royal_hall'
        ? 'Royal Grand Hall'
        : seatingArea === 'terrace'
        ? 'Outdoor Courtyard'
        : 'VIP Majlis Pavilion'
    }\n`;
    msg += `*Occasion:* ${occasion}\n`;
    if (specialRequests.trim()) {
      msg += `*Notes:* ${specialRequests.trim()}\n`;
    }
    msg += `\nPlease confirm table availability. Thank you!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const resetAndClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
        onClick={resetAndClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">
                Reserve a Royal Table
              </h3>
              <p className="text-xs text-stone-400">
                Experience authentic Mughal & Punjabi dining at Food Palace
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            {/* Row 1: Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Jamil"
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  WhatsApp / Contact Phone <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0300 8451299"
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Row 2: Guests, Date, Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Guests <span className="text-amber-400">*</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="2">2 Guests (Couple)</option>
                  <option value="4">4 Guests (Family)</option>
                  <option value="6">6 Guests</option>
                  <option value="8">8 Guests (Large Family)</option>
                  <option value="12">12 Guests</option>
                  <option value="16">16+ Guests (Banquet)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Reservation Date <span className="text-amber-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Time Slot <span className="text-amber-400">*</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="14:00">02:00 PM (Lunch)</option>
                  <option value="19:30">07:30 PM (Dinner)</option>
                  <option value="20:30">08:30 PM (Dinner)</option>
                  <option value="21:30">09:30 PM (Dinner)</option>
                  <option value="22:30">10:30 PM (Late Night)</option>
                </select>
              </div>
            </div>

            {/* Row 3: Seating preference */}
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                Preferred Seating Pavilion
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'family_cabin', label: 'Family Cabin' },
                  { id: 'royal_hall', label: 'Grand Royal Hall' },
                  { id: 'terrace', label: 'Courtyard Terrace' },
                  { id: 'vip_majlis', label: 'VIP Majlis Lounge' },
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSeatingArea(area.id)}
                    className={`py-2 px-2 text-[11px] font-medium rounded-lg border text-center transition-all cursor-pointer ${
                      seatingArea === area.id
                        ? 'bg-amber-400 text-stone-950 font-bold border-amber-400'
                        : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:bg-stone-800'
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 4: Occasion & Special Requests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Casual Dinner">Casual Family Dinner</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Wedding Anniversary">Wedding Anniversary</option>
                  <option value="Corporate Executive Dinner">Corporate Dinner</option>
                  <option value="Dawat / Feasting">Special Dawat</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. guest@example.com"
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                Special Dietary or Seating Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. High chair for toddler, corner table, birthday cake presentation"
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                Confirm Royal Reservation
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Ticket View */
          <div className="p-6 text-center space-y-5 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Reservation Confirmed
              </span>
              <h3 className="font-heading text-2xl font-bold text-white mt-1">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Your royal table has been recorded with booking reference:
              </p>
            </div>

            {/* Ticket Card */}
            <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl text-left space-y-2 text-xs max-w-md mx-auto">
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Reference:</span>
                <span className="font-mono font-bold text-amber-400">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Guest Name:</span>
                <span className="font-semibold text-white">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Date & Time:</span>
                <span className="font-semibold text-white">{date} at {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Party Size:</span>
                <span className="font-semibold text-white">{guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Pavilion:</span>
                <span className="font-semibold text-white capitalize">{seatingArea.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <button
                type="button"
                onClick={handleSendReservationToWhatsApp}
                className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Confirmation to WhatsApp Front Desk</span>
              </button>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-2.5 px-4 text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 rounded-lg border border-stone-800 transition-colors cursor-pointer"
              >
                Done / Return to Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
