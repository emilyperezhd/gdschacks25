import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, AppleIcon, ShieldIcon, Sparkles, ChevronRight } from "lucide-react";
import { TRAVEL_DESTINATIONS } from "@/constants";

const TravelPrograms = () => {
  return (
    <div className="w-full pb-24 pt-16 relative">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg overflow-hidden mb-16">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/70">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              <span className="text-sm text-primary font-medium">Destination Gallery</span>
            </div>
            <div className="text-sm text-muted-foreground">Eco Travel Picks</div>
          </div>
          <div className="p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Eco-Friendly </span>
              <span className="text-primary">Trips</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Discover personalized low-carbon travel plans for every kind of explorer.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAVEL_DESTINATIONS.map((place) => (
            <Card key={place.id} className="bg-card/90 backdrop-blur-sm border border-border hover:border-primary/50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm text-primary">{place.destination.toUpperCase()}</span>
                </div>
                <div className="text-sm text-muted-foreground">{place.ecoRating}</div>
              </div>
              <CardHeader className="pt-6 px-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border border-border">
                    <img src={place.heroImage} alt={place.destination} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">{place.destination}</CardTitle>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Users className="h-4 w-4" />
                      {place.bestTimeToVisit || "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="px-3 py-1 bg-primary/10 rounded border border-primary/20 text-sm text-primary flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    {place.foodPlan.title}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <ShieldIcon className="h-4 w-4" />
                    Eco Mode
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-5">
                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-3">
                    <AppleIcon className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-foreground">{place.foodPlan.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Local, sustainable meals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-foreground">Transport</h3>
                      <p className="text-sm text-muted-foreground mt-1">{place.transportation}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-border text-sm text-muted-foreground">
                  <span className="text-primary">&gt;</span> {place.overview.substring(0, 100)}...
                </div>
              </CardContent>
              <CardFooter className="px-5 py-4 border-t border-border">
                <Link href={`/destinations/${place.id}`} className="w-full">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    View Trip Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelPrograms;
