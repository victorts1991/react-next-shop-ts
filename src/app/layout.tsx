import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";

import { ReduxProvider } from '@/providers/ReduxProvider'; 
//import { ThemeProvider } from '@/providers/ThemeProvider'; 
//import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextBookStore - Seu E-commerce de Livros", 
  description: "Um e-commerce de livros simples construído com Next.js, Redux e Context API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR"> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {/*<ThemeProvider> 
            <Navbar /> 
            {children} 
          </ThemeProvider>*/}
          {children} 
        </ReduxProvider>
      </body>
    </html>
  );
}