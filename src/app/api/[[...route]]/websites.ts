import {
  websites,
  websiteBlocks,
  insertWebsiteSchema,
} from "@/src/db/schemas/websites";

import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/src/db/drizzle";
import { getCookie } from "hono/cookie";
import { currentUser } from "@/src/lib/auth";
import { and, eq, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { HeroSchema } from "@/src/schemas/website";
import { WebsiteBlockSchema } from "@/src/schemas/website";
import { BasicInformationSchema } from "@/src/schemas/website";

const app = new Hono()
  .get("/", async (c) => {
    const user = await currentUser();

    if (!user?.id) return c.json({ error: "Unauthorized" }, 401);

    const businessId = getCookie(c, "tenant_id");
    if (!businessId) return c.json({ error: "Business ID is required" }, 400);

    try {
      const rows = await db
        .select({
          website: websites,
          block: websiteBlocks,
        })
        .from(websites)
        .leftJoin(websiteBlocks, eq(websiteBlocks.websiteId, websites.id))
        .where(eq(websites.businessId, businessId));

      if (rows.length === 0) {
        return c.json({ data: null });
      }

      const firstWebsiteId = rows[0].website.id;

      // Filter to only that website’s rows (in case multiple websites exist for the tenant)
      const websiteRows = rows.filter((r) => r.website.id === firstWebsiteId);

      const website = websiteRows[0].website;

      const blocks = websiteRows
        .filter((r) => r.block && r.block.id) // LEFT JOIN => may be null
        .map((r) => r.block!);

      return c.json({
        data: {
          ...website,
          blocks,
        },
      });
    } catch (error) {
      console.error("Database error:", error);
      return c.json({ error: "Database query failed" }, 500);
    }
  })
  .post(
    "/",
    zValidator(
      "json",
      insertWebsiteSchema.omit({ id: true, businessId: true }),
    ),
    async (c) => {
      const values = c.req.valid("json");

      const user = await currentUser();

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "tenant_id");

      if (!businessId) {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [data] = await db
        .insert(websites)
        .values({
          id: createId(),
          businessId: businessId,
          ...values,
          template:
            values.template === undefined ||
            values.template === null ||
            ["modern", "classic", "minimal", "elegant"].includes(
              values.template,
            )
              ? (values.template as
                  | "modern"
                  | "classic"
                  | "minimal"
                  | "elegant"
                  | null
                  | undefined)
              : null,
        })
        .returning();

      return c.json({ data });
    },
  )
  .post(
    "/bulk-delete",
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (c) => {
      const values = c.req.valid("json");

      const user = await currentUser();

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "tenant_id");

      if (!businessId) {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const data = await db
        .delete(websiteBlocks)
        .where(
          and(
            inArray(websites.id, values.ids),
            eq(websites.businessId, businessId),
          ),
        )
        .returning({
          id: websiteBlocks.id,
        });

      return c.json({ data });
    },
  )
  .post(
    "/publish-website",
    zValidator("json", z.object({ id: z.string() })),
    async (c) => {
      const values = c.req.valid("json");

      const user = await currentUser();

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "tenant_id");

      if (!businessId) {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [data] = await db
        .update(websites)
        .set({
          published: true,
        })
        .where(
          and(eq(websites.id, values.id), eq(websites.businessId, businessId)),
        )
        .returning();

      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    },
  )
  .post(
    "/unpublish-website",
    zValidator("json", z.object({ id: z.string() })),
    async (c) => {
      const values = c.req.valid("json");

      const user = await currentUser();

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "tenant_id");

      if (!businessId) {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [data] = await db
        .update(websites)
        .set({
          published: false,
        })
        .where(
          and(eq(websites.id, values.id), eq(websites.businessId, businessId)),
        )
        .returning();

      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    },
  )
  .post(
    "/choose-template",
    zValidator("json", insertWebsiteSchema.pick({ id: true, template: true })),
    async (c) => {
      const values = c.req.valid("json");

      const user = await currentUser();

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "tenant_id");

      if (!businessId) {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [data] = await db
        .update(websites)
        .set({
          template: (values.template ?? "modern") as
            | "modern"
            | "classic"
            | "minimal"
            | "elegant",
        })
        .where(
          and(eq(websites.id, values.id), eq(websites.businessId, businessId)),
        )
        .returning();

      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    },
  )
  .post(
    "/set-theme",
    zValidator(
      "json",
      insertWebsiteSchema.pick({
        id: true,
        buttonPrimaryColor: true,
        buttonPrimaryTextColor: true,
        buttonSecondaryColor: true,
        buttonSecondaryTextColor: true,
      }),
    ),
    async (c) => {
      const values = c.req.valid("json");

      const user = await currentUser();

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "tenant_id");

      if (!businessId) {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [data] = await db
        .update(websites)
        .set({
          buttonPrimaryColor: (values.buttonPrimaryColor ?? "406CF4") as
            | "406CF4"
            | "A0A0A0",
          buttonPrimaryTextColor: (values.buttonPrimaryTextColor ??
            "FFFFFF") as "FFFFFF" | "406CF4",
          buttonSecondaryColor: (values.buttonSecondaryColor ?? "ECF0FE") as
            | "ECF0FE"
            | "A0A0A0",
          buttonSecondaryTextColor: (values.buttonSecondaryTextColor ??
            "FFFFFF") as "FFFFFF" | "406CF4",
        })
        .where(
          and(eq(websites.id, values.id), eq(websites.businessId, businessId)),
        )
        .returning();

      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    },
  )
  .post(
    "/basic-information",
    zValidator("json", BasicInformationSchema),
    async (c) => {
      const values = c.req.valid("json");

      const user = await currentUser();

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "tenant_id");

      if (!businessId) {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [data] = await db
        .update(websites)
        .set({
          name: values.name,
          description: values.description,
          businessId: businessId,
        })
        .where(
          and(eq(websites.id, values.id), eq(websites.businessId, businessId)),
        )
        .returning();

      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    },
  )
  .post("/hero", zValidator("json", HeroSchema), async (c) => {
    const values = c.req.valid("json");

    const user = await currentUser();

    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const businessId = getCookie(c, "tenant_id");

    if (!businessId) {
      return c.json({ error: "Business ID is required" }, 400);
    }

    const [data] = await db
      .update(websites)
      .set({
        ...values,
        businessId: businessId,
      })
      .where(
        and(eq(websites.id, values.id), eq(websites.businessId, businessId)),
      )
      .returning();

    if (!data) {
      return c.json({ error: "Not Found" }, 404);
    }

    return c.json({ data });
  })
  .post("/website-block", zValidator("json", WebsiteBlockSchema), async (c) => {
    const values = c.req.valid("json");

    const user = await currentUser();
    if (!user?.id) return c.json({ error: "Unauthorized" }, 401);

    const businessId = getCookie(c, "tenant_id");
    if (!businessId) return c.json({ error: "Business ID is required" }, 400);

    // 1️⃣ Fetch existing blocks for this website
    const websiteId = values[0]?.websiteId;
    const existingBlocks = await db
      .select({ id: websiteBlocks.id })
      .from(websiteBlocks)
      .where(eq(websiteBlocks.websiteId, websiteId));

    const existingIds = existingBlocks.map((b) => b.id);
    const incomingIds = values.filter((v) => v.id).map((v) => v.id!);

    // 2️⃣ DELETE removed blocks
    const toDelete = existingIds.filter((id) => !incomingIds.includes(id));
    if (toDelete.length > 0) {
      await db.delete(websiteBlocks).where(inArray(websiteBlocks.id, toDelete));
    }

    // 3️⃣ UPSERT blocks
    const results = [];

    for (const block of values) {
      if (block.id) {
        // UPDATE
        const [updated] = await db
          .update(websiteBlocks)
          .set({
            blockTitle: block.blockTitle,
            blockDescription: block.blockDescription,
            blockBanner: block.blockBanner,
            blockBannerKey: block.blockBannerKey,
            imageOne: block.imageOne,
            imageOneKey: block.imageOneKey,
            imageTwo: block.imageTwo,
            imageTwoKey: block.imageTwoKey,
            imageThree: block.imageThree,
            imageThreeKey: block.imageThreeKey,
            imageFour: block.imageFour,
            imageFourKey: block.imageFourKey,
          })
          .where(eq(websiteBlocks.id, block.id))
          .returning();

        results.push(updated);
      } else {
        // INSERT
        const [created] = await db
          .insert(websiteBlocks)
          .values({
            id: createId(),
            businessId,
            websiteId: block.websiteId,
            blockTitle: block.blockTitle,
            blockDescription: block.blockDescription,
            blockBanner: block.blockBanner,
            blockBannerKey: block.blockBannerKey,
            imageOne: block.imageOne,
            imageOneKey: block.imageOneKey,
            imageTwo: block.imageTwo,
            imageTwoKey: block.imageTwoKey,
            imageThree: block.imageThree,
            imageThreeKey: block.imageThreeKey,
            imageFour: block.imageFour,
            imageFourKey: block.imageFourKey,
          })
          .returning();

        results.push(created);
      }
    }

    return c.json({ data: results });
  })
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      }),
    ),
    zValidator(
      "json",
      insertWebsiteSchema.omit({ id: true, businessId: true }),
    ),
    async (c) => {
      const values = c.req.valid("json");

      const user = await currentUser();

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "tenant_id");

      if (!businessId) {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ message: "Website ID is required" }, 400);
      }

      const [data] = await db
        .update(websites)
        .set({
          ...values,
          businessId: businessId,
          template:
            values.template === undefined ||
            values.template === null ||
            ["modern", "classic", "minimal", "elegant"].includes(
              values.template,
            )
              ? (values.template as
                  | "modern"
                  | "classic"
                  | "minimal"
                  | "elegant"
                  | null
                  | undefined)
              : null,
        })
        .where(and(eq(websites.id, id), eq(websites.businessId, businessId)))
        .returning();

      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    },
  )
  .delete(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      }),
    ),
    async (c) => {
      const user = await currentUser();

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "tenant_id");

      if (!businessId) {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ message: "Website ID is required" }, 400);
      }

      const [data] = await db
        .delete(websites)
        .where(and(eq(websites.id, id), eq(websites.businessId, businessId)))
        .returning({ id: websites.id });

      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    },
  )
  .delete(
    "/website-block/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing ID" }, 400);
      }

      const [data] = await db
        .delete(websiteBlocks)
        .where(eq(websiteBlocks.id, id))
        .returning({ id: websiteBlocks.id });

      if (!data) {
        return c.json({ error: "Block not found" }, 404);
      }

      return c.json({ data });
    },
  );
export default app;
