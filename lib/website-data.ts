export interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  description: string;
}

export interface Architect {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  message: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface CollectionImage {
  id: number;
  src: string;
  alt: string;
}

export interface WebsiteData {
  heroSlides: HeroSlide[];
  projects: Project[];
  architects: Architect[];
  testimonials: Testimonial[];
  collectionImages: CollectionImage[];
  stats: {
    projectsCompleted: number;
    yearsExperience: number;
    teamMembers: number;
    awardsWon: number;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    whatsappNumber: string;
  };
}

// Default data
export const defaultWebsiteData: WebsiteData = {
  heroSlides: [
    {
      id: 1,
      image: '/hero.jpg',
      title: 'Contemporary Architectural Excellence',
      description: 'Transforming spaces into extraordinary experiences through innovative design',
    },
    {
      id: 2,
      image: '/project-1.jpg',
      title: 'Luxury Residential Design',
      description: 'Creating dream homes with seamless indoor-outdoor living spaces',
    },
  ],
  projects: [],
  architects: [],
  testimonials: [],
  collectionImages: [],
  stats: {
    projectsCompleted: 150,
    yearsExperience: 25,
    teamMembers: 45,
    awardsWon: 32,
  },
  contact: {
    email: 'hello@spacearchade.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    whatsappNumber: '919579896842',
  },
};
