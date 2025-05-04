import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const http = httpRouter();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// ── Clerk Webhook Handler ───────────────────────────────────────────────────
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

    if (evt.type === "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();
      await ctx.runMutation(api.users.syncUser, {
        clerkId: id,
        email,
        name,
        image: image_url,
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
      legs: Array.isArray(d.legs)
        ? d.legs.map((leg: any) => ({
            from: leg.from,
            to: leg.to,
            distance_km: leg.distance_km,
            co2_kg: leg.co2_kg,
          }))
        : [],
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
        date,
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
You are an eco‑travel itinerary generator. Do not ask clarifying questions or confirm details—assume the info is complete.

• Date: ${date}
• Destination: ${destination}
• Purpose: ${purpose}
• Interests: ${interests}
• Trip length (days): ${length}
• Accessibility: ${accessability}

For each day:
- Propose low‑impact activities and sustainable lodging.
- For each travel segment, estimate:
  • distance_km (numeric, kilometers)
  • co2_kg (numeric, kilograms)

Return ONLY valid JSON matching this schema:
{
  "schedule": ["Day 1", "Day 2", …],
  "activities": [
    {
      "day": "Day 1",
      "activities": ["…", "…"],
      "legs": [
        { "from": "Place A", "to": "Place B", "distance_km": 5.4, "co2_kg": 0.8 },
        …
      ]
    },
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
        name: `Eco Itinerary: ${destination} on ${date}`,
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

// ── Eco‑Travel Image Generation Route ────────────────────────────────────
http.route({
  path: "/vapi/generate-image",
  method: "POST",
  handler: httpAction(async (_ctx, request) => {
    try {
      const { destination } = await request.json();

      // Call the Gemini REST image generation endpoint directly
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1/images:generate?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "stable-diffusion-2-base",
            prompt: `A beautiful, high-resolution photograph of ${destination}, showing its iconic landmarks in soft morning light.`,
            size: "1024x512",
          }),
        }
      );
      if (!resp.ok) {
        const errText = await resp.text();
        console.error("Image-gen REST failed:", errText);
        throw new Error("Image generation failed");
      }

      const json = await resp.json() as { data: Array<{ url: string }> };
      const imageUrl = json.data?.[0]?.url;
      return new Response(JSON.stringify({ imageUrl }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error("Error in /vapi/generate-image:", e);
      return new Response(
        JSON.stringify({ error: e instanceof Error ? e.message : String(e) }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});


export default http;