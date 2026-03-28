import type { Metadata } from "next";
import { Poppins, Nunito, Pacifico } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { FlavorProvider } from "@/context/FlavorContext";

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

export const metadata: Metadata = {
  title: "CocoFuse | Fun, Clean Fuel for Real Life",
  description: "Flavoured coconut water with zero nonsense. The anti-soda. The anti-sugar. The anti-boring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} ${scriptFont.variable} font-body antialiased bg-primary-white text-accent-premium ${"custom-cursor"}`}
      >
        <FlavorProvider>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </FlavorProvider>
      </body>
    </html>
  );
}
