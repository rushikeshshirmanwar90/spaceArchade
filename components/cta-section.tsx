import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Let&apos;s discuss your architectural vision and create something extraordinary together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Schedule Consultation
          </Button>
          <Button size="lg" variant="outline">
            View Our Process
          </Button>
        </div>
      </div>
    </section>
  );
}
