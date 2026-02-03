import { z } from "zod";

export const OrderSchema = z.object({
  orderId: z.string(),
  customerFirstName: z.string(),
  customerLastName: z.string(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
  customerAddress: z.string().optional(),
  customerLandmark: z.string().optional(),
  customerCity: z.string().optional(),
  customerPostalCode: z.string().optional(),
  customerCountry: z.string().optional(),
  orderItems: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        quantity: z.number().optional(),
        unitPrice: z.number(),
      })
    )
    .optional(),
  userId: z.string().optional(),
  businessId: z.string().optional(),
});
