import { Hono } from "hono";
import { db } from "@/src/db/drizzle";
import { eq, and, desc, ilike, count } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { HTTPException } from "hono/http-exception";
import { requireAuth } from "@/src/middleware/require-auth";
import {
  mobileUserMeasurements,
  mobileUserMeasurementShares,
} from "@/src/db/schemas/mobile-user-measurements";
import { businesses } from "@/src/db/schemas/businesses";

/* -----------------------------------
   Type-safe JWT Payload
----------------------------------- */
type JwtPayload = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  provider: string;
  iat: number;
  exp: number;
};

type Variables = {
  jwtPayload: JwtPayload;
};

const app = new Hono<{ Variables: Variables }>();

/* -----------------------------------
   Protect all measurement routes
----------------------------------- */
app.use("/*", requireAuth);

/* -----------------------------------
   POST /measurements
   Create a new measurement
----------------------------------- */
app.post("/", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;

  const body = await c.req.json();

  const { title, height, waist, unit, frontImageUrl, frontImageKey, sideImageUrl, sideImageKey } = body;

  if (!title || !height) {
    throw new HTTPException(400, {
      message: "title and height are required",
    });
  }

  const id = createId();

  const [measurement] = await db
    .insert(mobileUserMeasurements)
    .values({
      id,
      userId,
      title,
      status: "processing",
      height,
      waist: waist ?? null,
      unit: unit ?? "inches",
      frontImageUrl: frontImageUrl ?? null,
      frontImageKey: frontImageKey ?? null,
      sideImageUrl: sideImageUrl ?? null,
      sideImageKey: sideImageKey ?? null,
      processingProgress: 0,
      processingStep: 0,
      processingTotalSteps: 5,
    })
    .returning();

  return c.json(
    {
      success: true,
      data: {
        id: measurement.id,
        title: measurement.title,
        status: measurement.status,
        height: measurement.height,
        waist: measurement.waist,
        unit: measurement.unit,
        frontImageUrl: measurement.frontImageUrl,
        sideImageUrl: measurement.sideImageUrl,
        processingProgress: measurement.processingProgress,
        processingStep: measurement.processingStep,
        processingTotalSteps: measurement.processingTotalSteps,
        createdAt: measurement.createdAt,
      },
    },
    201,
  );
});

