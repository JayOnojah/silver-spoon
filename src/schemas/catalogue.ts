import { z } from "zod";

export const CatalogueSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export const CatalogueDesignSchema = z.object({
  catalogueId: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export const CatalogueDesignImageSchema = z.object({
  catalogueDesignId: z.string(),
  imageUrl: z.string(),
  imageKey: z.string(),
});
