
import { Poppins, Nunito, Pacifico } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import localFont from "next/font/local";
import { FlavorProvider } from "@/context/FlavorContext";
import SubscribePopup from "@/components/SubscribePopup";

const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const headingFont = Nunito({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-heading",
});

const scriptFont = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

const wedgesFont = localFont({
  src: "../../public/wedges.regular.ttf",
  variable: "--font-wedges",
  weight: "400",
  style: "normal",
});

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "CocoFuse. | Fun, Clean Fuel for Real Life",
  description: "Flavoured coconut water with zero nonsense. The anti-soda. The anti-sugar. The anti-boring.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} ${scriptFont.variable} ${wedgesFont.variable} font-body antialiased bg-primary-white text-accent-premium custom-cursor`}
      >
        <FlavorProvider>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
          <SubscribePopup />
        </FlavorProvider>
      </body>
    </html>
  );
}
