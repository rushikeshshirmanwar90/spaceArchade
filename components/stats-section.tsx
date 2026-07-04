'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/reveal';

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Ease-out so the count decelerates as it lands on the final value
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold mb-2 text-primary">
      {count}{suffix}
    </div>
  );
}

interface Stats {
  projectsCompleted: number;
  yearsExperience: number;
  teamMembers: number;
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    projectsCompleted: 150,
    yearsExperience: 25,
    teamMembers: 45,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats');
        const result = await response.json();
        if (result.success && result.data) {
          setStats(result.data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-card border-y border-border">
        <div className="mx-auto max-w-7xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-card border-y border-border">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Reveal>
            <CountUp end={stats.projectsCompleted} suffix="+" />
            <p className="text-muted-foreground">Projects Completed</p>
          </Reveal>
          <Reveal delay={150}>
            <CountUp end={stats.yearsExperience} suffix="+" />
            <p className="text-muted-foreground">Years Experience</p>
          </Reveal>
          <Reveal delay={300}>
            <CountUp end={stats.teamMembers} />
            <p className="text-muted-foreground">Team Members</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
