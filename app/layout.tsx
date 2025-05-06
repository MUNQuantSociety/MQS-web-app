import type { Metadata } from "next";
import { Oswald } from 'next/font/google'; // Import the Oswald font
import "./globals.css";
import Navbar from "@/components/ui/navbar";

// Configure the font
const oswald = Oswald({ 
  subsets: ['latin'], // Specify subsets if needed
  weight: ['500'],    // Specify the weight(s) you want to load
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
    <html lang="en" className={oswald.className}>
      <body className="antialiased bg-black font-sans"> 
        <Navbar />
        {children}
      </body>
    </html>
  );
}