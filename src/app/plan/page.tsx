// src/app/plan/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import NoTravelPlan from "@/components/NoTravelPlan";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// little helper to turn an ISO date into “May 3, 2025”
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PlanPage() {
  const { user } = useUser();
  const userId = user?.id as string;
  const plans = useQuery(api.plans.getUserPlans, { userId });

  if (!plans) return <div className="p-8">Loading your trips…</div>;
  if (plans.length === 0) return <NoTravelPlan />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Travel Plans</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan._id.toString()}>
            <CardHeader>
              <h2 className="text-xl font-semibold">{plan.name}</h2>
            </CardHeader>
            <CardContent>
              <p>
                {formatDate(plan.itineraryPlan.schedule[0])} {/* Using the first date in the schedule */}
              </p>
              {/* Uncomment and update the following block if 'notes' is added to the plan type */}
              {/* {plan.notes && (
                <p className="mt-2 text-muted-foreground">{plan.notes}</p>
              )} */}
            </CardContent>
            <CardFooter>
              <Link
                href={{
                  pathname: "/profile",
                  query: { planId: plan._id.toString() },
                }}
              >
                <Button size="sm">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
