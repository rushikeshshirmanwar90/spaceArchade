import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-moonrising">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-moonrising">
            Hear from our satisfied clients about their transformative architectural experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <Card className="p-8 hover:shadow-lg transition-all">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed font-moonrising">
              &quot;Working with Space Archade transformed our vision into reality. Their attention to detail and innovative approach exceeded all expectations. Our home is now a masterpiece.&quot;
            </p>
            <div className="border-t border-border pt-4">
              <p className="font-semibold font-moonrising">Sarah Mitchell</p>
              <p className="text-sm text-muted-foreground font-moonrising">CEO, Tech Innovation Inc.</p>
            </div>
          </Card>

          {/* Testimonial 2 */}
          <Card className="p-8 hover:shadow-lg transition-all">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed font-moonrising">
              &quot;The team&apos;s expertise in sustainable design helped us create an office that&apos;s both beautiful and environmentally responsible. Highly recommended!&quot;
            </p>
            <div className="border-t border-border pt-4">
              <p className="font-semibold font-moonrising">James Richardson</p>
              <p className="text-sm text-muted-foreground font-moonrising">Founder, GreenTech Solutions</p>
            </div>
          </Card>

          {/* Testimonial 3 */}
          <Card className="p-8 hover:shadow-lg transition-all">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed font-moonrising">
              &quot;Exceptional professionalism and creativity. Space Archade delivered a luxury resort that has become our most profitable property. They truly understand luxury.&quot;
            </p>
            <div className="border-t border-border pt-4">
              <p className="font-semibold font-moonrising">Lucia Colombo</p>
              <p className="text-sm text-muted-foreground font-moonrising">Director, Hospitality Group</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
