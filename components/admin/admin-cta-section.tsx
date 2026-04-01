import { Button } from '@/components/ui/button';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

export function AdminCTASection() {
  const { setSelectedItem } = useEditContext();

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'cta',
              title: 'Ready to Transform Your Space?',
              description: 'Let\'s discuss your architectural vision and create something extraordinary together.',
            })
          }
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let&apos;s discuss your architectural vision and create something extraordinary together.
          </p>
        </EditableWrapper>
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
