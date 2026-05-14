export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: 'men' | 'women' | 'unisex';
  collection: string;
  badge?: 'new' | 'sale' | 'limited';
  sizes: string[];
  colors: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
  images?: string[];
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: { name: string; size: string; qty: number; price: number }[];
  total: number;
  tracking?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'cross-graphic-tee',
    name: 'Cross Graphic Tee',
    tagline: 'Signature Series',
    price: 699,
    category: 'unisex',
    collection: 'Signature Series',
    badge: 'new',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Off-White', hex: '#f5f0eb' },
      { name: 'Burgundy', hex: '#7B1C2E' },
    ],
    rating: 5,
    reviewCount: 24,
    description: 'The quintessential Risen Culture statement piece. A bold cross graphic rendered in vintage distressed print, paired with premium 240gsm heavyweight cotton. Wear your faith boldly.',
    features: ['240gsm heavyweight cotton', 'Vintage distressed print', 'Drop shoulder fit', 'Pre-washed for softness', 'Unisex sizing'],
    icon: '✝',
    gradient: 'linear-gradient(135deg,#1a0810,#0f0608)',
    images: ['/cross-front.png', '/cross-back.png'],
  },
  {
    id: 'he-rose-oversized-tee',
    name: 'He Rose Oversized Tee',
    tagline: 'Rise Collection',
    price: 799,
    originalPrice: 949,
    discount: 15,
    category: 'unisex',
    collection: 'Rise Collection',
    badge: 'sale',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Navy', hex: '#1a2744' },
    ],
    rating: 4.8,
    reviewCount: 18,
    description: 'He Rose — and so do we. This oversized heavyweight tee is a daily reminder of resurrection power. The oversized cut gives a streetwear edge to timeless faith.',
    features: ['260gsm heavyweight cotton', 'Oversized boxy fit', 'Brushed interior for comfort', 'Ribbed crew neck', 'Screen-printed slogan'],
    icon: '↑',
    gradient: 'linear-gradient(135deg,#0f0f0f,#1a0810)',
  },
  {
    id: 'romans-6-4-scripture-tee',
    name: 'Romans 6:4 Scripture Tee',
    tagline: 'Scripture Series',
    price: 649,
    category: 'unisex',
    collection: 'Scripture Series',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Off-White', hex: '#f5f0eb' },
      { name: 'Charcoal', hex: '#3d3d3d' },
    ],
    rating: 4.9,
    reviewCount: 31,
    description: '"We were buried therefore with him by baptism into death, in order that, just as Christ was raised from the dead by the glory of the Father, we too might walk in newness of life." Romans 6:4',
    features: ['220gsm combed cotton', 'Regular fit', 'Full-chest scripture print', 'Double-stitched hem', 'Sustainable production'],
    icon: '64',
    gradient: 'linear-gradient(135deg,#1a0810,#0f0f0f)',
  },
  {
    id: 'crown-of-thorns-drop-tee',
    name: 'Crown of Thorns Drop Tee',
    tagline: 'Limited Drop',
    price: 899,
    category: 'men',
    collection: 'Limited Drops',
    badge: 'limited',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Burgundy', hex: '#7B1C2E' },
      { name: 'Black', hex: '#0a0a0a' },
    ],
    rating: 5,
    reviewCount: 9,
    description: 'A limited edition drop featuring our signature Crown of Thorns graphic — a powerful emblem of sacrifice and redemption. Once it\'s gone, it\'s gone.',
    features: ['280gsm heavyweight cotton', 'Limited run of 100 pieces', 'Embroidered logo', 'Garment-dyed finish', 'Certificate of authenticity'],
    icon: '♛',
    gradient: 'linear-gradient(135deg,#2d0d1a,#1a0810)',
  },
  {
    id: 'chosen-generation-tee',
    name: 'Chosen Generation Tee',
    tagline: 'Signature Series',
    price: 849,
    category: 'unisex',
    collection: 'Signature Series',
    badge: 'new',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Burgundy', hex: '#7B1C2E' },
      { name: 'Cognac', hex: '#5c3317' },
    ],
    rating: 5,
    reviewCount: 7,
    description: '"But you are a chosen race, a royal priesthood, a holy nation, a people for his own possession." 1 Peter 2:9. Designed for the bold generation that stands apart.',
    features: ['250gsm cotton blend', 'Slightly oversized fit', 'Front & back print', 'Enzyme washed', 'Scripture cuff detail'],
    icon: '❋',
    gradient: 'linear-gradient(135deg,#120a0e,#1a0810)',
  },
  {
    id: 'eternal-life-drop-tee',
    name: 'Eternal Life Drop Tee',
    tagline: 'Limited Drop',
    price: 999,
    category: 'unisex',
    collection: 'Limited Drops',
    badge: 'limited',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Burgundy', hex: '#7B1C2E' },
    ],
    rating: 4.8,
    reviewCount: 12,
    description: 'John 3:16 distilled into a wearable statement. The Eternal Life Drop features our most intricate screen-printed artwork yet — a cosmic cross bathed in heavenly light.',
    features: ['270gsm premium cotton', 'Limited edition', 'Multi-layer screen print', 'Mineral washed', 'Heavyweight boxy fit'],
    icon: '∞',
    gradient: 'linear-gradient(135deg,#0f0f0f,#1a0810)',
  },
  {
    id: 'grace-womens-tee',
    name: 'Grace Women\'s Tee',
    tagline: 'Women\'s Collection',
    price: 749,
    category: 'women',
    collection: 'Women\'s Collection',
    badge: 'new',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Off-White', hex: '#f5f0eb' },
      { name: 'Dusty Rose', hex: '#c0847a' },
    ],
    rating: 4.9,
    reviewCount: 15,
    description: '"For it is by grace you have been saved." A feminine-cut tee featuring delicate hand-lettered scripture art. Faith looks beautiful on you.',
    features: ['200gsm soft cotton', 'Relaxed feminine fit', 'Delicate script print', 'Satin label', 'Ethically made'],
    icon: '✦',
    gradient: 'linear-gradient(135deg,#1a0810,#2d0d1a)',
  },
  {
    id: 'faith-hoodie',
    name: 'Faith Over Fear Hoodie',
    tagline: 'Premium Collection',
    price: 1499,
    originalPrice: 1799,
    discount: 17,
    category: 'unisex',
    collection: 'Premium Collection',
    badge: 'sale',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Charcoal', hex: '#3d3d3d' },
    ],
    rating: 4.9,
    reviewCount: 22,
    description: 'When fear comes knocking, faith answers the door. Our premium heavyweight hoodie features a brushed fleece interior for warmth and an embroidered "Faith Over Fear" chest logo.',
    features: ['380gsm brushed fleece', 'Kangaroo pocket', 'Embroidered logo', 'Adjustable drawstrings', 'Ribbed cuffs & hem'],
    icon: '◈',
    gradient: 'linear-gradient(135deg,#111111,#1a0810)',
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'RC-20240112-001',
    date: '2024-01-12',
    status: 'delivered',
    items: [
      { name: 'Cross Graphic Tee', size: 'M', qty: 1, price: 699 },
      { name: 'Romans 6:4 Scripture Tee', size: 'L', qty: 2, price: 649 },
    ],
    total: 1997,
    tracking: 'IN123456789',
  },
  {
    id: 'RC-20240203-002',
    date: '2024-02-03',
    status: 'shipped',
    items: [
      { name: 'Faith Over Fear Hoodie', size: 'XL', qty: 1, price: 1499 },
    ],
    total: 1499,
    tracking: 'IN987654321',
  },
  {
    id: 'RC-20240301-003',
    date: '2024-03-01',
    status: 'processing',
    items: [
      { name: 'Crown of Thorns Drop Tee', size: 'M', qty: 1, price: 899 },
      { name: 'Chosen Generation Tee', size: 'M', qty: 1, price: 849 },
    ],
    total: 1748,
  },
];

export const REVIEWS = [
  { name: 'Arjun M.', role: 'Verified Buyer', text: 'The quality is insane for the price. The cross graphic tee is so well-made — thick, soft, and the print doesn\'t crack. My entire church group has one now!', rating: 5, avatar: 'A' },
  { name: 'Priya S.', role: 'Loyal Customer', text: 'I wore the He Rose tee to my college small group and got so many compliments. The oversized fit is perfect and the message speaks for itself. Love this brand.', rating: 5, avatar: 'P' },
  { name: 'Samuel R.', role: 'Verified Buyer', text: 'Finally a Christian streetwear brand that doesn\'t look cheesy. Risen Culture hits different — premium quality, bold designs, and ships fast too!', rating: 5, avatar: 'S' },
  { name: 'Divya K.', role: 'New Customer', text: 'The packaging alone made me feel special. The scripture tee is beautiful — the lettering is crisp and the fabric is softer than I expected. Will order again!', rating: 5, avatar: 'D' },
];
