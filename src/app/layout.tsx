import type { Metadata } from 'next';
import ClientSideWrapper from './ClientSideWrapper';
import { Inter } from 'next/font/google';
import './globals.css';
import Grid from '../app/layout/header';
import Footer from '../app/layout/footer';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '',
  description: 'Generated by create next app',
  icons: {
    icon: '/next.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>
            <Grid />
          </h1>
        </header>
        <ClientSideWrapper>
          {' '}
          <main>{children}</main>{' '}
        </ClientSideWrapper>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
