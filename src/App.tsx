import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { DishDetailModal } from './components/DishDetailModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CartItem, MenuItem, SpiceLevel } from './types';

export default function App() {
  // Load initial cart from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fp_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('fp_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartItemIds = new Set(cart.map((c) => c.item.id));

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        {
          item,
          quantity: 1,
          spicePreference: item.spiceLevel,
          selectedAddOns: [],
        },
      ];
    });
  };

  const handleAddToCartWithOptions = (
    item: MenuItem,
    spicePreference: SpiceLevel,
    selectedAddOns: { name: string; pricePKR: number }[],
    specialNotes: string,
    quantity: number
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (c) =>
          c.item.id === item.id &&
          c.spicePreference === spicePreference &&
          JSON.stringify(c.selectedAddOns) === JSON.stringify(selectedAddOns) &&
          c.specialNotes === specialNotes
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          item,
          quantity,
          spicePreference,
          selectedAddOns,
          specialNotes,
        },
      ];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.item.id === itemId ? { ...c, quantity: newQuantity } : c))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'PKR' ? 'USD' : 'PKR'));
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* About Heritage Section */}
        <About
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* Menu & Pricing Section */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenDishDetail={(item) => setSelectedDish(item)}
          currency={currency}
          onToggleCurrency={handleToggleCurrency}
          cartItemIds={cartItemIds}
        />

        {/* Photo Gallery Section */}
        <GallerySection />

        {/* Customer Reviews & Feedback */}
        <ReviewsSection />

        {/* Google Maps & Location Section */}
        <LocationSection />

        {/* Contact, Banquets & FAQs Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileBottomBar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart & WhatsApp Ordering Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Dish Particulars & Customization Modal */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCartWithOptions={handleAddToCartWithOptions}
        currency={currency}
      />
    </div>
  );
}
