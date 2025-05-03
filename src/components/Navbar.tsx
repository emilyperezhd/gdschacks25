"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { HomeIcon, UserIcon, ZapIcon, CompassIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-green-50/80 backdrop-blur-md border-b border-green-300 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1 bg-green-100 rounded">
            <ZapIcon className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-xl font-bold font-mono text-green-700">
            travel<span className="text-green-500">pal</span>.ai
          </span>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-5">
          {isSignedIn ? (
            <>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900 transition-colors"
              >
                <HomeIcon size={16} />
                <span>Home</span>
              </Link>

              <Link
                href="/generate-trip"
                className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900 transition-colors"
              >
                <CompassIcon size={16} />
                <span>Plan</span>
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900 transition-colors"
              >
                <UserIcon size={16} />
                <span>Profile</span>
              </Link>

              <Button
                asChild
                variant="outline"
                className="ml-2 border-green-500 text-green-700 hover:text-white hover:bg-green-500/90"
              >
                <Link href="/generate-trip">Get Started</Link>
              </Button>

              <UserButton />
            </>
          ) : (
            <>
              <SignInButton>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-700 hover:text-white hover:bg-green-500/90"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button className="bg-green-500 text-white hover:bg-green-600">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
