export type SpiceLevel = 'Mild' | 'Medium' | 'Spicy' | 'Extra Spicy';

export interface MenuItem {
  id: string;
  name: string;
  urduName: string;
  category: 'biryani' | 'karahi' | 'bbq' | 'curries' | 'tandoor' | 'desserts_drinks';
  categoryLabel: string;
  pricePKR: number;
  description: string;
  portion: string;
  spiceLevel: SpiceLevel;
  image: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  preparationTime: string;
  calories?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  spicePreference?: SpiceLevel;
  specialNotes?: string;
  selectedAddOns?: { name: string; pricePKR: number }[];
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
  verifiedVisit: boolean;
}

export interface ReservationDetails {
  fullName: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: 'royal_hall' | 'family_cabin' | 'terrace' | 'vip_majlis';
  specialOccasion?: string;
  specialRequests?: string;
}
