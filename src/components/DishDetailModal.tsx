import React, { useState } from 'react';
import { X, Flame, Clock, Sparkles, Plus, Check, UtensilsCrossed } from 'lucide-react';
import { MenuItem, SpiceLevel } from '../types';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCartWithOptions: (
    item: MenuItem,
    spicePreference: SpiceLevel,
    selectedAddOns: { name: string; pricePKR: number }[],
    specialNotes: string,
    quantity: number
  ) => void;
  currency: 'PKR' | 'USD';
}

const COMMON_ADDONS = [
  { name: 'Fresh Clay Tandoori Garlic Naan', pricePKR: 180 },
  { name: 'Artisan Zeera Mint Raita', pricePKR: 120 },
  { name: 'Kachumber Salad & Onion Rings', pricePKR: 100 },
  { name: 'Double Bone Marrow (Nalli) Add-on', pricePKR: 450 },
];

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCartWithOptions,
  currency,
}) => {
  if (!item) return null;

  const [spicePreference, setSpicePreference] = useState<SpiceLevel>(item.spiceLevel);
  const [selectedAddOns, setSelectedAddOns] = useState<{ name: string; pricePKR: number }[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const toggleAddon = (addon: { name: string; pricePKR: number }) => {
    if (selectedAddOns.some((a) => a.name === addon.name)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.pricePKR, 0);
  const totalPKR = (item.pricePKR + addOnsTotal) * quantity;

  const formatPrice = (pkr: number) => {
    if (currency === 'USD') {
      return `$${(pkr / 278).toFixed(2)}`;
    }
    return `Rs. ${pkr.toLocaleString()}`;
  };

  const handleAdd = () => {
    onAddToCartWithOptions(item, spicePreference, selectedAddOns, specialNotes, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Visual */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-950">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/80 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on image */}
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="text-amber-400 font-serif text-base font-semibold block mb-0.5">
                {item.urduName}
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                {item.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-400 block font-normal">Base Price</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
                {formatPrice(item.pricePKR)}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable details & options */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Quick info strip */}
          <div className="flex items-center gap-4 text-xs text-stone-400 pb-4 border-b border-stone-800">
            <span className="flex items-center gap-1.5 text-stone-300">
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              <span>Portion: <strong>{item.portion}</strong></span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Prep: <strong>{item.preparationTime}</strong></span>
            </span>
            {item.calories && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-stone-300">Calories: <strong>{item.calories}</strong></span>
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
              Dish Description & Ingredients
            </h4>
            <p className="text-stone-300 leading-relaxed text-sm">
              {item.description}
            </p>
          </div>

          {/* Spice Preference Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
              Select Desired Spice Intensity
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Mild', 'Medium', 'Spicy', 'Extra Spicy'] as SpiceLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpicePreference(level)}
                  className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    spicePreference === level
                      ? 'bg-amber-400 text-stone-950 font-bold border-amber-400 shadow-sm'
                      : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:bg-stone-800'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Complementary Add-ons */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
              Recommended Sides & Add-ons
            </label>
            <div className="space-y-2">
              {COMMON_ADDONS.map((addon) => {
                const isChecked = selectedAddOns.some((a) => a.name === addon.name);
                return (
                  <div
                    key={addon.name}
                    onClick={() => toggleAddon(addon)}
                    className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-amber-400/10 border-amber-500/40 text-white'
                        : 'bg-stone-950/40 border-stone-800 text-stone-300 hover:bg-stone-950/80'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-amber-400 border-amber-400 text-stone-950' : 'border-stone-700'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-medium">{addon.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-amber-400 tabular-nums">
                      +{formatPrice(addon.pricePKR)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Instructions Note */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-1.5">
              Special Chef Instructions
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Extra lemon wedges, no green chillies, cooked well done"
              className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Footer with quantity and Add to Order */}
        <div className="p-5 border-t border-stone-800 bg-stone-950/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400 hidden sm:inline">Quantity:</span>
            <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-stone-400 hover:text-white transition-colors"
              >
                -
              </button>
              <span className="px-3 text-sm font-bold text-white tabular-nums">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-stone-400 hover:text-white transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 sm:flex-none sm:min-w-[200px] py-3 px-5 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-lg shadow-amber-500/20'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Basket</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Basket · {formatPrice(totalPKR)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
