"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";

import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);

export async function CreateCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  try {
    console.log("🔵 1. Starting CreateCourse with values:", JSON.stringify(values, null, 2));
    
    const session = await requireAdmin();
    console.log("🔵 2. Session obtained:", session.user.id);

    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    console.log("🔵 3. Arcjet decision:", decision.conclusion);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        console.log("🔴 Rate limit hit");
        return {
          status: "error",
          message: "You have been blocked due to rate limiting",
        };
      } else {
        console.log("🔴 Bot detected");
        return {
          status: "error",
          message: "You are a bot! if this is a mistake contact our support",
        };
      }
    }

    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      console.log("🔴 4. Validation FAILED:", JSON.stringify(validation.error.errors, null, 2));
      return {
        status: "error",
        message: `Invalid Form Data: ${validation.error.errors.map(e => e.message).join(", ")}`,
      };
    }

    console.log("🔵 4. Validation passed:", validation.data);

    console.log("🔵 5. Creating Stripe product...");
    const data = await stripe.products.create({
      name: validation.data.title,
      description: validation.data.smallDescription,
      default_price_data: {
        currency: "usd",
        unit_amount: validation.data.price * 100,
      },
    });

    console.log("🔵 6. Stripe product created. ID:", data.id, "Price ID:", data.default_price);

    console.log("🔵 7. Creating course in database...");
    const course = await prisma.course.create({
      data: {
        ...validation.data,
        userId: session.user.id,
        stripePriceId: data.default_price as string,
      },
    });

    console.log("🟢 8. Course created successfully! ID:", course.id);

    return {
      status: "success",
      message: "Course created succesfully",
    };
  } catch (error) {
    console.error("🔴 ERROR COMPLETO:", error);
    console.error("🔴 Error name:", error instanceof Error ? error.name : "Unknown");
    console.error("🔴 Error message:", error instanceof Error ? error.message : "Unknown");
    console.error("🔴 Error stack:", error instanceof Error ? error.stack : "Unknown");
    
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to create course",
    };
  }
}