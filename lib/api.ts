// API utility functions for admin panel

export const api = {
  // Hero Slides
  getHeroSlides: async () => {
    const res = await fetch('/api/hero-slides');
    return res.json();
  },
  createHeroSlide: async (data: any) => {
    const res = await fetch('/api/hero-slides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateHeroSlide: async (id: string, data: any) => {
    const res = await fetch(`/api/hero-slides/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteHeroSlide: async (id: string) => {
    const res = await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Projects
  getProjects: async () => {
    const res = await fetch('/api/projects');
    return res.json();
  },
  createProject: async (data: any) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateProject: async (id: string, data: any) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteProject: async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Architects
  getArchitects: async () => {
    const res = await fetch('/api/architects');
    return res.json();
  },
  createArchitect: async (data: any) => {
    const res = await fetch('/api/architects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateArchitect: async (id: string, data: any) => {
    const res = await fetch(`/api/architects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteArchitect: async (id: string) => {
    const res = await fetch(`/api/architects/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const res = await fetch('/api/testimonials');
    return res.json();
  },
  createTestimonial: async (data: any) => {
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateTestimonial: async (id: string, data: any) => {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteTestimonial: async (id: string) => {
    const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Process Steps
  getProcessSteps: async () => {
    const res = await fetch('/api/process-steps');
    return res.json();
  },
  createProcessStep: async (data: any) => {
    const res = await fetch('/api/process-steps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateProcessStep: async (id: string, data: any) => {
    const res = await fetch(`/api/process-steps/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteProcessStep: async (id: string) => {
    const res = await fetch(`/api/process-steps/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Collection Images
  getCollectionImages: async () => {
    const res = await fetch('/api/collection-images');
    return res.json();
  },
  createCollectionImage: async (data: any) => {
    const res = await fetch('/api/collection-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateCollectionImage: async (id: string, data: any) => {
    const res = await fetch(`/api/collection-images/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteCollectionImage: async (id: string) => {
    const res = await fetch(`/api/collection-images/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Stats
  getStats: async () => {
    const res = await fetch('/api/stats');
    return res.json();
  },
  updateStats: async (data: any) => {
    const res = await fetch('/api/stats', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Settings
  getSetting: async (key: string) => {
    const res = await fetch(`/api/settings?key=${key}`);
    return res.json();
  },
  saveSetting: async (key: string, value: any) => {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });
    return res.json();
  },
};