/* -----------------------------------
   GET /measurements
   List all measurements (paginated)
----------------------------------- */
app.get("/", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;

  const page = Number(c.req.query("page") ?? "1");
  const limit = Number(c.req.query("limit") ?? "20");
  const status = c.req.query("status");
  const offset = (page - 1) * limit;

  const conditions = [eq(mobileUserMeasurements.userId, userId)];

  if (status) {
    conditions.push(
      eq(mobileUserMeasurements.status, status as "processing" | "completed" | "failed"),
    );
  }

  const whereClause = and(...conditions);

  const [measurements, totalResult] = await Promise.all([
    db
      .select()
      .from(mobileUserMeasurements)
      .where(whereClause)
      .orderBy(desc(mobileUserMeasurements.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ total: count() })
      .from(mobileUserMeasurements)
      .where(whereClause),
  ]);

  const total = totalResult[0]?.total ?? 0;

  return c.json({
    success: true,
    data: {
      measurements: measurements.map((m) => ({
        id: m.id,
        title: m.title,
        status: m.status,
        height: m.height,
        waist: m.waist,
        unit: m.unit,
        frontImageUrl: m.frontImageUrl,
        sideImageUrl: m.sideImageUrl,
        totalPoints: m.totalPoints,
        confidenceScore: m.confidenceScore,
        qualityScore: m.qualityScore,
        completedAt: m.completedAt,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});

/* -----------------------------------
   GET /measurements/search
   Search measurements by title
----------------------------------- */
app.get("/search", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;

  const query = c.req.query("q");
  const page = Number(c.req.query("page") ?? "1");
  const limit = Number(c.req.query("limit") ?? "20");
  const offset = (page - 1) * limit;

  if (!query) {
    throw new HTTPException(400, { message: "Search query 'q' is required" });
  }

  const whereClause = and(
    eq(mobileUserMeasurements.userId, userId),
    ilike(mobileUserMeasurements.title, `%${query}%`),
  );

  const [measurements, totalResult] = await Promise.all([
    db
      .select()
      .from(mobileUserMeasurements)
      .where(whereClause)
      .orderBy(desc(mobileUserMeasurements.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ total: count() })
      .from(mobileUserMeasurements)
      .where(whereClause),
  ]);

  const total = totalResult[0]?.total ?? 0;

  return c.json({
    success: true,
    data: {
      measurements: measurements.map((m) => ({
        id: m.id,
        title: m.title,
        status: m.status,
        height: m.height,
        waist: m.waist,
        unit: m.unit,
        totalPoints: m.totalPoints,
        confidenceScore: m.confidenceScore,
        completedAt: m.completedAt,
        createdAt: m.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});

/* -----------------------------------
   GET /measurements/:id
   Get full measurement details
----------------------------------- */
app.get("/:id", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;
  const measurementId = c.req.param("id");

  const [measurement] = await db
    .select()
    .from(mobileUserMeasurements)
    .where(
      and(
        eq(mobileUserMeasurements.id, measurementId),
        eq(mobileUserMeasurements.userId, userId),
      ),
    );

  if (!measurement) {
    throw new HTTPException(404, { message: "Measurement not found" });
  }

  return c.json({
    success: true,
    data: {
      id: measurement.id,
      title: measurement.title,
      status: measurement.status,
      height: measurement.height,
      waist: measurement.waist,
      unit: measurement.unit,
      frontImageUrl: measurement.frontImageUrl,
      sideImageUrl: measurement.sideImageUrl,
      primaryMeasurements: measurement.primaryMeasurements,
      detailedMeasurements: measurement.detailedMeasurements,
      totalPoints: measurement.totalPoints,
      confidenceScore: measurement.confidenceScore,
      qualityScore: measurement.qualityScore,
      processingProgress: measurement.processingProgress,
      processingStep: measurement.processingStep,
      processingTotalSteps: measurement.processingTotalSteps,
      processingError: measurement.processingError,
      completedAt: measurement.completedAt,
      createdAt: measurement.createdAt,
      updatedAt: measurement.updatedAt,
    },
  });
});

/* -----------------------------------
   GET /measurements/:id/status
   Get processing status
----------------------------------- */
app.get("/:id/status", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;
  const measurementId = c.req.param("id");

  const [measurement] = await db
    .select({
      id: mobileUserMeasurements.id,
      status: mobileUserMeasurements.status,
      processingProgress: mobileUserMeasurements.processingProgress,
      processingStep: mobileUserMeasurements.processingStep,
      processingTotalSteps: mobileUserMeasurements.processingTotalSteps,
      processingError: mobileUserMeasurements.processingError,
      completedAt: mobileUserMeasurements.completedAt,
    })
    .from(mobileUserMeasurements)
    .where(
      and(
        eq(mobileUserMeasurements.id, measurementId),
        eq(mobileUserMeasurements.userId, userId),
      ),
    );

  if (!measurement) {
    throw new HTTPException(404, { message: "Measurement not found" });
  }

  return c.json({
    success: true,
    data: measurement,
  });
});

/* -----------------------------------
   DELETE /measurements/:id
   Delete a measurement
----------------------------------- */
app.delete("/:id", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;
  const measurementId = c.req.param("id");

  const [measurement] = await db
    .select({ id: mobileUserMeasurements.id })
    .from(mobileUserMeasurements)
    .where(
      and(
        eq(mobileUserMeasurements.id, measurementId),
        eq(mobileUserMeasurements.userId, userId),
      ),
    );

  if (!measurement) {
    throw new HTTPException(404, { message: "Measurement not found" });
  }

  // Shares are cascade-deleted via FK constraint
  await db
    .delete(mobileUserMeasurements)
    .where(eq(mobileUserMeasurements.id, measurementId));

  return c.json({
    success: true,
    data: { message: "Measurement deleted successfully" },
  });
});

/* -----------------------------------
   POST /measurements/:id/share
   Share measurement with a business
----------------------------------- */
app.post("/:id/share", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;
  const measurementId = c.req.param("id");

  const body = await c.req.json();
  const { businessId, customUserId, notes } = body;

  if (!businessId) {
    throw new HTTPException(400, { message: "businessId is required" });
  }

  // Verify the measurement belongs to the user
  const [measurement] = await db
    .select({ id: mobileUserMeasurements.id })
    .from(mobileUserMeasurements)
    .where(
      and(
        eq(mobileUserMeasurements.id, measurementId),
        eq(mobileUserMeasurements.userId, userId),
      ),
    );

  if (!measurement) {
    throw new HTTPException(404, { message: "Measurement not found" });
  }

  // Verify the business exists
  const [business] = await db
    .select({ id: businesses.id, name: businesses.name })
    .from(businesses)
    .where(eq(businesses.id, businessId));

  if (!business) {
    throw new HTTPException(404, { message: "Business not found" });
  }

  // Check for existing active share
  const [existingShare] = await db
    .select({ id: mobileUserMeasurementShares.id })
    .from(mobileUserMeasurementShares)
    .where(
      and(
        eq(mobileUserMeasurementShares.measurementId, measurementId),
        eq(mobileUserMeasurementShares.businessId, businessId),
        eq(mobileUserMeasurementShares.status, "active"),
      ),
    );

  if (existingShare) {
    throw new HTTPException(409, {
      message: "Measurement is already shared with this business",
    });
  }

  const shareId = createId();

  const [share] = await db
    .insert(mobileUserMeasurementShares)
    .values({
      id: shareId,
      measurementId,
      userId,
      businessId,
      customUserId: customUserId ?? null,
      notes: notes ?? null,
      status: "active",
    })
    .returning();

  return c.json(
    {
      success: true,
      data: {
        id: share.id,
        measurementId: share.measurementId,
        businessId: share.businessId,
        businessName: business.name,
        customUserId: share.customUserId,
        notes: share.notes,
        status: share.status,
        createdAt: share.createdAt,
      },
    },
    201,
  );
});

/* -----------------------------------
   GET /measurements/:id/shares
   List shares for a measurement
----------------------------------- */
app.get("/:id/shares", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;
  const measurementId = c.req.param("id");

  // Verify the measurement belongs to the user
  const [measurement] = await db
    .select({ id: mobileUserMeasurements.id })
    .from(mobileUserMeasurements)
    .where(
      and(
        eq(mobileUserMeasurements.id, measurementId),
        eq(mobileUserMeasurements.userId, userId),
      ),
    );

  if (!measurement) {
    throw new HTTPException(404, { message: "Measurement not found" });
  }

  const shares = await db
    .select({
      id: mobileUserMeasurementShares.id,
      measurementId: mobileUserMeasurementShares.measurementId,
      businessId: mobileUserMeasurementShares.businessId,
      businessName: businesses.name,
      customUserId: mobileUserMeasurementShares.customUserId,
      notes: mobileUserMeasurementShares.notes,
      status: mobileUserMeasurementShares.status,
      createdAt: mobileUserMeasurementShares.createdAt,
    })
    .from(mobileUserMeasurementShares)
    .leftJoin(
      businesses,
      eq(mobileUserMeasurementShares.businessId, businesses.id),
    )
    .where(eq(mobileUserMeasurementShares.measurementId, measurementId))
    .orderBy(desc(mobileUserMeasurementShares.createdAt));

  return c.json({
    success: true,
    data: { shares },
  });
});

/* -----------------------------------
   DELETE /measurements/:id/shares/:shareId
   Revoke a measurement share
----------------------------------- */
app.delete("/:id/shares/:shareId", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;
  const measurementId = c.req.param("id");
  const shareId = c.req.param("shareId");

  // Verify the measurement belongs to the user
  const [measurement] = await db
    .select({ id: mobileUserMeasurements.id })
    .from(mobileUserMeasurements)
    .where(
      and(
        eq(mobileUserMeasurements.id, measurementId),
        eq(mobileUserMeasurements.userId, userId),
      ),
    );

  if (!measurement) {
    throw new HTTPException(404, { message: "Measurement not found" });
  }

  const [share] = await db
    .select({ id: mobileUserMeasurementShares.id })
    .from(mobileUserMeasurementShares)
    .where(
      and(
        eq(mobileUserMeasurementShares.id, shareId),
        eq(mobileUserMeasurementShares.measurementId, measurementId),
      ),
    );

  if (!share) {
    throw new HTTPException(404, { message: "Share not found" });
  }

  await db
    .delete(mobileUserMeasurementShares)
    .where(eq(mobileUserMeasurementShares.id, shareId));

  return c.json({
    success: true,
    data: { message: "Share revoked successfully" },
  });
});

export default app;
