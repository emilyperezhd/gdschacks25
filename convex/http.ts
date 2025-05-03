import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const http = httpRouter();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// ── Clerk Webhook (unchanged) ───────────────────────────────────────────────
http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
    const svix_id = request.headers.get("svix-id")!;
    const svix_signature = request.headers.get("svix-signature")!;
    const svix_timestamp = request.headers.get("svix-timestamp")!;
    const body = JSON.stringify(await request.json());
    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Invalid webhook", { status: 400 });
    }
    // user.created / user.updated handlers...
    if (evt.type === "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();
      await ctx.runMutation(api.users.syncUser, {
        email,
        name,
        image: image_url,
        clerkId: id,
      });
    }
    if (evt.type === "user.updated") {
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();
      await ctx.runMutation(api.users.updateUser, {
        clerkId: id,
        email,
        name,
        image: image_url,
      });
    }
    return new Response("OK", { status: 200 });
  }),
});

// ── Eco‑Travel Itinerary Route ──────────────────────────────────────────────
function validateItineraryPlan(plan: any) {
  return {
    schedule: plan.schedule,
    activities: plan.activities.map((d: any) => ({
      day: d.day,
      activities: Array.isArray(d.activities) ? d.activities : [],
    })),
  };
}

http.route({
  path: "/vapi/generate-program",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const {
        user_id,
        age,
        destination,
        purpose,
        interests,
        length,
        accessability,
      } = await request.json();

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-001",
        generationConfig: {
          temperature: 0.4,
          topP: 0.9,
          responseMimeType: "application/json",
        },
      });

      const prompt = `
You are a friendly eco‑friendly travel planner. Create a personalized itinerary based on:
• Age: ${age}
• Destination: ${destination}
• Purpose: ${purpose}
• Interests: ${interests}
• Trip length (days): ${length}
• Accessibility needs: ${accessability}

As a planner:
- Suggest sustainable transport, lodging, and low‑impact activities.
- Structure by day with clear labels ("Day 1", "Day 2", …).
- Include simple eco‑tips where relevant.

CRITICAL SCHEMA:
Return ONLY this JSON structure, no extra fields:
{
  "schedule": ["Day 1", "Day 2", …],
  "activities": [
    { "day": "Day 1", "activities": ["…", "…"] },
    …
  ]
}
`;

      const gen = await model.generateContent(prompt);
      const text = gen.response.text();
      let itineraryPlan = JSON.parse(text);
      itineraryPlan = validateItineraryPlan(itineraryPlan);

      const planId = await ctx.runMutation(api.plans.createPlan, {
        userId: user_id,
        name: `Eco Itinerary: ${destination} on ${new Date().toLocaleDateString()}`,
        itineraryPlan,
        isActive: true,
      });

      return new Response(
        JSON.stringify({ success: true, data: { planId, itineraryPlan } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (e) {
      console.error("Error generating travel plan:", e);
      return new Response(
        JSON.stringify({
          success: false,
          error: e instanceof Error ? e.message : String(e),
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});

export default http;
