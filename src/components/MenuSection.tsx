import React, { useState, useMemo } from 'react';
import { Search, Plus, Flame, Clock, Sparkles, Check, Info } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenDishDetail: (item: MenuItem) => void;
  currency: 'PKR' | 'USD';
  onToggleCurrency: () => void;
  cartItemIds: Set<string>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenDishDetail,
  currency,
  onToggleCurrency,
  cartItemIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [spiceFilter, setSpiceFilter] = useState<string>('all');
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Royal Specialties' },
    { id: 'biryani', label: 'Dum Biryani & Rice' },
    { id: 'karahi', label: 'Karahi & Handi' },
    { id: 'bbq', label: 'Charcoal BBQ' },
    { id: 'curries', label: 'Slow Curries & Nihari' },
    { id: 'tandoor', label: 'Tandoor & Breads' },
    { id: 'desserts_drinks', label: 'Desserts & Chai' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.urduName.includes(searchQuery);

      let matchesSpice = true;
      if (spiceFilter === 'mild') matchesSpice = item.spiceLevel === 'Mild';
      if (spiceFilter === 'medium') matchesSpice = item.spiceLevel === 'Medium';
      if (spiceFilter === 'spicy') matchesSpice = item.spiceLevel === 'Spicy';
      if (spiceFilter === 'special') matchesSpice = !!item.isChefSpecial;

      return matchesCategory && matchesSearch && matchesSpice;
    });
  }, [selectedCategory, searchQuery, spiceFilter]);

  const formatPrice = (pricePKR: number) => {
    if (currency === 'USD') {
      const usd = (pricePKR / 278).toFixed(2);
      return `$${usd}`;
    }
    return `Rs. ${pricePKR.toLocaleString()}`;
  };

  const handleAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedItemEffect(item.id);
    setTimeout(() => {
      setAddedItemEffect(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-20 lg:py-28 bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            The Royal Culinary Menu
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 text-balance">
            Authentic Recipes, Sizzling Flavors & Honest Pricing
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Every dish is prepared fresh upon order using premium halal cuts, aged basmati rice, and authentic stone-ground spices. Order online via WhatsApp or dine with us.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-5 mb-10">
          {/* Category Tabs (Segmented Control - functional buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-stone-900/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Search, Spice/Special filter, Currency toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-stone-800/80">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Biryani, Karahi, Kebabs, or ingredients..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-900 border border-stone-800 rounded-lg text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Filter Pills & Currency */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setSpiceFilter('all')}
                  className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    spiceFilter === 'all' ? 'bg-stone-800 text-amber-400' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSpiceFilter('mild')}
                  className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    spiceFilter === 'mild' ? 'bg-stone-800 text-amber-400' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Mild
                </button>
                <button
                  onClick={() => setSpiceFilter('spicy')}
                  className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    spiceFilter === 'spicy' ? 'bg-stone-800 text-amber-400' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Spicy
                </button>
                <button
                  onClick={() => setSpiceFilter('special')}
                  className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    spiceFilter === 'special' ? 'bg-stone-800 text-amber-400' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Chef Special
                </button>
              </div>

              {/* Currency Toggle */}
              <button
                onClick={onToggleCurrency}
                className="px-3 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                title="Toggle Currency (PKR / USD)"
              >
                <span className="text-stone-400">Currency:</span>
                <span className="text-amber-400 font-bold tabular-nums">{currency}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-stone-800 rounded-2xl p-8 bg-stone-900/30">
            <p className="text-base text-stone-300 font-medium mb-2">No matching royal dishes found</p>
            <p className="text-xs text-stone-400 mb-4">Try searching for other items like &quot;Biryani&quot;, &quot;Karahi&quot;, or &quot;Naan&quot;</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSpiceFilter('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => {
              const isInCart = cartItemIds.has(item.id);
              const isJustAdded = addedItemEffect === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => onOpenDishDetail(item)}
                  className="group relative bg-stone-900/90 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Lead with Food Imagery (65-70% visual prominence) */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                    <img
                      src={item.image}
                      alt={`${item.name} - ${item.description}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />

                    {/* Subtle, unboxed badge tags - NO pill badge sandwich */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-semibold text-amber-300 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-800">
                      {item.isChefSpecial && (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Sparkles className="w-3 h-3" />
                          <span>Chef Special</span>
                        </span>
                      )}
                      {!item.isChefSpecial && item.isPopular && (
                        <span className="text-amber-300">Popular</span>
                      )}
                      {!item.isChefSpecial && !item.isPopular && (
                        <span>{item.categoryLabel}</span>
                      )}
                    </div>

                    {/* Portion indicator */}
                    <div className="absolute bottom-3 left-3 text-[11px] font-medium text-stone-300 bg-stone-950/70 backdrop-blur-sm px-2 py-0.5 rounded">
                      {item.portion}
                    </div>
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Unboxed Metadata Line with typographic separators */}
                      <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
                        <span className="text-amber-500/90 font-serif text-sm font-semibold tracking-wide">
                          {item.urduName}
                        </span>
                        <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
                          <Flame className="w-3 h-3 text-amber-500" />
                          <span>{item.spiceLevel}</span>
                          <span aria-hidden="true">·</span>
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{item.preparationTime}</span>
                        </div>
                      </div>

                      {/* Primary Dish Title */}
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Pricing & Add Action Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-800/80 mt-auto">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium block">
                          Price
                        </span>
                        <span className="font-bold text-lg text-amber-400 tabular-nums">
                          {formatPrice(item.pricePKR)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDishDetail(item);
                          }}
                          className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                          title="View details & customizations"
                          aria-label={`View details for ${item.name}`}
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleAdd(e, item)}
                          className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : isInCart
                              ? 'bg-stone-800 hover:bg-stone-700 text-amber-400 border border-amber-500/30'
                              : 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-sm'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{isInCart ? 'Add More' : 'Add to Order'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
