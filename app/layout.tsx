import type { Metadata } from "next";
//import {Abril_Fatface, Nunito, Noto_Sans, Roboto, Montserrat, Rubik, Josefin_Sans, } from 'next/font/google';
import { Lato} from 'next/font/google'; 

import "./globals.css";
import Navbar from "@/components/ui/navbar";

// Configure the font
const mqsFont = Lato({ 
  subsets: ['latin'], // Specify subsets if needed
  weight: ['400'],    // Specify the weight(s) you want to load
  display: 'swap',    // Optional: keeps text visible while font loads
});

export const metadata: Metadata = {
  title: "MUN QUANT SOCIETY",
  description: "Student quantitative finance club and society at Memorial University of Newfoundland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply the font className to the html tag
    <html lang="en" className={mqsFont.className}>
      <body className="antialiased bg-black font-sans"> 
        <Navbar />
        {children}
      </body>
    </html>
  );
}
