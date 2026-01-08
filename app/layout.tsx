import ActiveUserTracker from "@/components/shared/ActiveUserTracker";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "African Traditional Architecture",
  description: "African Traditional Architecture - Community Based Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <main className="grow">
          {/* {children} */}

          <div className="flex items-center h-screen justify-center  flex-col">
            <h1 className="text-5xl font-bold">
              website is under construction
            </h1>
            <p className="text-2xl"> Please check back soon </p>
          </div>
        </main>
        <ActiveUserTracker />
        <GoogleAnalytics gaId="G-VQ85QD16D X" />
        <Toaster richColors />
      </body>
    </html>
  );
}
