'use client';

import { useEffect, useRef, useState } from 'react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

function CountUp({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold mb-2">
      {count}{suffix}
    </div>
  );
}

export function AdminStatsSection() {
  const { setSelectedItem, data } = useEditContext();

  // Read from API data; fall back to sensible defaults
  const statsData = data.stats || { projectsCompleted: 150, yearsExperience: 25, teamMembers: 45 };

  const openEdit = () =>
    setSelectedItem({
      type: 'stats',
      projectsCompleted: statsData.projectsCompleted,
      yearsExperience: statsData.yearsExperience,
      teamMembers: statsData.teamMembers,
    });

  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl">
        <EditableWrapper onEdit={openEdit}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <CountUp end={statsData.projectsCompleted} suffix="+" />
              <p className="text-primary-foreground/80">Projects Completed</p>
            </div>
            <div>
              <CountUp end={statsData.yearsExperience} suffix="+" />
              <p className="text-primary-foreground/80">Years Experience</p>
            </div>
            <div>
              <CountUp end={statsData.teamMembers} />
              <p className="text-primary-foreground/80">Team Members</p>
            </div>
          </div>
        </EditableWrapper>
      </div>
    </section>
  );
}
