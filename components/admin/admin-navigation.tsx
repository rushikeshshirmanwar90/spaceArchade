import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

export function AdminNavigation() {
  const { setSelectedItem } = useEditContext();

  return (
    <nav className="sticky top-16 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'logo',
              image: '/logo.png',
            })
          }
        >
          <div>
            <Image
              height={100}
              width={500}
              src="/logo.png"
              alt="Space Archade Logo"
              className="w-40"
              priority
            />
          </div>
        </EditableWrapper>

        <div className="hidden lg:flex gap-6">
          <a href="#projects" className="text-sm hover:text-primary transition-colors relative group">
            Projects
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#collection" className="text-sm hover:text-primary transition-colors relative group">
            Collection
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#architects" className="text-sm hover:text-primary transition-colors relative group">
            Team
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#process" className="text-sm hover:text-primary transition-colors relative group">
            Process
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#testimonials" className="text-sm hover:text-primary transition-colors relative group">
            Testimonials
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#awards" className="text-sm hover:text-primary transition-colors relative group">
            Awards
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="text-sm hover:text-primary transition-colors relative group">
            Contact
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Get in Touch
        </Button>
      </div>
    </nav>
  );
}
