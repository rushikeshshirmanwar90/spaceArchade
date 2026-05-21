'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Instagram, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';

const DEFAULT_FOOTER = {
  brandDescription: 'Creating architectural excellence through innovative design and craftsmanship.',
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

export function Footer() {
  const [footer, setFooter] = useState(DEFAULT_FOOTER);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const res = await fetch('/api/settings?key=footer');
        const json = await res.json();
        if (json.success && json.data && json.data.value) {
          setFooter({ ...DEFAULT_FOOTER, ...json.data.value });
        }
      } catch (err) {
        console.error('Error fetching footer settings:', err);
      }
    }
    fetchFooter();
  }, []);

  return (
    <footer className="border-t border-border bg-muted/30 py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="relative h-10 w-40 mb-4">
              <Image src="/logo.png" alt="Space Archade Logo" fill className="object-contain object-left" />
            </div>
            <p className="text-sm text-muted-foreground">{footer.brandDescription}</p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footer.companyLinks.map((link: any, index: number) => (
                <li key={link.id || index}>
                  <a href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{footer.email}</li>
              <li>{footer.phone}</li>
              <li>{footer.location}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Follow</h4>
            <ul className="space-y-3">
              {footer.socialLinks.map((link: any, index: number) => (
                <li key={link.id || index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getSocialIcon(link.icon)}
                    <span>{link.platform}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">{footer.copyright}</p>
          <div className="flex gap-6 text-sm text-muted-foreground mt-4 sm:mt-0">
            {footer.legalLinks.map((link: any, index: number) => (
              <a key={link.id || index} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
