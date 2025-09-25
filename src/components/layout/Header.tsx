'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';
import { LoginDialog } from '@/components/auth/LoginDialog';
import { SignupDialog } from '@/components/auth/SignupDialog';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { ClientOnly } from '@/components/ClientOnly';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shilp-scan', label: 'Shilp-Scan' },
  { href: '/artisans', label: 'Artisans' },
  { href: '/craft-map', label: 'Craft Map' },
  { href: '/join-artisan', label: 'Join as Artisan' },
];

export function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user } = useAuth();

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="hidden font-bold sm:inline-block font-headline">
                KalaSetu
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-between gap-x-4 md:justify-end">
            <div className="md:hidden">
               <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0 pt-10">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                   <Link href="/" className="flex items-center space-x-2 px-6">
                      <Logo className="h-6 w-6 text-primary" />
                      <span className="font-bold font-headline">KalaSetu</span>
                  </Link>
                  <nav className="mt-8 flex flex-col gap-y-4 px-6">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                  </nav>
                  
                  {/* Mobile Auth Buttons */}
                  <ClientOnly>
                    {!user && (
                      <div className="mt-8 px-6 space-y-2">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => setShowLogin(true)}
                        >
                          Login
                        </Button>
                        <Button 
                          className="w-full justify-start"
                          onClick={() => setShowSignup(true)}
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </ClientOnly>
                </SheetContent>
              </Sheet>
            </div>
            
             <Link href="/" className="flex items-center space-x-2 md:hidden">
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">KalaSetu</span>
              </Link>

            {/* Desktop Auth */}
            <nav className="flex items-center gap-2">
              <ClientOnly
                fallback={
                  <>
                    <Button variant="ghost" disabled>
                      Login
                    </Button>
                    <Button disabled>
                      Sign Up
                    </Button>
                  </>
                }
              >
                {user ? (
                  <UserMenu />
                ) : (
                  <>
                    <Button 
                      variant="ghost"
                      onClick={() => setShowLogin(true)}
                    >
                      Login
                    </Button>
                    <Button onClick={() => setShowSignup(true)}>
                      Sign Up
                    </Button>
                  </>
                )}
              </ClientOnly>
            </nav>
          </div>
        </div>
      </header>

      {/* Auth Dialogs */}
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupDialog
        open={showSignup}
        onOpenChange={setShowSignup}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}
