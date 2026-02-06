import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/src/db/drizzle";
import { getCookie } from "hono/cookie";
import { currentUser } from "@/src/lib/auth";
import { and, eq, desc, count } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import {
  CatalogueSchema,
  CatalogueDesignSchema,
  CatalogueDesignImageSchema,
} from "@/src/schemas/catalogue";
import {
  catalogues,
  catalogueDesigns,
  catalogueDesignImages,
} from "@/src/db/schemas/catalogues";

const app = new Hono()
  // Get all catalogues
  .get("/", async (c) => {
    const user = await currentUser();

    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const businessId = getCookie(c, "business_id");

    if (!businessId || businessId === "undefined") {
      return c.json({ error: "Business ID is required" }, 400);
    }

    const data = await db
      .select({
        id: catalogues.id,
        name: catalogues.name,
        description: catalogues.description,
        createdAt: catalogues.createdAt,
        updatedAt: catalogues.updatedAt,
      })
      .from(catalogues)
      .where(eq(catalogues.businessId, businessId))
      .orderBy(desc(catalogues.createdAt));

    // Get design counts for each catalogue
    const cataloguesWithCounts = await Promise.all(
      data.map(async (catalogue) => {
        const [designCount] = await db
          .select({ count: count() })
          .from(catalogueDesigns)
          .where(eq(catalogueDesigns.catalogueId, catalogue.id));

        return {
          ...catalogue,
          designsCount: designCount?.count || 0,
        };
      })
    );

    return c.json({ data: cataloguesWithCounts });
  })
  // Get single catalogue with designs
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ error: "Catalogue ID is required" }, 400);
      }

      const businessId = getCookie(c, "business_id");

      if (!businessId || businessId === "undefined") {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [catalogue] = await db
        .select()
        .from(catalogues)
        .where(and(eq(catalogues.id, id), eq(catalogues.businessId, businessId)));

      if (!catalogue) {
        return c.json({ error: "Catalogue not found" }, 404);
      }

      // Get designs for this catalogue
      const designs = await db
        .select()
        .from(catalogueDesigns)
        .where(eq(catalogueDesigns.catalogueId, id))
        .orderBy(desc(catalogueDesigns.createdAt));

      // Get images for each design
      const designsWithImages = await Promise.all(
        designs.map(async (design) => {
          const images = await db
            .select()
            .from(catalogueDesignImages)
            .where(eq(catalogueDesignImages.catalogueDesignId, design.id));

          return {
            ...design,
            images,
          };
        })
      );

      return c.json({ data: { ...catalogue, designs: designsWithImages } });
    }
  )
  // Create catalogue
  .post("/", zValidator("json", CatalogueSchema), async (c) => {
    const user = await currentUser();
    const values = c.req.valid("json");

    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const businessId = getCookie(c, "business_id");

    if (!businessId || businessId === "undefined") {
      return c.json({ error: "Business ID is required" }, 400);
    }

    const id = createId();

    await db.insert(catalogues).values({
      id,
      name: values.name,
      description: values.description,
      userId: user.id,
      businessId,
    });

    const [data] = await db
      .select()
      .from(catalogues)
      .where(eq(catalogues.id, id));

    return c.json({ data });
  })
  // Update catalogue
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "json",
      z.object({
        name: z.string().optional(),
        description: z.string().optional(),
      })
    ),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "business_id");

      if (!businessId || businessId === "undefined") {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [data] = await db
        .update(catalogues)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(and(eq(catalogues.id, id), eq(catalogues.businessId, businessId)))
        .returning();

      if (!data) {
        return c.json({ error: "Catalogue not found" }, 404);
      }

      return c.json({ data });
    }
  )
  // Delete catalogue
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "business_id");

      if (!businessId || businessId === "undefined") {
        return c.json({ error: "Business ID is required" }, 400);
      }

      // Delete design images first
      const designs = await db
        .select({ id: catalogueDesigns.id })
        .from(catalogueDesigns)
        .where(eq(catalogueDesigns.catalogueId, id));

      for (const design of designs) {
        await db
          .delete(catalogueDesignImages)
          .where(eq(catalogueDesignImages.catalogueDesignId, design.id));
      }

      // Delete designs
      await db.delete(catalogueDesigns).where(eq(catalogueDesigns.catalogueId, id));

      // Delete catalogue
      const [data] = await db
        .delete(catalogues)
        .where(and(eq(catalogues.id, id), eq(catalogues.businessId, businessId)))
        .returning({ id: catalogues.id });

      if (!data) {
        return c.json({ error: "Catalogue not found" }, 404);
      }

      return c.json({ data });
    }
  )
  // Add design to catalogue
  .post(
    "/:id/designs",
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "json",
      z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
      })
    ),
    async (c) => {
      const user = await currentUser();
      const { id: catalogueId } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "business_id");

      if (!businessId || businessId === "undefined") {
        return c.json({ error: "Business ID is required" }, 400);
      }

      // Verify catalogue exists
      const [catalogue] = await db
        .select()
        .from(catalogues)
        .where(and(eq(catalogues.id, catalogueId), eq(catalogues.businessId, businessId)));

      if (!catalogue) {
        return c.json({ error: "Catalogue not found" }, 404);
      }

      const id = createId();

      await db.insert(catalogueDesigns).values({
        id,
        catalogueId,
        title: values.title,
        description: values.description || null,
        businessId,
      });

      const [data] = await db
        .select()
        .from(catalogueDesigns)
        .where(eq(catalogueDesigns.id, id));

      return c.json({ data });
    }
  )
  // Delete design
  .delete(
    "/:id/designs/:designId",
    zValidator("param", z.object({ id: z.string(), designId: z.string() })),
    async (c) => {
      const user = await currentUser();
      const { designId } = c.req.valid("param");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "business_id");

      if (!businessId || businessId === "undefined") {
        return c.json({ error: "Business ID is required" }, 400);
      }

      // Delete images first
      await db
        .delete(catalogueDesignImages)
        .where(eq(catalogueDesignImages.catalogueDesignId, designId));

      // Delete design
      const [data] = await db
        .delete(catalogueDesigns)
        .where(and(eq(catalogueDesigns.id, designId), eq(catalogueDesigns.businessId, businessId)))
        .returning({ id: catalogueDesigns.id });

      if (!data) {
        return c.json({ error: "Design not found" }, 404);
      }

      return c.json({ data });
    }
  )
  // Add image to design
  .post(
    "/:id/designs/:designId/images",
    zValidator("param", z.object({ id: z.string(), designId: z.string() })),
    zValidator(
      "json",
      z.object({
        imageUrl: z.string(),
        imageKey: z.string(),
      })
    ),
    async (c) => {
      const user = await currentUser();
      const { designId } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "business_id");

      if (!businessId || businessId === "undefined") {
        return c.json({ error: "Business ID is required" }, 400);
      }

      // Verify design exists
      const [design] = await db
        .select()
        .from(catalogueDesigns)
        .where(and(eq(catalogueDesigns.id, designId), eq(catalogueDesigns.businessId, businessId)));

      if (!design) {
        return c.json({ error: "Design not found" }, 404);
      }

      const id = createId();

      await db.insert(catalogueDesignImages).values({
        id,
        catalogueDesignId: designId,
        imageUrl: values.imageUrl,
        imageKey: values.imageKey,
        businessId,
      });

      const [data] = await db
        .select()
        .from(catalogueDesignImages)
        .where(eq(catalogueDesignImages.id, id));

      return c.json({ data });
    }
  )
  // Delete image
  .delete(
    "/:id/designs/:designId/images/:imageId",
    zValidator(
      "param",
      z.object({ id: z.string(), designId: z.string(), imageId: z.string() })
    ),
    async (c) => {
      const user = await currentUser();
      const { imageId } = c.req.valid("param");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "business_id");

      if (!businessId || businessId === "undefined") {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [data] = await db
        .delete(catalogueDesignImages)
        .where(
          and(
            eq(catalogueDesignImages.id, imageId),
            eq(catalogueDesignImages.businessId, businessId)
          )
        )
        .returning({ id: catalogueDesignImages.id });

      if (!data) {
        return c.json({ error: "Image not found" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
