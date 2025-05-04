import TerminalOverlay from "@/components/TerminalOverlay";
import { Button } from "@/components/ui/button";
import UserPrograms from "@/components/UserPrograms";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <section className="relative z-10 py-24 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* CORNER DECARATION */}
            <div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2" />

            {/* LEFT SIDE CONTENT */}
            <div className="lg:col-span-7 space-y-8 relative lg:pl-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <div>
                  <span className="text-foreground">Adventure Awaits!</span>
                </div>
                <div>
                  <span className="text-primary">Make</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">Every Trip </span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground"></span>
                  <span className="text-primary">Eco-Friendly</span>
                </div>
              </h1>

              {/* SEPERATOR LINE */}
              <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

              <p className="text-xl text-muted-foreground w-2/3">
              Plan your perfect eco-friendly trip with ease using our Gemini-powered AI and interactive chatbot — making sustainable travel smarter and more personal than ever.
              </p>

              {/* STATS */}
              <div className="flex items-center gap-10 py-6 font-mono">
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">10+</div>
                  <div className="text-xs uppercase tracking-wider">ECO TRIPS PLANNED</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">3min</div>
                  <div className="text-xs uppercase tracking-wider">GENERATION</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">100%</div>
                  <div className="text-xs uppercase tracking-wider">PERSONALIZED</div>
                </div>
              </div>

              {/* BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  asChild
                  className="overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium"
                >
                  <Link href={"/generate-program"} className="flex items-center font-mono">
                    Build Your Dream Itinerary
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE CONTENT */}
            <div className="lg:col-span-5 relative">
              {/* CORNER PIECES */}
              <div className="absolute -inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-border" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-border" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-border" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-border" />
              </div>

              {/* IMAGE CONTANINER */}
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-lg bg-cyber-black">
                  <img
                    src="/hero-ai3.png"
                    alt="AI Fitness Coach"
                    className="size-full object-cover object-center"
                  />

                  {/* SCAN LINE */}

          
                </div>

                {/* TERMINAL OVERLAY */}
                <TerminalOverlay />
              </div>
            </div>
          </div>
        </div>
      </section>

      <UserPrograms />
    </div>
  );
};
export default HomePage;
