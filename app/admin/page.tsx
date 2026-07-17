'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminNavigation } from '@/components/admin/admin-navigation';
import { AdminHeroSection } from '@/components/admin/admin-hero-section';
import { AdminAboutSection } from '@/components/admin/admin-about-section';
import { AdminProjectsSection } from '@/components/admin/admin-projects-section';
import { AdminCollectionSection } from '@/components/admin/admin-collection-section';
import { AdminArchitectsSection } from '@/components/admin/admin-architects-section';
import { AdminStatsSection } from '@/components/admin/admin-stats-section';
import { AdminProcessSection } from '@/components/admin/admin-process-section';
import { AdminTestimonialsSection } from '@/components/admin/admin-testimonials-section';
import { AdminCTASection } from '@/components/admin/admin-cta-section';
import { AdminContactForm } from '@/components/admin/admin-contact-form';
import { AdminFooter } from '@/components/admin/admin-footer';
import { EditModal } from '@/components/admin/edit-modal';
import { Save, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const ADMIN_PASSWORD = 'space_archade@23';

// ─── Default Settings ────────────────────────────────────────────────────────
export const DEFAULT_ABOUT = {
  badge: 'Our Philosophy',
  title: 'We design spaces that breathe, inspire, and endure.',
  paragraph1:
    'At Space Archade, we believe architecture is the physical translation of environment, innovation, and human aspiration. We construct contemporary design frameworks that seamlessly integrate structures into their natural surroundings.',
  paragraph2:
    'Every structure is curated with structural integrity and clean minimalism at its core, creating a timeless visual narrative that respects local topography while breaking traditional limits of form.',
  estYear: 'Est. 2012',
  estLabel: 'Crafting Legacies',
  feature1Title: 'Eco-Conscious',
  feature1Desc: 'Sustainable materials and passive lighting structures at our core.',
  feature2Title: 'Timeless Detail',
  feature2Desc: 'Exquisite craftsmanship blending structural boldness with micro-refinement.',
  image: '/about-us.png',
};

export const DEFAULT_CTA = {
  title: 'Ready to Transform Your Space?',
  description:
    "Let's discuss your architectural vision and create something extraordinary together.",
  primaryLabel: 'Schedule Consultation',
  primaryHref: '#contact',
  secondaryLabel: 'View Our Process',
  secondaryHref: '#process',
};

export const DEFAULT_CONTACT = {
  title: 'Get In Touch',
  description: "Fill out the form below and we'll get back to you shortly.",
  services: [
    'Residential Design',
    'Commercial Design',
    'Interior Design',
    'Renovation',
    'Consultation',
    'Other',
  ],
  whatsappNumber: '919579896842',
};

export const DEFAULT_FOOTER = {
  brandDescription:
    'Creating architectural excellence through innovative design and craftsmanship.',
  email: 'hello@spacearchade.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  copyright: '© 2024 Space Archade. All rights reserved.',
  companyLinks: [
    { id: 1, label: 'About', href: '#' },
    { id: 2, label: 'Services', href: '#' },
    { id: 3, label: 'Portfolio', href: '#' },
  ],
  socialLinks: [
    { id: 1, platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
    { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
    { id: 3, platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
  ],
  legalLinks: [
    { id: 1, label: 'Privacy', href: '#' },
    { id: 2, label: 'Terms', href: '#' },
  ],
};

// ─── Context ──────────────────────────────────────────────────────────────────
interface EditContextType {
  isEditMode: boolean;
  selectedItem: any;
  setSelectedItem: (item: any) => void;
  refreshData: () => void;
  data: {
    heroSlides: any[];
    projects: any[];
    architects: any[];
    testimonials: any[];
    processSteps: any[];
    collectionImages: any[];
    stats: any;
    categories: any[];
    about: typeof DEFAULT_ABOUT;
    cta: typeof DEFAULT_CTA;
    contact: typeof DEFAULT_CONTACT;
    footer: typeof DEFAULT_FOOTER;
  };
}

const EditContext = createContext<EditContextType>({
  isEditMode: false,
  selectedItem: null,
  setSelectedItem: () => { },
  refreshData: () => { },
  data: {
    heroSlides: [],
    projects: [],
    architects: [],
    testimonials: [],
    processSteps: [],
    collectionImages: [],
    stats: null,
    categories: [],
    about: DEFAULT_ABOUT,
    cta: DEFAULT_CTA,
    contact: DEFAULT_CONTACT,
    footer: DEFAULT_FOOTER,
  },
});

export const useEditContext = () => useContext(EditContext);

// ─── Helper: save a setting key/value ────────────────────────────────────────
async function saveSetting(key: string, value: any) {
  const res = await fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Failed to save setting');
  return json;
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
const AUTH_KEY = 'admin_auth_expiry';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function getStoredAuth(): boolean {
  try {
    const expiry = localStorage.getItem(AUTH_KEY);
    if (expiry && Date.now() < Number(expiry)) return true;
    localStorage.removeItem(AUTH_KEY);
  } catch { }
  return false;
}

function storeAuth() {
  try {
    localStorage.setItem(AUTH_KEY, String(Date.now() + ONE_WEEK_MS));
  } catch { }
}

function clearAuth() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch { }
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Restore session from localStorage on mount
  useEffect(() => {
    if (getStoredAuth()) setIsAuthenticated(true);
  }, []);
  const [data, setData] = useState<EditContextType['data']>({
    heroSlides: [],
    projects: [],
    architects: [],
    testimonials: [],
    processSteps: [],
    collectionImages: [],
    stats: null,
    categories: [],
    about: DEFAULT_ABOUT,
    cta: DEFAULT_CTA,
    contact: DEFAULT_CONTACT,
    footer: DEFAULT_FOOTER,
  });

  // ─── Fetch All Data ──────────────────────────────────────────────────────
  const fetchData = async () => {
    try {
      const opts = { cache: 'no-store' as RequestCache };
      const [heroRes, projectsRes, architectsRes, testimonialsRes, processRes, collectionRes, statsRes, categoriesRes, settingsRes] =
        await Promise.all([
          fetch('/api/hero-slides', opts),
          fetch('/api/projects', opts),
          fetch('/api/architects', opts),
          fetch('/api/testimonials', opts),
          fetch('/api/process-steps', opts),
          fetch('/api/collection-images', opts),
          fetch('/api/stats', opts),
          fetch("/api/categories", opts),
          fetch('/api/settings', opts),
        ]);

      const [hero, projects, architects, testimonials, process, collection, stats, categories, settingsAll] =
        await Promise.all([
          heroRes.json(),
          projectsRes.json(),
          architectsRes.json(),
          testimonialsRes.json(),
          processRes.json(),
          collectionRes.json(),
          statsRes.json(),
          categoriesRes.json(),
          settingsRes.json(),
        ]);

      // Convert settings array to key→value map
      const settingsMap: Record<string, any> = {};
      if (settingsAll.success && Array.isArray(settingsAll.data)) {
        for (const s of settingsAll.data) {
          settingsMap[s.key] = s.value;
        }
      }

      setData({
        heroSlides: hero.success ? hero.data : [],
        projects: projects.success ? projects.data : [],
        architects: architects.success ? architects.data : [],
        testimonials: testimonials.success ? testimonials.data : [],
        processSteps: process.success ? process.data : [],
        collectionImages: collection.success ? collection.data : [],
        stats: stats.success ? stats.data : null,
        categories: categories.success ? categories.data : [],
        about: settingsMap['about'] ? { ...DEFAULT_ABOUT, ...settingsMap['about'] } : DEFAULT_ABOUT,
        cta: settingsMap['cta'] ? { ...DEFAULT_CTA, ...settingsMap['cta'] } : DEFAULT_CTA,
        contact: settingsMap['contact']
          ? { ...DEFAULT_CONTACT, ...settingsMap['contact'] }
          : DEFAULT_CONTACT,
        footer: settingsMap['footer']
          ? { ...DEFAULT_FOOTER, ...settingsMap['footer'] }
          : DEFAULT_FOOTER,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      alert('Error loading data from database');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      storeAuth();
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  // ─── Login Screen ────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="w-full max-w-md p-10 bg-card rounded-2xl shadow-2xl border border-border relative z-10 backdrop-blur-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Lock className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Space Archade</h1>
            <p className="text-muted-foreground text-center">Admin Portal Access</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-12 h-12 text-base"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {error && (
                <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm font-medium">{error}</p>
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              Access Admin Panel
            </Button>
          </form>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              Protected area. Authorized access only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Refresh Button Handler ──────────────────────────────────────────────
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetchData();
      alert('Data refreshed from database!');
    } catch (err) {
      console.error('Error refreshing:', err);
      alert('Error refreshing data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // ─── onSave for Edit Modal ────────────────────────────────────────────────
  const handleOnSave = async (updatedItem: any) => {
    try {
      let endpoint = '';
      let method = 'PUT';
      let body: any = {};
      let settingKey = '';
      let settingValue: any = null;

      switch (selectedItem.type) {
        // ── Collection-based types ──────────────────────────────────────────
        case 'heroSlide':
          if (selectedItem._id) {
            endpoint = `/api/hero-slides/${selectedItem._id}`;
            body = {
              image: updatedItem.image,
              title: updatedItem.title,
              description: updatedItem.description,
              order: updatedItem.order || 0,
            };
          }
          break;
        case 'newHeroSlide':
          endpoint = '/api/hero-slides';
          method = 'POST';
          body = {
            image: updatedItem.image,
            title: updatedItem.title,
            description: updatedItem.description,
            order: data.heroSlides.length,
          };
          break;
        case 'project':
          if (selectedItem._id) {
            endpoint = `/api/projects/${selectedItem._id}`;
            body = updatedItem;
          }
          break;
        case 'newProject':
          endpoint = '/api/projects';
          method = 'POST';
          body = updatedItem;
          break;
        case 'architect':
          if (selectedItem._id) {
            endpoint = `/api/architects/${selectedItem._id}`;
            body = updatedItem;
          }
          break;
        case 'newArchitect':
          endpoint = '/api/architects';
          method = 'POST';
          body = updatedItem;
          break;
        case 'testimonial':
          if (selectedItem._id) {
            endpoint = `/api/testimonials/${selectedItem._id}`;
            body = updatedItem;
          }
          break;
        case 'newTestimonial':
          endpoint = '/api/testimonials';
          method = 'POST';
          body = updatedItem;
          break;
        case 'processStep':
          if (selectedItem._id) {
            endpoint = `/api/process-steps/${selectedItem._id}`;
            body = updatedItem;
          }
          break;
        case 'newProcessStep':
          endpoint = '/api/process-steps';
          method = 'POST';
          body = updatedItem;
          break;
        case 'stats':
          endpoint = '/api/stats';
          method = 'PUT';
          body = updatedItem;
          break;
        case 'collectionImage':
          if (selectedItem._id) {
            endpoint = `/api/collection-images/${selectedItem._id}`;
            body = updatedItem;
          }
          break;
        case 'newCollectionImage':
          endpoint = '/api/collection-images';
          method = 'POST';
          body = updatedItem;
          break;

        // ── Settings-based types ────────────────────────────────────────────
        case 'about':
          settingKey = 'about';
          settingValue = { ...data.about, ...updatedItem };
          break;
        case 'cta':
          settingKey = 'cta';
          settingValue = { ...data.cta, ...updatedItem };
          break;
        case 'footerBrand':
          settingKey = 'footer';
          settingValue = { ...data.footer, brandDescription: updatedItem.description };
          break;
        case 'contactInfo':
          settingKey = 'footer';
          settingValue = {
            ...data.footer,
            email: updatedItem.email,
            phone: updatedItem.phone,
            location: updatedItem.location,
          };
          break;
        case 'copyright':
          settingKey = 'footer';
          settingValue = { ...data.footer, copyright: updatedItem.text };
          break;
        case 'companyLink':
          if (selectedItem.onSave) {
            await selectedItem.onSave(updatedItem);
          }
          setSelectedItem(null);
          await fetchData();
          return;
        case 'newCompanyLink':
          if (selectedItem.onSave) {
            await selectedItem.onSave(updatedItem);
          }
          setSelectedItem(null);
          await fetchData();
          return;
        case 'legalLink':
          if (selectedItem.onSave) {
            await selectedItem.onSave(updatedItem);
          }
          setSelectedItem(null);
          await fetchData();
          return;
        case 'newLegalLink':
          if (selectedItem.onSave) {
            await selectedItem.onSave(updatedItem);
          }
          setSelectedItem(null);
          await fetchData();
          return;
        case 'socialLink':
          if (selectedItem.onSave) {
            await selectedItem.onSave(updatedItem);
          }
          setSelectedItem(null);
          await fetchData();
          return;
        case 'newSocialLink':
          if (selectedItem.onSave) {
            await selectedItem.onSave(updatedItem);
          }
          setSelectedItem(null);
          await fetchData();
          return;
        case 'newService':
          if (selectedItem.onSave) {
            await selectedItem.onSave(updatedItem.name);
          }
          setSelectedItem(null);
          await fetchData();
          return;
        case 'editService':
          if (selectedItem.onSave) {
            await selectedItem.onSave(updatedItem.newName);
          }
          setSelectedItem(null);
          await fetchData();
          return;
        case 'sectionHeader':
          // section header edits are not yet persisted separately (uses contact/cta)
          settingKey = selectedItem.section === 'contact' ? 'contact' : 'cta';
          settingValue =
            selectedItem.section === 'contact'
              ? { ...data.contact, title: updatedItem.title, description: updatedItem.description }
              : { ...data.cta, title: updatedItem.title, description: updatedItem.description };
          break;
        case 'whatsapp':
          settingKey = 'contact';
          settingValue = { ...data.contact, whatsappNumber: updatedItem.whatsappNumber };
          break;
        default:
          // Fallback: if item has a custom onSave callback (stat, etc.)
          if (selectedItem.onSave) {
            await selectedItem.onSave(updatedItem.value ?? updatedItem);
          }
          setSelectedItem(null);
          await fetchData();
          return;
      }

      if (settingKey && settingValue !== null) {
        // Save via /api/settings
        const result = await saveSetting(settingKey, settingValue);
        if (result.success) {
          alert('Changes saved successfully!');
          await fetchData();
        } else {
          alert('Error saving changes: ' + (result.error || 'Unknown error'));
          return;
        }
      } else if (endpoint) {
        // Save via dedicated collection endpoint
        const response = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        if (result.success) {
          alert('Changes saved successfully to database!');
          await fetchData();
        } else {
          alert('Error saving changes: ' + (result.error || 'Unknown error'));
          return;
        }
      } else {
        await fetchData();
      }

      setSelectedItem(null);
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Error saving changes. Please try again.');
    }
  };

  // ─── Authenticated Admin UI ──────────────────────────────────────────────
  return (
    <EditContext.Provider value={{ isEditMode, selectedItem, setSelectedItem, refreshData: fetchData, data }}>
      <div className="relative">
        {/* Admin Toolbar */}
        <div className="fixed top-0 left-0 right-0 z-[100] bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Space Archade Admin</h1>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`relative inline-flex items-center h-8 rounded-full w-16 transition-colors ${isEditMode ? 'bg-blue-500' : 'bg-gray-600'
                }`}
            >
              <span
                className={`inline-block w-6 h-6 transform transition-transform bg-white rounded-full shadow-lg ${isEditMode ? 'translate-x-9' : 'translate-x-1'
                  }`}
              />
              <span className="absolute left-2 text-xs font-medium">{isEditMode ? '' : 'Off'}</span>
              <span className="absolute right-2 text-xs font-medium">{isEditMode ? 'On' : ''}</span>
            </button>
            <span className="text-sm font-medium">{isEditMode ? 'Edit Mode' : 'Preview Mode'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => { clearAuth(); setIsAuthenticated(false); }}
              variant="ghost"
              className="text-white hover:bg-red-600 hover:text-white border border-white/20"
            >
              Logout
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Refresh Data
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-16 w-full bg-background text-foreground">
          <AdminNavigation />
          <AdminHeroSection />
          <AdminAboutSection />
          <AdminProjectsSection />
          <AdminArchitectsSection />
          <AdminStatsSection />
          <AdminProcessSection />
          <AdminTestimonialsSection />
          <AdminContactForm />
          <AdminFooter />
        </div>

        {/* Edit Modal */}
        {selectedItem && (
          <EditModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onSave={handleOnSave}
            categories={data.categories}
          />
        )}
      </div>
    </EditContext.Provider>
  );
}
