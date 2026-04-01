import Image from 'next/image';

export function ProcessSection() {
  return (
    <section id="process" className="py-20 px-6 bg-muted/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Design Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A systematic approach to creating exceptional architectural solutions tailored to your vision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Process Step 1 */}
          <div className="flex flex-col">
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src="/process-1.jpg"
                alt="Concept & Planning"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold">Concept & Planning</h3>
              </div>
              <p className="text-muted-foreground">
                We begin with in-depth consultations to understand your vision, goals, and unique requirements for your project.
              </p>
            </div>
          </div>

          {/* Process Step 2 */}
          <div className="flex flex-col">
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src="/process-2.jpg"
                alt="Design & Development"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold">Design & Development</h3>
              </div>
              <p className="text-muted-foreground">
                Our team creates detailed renderings and 3D models, iterating with your feedback until perfection is achieved.
              </p>
            </div>
          </div>

          {/* Process Step 3 */}
          <div className="flex flex-col">
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src="/process-3.jpg"
                alt="Execution & Delivery"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold">Execution & Delivery</h3>
              </div>
              <p className="text-muted-foreground">
                We oversee every detail of construction, ensuring quality standards and timely completion of your project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
