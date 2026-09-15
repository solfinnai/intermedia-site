"use client";

import { ArrowLink, Eyebrow } from "@/components/brand";
import { navLinks, pathLinks, site } from "@/lib/data";
import { cn } from "cn";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [pathOpen, setPathOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setPathOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "top-0 z-50 flex min-h-[80px] items-center gap-6 px-[var(--pad)] transition-all md:min-h-[96px]",
        isHome ? "fixed inset-x-0" : "sticky",
        transparent
          ? "border-b border-transparent bg-transparent text-white"
          : "border-b border-[#d9dce3] bg-[#f4f6f8]/94 text-[#10141d] backdrop-blur-lg"
      )}
    >
      <Link href="/" className="shrink-0" aria-label="InterMedia home">
        <Image
          src={transparent ? "/brand/intermedia-white.png" : "/brand/intermedia-original.png"}
          alt={site.name}
          width={220}
          height={40}
          className="h-8 w-auto md:h-10"
          priority
        />
      </Link>

      <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Main navigation">
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-semibold"
            aria-expanded={pathOpen}
            onClick={() => setPathOpen((open) => !open)}
          >
            Find your path
            <ChevronDown className={cn("size-4 transition", pathOpen && "rotate-180")} />
          </button>
          {pathOpen ? (
            <div className="absolute top-[calc(100%+18px)] left-1/2 z-50 grid w-[min(920px,calc(100vw-4rem))] -translate-x-[35%] gap-8 rounded-b-xl border border-[#d9dce3] bg-white p-10 text-[#10141d] shadow-2xl md:grid-cols-[0.9fr_1.2fr]">
              <div>
                <Eyebrow className="text-[#002d72]">Your next move</Eyebrow>
                <h2 className="mt-5 font-heading text-3xl tracking-[-0.05em]">
                  Find a TV approach for your brand.
                </h2>
                <p className="mt-4 text-sm text-[#636a77]">Choose the starting point that fits your brand.</p>
              </div>
              <div>
                {pathLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setPathOpen(false)}
                    className="flex items-center gap-4 border-b border-[#d9dce3] px-3 py-4 hover:bg-[#e8eeff]"
                  >
                    <span className="font-heading text-xs text-[#002d72]">{item.number}</span>
                    <span>
                      <strong className="block">{item.title}</strong>
                      <small className="text-[#636a77]">{item.description}</small>
                    </span>
                    <span className="ml-auto text-xl">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative text-sm font-semibold after:absolute after:right-0 after:bottom-[-8px] after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100",
              pathname === link.href && "after:scale-x-100"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <ArrowLink
        href="/contact"
        variant={transparent ? "ghost" : "dark"}
        className="ml-auto hidden min-h-12 gap-5 px-5 lg:ml-6 lg:inline-flex"
      >
        Let’s talk
      </ArrowLink>

      <button
        type="button"
        className={cn(
          "ml-auto grid size-11 place-items-center rounded-md border lg:hidden",
          transparent ? "border-white/50 text-white" : "border-[#d9dce3]"
        )}
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMobileOpen((open) => !open)}
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {mobileOpen ? (
        <nav
          className="absolute top-full right-0 left-0 flex max-h-[calc(100dvh-80px)] flex-col overflow-auto border-b border-[#d9dce3] bg-[#f4f6f8] px-[var(--pad)] py-4 text-[#10141d] lg:hidden"
          aria-label="Mobile navigation"
        >
          {[...pathLinks, ...navLinks, { href: "/contact", label: "Let’s talk ↗" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-[#d9dce3] py-3 font-heading text-2xl tracking-[-0.04em]"
            >
              {"title" in item ? item.title : item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
