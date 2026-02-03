import { z } from "zod";

export const WebsiteSchema = z.object({
  name: z.string(),
  title: z.string(),
  heroImage: z.string().optional(),
  heroImageKey: z.string().optional(),
  heroTitle: z.string().optional(),
  heroContent: z.string().optional(),
  customColor: z.string().optional(),
  customFont: z.string().optional(),
  favicon: z.string().optional(),
  faviconKey: z.string().optional(),
  description: z.string().optional(),
  keywords: z.string().optional(),
  domain: z.string().optional(),
  published: z.boolean().optional(),
  template: z.enum(["modern", "classic", "minimal", "elegant"]).optional(),
  themeColor: z
    .enum(["blue", "green", "red", "yellow", "purple", "orange"])
    .optional(),
  userId: z.string().optional(),
  businessId: z.string().optional(),
});

export const WebsiteBlockSchema = z.array(
  z.object({
    id: z.string().optional(),
    websiteId: z.string(),
    blockTitle: z.string().min(2).max(100),
    blockDescription: z.string().min(10).max(300),
    blockBanner: z.string(),
    blockBannerKey: z.string(),
    imageOne: z.string().optional(),
    imageOneKey: z.string().optional(),
    imageTwo: z.string().optional(),
    imageTwoKey: z.string().optional(),
    imageThree: z.string().optional(),
    imageThreeKey: z.string().optional(),
    imageFour: z.string().optional(),
    imageFourKey: z.string().optional(),
  })
);

export const HeroSchema = z.object({
  id: z.string(),
  heroTitle: z.string().min(1).max(100).optional(),
  heroContent: z.string().min(1).max(500).optional(),
  heroImage: z.string().optional(),
  heroImageKey: z.string().optional(),
});

export const BasicInformationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});
