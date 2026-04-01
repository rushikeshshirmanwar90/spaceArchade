'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ContactForm() {
  return (
    <section id="contact" className="py-20 px-6 bg-muted/20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">
            Fill out the form below and we&apos;ll get back to you shortly.
          </p>
        </div>

        <Card className="p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName') as string;
              const service = formData.get('service') as string;
              const message = formData.get('message') as string;

              // Create WhatsApp message
              const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${encodeURIComponent(fullName)}%0A*Service:* ${encodeURIComponent(service)}%0A*Message:* ${encodeURIComponent(message)}%0A%0AFrom: Space Archade Website`;
              
              // Open WhatsApp with pre-filled message
              window.open(`https://wa.me/919579896842?text=${whatsappMessage}`, '_blank');
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
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
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
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a service</option>
                <option value="Residential Design">Residential Design</option>
                <option value="Commercial Design">Commercial Design</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Renovation">Renovation</option>
                <option value="Consultation">Consultation</option>
                <option value="Other">Other</option>
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
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Send Message via WhatsApp
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
