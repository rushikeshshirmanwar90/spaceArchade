import Image from 'next/image';

export function AwardsSection() {
  return (
    <section id="awards" className="py-20 px-6 bg-secondary/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Awards & Recognition</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Industry-leading recognition for architectural excellence and innovative design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Award 1 */}
          <div className="flex gap-6">
            <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src="/award-1.jpg"
                alt="International Design Award"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">International Design Excellence Award</h3>
              <p className="text-primary font-medium mb-2">2024</p>
              <p className="text-muted-foreground">
                Recognized globally for innovation and creativity in contemporary architecture and design methodology.
              </p>
            </div>
          </div>

          {/* Award 2 */}
          <div className="flex gap-6">
            <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src="/award-2.jpg"
                alt="Sustainable Architecture Award"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Sustainable Architecture Award</h3>
              <p className="text-primary font-medium mb-2">2023</p>
              <p className="text-muted-foreground">
                Excellence in green building design and environmentally responsible architectural solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Award List */}
        <div className="bg-background rounded-lg p-8 border border-border">
          <h3 className="text-2xl font-semibold mb-6">Additional Recognition</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="text-primary text-xl mt-1">✓</div>
              <div>
                <p className="font-semibold">Architectural Digest Hall of Fame</p>
                <p className="text-sm text-muted-foreground">2022-2024</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-primary text-xl mt-1">✓</div>
              <div>
                <p className="font-semibold">World Architecture News - Top 10 Firms</p>
                <p className="text-sm text-muted-foreground">2023</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-primary text-xl mt-1">✓</div>
              <div>
                <p className="font-semibold">American Institute of Architecture Excellence</p>
                <p className="text-sm text-muted-foreground">2024</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-primary text-xl mt-1">✓</div>
              <div>
                <p className="font-semibold">European Design Award - Platinum</p>
                <p className="text-sm text-muted-foreground">2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
