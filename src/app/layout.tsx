import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { CaseDialogProvider } from "@/components/case-dialog";
import { ReelProvider } from "@/components/media";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/data";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "The Performance TV Agency — InterMedia",
    template: "%s — InterMedia",
  },
  description: site.description,
  icons: { icon: "/brand/intermedia-original.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f4f6f8] text-[#10141d]">
        <ReelProvider>
          <CaseDialogProvider>
            <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[120] focus:bg-white focus:px-4 focus:py-2">
              Skip to content
            </a>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
              {children}
            </main>
            <SiteFooter />
          </CaseDialogProvider>
        </ReelProvider>
      </body>
    </html>
  );
}
