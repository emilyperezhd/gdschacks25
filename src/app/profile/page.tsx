"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import NoTravelPlan from "@/components/NoTravelPlan";
import CornerElements from "@/components/CornerElements";
import { Button } from "@/components/ui/button";
import { Leaf as LeafIcon } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { CalendarIcon, MapIcon, } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ProfilePage() {
  const { user } = useUser();
  const userId = user?.id;
  const allPlans = useQuery(
    api.plans.getUserPlans,
    userId ? { userId } : "skip"
  ) as Array<{
    _id: string;
    _creationTime: number;
    name: string;
    userId: string;
    itineraryPlan: {
      schedule: string[];
      activities: Array<{
        day: string;
        activities: string[];
        legs: Array<{
          from: string;
          to: string;
          distance_km: number;
          co2_kg: number;
        }>;
      }>;
    };
    isActive: boolean;
    destinationId?: string;
    food_plan?: { title: string };
  }>;
  

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const activePlan = allPlans?.find((plan) => plan.isActive);
  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
      <ProfileHeader user={user} />

      {allPlans && allPlans.length > 0 ? (
        <div className="space-y-8">
          {/* — Plan selector bar — */}
          <div className="relative backdrop-blur-sm border border-border p-6">
            <CornerElements />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight">
                <span className="text-primary">Your</span>{" "}
                <span className="text-foreground">Travel Plans</span>
              </h2>
              <div className="font-mono text-xs text-muted-foreground">
                TOTAL: {allPlans.length}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {allPlans.map((plan) => (
                <Button
                  key={plan._id}
                  onClick={() => setSelectedPlanId(plan._id)}
                  className={`text-foreground border hover:text-white ${
                    selectedPlanId === plan._id
                      ? "bg-primary/20 text-primary border-primary"
                      : "bg-transparent border-border hover:border-primary/50"
                  }`}
                >
                  {plan.name}
                  {plan.isActive && (
                    <span className="ml-2 bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* — Plan details & tabs — */}
          {currentPlan ? (
            <div className="relative backdrop-blur-sm border border-border rounded-lg p-6">
              <CornerElements />

              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="text-lg font-bold">
                  PLAN:{" "}
                  <span className="text-primary">{currentPlan.name}</span>
                </h3>
              </div>

              <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="mb-6 grid grid-cols-2 bg-primary/5 border-primary/20">
  <TabsTrigger
    value="itinerary"
    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
  >
    <MapIcon className="mr-2 h-4 w-4" /> Itinerary
  </TabsTrigger>

  <TabsTrigger
    value="cuisine"
    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
  >
    <LeafIcon className="mr-2 h-4 w-4" /> Eco Mode
  </TabsTrigger>
</TabsList>

                {/* — Itinerary Tab — */}
                <TabsContent value="itinerary">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span className="font-mono text-sm text-muted-foreground">
                        DESTINATIONS:{" "}
                        {currentPlan.itineraryPlan.schedule.join(", ")}
                      </span>
                    </div>
                    <Accordion type="multiple" className="space-y-4">
                      {currentPlan.itineraryPlan.activities.map((day) => (
                        <AccordionItem
                          key={day.day}
                          value={day.day}
                          className="border rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-3 font-mono hover:bg-primary/10">
                            <span className="text-primary">{day.day}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 px-4 space-y-3">
                            {day.activities.map((act, i) => (
                              <div
                                key={i}
                                className="border border-border rounded p-3 bg-background/50"
                              >
                                <p className="text-sm text-muted-foreground">
                                  {act}
                                </p>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

{/* — Eco‑Mode Tab — */}
<TabsContent value="cuisine">
  <div className="space-y-6">
    <h4 className="font-mono text-primary">Eco‑Travel Stats & Tips</h4>

    {currentPlan.itineraryPlan.activities.map((day) => {
      // Sum this day’s legs
      const totalDistance = day.legs.reduce((sum, l) => sum + l.distance_km, 0);
      const totalCO2 = day.legs.reduce((sum, l) => sum + l.co2_kg, 0);

      // Pick a tip based on CO2
      const tip =
        totalCO2 < 1
          ? "Great job—very low emissions today! Try walking more tomorrow."
          : totalCO2 < 5
          ? "Not bad—consider swapping to an e‑scooter for one leg."
          : "High emissions day—see if you can take the train instead of a taxi.";

      return (
        <div
          key={day.day}
          className="border border-border rounded-lg p-4 bg-background/50"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-sm text-muted-foreground">
              {day.day}
            </span>
            <span className="text-xs font-semibold text-primary">
              {totalDistance.toFixed(1)} km, {totalCO2.toFixed(2)} kg CO₂
            </span>
          </div>
          <p className="text-sm text-foreground mb-2">• {tip}</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
            {day.legs.map((leg, i) => (
              <li key={i}>
                {leg.from} → {leg.to}: {leg.distance_km} km,{" "}
                {leg.co2_kg} kg CO₂
              </li>
            ))}
          </ul>
        </div>
      );
    })}
  </div>
</TabsContent>

              </Tabs>

              {/* — View Trip Details button — */}
              <div className="mt-6 flex justify-end">
                <Button asChild>
                  <Link href={`/destinations/${currentPlan.destinationId ?? ""}`}>
                    View Trip Details
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <NoTravelPlan />
          )}
        </div>
      ) : (
        <NoTravelPlan />
      )}
    </section>
  );
}
