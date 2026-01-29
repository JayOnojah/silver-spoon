import { z } from "zod";

export const CreateBusinessSchema = z.object({
  businessName: z.string().min(2).max(100).trim().min(2, {
    message: "The business name field is required",
  }),
  businessType: z.string().min(1, {
    message: "The business type field is required",
  }),
  email: z.string().email({
    message: "The email address field is required",
  }),
});
