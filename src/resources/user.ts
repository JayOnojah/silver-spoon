import { z } from "zod";

export const User = z
  .object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    phone: z.string().nullable(),
    emailVerified: z.iso.datetime().nullable(),
    phoneVerified: z.iso.datetime().nullable(),
    avatar: z.string().nullable(),
    provider: z.string().nullable(),
    providerId: z.string().nullable(),
    platformRole: z.string(),
    defaultBusinessId: z.string().nullable(),
    defaultBusinessType: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .transform((data) => ({
    ...data,
  }));
