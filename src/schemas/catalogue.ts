import { z } from "zod";

export const CatalogueSchema = z.object({
  name: z.string(),
  description: z.string(),
  catalogueDesigns: z
    .array(
      z.object({
        catalogueId: z.string(),
        title: z.string(),
        description: z.string(),
        businessId: z.string(),
        catalogueImages: z.array(
          z.object({
            imageUrl: z.string().optional(),
            imageKey: z.string().optional(),
          })
        ),
      })
    )
    .optional(),
  userId: z.string().optional(),
  businessId: z.string().optional(),
});
