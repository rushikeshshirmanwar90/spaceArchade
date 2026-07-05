'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DEFAULT_CTA = {
  title: 'Ready to Transform Your Space?',
  description:
    "Let's discuss your architectural vision and create something extraordinary together.",
  primaryLabel: 'Schedule Consultation',
  primaryHref: '#contact',
  secondaryLabel: 'View Our Process',
  secondaryHref: '#process',
};

export function CTASection() {
  const [cta, setCta] = useState(DEFAULT_CTA);

  useEffect(() => {
    async function fetchCta() {
      try {
        const res = await fetch('/api/settings?key=cta');
        const json = await res.json();
        if (json.success && json.data && json.data.value) {
          setCta({ ...DEFAULT_CTA, ...json.data.value });
        }
      } catch (err) {
        console.error('Error fetching CTA settings:', err);
      }
    }
    fetchCta();
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-6">{cta.title}</h2>
        <p className="text-xl text-muted-foreground mb-8">{cta.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={cta.primaryHref}>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {cta.primaryLabel}
            </Button>
          </Link>
          <Link href={cta.secondaryHref}>
            <Button size="lg" variant="outline">
              {cta.secondaryLabel}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
