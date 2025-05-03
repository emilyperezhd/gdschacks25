"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import NoTravelPlan from "../../components/NoTravelPlan"; // Updated the path to match the likely file structure
import CornerElements from "@/components/CornerElements";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, MapIcon, UtensilsCrossedIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProfilePage = () => {
  const { user } = useUser();
  const userId = user?.id;

  // ✅ Safe Convex query only when userId is ready
  const allPlans = useQuery(
    api.plans.getUserPlans,
    userId ? { userId } : "skip"
  );

  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null);
  const activePlan = allPlans?.find((plan) => plan.isActive);

  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;

  return (
    <section className="bg-background relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">      <ProfileHeader user={user} />

      {allPlans && allPlans.length > 0 ? (
        <div className="space-y-8">
          {/* Plan selector */}
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

          {/* Plan details */}
          {currentPlan && (
            <div className="relative backdrop-blur-sm border border-border rounded-lg p-6">
              <CornerElements />

              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <h3 className="text-lg font-bold">
                  PLAN: <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded"></span>
                </h3>
              </div>

              <Tabs defaultValue="itinerary" className="w-full">
                <TabsList className="mb-6 w-full grid grid-cols-2 bg-primary/5 border-primary/20">                  <TabsTrigger
                    value="itinerary"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                  >
                    <MapIcon className="mr-2 size-4" />
                    Itinerary
                  </TabsTrigger>

                  <TabsTrigger
                    value="cuisine"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                  >
                    <UtensilsCrossedIcon className="mr-2 h-4 w-4" />
                    Local Cuisine
                  </TabsTrigger>
                </TabsList>

                {/* Itinerary Tab */}
                <TabsContent value="itinerary">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span className="font-mono text-sm text-muted-foreground">
                        DAYS: {currentPlan.workoutPlan.schedule.join(", ")}
                      </span>
                    </div>

                    <Accordion type="multiple" className="space-y-4">
                      {currentPlan.workoutPlan.exercises.map((dayPlan, index) => (
                        <AccordionItem
                          key={index}
                          value={dayPlan.day}
                          className="border rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-primary/10 font-mono">
                            <div className="flex justify-between w-full items-center">
                              <span className="text-primary">{dayPlan.day}</span>
                              <div className="text-xs text-muted-foreground">
                                {dayPlan.routines.length} ACTIVITIES
                              </div>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="pb-4 px-4">
                            <div className="space-y-3 mt-2">
                              {dayPlan.routines.map((activity, idx) => (
                                <div
                                  key={idx}
                                  className="border border-border rounded p-3 bg-background/50"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-foreground">
                                      {activity.name}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                      <div className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono">
                                        Duration: {activity.sets} hrs
                                      </div>
                                      <div className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono">
                                        Type: {activity.reps}
                                      </div>
                                    </div>
                                  </div>
                                  {activity.description && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {activity.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                {/* Cuisine Tab */}
                <TabsContent value="cuisine">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-sm text-muted-foreground">
                        LOCAL FOOD BUDGET
                      </span>
                      <div className="font-mono text-xl text-primary">
                        ~{currentPlan.dietPlan.dailyCalories} KCAL Equivalent
                      </div>
                    </div>

                    <div className="h-px w-full bg-border my-4"></div>

                    <div className="space-y-4">
                      {currentPlan.dietPlan.meals.map((meal, index) => (
                        <div
                          key={index}
                          className="border border-border rounded-lg overflow-hidden p-4"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <h4 className="font-mono text-primary">{meal.name}</h4>
                          </div>
                          <ul className="space-y-2">
                            {meal.foods.map((dish, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <span className="text-xs text-primary font-mono">
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                {dish}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      ) : (
        <NoTravelPlan />
      )}
    </section>
  );
};

export default ProfilePage;
// Note: The above code assumes that you have the necessary components and styles defined in your project.
// You may need to adjust the imports and styles based on your project's structure.
// The code also assumes that you have a Convex backend set up to handle the API calls.
// Make sure to test the functionality and adjust any logic as needed based on your requirements.
// The code is structured to provide a clean and organized layout for the profile page, with clear sections for user information, travel plans, and plan details.