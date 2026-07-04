'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'Process' },
  { href: '#architects', label: 'Team' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur animate-nav-drop">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div>
          <Image
            height={100}
            width={500}
            src="/logo.png"
            alt="Space Archade Logo"
            className="w-40 brightness-0 dark:invert"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-1">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50 dark:hover:bg-accent/30 text-foreground"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-border bg-background/98 backdrop-blur-md p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-8">
                <SheetHeader className="text-left p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="pb-4 border-b border-border/50">
                    <Image
                      height={100}
                      width={500}
                      src="/logo.png"
                      alt="Space Archade Logo"
                      className="w-36 brightness-0 dark:invert"
                      priority
                    />
                  </div>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium py-3 border-b border-border/20 text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                    >
                      <span>{link.label}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-sm">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground border-t border-border/50 pt-4 flex flex-col gap-1">
                <p className="font-semibold text-foreground">Space Archade</p>
                <p>Contemporary Architectural Design</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
