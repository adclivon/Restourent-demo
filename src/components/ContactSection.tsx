import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, ChevronDown, ChevronUp, CheckCircle, Send, Users } from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_FAQS } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Family Banquet',
    guestsCount: '30-50',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventType: 'Family Banquet',
        guestsCount: '30-50',
        message: '',
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contacts & Catering Form (7 cols) */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Connect With Us
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 text-balance">
              Royal Catering, Banquets & Inquiries
            </h2>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed mb-8">
              Whether you are planning a corporate lunch, wedding reception, or intimate family gathering, our event concierges are ready to assist.
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="p-4 bg-stone-900 border border-stone-800 rounded-xl hover:border-amber-500/40 transition-colors group block"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 mb-2 group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <p className="text-[11px] uppercase tracking-wider text-stone-400">Direct Line</p>
                <p className="text-xs font-semibold text-white mt-0.5">{RESTAURANT_INFO.phoneDisplay}</p>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-stone-900 border border-stone-800 rounded-xl hover:border-emerald-500/40 transition-colors group block"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-emerald-400 mb-2 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <p className="text-[11px] uppercase tracking-wider text-stone-400">WhatsApp Desk</p>
                <p className="text-xs font-semibold text-white mt-0.5">Instant Chat</p>
              </a>

              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="p-4 bg-stone-900 border border-stone-800 rounded-xl hover:border-amber-500/40 transition-colors group block"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 mb-2 group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <p className="text-[11px] uppercase tracking-wider text-stone-400">Email Desk</p>
                <p className="text-xs font-semibold text-white mt-0.5 truncate">{RESTAURANT_INFO.email}</p>
              </a>
            </div>

            {/* Catering Inquiry Form */}
            <div className="p-6 bg-stone-900/90 border border-stone-800 rounded-2xl shadow-xl">
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                Banquet & Live Degh Catering Form
              </h3>
              <p className="text-xs text-stone-400 mb-5">
                We bring live Dum Biryani deghs and tandoori setups directly to your event venue across Punjab.
              </p>

              {submitted ? (
                <div className="p-6 text-center bg-stone-950/80 rounded-xl border border-stone-800">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <h4 className="font-heading text-lg font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs text-stone-300 mt-1">
                    Our catering director will call you within 2 hours with customized royal menu packages.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-300 block mb-1">
                        Contact Person Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Imran Khan"
                        className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-300 block mb-1">
                        Phone / WhatsApp <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0321 4455667"
                        className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-300 block mb-1">
                        Event Category
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Family Banquet">Family Banquet / Dawat</option>
                        <option value="Wedding / Walima">Wedding / Mehndi / Walima</option>
                        <option value="Corporate Event">Corporate Dinner / Conference</option>
                        <option value="Birthday Party">Birthday / Private Milestone</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-300 block mb-1">
                        Expected Guests
                      </label>
                      <select
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="15-30">15 – 30 Guests</option>
                        <option value="30-50">30 – 50 Guests</option>
                        <option value="50-100">50 – 100 Guests</option>
                        <option value="100+">100+ Guests (Grand Event)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-300 block mb-1">
                      Event Date & Details
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tentative date, venue location, special dish preferences..."
                      className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Catering Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Frequently Asked Questions (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Frequently Asked Questions
            </p>
            <h3 className="font-heading text-2xl font-bold text-white mb-6">
              Dining Policies & Information
            </h3>

            <div className="space-y-3">
              {RESTAURANT_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:text-amber-400 transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-stone-300 leading-relaxed border-t border-stone-800/60 animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
