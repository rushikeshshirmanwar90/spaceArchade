'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminNavigation } from '@/components/admin/admin-navigation';
import { AdminHeroSection } from '@/components/admin/admin-hero-section';
import { AdminProjectsSection } from '@/components/admin/admin-projects-section';
import { AdminCollectionSection } from '@/components/admin/admin-collection-section';
import { AdminArchitectsSection } from '@/components/admin/admin-architects-section';
import { AdminStatsSection } from '@/components/admin/admin-stats-section';
import { AdminProcessSection } from '@/components/admin/admin-process-section';
import { AdminTestimonialsSection } from '@/components/admin/admin-testimonials-section';
import { AdminContactForm } from '@/components/admin/admin-contact-form';
import { AdminFooter } from '@/components/admin/admin-footer';
import { EditModal } from '@/components/admin/edit-modal';
import { Save, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const ADMIN_PASSWORD = 'space_archade@23';

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
  };
}

const EditContext = createContext<EditContextType>({
  isEditMode: false,
  selectedItem: null,
  setSelectedItem: () => {},
  refreshData: () => {},
  data: {
    heroSlides: [],
    projects: [],
    architects: [],
    testimonials: [],
    processSteps: [],
    collectionImages: [],
    stats: null,
  },
});

export const useEditContext = () => useContext(EditContext);

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState({
    heroSlides: [],
    projects: [],
    architects: [],
    testimonials: [],
    processSteps: [],
    collectionImages: [],
    stats: null,
  });

  // Fetch all data from API
  const fetchData = async () => {
    try {
      const [heroRes, projectsRes, architectsRes, testimonialsRes, processRes, collectionRes, statsRes] = await Promise.all([
        fetch('/api/hero-slides'),
        fetch('/api/projects'),
        fetch('/api/architects'),
        fetch('/api/testimonials'),
        fetch('/api/process-steps'),
        fetch('/api/collection-images'),
        fetch('/api/stats'),
      ]);

      const [hero, projects, architects, testimonials, process, collection, stats] = await Promise.all([
        heroRes.json(),
        projectsRes.json(),
        architectsRes.json(),
        testimonialsRes.json(),
        processRes.json(),
        collectionRes.json(),
        statsRes.json(),
      ]);

      setData({
        heroSlides: hero.success ? hero.data : [],
        projects: projects.success ? projects.data : [],
        architects: architects.success ? architects.data : [],
        testimonials: testimonials.success ? testimonials.data : [],
        processSteps: process.success ? process.data : [],
        collectionImages: collection.success ? collection.data : [],
        stats: stats.success ? stats.data : null,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading data from database');
    }
  };

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  // Show password prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Login Card */}
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
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Refresh data from database to ensure everything is up to date
      await fetchData();
      alert('Data refreshed from database!');
    } catch (error) {
      console.error('Error refreshing:', error);
      alert('Error refreshing data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <EditContext.Provider value={{ isEditMode, selectedItem, setSelectedItem, refreshData: fetchData, data }}>
      <div className="relative">
        {/* Admin Toolbar */}
        <div className="fixed top-0 left-0 right-0 z-100 bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Space Archade Admin</h1>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`relative inline-flex items-center h-8 rounded-full w-16 transition-colors ${
                isEditMode ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block w-6 h-6 transform transition-transform bg-white rounded-full shadow-lg ${
                  isEditMode ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
              <span className="absolute left-2 text-xs font-medium">
                {isEditMode ? '' : 'Off'}
              </span>
              <span className="absolute right-2 text-xs font-medium">
                {isEditMode ? 'On' : ''}
              </span>
            </button>
            <span className="text-sm font-medium">
              {isEditMode ? 'Edit Mode' : 'Preview Mode'}
            </span>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isSaving} 
            className="bg-blue-600 hover:bg-blue-700"
          >
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

        {/* Main Content */}
        <div className="pt-16 w-full bg-background text-foreground">
          <AdminNavigation />
          <AdminHeroSection />
          <AdminProjectsSection />
          <AdminCollectionSection />
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
            onSave={async (updatedItem: any) => {
              try {
                // Determine which API endpoint to use based on item type
                let endpoint = '';
                let method = 'PUT';
                let body: any = {};

                switch (selectedItem.type) {
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
                }

                if (endpoint) {
                  // Make the API call immediately
                  const response = await fetch(endpoint, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                  });

                  const result = await response.json();

                  if (result.success) {
                    alert('Changes saved successfully to database!');
                    await fetchData(); // Refresh all data
                  } else {
                    alert('Error saving changes: ' + (result.error || 'Unknown error'));
                    return; // Don't close modal on error
                  }
                } else {
                  // For items without API endpoints, just refresh
                  await fetchData();
                }

                setSelectedItem(null);
              } catch (error) {
                console.error('Error saving item:', error);
                alert('Error saving changes. Please try again.');
              }
            }}
          />
        )}
      </div>
    </EditContext.Provider>
  );
}
