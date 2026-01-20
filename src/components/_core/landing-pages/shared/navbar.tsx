"use client";

import gsap from "gsap";
import Link from "next/link";
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
  const [isDarkBackground, setIsDarkBackground] = useState(false);
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
      isSection: false,
    },
    {
      pathName: "For Fashion Designers",
      icon: FashionIcon,
      href: "/fashion-designers",
      isSection: false,
    },
    {
      pathName: "For Cobblers",
      icon: HammerIcon,
      href: "/cobblers",
      isSection: false,
    },
    {
      pathName: "Pricing",
      icon: CoinStackIcon,
      href: "#pricing",
      isSection: true,
      sectionId: "pricing",
    },
    {
      pathName: "Features",
      icon: StarIcon,
      href: "#features",
      isSection: true,
      sectionId: "features",
    },
    {
      pathName: "Academy",
      icon: BookIcon,
      href: "/academy",
      isSection: false,
    },
    {
      pathName: "About Us",
      icon: UsersIcon,
      href: "/about-us",
      isSection: false,
    },
    {
      pathName: "Blog",
      icon: FashionIcon,
      href: "/blog",
      isSection: false,
    },
  ];

  // Handle smooth scrolling to sections
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Update active indicator position
  useEffect(() => {
    const activeElement = navItemRefs.current[activeIndex];
    if (activeElement && activeIndicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeElement;
      gsap.to(activeIndicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.2,
        ease: "power3.out",
      });
    }
  }, [activeIndex]);

  // Scroll spy logic - detect which section is in view
  useEffect(() => {
    if (pathname !== "/") return; // Only run on homepage

    const handleScrollSpy = () => {
      const sections = navItems
        .filter(item => item.isSection)
        .map(item => ({
          id: item.sectionId!,
          element: document.getElementById(item.sectionId!),
        }));

      let currentSection = "";

      sections.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (with some offset for navbar)
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = id;
          }
        }
      });

      if (currentSection) {
        const sectionIndex = navItems.findIndex(
          item => item.sectionId === currentSection
        );
        if (sectionIndex !== -1) {
          setActiveIndex(sectionIndex);
        }
      } else {
        // Default to Home if no section is active
        setActiveIndex(0);
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy(); // Check on mount
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  // Update active index based on pathname (for non-section pages)
  useEffect(() => {
    if (pathname !== "/") {
      const currentIndex = navItems.findIndex((item) => item.href === pathname);
      if (currentIndex !== -1) {
        setActiveIndex(currentIndex);
      }
    }
  }, [pathname]);

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

      const checkPoint = 100;
      const elementBehind = document.elementFromPoint(
        window.innerWidth / 2,
        checkPoint
      );

      if (elementBehind) {
        let currentElement: HTMLElement | null = elementBehind as HTMLElement;
        let bgColor = 'rgba(0, 0, 0, 0)';

        while (currentElement && currentElement !== document.body) {
          const computedStyle = window.getComputedStyle(currentElement);
          const currentBg = computedStyle.backgroundColor;

          if (currentBg && currentBg !== 'rgba(0, 0, 0, 0)' && currentBg !== 'transparent') {
            bgColor = currentBg;
            break;
          }
          currentElement = currentElement.parentElement;
        }

        const isDark = isColorDark(bgColor);
        setIsDarkBackground(isDark);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isColorDark = (color: string) => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return false;

    const [r, g, b] = rgb.map(Number);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  return (
    <>
      <div
        className={`transition-colors duration-300 ${scrolled ? 'backdrop-blur-3xl shadow-2xs' : 'bg-[#F9F0EE]'} px-4 md:px-8 w-full top-0 z-30 fixed`}
      >
        <nav className="lg:w-[94%] max-xl mx-auto bg-transparent py-4 lg:py-5 flex justify-between items-center relative">
          <div className="shrink-0">
            <Link href="/">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"></div>
            </Link>
          </div>

          <div className={`hidden lg:flex items-center relative p-1.5 lg:p-2 rounded-xl bg-[#121926] font-semibold`}>
            <div
              ref={activeIndicatorRef}
              className={`absolute h-[calc(100%-12px)] lg:h-[calc(100%-16px)] bg-[#F74F25] rounded-lg transition-all`}
              style={{ left: "0px", top: "8px" }}
            />

            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;

              return item.isSection && pathname === "/" ? (
                <a
                  key={item.pathName}
                  href={item.href}
                  onClick={(e) => handleSectionClick(e, item.sectionId!)}
                  ref={(el) => {
                    navItemRefs.current[index] = el;
                  }}
                  className={`relative z-10 transition-all duration-200 px-3 lg:px-4 py-2 lg:py-2.5 text-xs lg:text-sm flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-[#9AA4B2] font-normal hover:text-white/90"
                    }`}
                >
                  {isActive && <Icon />}
                  {item.pathName}
                </a>
              ) : (
                <Link
                  key={item.pathName}
                  href={item.href}
                  ref={(el) => {
                    navItemRefs.current[index] = el;
                  }}
                  className={`relative z-10 transition-all duration-200 px-3 lg:px-4 py-2 lg:py-2.5 text-xs lg:text-sm flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-[#9AA4B2] font-normal hover:text-white/90"
                    }`}
                >
                  {isActive && <Icon />}
                  {item.pathName}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 lg:gap-4">
            <Link
              href="/sign-in"
              className={`font-bold cursor-pointer hover:scale-x-105 text-sm lg:text-base transition-colors ${isDarkBackground ? 'text-white' : 'text-[#121926]'
                }`}
            >
              Login
            </Link>

            <Link
              href="/sign-up"
              className="py-2 lg:py-3 font-bold text-white text-sm lg:text-base px-4 lg:px-6 bg-[#FF5722] rounded-lg hover:bg-[#E64A19] transition-all hover:shadow-xs"
            >
              Signup
            </Link>
          </div>

          <button
            ref={buttonRef}
            className="lg:hidden text-black z-100 hover:scale-105 transition-all duration-300"
            onClick={handleMobileButton}
          >
            <MenuIcon className={`font-medium w-6 h-6 cursor-pointer hover:scale-x-105 text-sm lg:text-base transition-colors ${isDarkBackground ? 'text-white' : 'text-[#121926]'
              }`} />
          </button>
        </nav>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full h-full bg-[#F9F0EE] flex flex-col justify-between p-6 z-50 lg:hidden overflow-y-auto"
        >
          <div className="w-full">
            <div className="w-full flex justify-between items-center">
              <div className="text-[#FF5722] font-bold text-xl uppercase">logo</div>
              <button
                className="text-black p-2 rounded-lg transition-colors"
                onClick={handleCloseMobileMenu}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col mt-8 space-y-1 w-full">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeIndex === index;

                return item.isSection && pathname === "/" ? (
                  <a
                    key={item.pathName}
                    href={item.href}
                    onClick={(e) => {
                      handleSectionClick(e, item.sectionId!);
                      handleCloseMobileMenu();
                    }}
                    className={`flex items-center gap-3 py-4 border-b border-gray-300 font-medium text-base px-2 rounded transition-colors ${isActive ? "text-[#FF5722]" : "text-black hover:text-gray-400"}`}
                    ref={(el) => {
                      menuItemsRef.current[index] = el;
                    }}
                  >
                    <Icon />
                    {item.pathName}
                  </a>
                ) : (
                  <Link
                    key={item.pathName}
                    href={item.href}
                    onClick={handleCloseMobileMenu}
                    className={`flex items-center gap-3 py-4 border-b border-gray-300 font-medium text-base px-2 rounded transition-colors ${isActive ? "text-[#FF5722]" : "text-black hover:text-gray-400"}`}
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

          <div className="flex flex-col w-full gap-3 pb-4">
            <Link
              href="#"
              className="text-center w-full bg-[#FF5722] font-bold text-white py-3.5 rounded-lg shadow-lg hover:bg-[#E64A19] transition-all"
              onClick={handleCloseMobileMenu}
            >
              Signup
            </Link>
            <Link
              href="#"
              className="font-bold text-black text-center py-2 hover:text-[#FF5722] transition-colors"
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