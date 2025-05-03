"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import NoTravelPlan from "@/components/NoTravelPlan";
import CornerElements from "@/components/CornerElements";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, LeafIcon, MapIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProfilePage = () => {
  const { user } = useUser();
  const userId = user?.id as string;

  const allPlans = useQuery(api.plans.getUserPlans, { userId });
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const activePlan = allPlans?.find((plan) => plan.isActive);
  const currentPlan =
    selectedPlanId
      ? allPlans?.find((plan) => plan._id === selectedPlanId)
      : activePlan;

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
      <ProfileHeader user={user} />

      {allPlans && allPlans.length > 0 ? (
        <div className="space-y-8">
          {/* PLAN SELECTOR */}
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
                  }`}>
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

          {/* PLAN DETAILS */}
          {currentPlan ? (
            <div className="relative backdrop-blur-sm border border-border rounded-lg p-6">
              <CornerElements />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <h3 className="text-lg font-bold">
                  PLAN: <span className="text-primary">{currentPlan.name}</span>
                </h3>
              </div>

              <Tabs defaultValue="itinerary" className="w-full">
                <TabsList className="mb-6 w-full grid grid-cols-2 bg-cyber-terminal-bg border">
                  <TabsTrigger
                    value="itinerary"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    <MapIcon className="mr-2 h-4 w-4" />
                    Itinerary
                  </TabsTrigger>
                  <TabsTrigger
                    value="ecoTips"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    <LeafIcon className="mr-2 h-4 w-4" />
                    Eco Tips
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="itinerary">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span className="font-mono text-sm text-muted-foreground">
                        DESTINATIONS: {currentPlan.itineraryPlan.schedule.join(", ")}
                      </span>
                    </div>
                    <Accordion type="multiple" className="space-y-4">
                      {currentPlan.itineraryPlan.activities.map((day, idx) => (
                        <AccordionItem
                          key={idx}
                          value={day.day}
                          className="border rounded-lg overflow-hidden">
                          <AccordionTrigger className="px-4 py-3 font-mono hover:bg-primary/10">
                            <span className="text-primary">{day.day}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 px-4 space-y-3">
                            {day.activities.map((act, i) => (
                              <div
                                key={i}
                                className="border border-border rounded p-3 bg-background/50">
                                <p className="text-sm text-muted-foreground">{act}</p>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="ecoTips">
                  <div className="space-y-4">
                    <h4 className="font-mono text-primary">Eco-Friendly Travel Tips</h4>
                    <ul className="list-disc ml-5 text-muted-foreground space-y-2">
                      <li>Bring reusable water bottles and bags</li>
                      <li>Use public transport or walk when possible</li>
                      <li>Support local eco‑friendly businesses</li>
                      <li>Offset your carbon footprint</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
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
};

export default ProfilePage;
