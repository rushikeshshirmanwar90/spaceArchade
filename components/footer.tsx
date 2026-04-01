import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="relative h-10 w-40 mb-4">
              <Image
                src="/logo.png"
                alt="Space Archade Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Creating architectural excellence through innovative design and craftsmanship.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Portfolio</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@spacearchade.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Follow</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">© 2024 Space Archade. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground mt-4 sm:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
