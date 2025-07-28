import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AppHeader from "./components/AppHeader";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "K3 Note",
  description: "Tvoja osobná poznámková aplikácia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased bg-white text-black `}
      >
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
