"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, ArrowRight, X, Linkedin, Facebook, Instagram } from "lucide-react";

type FooterLink = { label: string; href: string };

const footerLinks: Record<string, FooterLink[]> = {
  Product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Academy", href: "#" },
    { label: "Blog", href: "#" },
  ],

  Solutions: [
    { label: "Fashion Designers", href:"#" },
    { label: "Cobblers",href:"#" },
    { label: "Bestspoke Tailors", href:"#" }, 
    { label: "Ready-to-Wear", href:"#" },
  ],

  Company: [
    { label: "Contact Us", href:"#" },
    { label: "About Us", href: "#" },
    { label: "AI Info", href: "#" },
  ],

  Legal: [
    { label: "Privacy", href:"#" },
    { label: "Terms and Conditions", href:"#" },
  ],
};

const socialLinks = [
  { label: "X", href: "#", icon: X },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="bg-[#121926] text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8">
        {/* TOP: brand + link columns */}
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] md:gap-10">
          {/* Brand block */}
          <div className="space-y-6">
            {/* Logo placeholder */}
            <div className="h-10 w-10 rounded-full bg-white/90" aria-label="SilverSpoon logo" />

            <p className="max-w-md text-base leading-relaxed text-white/90 md:text-[15px]">
              Empowering fashion designers and cobblers to streamline operations, manage customers,
              and scale their brands with modern tools.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-4xl bg-white text-[#121926] transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-4">
              <p className="text-sm font-semibold text-white/55">{section}</p>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-base font-semibold text-white/95 transition hover:text-white/80"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12">
          <Separator className="bg-white/20" />
        </div>

        {/* Newsletter row */}
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Stay in the loop</h3>
            <p className="text-base text-white/75">
              Get the latest updates on features, tips, and industry insights.
            </p>
          </div>

          <form
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-full md:max-w-105">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
              <Input
                type="email"
                placeholder="Your Email Address"
                className="h-12 rounded-xl border-white/20 bg-white/15 pl-12 text-white placeholder:text-white/70 focus-visible:ring-white/30"
              />
            </div>

            <Button
              type="submit"
              className="h-12 rounded-md bg-[#F74F25] px-7 text-base font-semibold hover:bg-[#ea522c]"
            >
              Subscribe <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* Divider */}
        <div className="my-12">
          <Separator className="bg-white/20" />
        </div>

        {/* Bottom copyright */}
        <p className="text-center text-base text-white/80">
          © {new Date().getFullYear()} Silverspoon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
