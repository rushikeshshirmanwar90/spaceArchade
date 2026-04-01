'use client';

import { useState, createContext, useContext } from 'react';
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
import { Save, Lock, Eye, EyeOff } from 'lucide-react';

const ADMIN_PASSWORD = 'space_archade@23';

interface EditContextType {
  isEditMode: boolean;
  selectedItem: any;
  setSelectedItem: (item: any) => void;
}

const EditContext = createContext<EditContextType>({
  isEditMode: false,
  selectedItem: null,
  setSelectedItem: () => {},
});

export const useEditContext = () => useContext(EditContext);

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

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
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Access</h1>
            <p className="text-slate-600 mt-2">Enter password to continue</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    const data = localStorage.getItem('websiteData');
    console.log('Saving data:', data);
    alert('Changes saved successfully!');
  };

  return (
    <EditContext.Provider value={{ isEditMode, selectedItem, setSelectedItem }}>
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
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
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
            onSave={(updatedItem: any) => {
              console.log('Updated item:', updatedItem);
              setSelectedItem(null);
            }}
          />
        )}
      </div>
    </EditContext.Provider>
  );
}
