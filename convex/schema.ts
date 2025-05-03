import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  plans: defineTable({
    userId: v.string(),
    name: v.string(),
    itineraryPlan: v.object({
      // e.g. ["Day 1", "Day 2", ...]
      schedule: v.array(v.string()),
      // one entry per day, listing eco‑friendly activities
      activities: v.array(
        v.object({
          day: v.string(),
          activities: v.array(v.string()),
        })
      ),
    }),
    isActive: v.boolean(),
  })
    .index("by_user_id", ["userId"])
    .index("by_active", ["isActive"]),
});
