import { GeistSans } from 'geist/font/sans';
import { Antonio, Kalnia, Outfit, Rethink_Sans, Staatliches } from 'next/font/google';

export const geistSans = GeistSans;

export const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const kalnia = Kalnia({
  subsets: ['latin'],
  display: 'swap',
});

export const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
});

export const staatliches = Staatliches({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const antonio = Antonio({
  subsets: ['latin'],
  display: 'swap',
});
