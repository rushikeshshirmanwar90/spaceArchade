'use client';

import { Button } from '@/components/ui/button';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

export function AdminCTASection() {
  const { setSelectedItem, data } = useEditContext();
  const cta = data.cta;

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'cta',
              title: cta.title,
              description: cta.description,
              primaryLabel: cta.primaryLabel,
              primaryHref: cta.primaryHref,
              secondaryLabel: cta.secondaryLabel,
              secondaryHref: cta.secondaryHref,
            })
          }
        >
          <h2 className="text-4xl font-bold mb-6">{cta.title}</h2>
          <p className="text-lg text-muted-foreground mb-8">{cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {cta.primaryLabel}
            </Button>
            <Button size="lg" variant="outline">
              {cta.secondaryLabel}
            </Button>
          </div>
        </EditableWrapper>
      </div>
    </section>
  );
}
