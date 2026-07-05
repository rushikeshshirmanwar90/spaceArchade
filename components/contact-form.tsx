'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/reveal';

const DEFAULT_CONTACT = {
  title: 'Get In Touch',
  description: "Fill out the form below and we'll get back to you shortly.",
  services: [
    'Residential Design',
    'Commercial Design',
    'Interior Design',
    'Renovation',
    'Consultation',
    'Other',
  ],
  whatsappNumber: '919579896842',
};

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfeV41REMsMRhheHe--kdWRp1u-ufHdj8uXJxtCNMdQkQcgOA/viewform?embedded=true';

export function ContactForm() {
  const [contact, setContact] = useState(DEFAULT_CONTACT);
  const [activeTab, setActiveTab] = useState<'quick' | 'detailed'>('quick');

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch('/api/settings?key=contact');
        const json = await res.json();
        if (json.success && json.data && json.data.value) {
          setContact({ ...DEFAULT_CONTACT, ...json.data.value });
        }
      } catch (err) {
        console.error('Error fetching contact settings:', err);
      }
    }
    fetchContact();
  }, []);

  return (
    <section id="contact" className="py-20 px-6 bg-muted/20">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{contact.title}</h2>
          <p className="text-xl text-muted-foreground">{contact.description}</p>
        </Reveal>

        <Reveal delay={100}>
        <div className="flex justify-center gap-2 mb-8">
          <Button
            type="button"
            variant={activeTab === 'quick' ? 'default' : 'outline'}
            onClick={() => setActiveTab('quick')}
            className="transition-all duration-300"
          >
            Quick Enquiry
          </Button>
          <Button
            type="button"
            variant={activeTab === 'detailed' ? 'default' : 'outline'}
            onClick={() => setActiveTab('detailed')}
            className="transition-all duration-300"
          >
            Detailed Enquiry Form
          </Button>
        </div>

        {activeTab === 'detailed' ? (
          <Card className="p-2 sm:p-4 overflow-hidden">
            <iframe
              src={GOOGLE_FORM_URL}
              title="Enquiry Form"
              className="w-full h-[1200px] rounded-lg border-0"
            >
              Loading…
            </iframe>
            <p className="text-center text-sm text-muted-foreground py-2">
              Having trouble viewing the form?{' '}
              <a
                href={GOOGLE_FORM_URL.replace('?embedded=true', '')}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Open it in a new tab
              </a>
            </p>
          </Card>
        ) : (
        <Card className="p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName') as string;
              const service = formData.get('service') as string;
              const message = formData.get('message') as string;

              const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${encodeURIComponent(
                fullName
              )}%0A*Service:* ${encodeURIComponent(service)}%0A*Message:* ${encodeURIComponent(
                message
              )}%0A%0AFrom: Space Archade Website`;

              window.open(
                `https://wa.me/${contact.whatsappNumber}?text=${whatsappMessage}`,
                '_blank'
              );
            }}
            className="space-y-8"
          >
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium my-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-300"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium my-1">
                Service Required
              </label>
              <select
                id="service"
                name="service"
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-300"
              >
                <option value="">Select a service</option>
                {contact.services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium my-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-shadow duration-300"
                placeholder="Tell us about your project..."
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            >
              Send Message via WhatsApp
            </Button>
          </form>
        </Card>
        )}
        </Reveal>
      </div>
    </section>
  );
}
