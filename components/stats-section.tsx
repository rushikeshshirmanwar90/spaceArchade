'use client';

import { useEffect, useRef, useState } from 'react';

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
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold mb-2">
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
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-foreground mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <CountUp end={stats.projectsCompleted} suffix="+" />
            <p className="text-primary-foreground/80">Projects Completed</p>
          </div>
          <div>
            <CountUp end={stats.yearsExperience} suffix="+" />
            <p className="text-primary-foreground/80">Years Experience</p>
          </div>
          <div>
            <CountUp end={stats.teamMembers} />
            <p className="text-primary-foreground/80">Team Members</p>
          </div>
        </div>
      </div>
    </section>
  );
}
