'use client';

import { useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ProjectsSection } from '@/components/projects-section';
import { ArchitectsSection } from '@/components/architects-section';
import { StatsSection } from '@/components/stats-section';
import { ProcessSection } from '@/components/process-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { WhatsAppWidget } from '@/components/whatsapp-widget';

export default function Home() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          const element = document.querySelector(href);
          if (element) {
            const navHeight = 72;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="w-full bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ArchitectsSection />
      <StatsSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactForm />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}