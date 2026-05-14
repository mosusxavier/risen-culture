import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/ui/CartDrawer';
import CustomCursor from '@/components/ui/CustomCursor';

export const metadata: Metadata = {
  title: {
    default: 'RISEN CULTURE | He Rose. So Do We.',
    template: '%s | RISEN CULTURE',
  },
  description: 'Risen Culture – Christian streetwear for the bold generation. Premium faith-inspired apparel including graphic tees, hoodies and limited drops. He Rose. So Do We.',
  keywords: ['Christian streetwear', 'faith apparel', 'Christian t-shirts', 'Risen Culture', 'graphic tees', 'limited drops'],
  authors: [{ name: 'Risen Culture' }],
  creator: 'Risen Culture',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'RISEN CULTURE',
    title: 'RISEN CULTURE | He Rose. So Do We.',
    description: 'Christian streetwear for the bold generation. He Rose. So Do We.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RISEN CULTURE | He Rose. So Do We.',
    description: 'Christian streetwear for the bold generation.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <CustomCursor />
            <Navbar />
            <CartDrawer />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
