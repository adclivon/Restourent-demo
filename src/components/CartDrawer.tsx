import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ArrowRight, CheckCircle2, Copy, AlertCircle, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dinein'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => {
    const addOnsTotal = (item.selectedAddOns || []).reduce((sum, a) => sum + a.pricePKR, 0);
    return acc + (item.item.pricePKR + addOnsTotal) * item.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' && subtotal < RESTAURANT_INFO.freeDeliveryThreshold ? RESTAURANT_INFO.deliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  const generateWhatsAppMessage = () => {
    let msg = `*Assalam-o-Alaikum Food Palace!* 👑\n`;
    msg += `I would like to place an order via your online website.\n\n`;
    msg += `*Order Type:* ${
      orderType === 'delivery' ? 'Home Delivery' : orderType === 'takeaway' ? 'Self Pickup / Takeaway' : 'Dine-in Pre-order'
    }\n`;
    msg += `*Customer:* ${customerName.trim() || 'Guest'}\n`;
    msg += `*Contact Phone:* ${phone.trim() || 'Provided on WhatsApp'}\n`;

    if (orderType === 'delivery') {
      msg += `*Delivery Address:* ${address.trim() || 'To be specified'}\n`;
    }

    msg += `\n*🍽️ ORDERED ITEMS:*\n`;
    cart.forEach((cItem, index) => {
      const addOns = (cItem.selectedAddOns || []).map((a) => a.name).join(', ');
      msg += `${index + 1}. *${cItem.item.name}* x ${cItem.quantity} - Rs. ${(cItem.item.pricePKR * cItem.quantity).toLocaleString()}`;
      if (cItem.spicePreference) {
        msg += ` (${cItem.spicePreference})`;
      }
      if (addOns) {
        msg += ` [Add-ons: ${addOns}]`;
      }
      if (cItem.specialNotes) {
        msg += ` _(Note: ${cItem.specialNotes})_`;
      }
      msg += `\n`;
    });

    msg += `\n*Subtotal:* Rs. ${subtotal.toLocaleString()}\n`;
    if (orderType === 'delivery') {
      msg += `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE (Special Offer)' : `Rs. ${deliveryFee}`}\n`;
    }
    msg += `*GRAND TOTAL:* Rs. ${grandTotal.toLocaleString()}\n`;

    if (notes.trim()) {
      msg += `\n*Special Kitchen Instructions:* ${notes.trim()}\n`;
    }

    msg += `\nPlease confirm preparation and estimated time. JazakAllah Khair!`;
    return msg;
  };

  const handleSendToWhatsApp = () => {
    if (cart.length === 0) {
      setValidationError('Your order basket is empty. Please add delicious dishes first.');
      return;
    }

    if (!customerName.trim()) {
      setValidationError('Please enter your name.');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      setValidationError('Please enter your delivery street address in Lahore.');
      return;
    }

    setValidationError('');
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab / app
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyOrder = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative z-10 w-full max-w-lg bg-stone-900 border-l border-stone-800 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Your Order Basket</h3>
              <p className="text-xs text-stone-400">
                {cart.length === 0 ? 'Empty basket' : `${cart.reduce((s, i) => s + i.quantity, 0)} items selected`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-stone-400 hover:text-red-400 transition-colors p-1.5"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Validation Banner */}
          {validationError && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-stone-800/80 border border-stone-700 mx-auto flex items-center justify-center text-stone-400 mb-4">
                <ShoppingBag className="w-8 h-8 text-stone-400" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-1">Your order is empty</h4>
              <p className="text-xs text-stone-400 max-w-xs mx-auto mb-6">
                Explore our menu to add mouth-watering Dum Biryani, Shinwari Karahi, and charcoal BBQ.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                {cart.map((cartItem) => {
                  const itemAddOnsTotal = (cartItem.selectedAddOns || []).reduce((sum, a) => sum + a.pricePKR, 0);
                  const itemTotal = (cartItem.item.pricePKR + itemAddOnsTotal) * cartItem.quantity;

                  return (
                    <div
                      key={cartItem.item.id}
                      className="p-3.5 bg-stone-950/70 border border-stone-800/90 rounded-xl flex items-start gap-3 justify-between"
                    >
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-800"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-white truncate">
                          {cartItem.item.name}
                        </h4>
                        <div className="text-xs text-amber-400/90 tabular-nums font-medium">
                          Rs. {cartItem.item.pricePKR.toLocaleString()} each
                        </div>

                        {cartItem.spicePreference && (
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            Spice: <span className="text-stone-300 font-medium">{cartItem.spicePreference}</span>
                          </div>
                        )}

                        {cartItem.selectedAddOns && cartItem.selectedAddOns.length > 0 && (
                          <div className="text-[11px] text-stone-400 truncate mt-0.5">
                            + {cartItem.selectedAddOns.map((a) => a.name).join(', ')}
                          </div>
                        )}

                        <div className="flex items-center gap-3 mt-2.5">
                          {/* Quantity selector */}
                          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-md">
                            <button
                              onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                              className="p-1 hover:text-amber-400 text-stone-400 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-white tabular-nums">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                              className="p-1 hover:text-amber-400 text-stone-400 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(cartItem.item.id)}
                            className="text-stone-500 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                            aria-label={`Remove ${cartItem.item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-stone-400 block font-normal">Subtotal</span>
                        <span className="font-bold text-sm text-white tabular-nums">
                          Rs. {itemTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Type Toggle */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block mb-2">
                  Order Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-amber-400 text-stone-950 font-bold border-amber-400 shadow-sm'
                        : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:bg-stone-800'
                    }`}
                  >
                    Home Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      orderType === 'takeaway'
                        ? 'bg-amber-400 text-stone-950 font-bold border-amber-400 shadow-sm'
                        : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:bg-stone-800'
                    }`}
                  >
                    Takeaway Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      orderType === 'dinein'
                        ? 'bg-amber-400 text-stone-950 font-bold border-amber-400 shadow-sm'
                        : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:bg-stone-800'
                    }`}
                  >
                    Dine-In Pre-order
                  </button>
                </div>
              </div>

              {/* Customer Delivery Details Form */}
              <div className="space-y-3 pt-2 border-t border-stone-800/80">
                <div>
                  <label className="text-xs text-stone-300 font-medium block mb-1">
                    Your Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Asad Malik"
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-300 font-medium block mb-1">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0300-1234567"
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="text-xs text-stone-300 font-medium block mb-1">
                      Delivery Address in Lahore <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House/Plot #, Street, Block, Area (e.g. House 42, Street 3, Block H, Gulberg III)"
                      className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs text-stone-300 font-medium block mb-1">
                    Special Kitchen Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra raita, less oil, ring bell twice"
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Order Cost Breakdown */}
              <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-semibold tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                </div>

                {orderType === 'delivery' && (
                  <div className="flex justify-between text-stone-300">
                    <span>Delivery Charge</span>
                    <span className="font-semibold tabular-nums">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-400">FREE (Orders &gt; Rs. 3,000)</span>
                      ) : (
                        `Rs. ${deliveryFee}`
                      )}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-white text-sm font-bold pt-2 border-t border-stone-800">
                  <span>Estimated Total</span>
                  <span className="text-amber-400 tabular-nums">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-800 bg-stone-950/90 space-y-2.5">
            <button
              onClick={handleSendToWhatsApp}
              className="w-full py-3.5 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              <span>Send Order to WhatsApp Kitchen</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={handleCopyOrder}
              className="w-full py-2.5 px-4 text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 rounded-lg border border-stone-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Order Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copy Formatted WhatsApp Message</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-stone-400 pt-1">
              Direct connection to Food Palace front desk via WhatsApp (+92 300 8451299). Cash on delivery & Bank transfer accepted.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
