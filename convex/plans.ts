// plans.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPlan = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    itineraryPlan: v.object({
      schedule: v.array(v.string()),
      activities: v.array(
        v.object({
          day: v.string(),
          activities: v.array(v.string()),
          // add legs here to match your schema
          legs: v.array(
            v.object({
              from: v.string(),
              to: v.string(),
              distance_km: v.number(),
              co2_kg: v.number(),
            })
          ),
        })
      ),
    }),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Deactivate any existing active plans
    const active = await ctx.db
      .query("plans")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    for (const plan of active) {
      await ctx.db.patch(plan._id, { isActive: false });
    }
    // Insert the new eco‑travel itinerary
    return await ctx.db.insert("plans", args);
  },
});

export const getUserPlans = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("plans")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});
