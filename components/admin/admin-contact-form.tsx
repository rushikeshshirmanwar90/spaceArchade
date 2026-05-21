'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

async function saveContactSetting(contactData: any) {
  const res = await fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'contact', value: contactData }),
  });
  return res.json();
}

export function AdminContactForm() {
  const { setSelectedItem, isEditMode, data, refreshData } = useEditContext();
  const contact = data.contact;

  // Local services state — synced from context
  const [services, setServices] = useState<string[]>(contact.services || []);

  useEffect(() => {
    setServices(contact.services || []);
  }, [contact.services]);

  const persistServices = async (newServices: string[]) => {
    const updated = { ...contact, services: newServices };
    const result = await saveContactSetting(updated);
    if (result.success) {
      refreshData();
    } else {
      alert('Error saving services: ' + (result.error || 'Unknown error'));
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-muted/20">
      <div className="mx-auto max-w-3xl">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'sectionHeader',
              section: 'contact',
              title: contact.title,
              description: contact.description,
            })
          }
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{contact.title}</h2>
            <p className="text-lg text-muted-foreground">{contact.description}</p>
          </div>
        </EditableWrapper>

        <Card className="p-8">
          <form className="space-y-8">
            {/* Full Name */}
            <div>
              <label htmlFor="admin-fullName" className="block text-sm font-medium my-1">
                Full Name
              </label>
              <input
                type="text"
                id="admin-fullName"
                name="fullName"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your full name"
              />
            </div>

            {/* Services */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="admin-service" className="block text-sm font-medium">
                  Service Required
                </label>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedItem({
                        type: 'newService',
                        name: '',
                        onSave: async (serviceName: string) => {
                          const newServices = [...services, serviceName];
                          setServices(newServices);
                          await persistServices(newServices);
                        },
                      })
                    }
                    className="text-xs bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600 transition-colors flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add Service
                  </button>
                )}
              </div>
              <select
                id="admin-service"
                name="service"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>

              {/* Edit/Delete service list in edit mode */}
              {isEditMode && (
                <div className="mt-3 space-y-2">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded-lg group"
                    >
                      <span className="text-sm">{service}</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedItem({
                              type: 'editService',
                              oldName: service,
                              newName: service,
                              index,
                              onSave: async (updatedService: string) => {
                                const newServices = [...services];
                                newServices[index] = updatedService;
                                setServices(newServices);
                                await persistServices(newServices);
                              },
                            })
                          }
                          className="bg-blue-500 text-white rounded p-1 hover:bg-blue-600 transition-colors"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (confirm(`Delete service "${service}"?`)) {
                              const newServices = services.filter((_, i) => i !== index);
                              setServices(newServices);
                              await persistServices(newServices);
                            }
                          }}
                          className="bg-red-500 text-white rounded p-1 hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="admin-message" className="block text-sm font-medium my-1">
                Message
              </label>
              <textarea
                id="admin-message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {/* WhatsApp Number edit */}
            {isEditMode && (
              <div className="border border-dashed border-blue-400 rounded-lg p-4 bg-blue-50/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">WhatsApp Number</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Current: {contact.whatsappNumber}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedItem({
                        type: 'whatsapp',
                        whatsappNumber: contact.whatsappNumber,
                      })
                    }
                    className="text-xs bg-blue-500 text-white rounded px-3 py-1.5 hover:bg-blue-600 transition-colors flex items-center gap-1"
                  >
                    <Edit2 className="h-3 w-3" />
                    Edit
                  </button>
                </div>
              </div>
            )}

            <Button
              type="button"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Send Message via WhatsApp
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
