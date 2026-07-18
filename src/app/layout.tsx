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
import MyJourney from "@/components/my-journey";
import CommandPalette from "@/components/command-palette";
import DSAPanel from "@/components/dsa/DSAPanel";
import ContactSidebar from "@/components/contact-sidebar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image"
  },
  verification: {
    google: "",
    yandex: ""
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased relative cursor-pointer overflow-x-hidden w-full",
          geist.variable,
          geistMono.variable
        )}
      >
        <div className="fixed inset-0 -z-20">
          <div className="absolute inset-0 overflow-hidden bg-background ">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.025)_0%,transparent_75%)] dark:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.04)_0%,transparent_70%)]" />
            <div
              className="
                absolute inset-0 pointer-events-none
                opacity-[0.035]
                mix-blend-soft-light"
            />
          </div>

          <div className="absolute inset-0 bg-transparent transition-colors duration-2000" />
        </div>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[80px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={15}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black, transparent)"
                }}
              />
            </div>

            <div className="relative z-10 w-full max-w-3xl mx-auto py-12 pb-24 sm:py-24 px-6">
              <div className="hidden xl:block absolute right-full mr-8 top-64 bottom-12 w-[230px]">
                <div className="sticky top-64 max-h-[65vh] overflow-hidden pr-1">
                  <MyJourney />
                </div>
              </div>
              <div className="hidden xl:block absolute left-full ml-8 top-64 bottom-12 w-[230px]">
                <div className="sticky top-28 pl-1">
                  <ContactSidebar />
                </div>
              </div>
              {children}
            </div>
            <Navbar />
            <CommandPalette />
            {/* <DSAPanel /> */}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
