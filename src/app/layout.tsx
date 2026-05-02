import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Cover from "@/components/Cover";
import CoverWrapper from "./CoverWrapper";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative cursor-pointer",
          geist.variable,
          geistMono.variable,
        )}
      >
        <div className="fixed inset-0 -z-20">
          {/* <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-2000 ease-in-out dark:opacity-100 opacity-0 
            
            bg-[linear-gradient(135deg,#020617_0%,#020617_25%,#0b1120_45%,#111827_65%,#1e1b4b_85%,#020617_100%)]
            "
            // style={{
            //   backgroundImage: "url('/background/black-hole-dark.jpg')",
            // }}
          /> */}

          <div className="absolute inset-0 overflow-hidden">
            {/* 🌌 Base Animated Gradient */}
            <div
              className="
      absolute inset-0 
      bg-[linear-gradient(145deg,#020617_0%,#040816_20%,#0b1120_38%,#111827_55%,#1f1b3a_70%,#2a1f4f_82%,#0f172a_92%,#020617_100%)]
      bg-[length:200%_200%]
      animate-gradient
      transition-opacity duration-[2000ms] ease-in-out
      dark:opacity-100 opacity-0
    "
            />

            {/* 🌊 Ambient Light Layer (slow moving glow) */}
            <div
              className="
      absolute inset-0 pointer-events-none
      bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.08),transparent_45%),
           radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.08),transparent_50%),
           radial-gradient(circle_at_50%_60%,rgba(20,184,166,0.06),transparent_60%)]
      animate-[pulse_8s_ease-in-out_infinite]
    "
            />

            {/* ✨ Subtle Noise Texture (pro-level finish) */}
            <div
              className="
      absolute inset-0 pointer-events-none
      opacity-[0.035]
      mix-blend-soft-light
      bg-[url('/noise.png')]
    "
            />
          </div>

          <div className="absolute inset-0 bg-white/60 dark:bg-black/50 transition-colors duration-2000" />
        </div>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[80px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={15}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>

            <CoverWrapper />
            <div className="relative z-10 max-w-3xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
