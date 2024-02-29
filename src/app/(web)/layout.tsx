import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import NextAuthProvider from "@/components/AuthProvider/AuthProvider";
import {NavigationEvents} from "@/components/NavigationEvents/NavigationEvents";
import Toast from "@/components/Toast/Toast";
import Script from "next/script";
import ThemeContextProvider from "@/components/ThemeProvider/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Hotelzz - Next.js",
    template: "%s | Hotelzz",
  },
  description: "This will be my biggest next.js project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/fcaebab7e7.js"
          crossOrigin="anonymous"
          strategy={`lazyOnload`}
        />
      </head>
      <body className={poppins.className}>
        <NextAuthProvider>
          <ThemeContextProvider>
            <NavigationEvents />
            <Toast />
            <main className="font-normal">
              <Header />

              {children}
              <Footer />
            </main>
          </ThemeContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
