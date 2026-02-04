/**
 * Dummy design data for development and prototyping.
 * Replace with API data in production.
 */

export interface ReferenceDesign {
  id: string;
  imageUrl: string;
  alt?: string;
}

export interface CatalogueDesign {
  id: string;
  title: string;
  description: string;
  designCount: number;
  lastUpdated: string;
}

export interface DesignItem {
  id: string;
  imageUrl: string;
  alt?: string;
}

/** Reference designs shown in the main Reference Designs grid (filled state) */
export const DUMMY_REFERENCE_DESIGNS: ReferenceDesign[] = [
  {
    id: "ref-1",
    imageUrl: "/images/pngs/catalogue-detail-img.png",
    alt: "Custom blazer design",
  },
  {
    id: "ref-2",
    imageUrl: "/images/pngs/fashion.png",
    alt: "Fashion collection sample",
  },
  {
    id: "ref-3",
    imageUrl: "/images/pngs/fashion-designers.png",
    alt: "Designer sketch reference",
  },
  {
    id: "ref-4",
    imageUrl: "/images/pngs/sowing.png",
    alt: "Sewing and tailoring reference",
  },
  {
    id: "ref-5",
    imageUrl: "/images/pngs/template-img.png",
    alt: "Template design",
  },
  {
    id: "ref-6",
    imageUrl: "/images/pngs/crafts-men-hero.png",
    alt: "Crafts reference",
  },
  {
    id: "ref-7",
    imageUrl: "/images/pngs/shop.png",
    alt: "Retail design reference",
  },
  {
    id: "ref-8",
    imageUrl: "/images/pngs/features-1.png",
    alt: "Feature design 1",
  },
];

/** Catalogue options in Add Designs → From Existing */
export const DUMMY_CATALOGUE: CatalogueDesign[] = [
  {
    id: "cat-1",
    title: "Men's Face Cap",
    description: "Classic and custom face cap designs for men",
    designCount: 20,
    lastUpdated: "2 hours ago",
  },
  {
    id: "cat-2",
    title: "Women's Blazer",
    description: "Tailored blazers and formal wear",
    designCount: 15,
    lastUpdated: "1 day ago",
  },
  {
    id: "cat-3",
    title: "Traditional Attire",
    description: "Ankara, agbada, and cultural wear",
    designCount: 32,
    lastUpdated: "3 hours ago",
  },
  {
    id: "cat-4",
    title: "Bridal Collection",
    description: "Wedding dresses and bridal accessories",
    designCount: 12,
    lastUpdated: "5 hours ago",
  },
  {
    id: "cat-5",
    title: "Casual Wear",
    description: "Everyday casual and smart casual designs",
    designCount: 28,
    lastUpdated: "Yesterday",
  },
];

/** Design items within a catalogue (Select Designs grid) */
export const DUMMY_DESIGN_ITEMS: DesignItem[] = [
  { id: "item-1", imageUrl: "/images/pngs/catalogue-detail-img.png", alt: "Design 1" },
  { id: "item-2", imageUrl: "/images/pngs/fashion.png", alt: "Design 2" },
  { id: "item-3", imageUrl: "/images/pngs/fashion-designers.png", alt: "Design 3" },
  { id: "item-4", imageUrl: "/images/pngs/sowing.png", alt: "Design 4" },
  { id: "item-5", imageUrl: "/images/pngs/template-img.png", alt: "Design 5" },
  { id: "item-6", imageUrl: "/images/pngs/crafts-men-hero.png", alt: "Design 6" },
];
