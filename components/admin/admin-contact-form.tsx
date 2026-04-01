'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

const initialServices = [
  'Residential Design',
  'Commercial Design',
  'Interior Design',
  'Renovation',
  'Consultation',
  'Other',
];

export function AdminContactForm() {
  const [services, setServices] = useState(initialServices);
  const { setSelectedItem, isEditMode } = useEditContext();

  return (
    <section id="contact" className="py-20 px-6 bg-muted/20">
      <div className="mx-auto max-w-3xl">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'sectionHeader',
              section: 'contact',
              title: 'Get In Touch',
              description: 'Fill out the form below and we\'ll get back to you shortly.',
            })
          }
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you shortly.
            </p>
          </div>
        </EditableWrapper>

        <Card className="p-8">
          <form className="space-y-8">
            <EditableWrapper
              onEdit={() =>
                setSelectedItem({
                  type: 'formField',
                  field: 'fullName',
                  label: 'Full Name',
                  placeholder: 'Enter your full name',
                })
              }
            >
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium my-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your full name"
                />
              </div>
            </EditableWrapper>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="service" className="block text-sm font-medium">
                  Service Required
                </label>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setSelectedItem({
                      type: 'newService',
                      name: '',
                      onSave: (serviceName: string) => {
                        setServices([...services, serviceName]);
                      }
                    })}
                    className="text-xs bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600 transition-colors flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add Service
                  </button>
                )}
              </div>
              <select
                id="service"
                name="service"
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                    {isEditMode && ' '}
                  </option>
                ))}
              </select>
              
              {isEditMode && (
                <div className="mt-3 space-y-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded-lg group">
                      <span className="text-sm">{service}</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedItem({
                            type: 'editService',
                            oldName: service,
                            newName: service,
                            index,
                            onSave: (updatedService: string) => {
                              const newServices = [...services];
                              newServices[index] = updatedService;
                              setServices(newServices);
                            }
                          })}
                          className="bg-blue-500 text-white rounded p-1 hover:bg-blue-600 transition-colors"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete service "${service}"?`)) {
                              setServices(services.filter((_, i) => i !== index));
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

            <EditableWrapper
              onEdit={() =>
                setSelectedItem({
                  type: 'formField',
                  field: 'message',
                  label: 'Message',
                  placeholder: 'Tell us about your project...',
                })
              }
            >
              <div>
                <label htmlFor="message" className="block text-sm font-medium my-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
            </EditableWrapper>

            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Send Message via WhatsApp
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
