"use client";

import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  LayoutDashboardIcon,
  FashionIcon,
  HammerIcon,
  CoinStackIcon,
  StarIcon,
  BookIcon,
  UsersIcon,
} from "@/components/svg";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();

  const handleMobileButton = () => {
    setIsOpen(true);
  };

  const navItems = [
    {
      pathName: "Home",
      icon: LayoutDashboardIcon,
      href: "/",
    },
    {
      pathName: "For Fashion Designers",
      icon: FashionIcon,
      href: "/fashion-designers",
    },
    {
      pathName: "For Cobblers",
      icon: HammerIcon,
      href: "/cobblers",
    },
    {
      pathName: "Pricing",
      icon: CoinStackIcon,
      href: "/pricing",
    },
    {
      pathName: "Features",
      icon: StarIcon,
      href: "/features",
    },
    {
      pathName: "Academy",
      icon: BookIcon,
      href: "/academy",
    },
    {
      pathName: "About Us",
      icon: UsersIcon,
      href: "/about-us",
    },
    {
      pathName: "Blog",
      icon: FashionIcon,
      href: "/blog",
    },
  ];

  // Update active indicator position
  useEffect(() => {
    const activeElement = navItemRefs.current[activeIndex];
    if (activeElement && activeIndicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeElement;
      gsap.to(activeIndicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0,
        ease: "power5.out",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.href === pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [pathname, navItems]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    }
  }, [isOpen]);

  const handleCloseMobileMenu = () => {
    gsap.to(menuItemsRef.current, {
      opacity: 0,
      x: -30,
      stagger: 0.05,
      ease: "power3.in",
      onComplete: () => {
        gsap.to(menuRef.current, {
          x: "-100%",
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => setIsOpen(false),
        });
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`transition-colors duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-[#F9F0EE]"
          } fixed w-full top-0 z-30`}
      >
        <nav className="w-[90%] max-w-350 mx-auto bg-transparent py-4 lg:py-5 flex justify-between items-center relative">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"></div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center relative p-1.5 lg:p-2 rounded-xl bg-[#121926] font-semibold">
            {/* Active indicator */}
            <div
              ref={activeIndicatorRef}
              className={`absolute h-[calc(100%-12px)] lg:h-[calc(100%-16px)] bg-[#F74F25] rounded-lg transition-all`}
              style={{ left: "0px", top: "8px" }}
            />

            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;

              return (
                <Link
                  key={item.pathName}
                  href={item.href}
                  ref={(el) => {
                    navItemRefs.current[index] = el;
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`relative z-10 transition-all duration-200 px-3 lg:px-4 py-2 lg:py-2.5 text-xs lg:text-sm flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-[#9AA4B2] font-normal hover:text-white/90"
                    }`}
                >
                  {isActive && <Icon />}
                  {item.pathName}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Link
              href="#"
              className="font-medium text-[#121926] cursor-pointer hover:scale-x-105 text-sm lg:text-base transition-colors"
            >
              Login
            </Link>

            <Link
              href="#"
              className="py-2 lg:py-3 font-medium text-white text-sm lg:text-base px-4 lg:px-6 bg-[#FF5722] rounded-lg hover:bg-[#E64A19] transition-all hover:shadow-xs"
            >
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
              ref={buttonRef}
              className="md:hidden text-black z-100 hover:scale-105 transition-all duration-300"
              onClick={handleMobileButton}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full h-full bg-[#F9F0EE] flex flex-col justify-between p-6 z-50 md:hidden overflow-y-auto"
        >
          <div className="w-full">
            {/* Header */}
            <div className="w-full flex justify-between items-center">
              <div className="text-[#FF5722] font-bold text-xl uppercase">logo</div>
              <button
                className="text-black p-2 rounded-lg transition-colors"
                onClick={handleCloseMobileMenu}
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col mt-8 space-y-1 w-full">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.pathName}
                    href={item.href}
                    onClick={handleCloseMobileMenu}
                    className={`flex items-center gap-3 py-4 border-b border-gray-300 font-medium text-base  px-2 rounded transition-colors ${activeIndex === index ? "text-[#FF5722]" : "text-black hover:text-gray-400"}`}
                    ref={(el) => {
                      menuItemsRef.current[index] = el;
                    }}
                  >
                    <Icon />
                    {item.pathName}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth Buttons - Mobile */}
          <div className="flex flex-col w-full gap-3 pb-4">
            <Link
              href="#"
              className="text-center w-full bg-[#FF5722] text-white py-3.5 rounded-lg font-semibold shadow-lg hover:bg-[#E64A19] transition-all"
              onClick={handleCloseMobileMenu}
            >
              Signup
            </Link>
            <Link
              href="#"
              className="font-semibold text-black text-center py-2 hover:text-[#FF5722] transition-colors"
              onClick={handleCloseMobileMenu}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};