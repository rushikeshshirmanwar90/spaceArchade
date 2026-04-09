import mongoose from 'mongoose';
import HeroSlide from '../models/HeroSlide';
import Project from '../models/Project';
import Architect from '../models/Architect';
import Stats from '../models/Stats';
import Testimonial from '../models/Testimonial';
import ProcessStep from '../models/ProcessStep';
import CollectionImage from '../models/CollectionImage';
import Settings from '../models/Settings';

const DB_URL = process.env.DB_URL || 'mongodb+srv://rushi:iamrushi@cluster0.kq4lbxt.mongodb.net/?retryWrites=true&w=majority';

// Hero Slides Data
const heroSlides = [
  {
    image: '/hero.jpg',
    title: 'Contemporary Architectural Excellence',
    description: 'Transforming spaces into extraordinary experiences through innovative design',
    order: 1,
  },
  {
    image: '/project-1.jpg',
    title: 'Luxury Residential Design',
    description: 'Creating dream homes with seamless indoor-outdoor living spaces',
    order: 2,
  },
  {
    image: '/project-2.jpg',
    title: 'Commercial Architecture',
    description: 'State-of-the-art buildings with sustainable design principles',
    order: 3,
  },
  {
    image: '/project-4.jpg',
    title: 'Urban Development',
    description: 'Integrated spaces transforming neighborhoods and communities',
    order: 4,
  },
];

// Projects Data
const projects = [
  {
    title: 'Minimalist Residence',
    location: 'California Coast',
    category: 'Residential',
    image: '/project-1.jpg',
    description: 'Contemporary luxury home with seamless indoor-outdoor living spaces',
  },
  {
    title: 'Corporate Tower',
    location: 'Downtown Metro',
    category: 'Commercial',
    image: '/project-2.jpg',
    description: 'State-of-the-art office building with sustainable design principles',
  },
  {
    title: 'Heritage Villa',
    location: 'Countryside Estate',
    category: 'Residential',
    image: '/project-3.jpg',
    description: 'Elegant property blending modern comfort with timeless architecture',
  },
  {
    title: 'Mixed-Use Development',
    location: 'Urban District',
    category: 'Commercial',
    image: '/project-4.jpg',
    description: 'Integrated retail and residential complex transforming the neighborhood',
  },
  {
    title: 'Luxury Penthouse',
    location: 'Skyline Heights',
    category: 'Residential',
    image: '/project-5.jpg',
    description: 'High-rise residence with panoramic views and premium finishes',
  },
  {
    title: 'Boutique Hotel',
    location: 'Coastal Resort',
    category: 'Hospitality',
    image: '/project-6.jpg',
    description: 'Sustainable hospitality design with exceptional guest experiences',
  },
];

// Architects Data
const architects = [
  {
    name: 'Alexandra Sterling',
    title: 'Principal Architect',
    image: '/architect-1.jpg',
    bio: 'Award-winning architect with 15+ years of experience in luxury residential design.',
  },
  {
    name: 'Elena Rossi',
    title: 'Design Director',
    image: '/architect-2.jpg',
    bio: 'Creative visionary specializing in contemporary and sustainable architecture.',
  },
  {
    name: 'Marcus Chen',
    title: 'Lead Architect',
    image: '/architect-3.jpg',
    bio: 'Expert in innovative structural design and urban planning initiatives.',
  },
];

// Stats Data
const stats = {
  projectsCompleted: 150,
  yearsExperience: 25,
  teamMembers: 45,
};

// Testimonials Data
const testimonials = [
  {
    name: 'Sarah Mitchell',
    position: 'CEO',
    company: 'Tech Innovation Inc.',
    message: 'Working with Space Archade transformed our vision into reality. Their attention to detail and innovative approach exceeded all expectations. Our home is now a masterpiece.',
  },
  {
    name: 'James Richardson',
    position: 'Founder',
    company: 'GreenTech Solutions',
    message: "The team's expertise in sustainable design helped us create an office that's both beautiful and environmentally responsible. Highly recommended!",
  },
  {
    name: 'Lucia Colombo',
    position: 'Director',
    company: 'Hospitality Group',
    message: 'Exceptional professionalism and creativity. Space Archade delivered a luxury resort that has become our most profitable property. They truly understand luxury.',
  },
];

