'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Instagram, Linkedin, Twitter, Facebook, Youtube, Plus, Trash2 } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

async function saveFooterSetting(footerData: any) {
  const res = await fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'footer', value: footerData }),
  });
  return res.json();
}

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
  const { setSelectedItem, isEditMode, data, refreshData } = useEditContext();
  const footerData = data.footer;

  // Local state synced from context
  const [brandDescription, setBrandDescription] = useState(footerData.brandDescription);
  const [companyLinks, setCompanyLinks] = useState(footerData.companyLinks);
  const [contactInfo, setContactInfo] = useState({
    email: footerData.email,
    phone: footerData.phone,
    location: footerData.location,
  });
  const [socialLinks, setSocialLinks] = useState(footerData.socialLinks);
  const [legalLinks, setLegalLinks] = useState(footerData.legalLinks);
  const [copyright, setCopyright] = useState(footerData.copyright);

  // Sync from context when data changes
  useEffect(() => {
    setBrandDescription(footerData.brandDescription);
    setCompanyLinks(footerData.companyLinks);
    setContactInfo({ email: footerData.email, phone: footerData.phone, location: footerData.location });
    setSocialLinks(footerData.socialLinks);
    setLegalLinks(footerData.legalLinks);
    setCopyright(footerData.copyright);
  }, [footerData]);

  const persistFooter = async (overrides: any = {}) => {
    const updated = {
      brandDescription,
      email: contactInfo.email,
      phone: contactInfo.phone,
      location: contactInfo.location,
      copyright,
      companyLinks,
      socialLinks,
      legalLinks,
      ...overrides,
    };
    const result = await saveFooterSetting(updated);
    if (result.success) {
      refreshData();
    } else {
      alert('Error saving footer: ' + (result.error || 'Unknown error'));
    }
  };

  return (
    <footer className="border-t border-border bg-muted/30 py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <EditableWrapper
            onEdit={() =>
              setSelectedItem({
                type: 'footerBrand',
                description: brandDescription,
                onSave: async (updatedData: any) => {
                  setBrandDescription(updatedData.description);
                  await persistFooter({ brandDescription: updatedData.description });
                  setSelectedItem(null);
                },
              })
            }
          >
            <div>
              <div className="relative h-10 w-40 mb-4">
                <Image src="/logo.png" alt="Space Archade Logo" fill className="object-contain object-left" />
              </div>
              <p className="text-sm text-muted-foreground">{brandDescription}</p>
            </div>
          </EditableWrapper>

          {/* Company Links */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm">Company</h4>
              {isEditMode && (
                <button
                  onClick={() =>
                    setSelectedItem({
                      type: 'newCompanyLink',
                      label: '',
                      href: '#',
                      onSave: async (newLink: any) => {
                        const newLinks = [...companyLinks, { ...newLink, id: Date.now() }];
                        setCompanyLinks(newLinks);
                        await persistFooter({ companyLinks: newLinks });
                        setSelectedItem(null);
                      },
                    })
                  }
                  className="text-xs bg-blue-500 text-white rounded p-1 hover:bg-blue-600 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              )}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {companyLinks.map((link: any, index: number) => (
                <li key={link.id || index} className="relative group">
                  <EditableWrapper
                    onEdit={() =>
                      setSelectedItem({
                        ...link,
                        type: 'companyLink',
                        index,
                        onSave: async (updatedLink: any) => {
                          const newLinks = [...companyLinks];
                          newLinks[index] = { ...updatedLink, id: link.id };
                          setCompanyLinks(newLinks);
                          await persistFooter({ companyLinks: newLinks });
                          setSelectedItem(null);
                        },
                        onDelete: async () => {
                          if (confirm('Delete this link?')) {
                            const newLinks = companyLinks.filter((_: any, i: number) => i !== index);
                            setCompanyLinks(newLinks);
                            await persistFooter({ companyLinks: newLinks });
                          }
                        },
                      })
                    }
                  >
                    <a href={link.href} className="hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </EditableWrapper>
                  {isEditMode && (
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (confirm('Delete this link?')) {
                          const newLinks = companyLinks.filter((_: any, i: number) => i !== index);
                          setCompanyLinks(newLinks);
                          await persistFooter({ companyLinks: newLinks });
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

          {/* Contact Info */}
          <EditableWrapper
            onEdit={() =>
              setSelectedItem({
                type: 'contactInfo',
                ...contactInfo,
                onSave: async (updatedInfo: any) => {
                  setContactInfo(updatedInfo);
                  await persistFooter({
                    email: updatedInfo.email,
                    phone: updatedInfo.phone,
                    location: updatedInfo.location,
                  });
                  setSelectedItem(null);
                },
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

          {/* Social Links */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm">Follow</h4>
              {isEditMode && (
                <button
                  onClick={() =>
                    setSelectedItem({
                      type: 'newSocialLink',
                      platform: '',
                      url: '',
                      icon: 'Instagram',
                      onSave: async (newLink: any) => {
                        const newLinks = [...socialLinks, { ...newLink, id: Date.now() }];
                        setSocialLinks(newLinks);
                        await persistFooter({ socialLinks: newLinks });
                        setSelectedItem(null);
                      },
                    })
                  }
                  className="text-xs bg-blue-500 text-white rounded p-1 hover:bg-blue-600 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {socialLinks.map((link: any, index: number) => (
                <li key={link.id || index} className="relative group">
                  <EditableWrapper
                    onEdit={() =>
                      setSelectedItem({
                        ...link,
                        type: 'socialLink',
                        index,
                        onSave: async (updatedLink: any) => {
                          const newLinks = [...socialLinks];
                          newLinks[index] = { ...updatedLink, id: link.id };
                          setSocialLinks(newLinks);
                          await persistFooter({ socialLinks: newLinks });
                          setSelectedItem(null);
                        },
                        onDelete: async () => {
                          if (confirm('Delete this social link?')) {
                            const newLinks = socialLinks.filter((_: any, i: number) => i !== index);
                            setSocialLinks(newLinks);
                            await persistFooter({ socialLinks: newLinks });
                          }
                        },
                      })
                    }
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
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (confirm('Delete this social link?')) {
                          const newLinks = socialLinks.filter((_: any, i: number) => i !== index);
                          setSocialLinks(newLinks);
                          await persistFooter({ socialLinks: newLinks });
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

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
          <EditableWrapper
            onEdit={() =>
              setSelectedItem({
                type: 'copyright',
                text: copyright,
                onSave: async (updatedData: any) => {
                  setCopyright(updatedData.text);
                  await persistFooter({ copyright: updatedData.text });
                  setSelectedItem(null);
                },
              })
            }
          >
            <p className="text-sm text-muted-foreground">{copyright}</p>
          </EditableWrapper>

          <div className="flex gap-6 text-sm text-muted-foreground mt-4 sm:mt-0">
            {legalLinks.map((link: any, index: number) => (
              <div key={link.id || index} className="relative group">
                <EditableWrapper
                  onEdit={() =>
                    setSelectedItem({
                      ...link,
                      type: 'legalLink',
                      index,
                      onSave: async (updatedLink: any) => {
                        const newLinks = [...legalLinks];
                        newLinks[index] = { ...updatedLink, id: link.id };
                        setLegalLinks(newLinks);
                        await persistFooter({ legalLinks: newLinks });
                        setSelectedItem(null);
                      },
                      onDelete: async () => {
                        if (confirm('Delete this link?')) {
                          const newLinks = legalLinks.filter((_: any, i: number) => i !== index);
                          setLegalLinks(newLinks);
                          await persistFooter({ legalLinks: newLinks });
                        }
                      },
                    })
                  }
                >
                  <a href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </EditableWrapper>
                {isEditMode && (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (confirm('Delete this link?')) {
                        const newLinks = legalLinks.filter((_: any, i: number) => i !== index);
                        setLegalLinks(newLinks);
                        await persistFooter({ legalLinks: newLinks });
                      }
                    }}
                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
            {isEditMode && (
              <button
                onClick={() =>
                  setSelectedItem({
                    type: 'newLegalLink',
                    label: '',
                    href: '#',
                    onSave: async (newLink: any) => {
                      const newLinks = [...legalLinks, { ...newLink, id: Date.now() }];
                      setLegalLinks(newLinks);
                      await persistFooter({ legalLinks: newLinks });
                      setSelectedItem(null);
                    },
                  })
                }
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
