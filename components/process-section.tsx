'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProcessStep {
  _id: string;
  step: number;
  title: string;
  description: string;
  image: string;
}

export function ProcessSection() {
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch process steps from API
  useEffect(() => {
    async function fetchProcessSteps() {
      try {
        const response = await fetch('/api/process-steps');
        const result = await response.json();
        if (result.success) {
          setProcessSteps(result.data.sort((a: ProcessStep, b: ProcessStep) => a.step - b.step));
        }
      } catch (error) {
        console.error('Error fetching process steps:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProcessSteps();
  }, []);

  if (loading) {
    return (
      <section id="process" className="py-20 px-6 bg-muted/20">
        <div className="mx-auto max-w-7xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

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
          {processSteps.map((step) => (
            <div key={step._id} className="flex flex-col">
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
