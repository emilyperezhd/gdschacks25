// app/destinations/[id]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { TRAVEL_DESTINATIONS } from "@/constants";
import { Button } from "@/components/ui/button";

export default function DestinationDetail({
  params,
  searchParams: _searchParams, // underscore to avoid “unused variable” lint errors
}: {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const id = parseInt(params.id, 10);
  const place = TRAVEL_DESTINATIONS.find((p) => p.id === id);

  if (!place) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Trip not found</h1>
        <Link href="/" className="text-primary hover:underline">
          ← Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back link */}
      <Link href="/" className="text-sm text-primary hover:underline">
        ← Back to Gallery
      </Link>

      {/* Hero image */}
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
        <Image
          src={place.heroImage}
          alt={place.destination}
          fill
          className="object-cover"
        />
      </div>

      {/* Title & overview */}
      <h1 className="text-4xl font-bold">{place.destination}</h1>
      <p className="text-lg text-muted-foreground">{place.overview}</p>

      {/* Quick facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-medium">Best time to visit</h3>
          <p>{place.bestTimeToVisit}</p>
        </div>
        <div>
          <h3 className="font-medium">Eco Rating</h3>
          <p>{place.ecoRating}</p>
        </div>
        <div>
          <h3 className="font-medium">Transport</h3>
          <p>{place.transportation}</p>
        </div>
      </div>

      {/* Top attractions */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Top Attractions</h2>
        <ul className="list-disc pl-5 space-y-1">
          {place.topAttractions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Insider tips */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Insider Tips</h2>
        <ul className="list-disc pl-5 space-y-1">
          {place.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">← Back</Link>
        </Button>
        <Button>Book this trip</Button>
      </div>
    </div>
  );
}
