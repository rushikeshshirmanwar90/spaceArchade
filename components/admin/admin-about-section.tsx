'use client';

import Image from 'next/image';
import { Compass, Leaf, Layers } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

export function AdminAboutSection() {
  const { setSelectedItem, data } = useEditContext();
  const about = data.about;

  const openEdit = () =>
    setSelectedItem({
      type: 'about',
      badge: about.badge,
      title: about.title,
      paragraph1: about.paragraph1,
      paragraph2: about.paragraph2,
      estYear: about.estYear,
      estLabel: about.estLabel,
      feature1Title: about.feature1Title,
      feature1Desc: about.feature1Desc,
      feature2Title: about.feature2Title,
      feature2Desc: about.feature2Desc,
      image: about.image,
    });

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left: Image */}
          <div className="lg:col-span-6 relative">
            <EditableWrapper onEdit={openEdit}>
              <div className="relative aspect-square w-full max-w-[540px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border group">
                <Image
                  src={about.image}
                  alt="About Space Archade"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
              </div>

              {/* Badge */}
              <div className="absolute -bottom-6 -right-2 md:right-6 bg-background/80 backdrop-blur-xl border border-border p-5 rounded-xl shadow-xl flex items-center gap-4 max-w-[240px]">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{about.estYear}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                    {about.estLabel}
                  </p>
                </div>
              </div>
            </EditableWrapper>
          </div>

          {/* Right: Text */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:pl-4">
            <EditableWrapper onEdit={openEdit}>
              <div>
                <p className="text-xs md:text-sm text-primary font-semibold uppercase tracking-[0.2em] mb-3">
                  {about.badge}
                </p>
                <h2 className="text-4xl font-bold mb-6">{about.title}</h2>
                <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                  <p>{about.paragraph1}</p>
                  <p>{about.paragraph2}</p>
                </div>
              </div>
            </EditableWrapper>
          </div>

        </div>
      </div>
    </section>
  );
}