// Process Steps Data
const processSteps = [
  {
    step: 1,
    title: 'Concept & Planning',
    description: 'We begin with in-depth consultations to understand your vision, goals, and unique requirements for your project.',
    image: '/process-1.jpg',
  },
  {
    step: 2,
    title: 'Design & Development',
    description: 'Our team creates detailed renderings and 3D models, iterating with your feedback until perfection is achieved.',
    image: '/process-2.jpg',
  },
  {
    step: 3,
    title: 'Execution & Delivery',
    description: 'We oversee every detail of construction, ensuring quality standards and timely completion of your project.',
    image: '/process-3.jpg',
  },
];

// Collection Images Data
const collectionImages = [
  { src: '/project-1.jpg', alt: 'Modern Architecture 1', order: 1 },
  { src: '/project-2.jpg', alt: 'Modern Architecture 2', order: 2 },
  { src: '/project-3.jpg', alt: 'Modern Architecture 3', order: 3 },
  { src: '/project-4.jpg', alt: 'Modern Architecture 4', order: 4 },
  { src: '/project-5.jpg', alt: 'Modern Architecture 5', order: 5 },
  { src: '/project-6.jpg', alt: 'Modern Architecture 6', order: 6 },
];

// Settings Data
const settings = [
  { key: 'site_title', value: 'Space Archade - Contemporary Architectural Design' },
  { key: 'site_description', value: 'Award-winning architectural design showcases and luxury real estate projects' },
  { key: 'contact_email', value: 'info@spacearchade.com' },
  { key: 'contact_phone', value: '+1 (555) 123-4567' },
  { key: 'whatsapp_number', value: '+1234567890' },
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');
    
    // Connect to MongoDB
    await mongoose.connect(DB_URL, {
      dbName: 'SpaceArchade',
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      HeroSlide.deleteMany({}),
      Project.deleteMany({}),
      Architect.deleteMany({}),
      Stats.deleteMany({}),
      Testimonial.deleteMany({}),
      ProcessStep.deleteMany({}),
      CollectionImage.deleteMany({}),
      Settings.deleteMany({}),
    ]);
    console.log('✅ Existing data cleared');

    // Insert Hero Slides
    console.log('📸 Inserting hero slides...');
    await HeroSlide.insertMany(heroSlides);
    console.log(`✅ Inserted ${heroSlides.length} hero slides`);

    // Insert Projects
    console.log('🏗️  Inserting projects...');
    await Project.insertMany(projects);
    console.log(`✅ Inserted ${projects.length} projects`);

    // Insert Architects
    console.log('👷 Inserting architects...');
    await Architect.insertMany(architects);
    console.log(`✅ Inserted ${architects.length} architects`);

    // Insert Stats
    console.log('📊 Inserting stats...');
    await Stats.create(stats);
    console.log('✅ Inserted stats');

    // Insert Testimonials
    console.log('💬 Inserting testimonials...');
    await Testimonial.insertMany(testimonials);
    console.log(`✅ Inserted ${testimonials.length} testimonials`);

    // Insert Process Steps
    console.log('⚙️  Inserting process steps...');
    await ProcessStep.insertMany(processSteps);
    console.log(`✅ Inserted ${processSteps.length} process steps`);

    // Insert Collection Images
    console.log('🖼️  Inserting collection images...');
    await CollectionImage.insertMany(collectionImages);
    console.log(`✅ Inserted ${collectionImages.length} collection images`);

    // Insert Settings
    console.log('⚙️  Inserting settings...');
    await Settings.insertMany(settings);
    console.log(`✅ Inserted ${settings.length} settings`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Hero Slides: ${heroSlides.length}`);
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Architects: ${architects.length}`);
    console.log(`   - Stats: 1`);
    console.log(`   - Testimonials: ${testimonials.length}`);
    console.log(`   - Process Steps: ${processSteps.length}`);
    console.log(`   - Collection Images: ${collectionImages.length}`);
    console.log(`   - Settings: ${settings.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

seed();
