'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Instagram, Linkedin, Twitter, Facebook, Youtube, Plus, Trash2 } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

const initialCompanyLinks = [
  { id: 1, label: 'About', href: '#' },
  { id: 2, label: 'Services', href: '#' },
  { id: 3, label: 'Portfolio', href: '#' },
];

const initialSocialLinks = [
  { id: 1, platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
  { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
  { id: 3, platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
];

const initialLegalLinks = [
  { id: 1, label: 'Privacy', href: '#' },
  { id: 2, label: 'Terms', href: '#' },
];

const getSocialIcon = (iconName: string) => {
  const icons: any = {
    Instagram: Instagram,
    Linkedin: Linkedin,
    Twitter: Twitter,
    Facebook: Facebook,
    Youtube: Youtube,
  };
  const Icon = icons[iconName] || Instagram;
  return <Icon className="h-5 w-5" />;
};

export function AdminFooter() {
  const [brandDescription, setBrandDescription] = useState('Creating architectural excellence through innovative design and craftsmanship.');
  const [companyLinks, setCompanyLinks] = useState(initialCompanyLinks);
  const [contactInfo, setContactInfo] = useState({
    email: 'hello@spacearchade.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  });
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [legalLinks, setLegalLinks] = useState(initialLegalLinks);
  const [copyright, setCopyright] = useState('© 2024 Space Archade. All rights reserved.');
  
  const { setSelectedItem, isEditMode } = useEditContext();

  return (
    <footer className="border-t border-border bg-muted/30 py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <EditableWrapper
            onEdit={() =>
              setSelectedItem({
                type: 'footerBrand',
                description: brandDescription,
                onSave: (updatedData: any) => {
                  setBrandDescription(updatedData.description);
                }
              })
            }
          >
            <div>
              <div className="relative h-10 w-40 mb-4">
                <Image src="/logo.png" alt="Space Archade Logo" fill className="object-contain object-left" />
              </div>
              <p className="text-sm text-muted-foreground">
                {brandDescription}
              </p>
            </div>
          </EditableWrapper>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm">Company</h4>
              {isEditMode && (
                <button
                  onClick={() => setSelectedItem({
                    type: 'newCompanyLink',
                    label: '',
                    href: '#',
                    onSave: (newLink: any) => {
                      setCompanyLinks([...companyLinks, { ...newLink, id: Date.now() }]);
                    }
                  })}
                  className="text-xs bg-blue-500 text-white rounded p-1 hover:bg-blue-600 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              )}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {companyLinks.map((link, index) => (
                <li key={link.id} className="relative group">
                  <EditableWrapper
                    onEdit={() => setSelectedItem({
                      ...link,
                      type: 'companyLink',
                      index,
                      onSave: (updatedLink: any) => {
                        const newLinks = [...companyLinks];
                        newLinks[index] = { ...updatedLink, id: link.id };
                        setCompanyLinks(newLinks);
                      },
                      onDelete: () => {
                        if (confirm('Delete this link?')) {
                          setCompanyLinks(companyLinks.filter((l) => l.id !== link.id));
                        }
                      }
                    })}
                  >
                    <a href={link.href} className="hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </EditableWrapper>
                  {isEditMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this link?')) {
                          setCompanyLinks(companyLinks.filter((l) => l.id !== link.id));
                        }
                      }}
                      className="absolute -left-5 top-0 bg-red-500 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <EditableWrapper
            onEdit={() =>
              setSelectedItem({
                type: 'contactInfo',
                ...contactInfo,
                onSave: (updatedInfo: any) => {
                  setContactInfo(updatedInfo);
                }
              })
            }
          >
            <div>
              <h4 className="font-semibold mb-4 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{contactInfo.email}</li>
                <li>{contactInfo.phone}</li>
                <li>{contactInfo.location}</li>
              </ul>
            </div>
          </EditableWrapper>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm">Follow</h4>
              {isEditMode && (
                <button
                  onClick={() => setSelectedItem({
                    type: 'newSocialLink',
                    platform: '',
                    url: '',
                    icon: 'Instagram',
                    onSave: (newLink: any) => {
                      setSocialLinks([...socialLinks, { ...newLink, id: Date.now() }]);
                    }
                  })}
                  className="text-xs bg-blue-500 text-white rounded p-1 hover:bg-blue-600 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {socialLinks.map((link, index) => (
                <li key={link.id} className="relative group">
                  <EditableWrapper
                    onEdit={() => setSelectedItem({
                      ...link,
                      type: 'socialLink',
                      index,
                      onSave: (updatedLink: any) => {
                        const newLinks = [...socialLinks];
                        newLinks[index] = { ...updatedLink, id: link.id };
                        setSocialLinks(newLinks);
                      },
                      onDelete: () => {
                        if (confirm('Delete this social link?')) {
                          setSocialLinks(socialLinks.filter((l) => l.id !== link.id));
                        }
                      }
                    })}
                  >
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {getSocialIcon(link.icon)}
                      <span>{link.platform}</span>
                    </a>
                  </EditableWrapper>
                  {isEditMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this social link?')) {
                          setSocialLinks(socialLinks.filter((l) => l.id !== link.id));
                        }
                      }}
                      className="absolute -left-5 top-0 bg-red-500 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
          <EditableWrapper
            onEdit={() =>
              setSelectedItem({
                type: 'copyright',
                text: copyright,
                onSave: (updatedData: any) => {
                  setCopyright(updatedData.text);
                }
              })
            }
          >
            <p className="text-sm text-muted-foreground">{copyright}</p>
          </EditableWrapper>
          
          <div className="flex gap-6 text-sm text-muted-foreground mt-4 sm:mt-0">
            {legalLinks.map((link, index) => (
              <div key={link.id} className="relative group">
                <EditableWrapper
                  onEdit={() => setSelectedItem({
                    ...link,
                    type: 'legalLink',
                    index,
                    onSave: (updatedLink: any) => {
                      const newLinks = [...legalLinks];
                      newLinks[index] = { ...updatedLink, id: link.id };
                      setLegalLinks(newLinks);
                    },
                    onDelete: () => {
                      if (confirm('Delete this link?')) {
                        setLegalLinks(legalLinks.filter((l) => l.id !== link.id));
                      }
                    }
                  })}
                >
                  <a href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </EditableWrapper>
              </div>
            ))}
            {isEditMode && (
              <button
                onClick={() => setSelectedItem({
                  type: 'newLegalLink',
                  label: '',
                  href: '#',
                  onSave: (newLink: any) => {
                    setLegalLinks([...legalLinks, { ...newLink, id: Date.now() }]);
                  }
                })}
                className="text-xs bg-blue-500 text-white rounded px-2 py-0.5 hover:bg-blue-600 transition-colors flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
