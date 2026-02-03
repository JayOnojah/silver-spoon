import { z } from "zod";

export const OrderSchema = z.object({
  customerId: z.string(),
  items: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        quantity: z.number().optional(),
        unitPrice: z.number(),
      })
    )
    .min(1, "At least one item is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  orderStatus: z.enum(["pending", "processing", "completed", "cancelled"]).optional(),
  paymentStatus: z.enum(["not_paid", "paid_in_full", "partial_payment"]).optional(),
});
