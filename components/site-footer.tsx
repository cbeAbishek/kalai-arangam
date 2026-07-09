import Link from 'next/link'
import { Globe, Mail, MessageCircle, Send } from 'lucide-react'
import { Logo } from '@/components/logo'

const Tape = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="95" height="44" viewBox="0 0 95 44" fill="none" className="w-[80px] h-[36px]" aria-hidden="true">
    <path d="M1 28L70.282 2L88.282 24L19 50L1 28Z" fill="currentColor" className="text-muted-foreground/20"/>
    <path d="M68.5 22c5.5-3 11-5 16.5-8l-2 5c-3.5-5-8-10-11-16l6 1.5a587 587 0 0 0-49 21.5 390 390 0 0 0-30.5 15l-2 1.5a4 4 0 0 1-1.5.5c-.5 0-.7-.2-.7-.5 0-.3.2-.6.6-.9l4-2.8a344 344 0 0 1 8-5.7c.5.3 1 .5 1.8.4.4-.1.9-.3 1.2-.6.3-.3.4-.6.6-.9l.5-.8c.4-.4.8-.9 1.1-1.4l.4-.6c1.5-1 3-1.9 4.4-2.9.6-.3 1.2-.5 1.6-.8.4-.3.7-.6 1-.9l.7-.5c1.5-1 2.9-2 4.4-3 1.2-.6 2.6-1.1 4.2-2 .7-.4 1.5-.7 2.2-1 1-.4 2-.9 2.7-1.4.5-.4 1.1-.6 1.7-.9.8-.3 1.7-.7 2.2-1.3.4-.4.7-.7 1-1 .4-.6.8-1.1 1.3-1.3.8-.6 1.5-1.2 2-1.7.7-.6 1.3-1.2 2-1.4.1 0 .2 0 .4-.1.7-.1 1.8-.4 3.1-1.3.5-.4.9-.8 1.2-1.2.5-.6 1-1.2 1.8-1.5l.4-.2c.7-.2 2-.2 3.4-.8.8-.4 1.4-.9 2-1.4.7-.6 1.3-1.1 2.2-1.3.8-.2 1.5-.4 1.8-.8.3-.3.5-.7.7-1 .2-.3.3-.6.7-.8.4-.2.8-.3 1.2-.6.4-.2.7-.5 1.2-.7.7-.3 1.1-.5 1.5-.8v0c.5-.4.9-.7 1.6-.8.5 0 .9 0 1.3.3.4.3.5.7.5 1.2v.8c0 .6 0 1.3.3 1.7.3.6.8 1 1.7 1.3.6.3 1.2.3 1.7.5.5.2.8.4.8.7v.8c0 .4 0 .8.3.9.2.2.6.3 1.3.3.6 0 1-.2 1.8-.3.7 0 1.4-.2 2.2-.5.8-.3 1.2-.2 1.3 0v.4c0 .3-.3.8-1 1.2-.5.3-1.3.5-2.4.7-1 .2-2 .4-2.5.2v0c.2.2.4.4.4.7 0 .3-.2.6-.7.8-.5.3-1.3.5-2.3.6l-.9.2c-1 .2-2 .4-3.1.6-.7.2-1.5.3-2.2.4-3.3.5-6.5.8-9.7 1-2.7.1-5.4 0-8.1-.3-.8 0-1.5-.1-2.3-.2" fill="currentColor" className="text-muted-foreground/20"/>
  </svg>
)

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Use Cases', href: '/use-cases' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Tutorials', href: '/tutorials' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Code of Conduct', href: '/code-of-conduct' },
      { label: 'Community Guidelines', href: '/community-guidelines' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Accessibility', href: '/accessibility-statement' },
    ],
  },
]

const socials = [
  { icon: Globe, label: 'Website', href: '/' },
  { icon: Mail, label: 'Email', href: 'mailto:support@1grow.in' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/919566372450' },
  { icon: Send, label: 'Telegram', href: '#' },
]

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="my-8 px-4 max-w-5xl mx-auto">
      <div className="relative bg-white dark:bg-card rounded-3xl max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="hidden md:block absolute -top-4 -left-8 scale-75" aria-hidden="true">
          <Tape />
        </div>
        <div className="hidden md:block absolute -top-4 -right-8 rotate-90 scale-75" aria-hidden="true">
          <Tape />
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-10 px-2 md:px-8 flex-1 w-full">
          <div className="flex flex-col items-start gap-2 max-w-xs">
            <Link href="/" aria-label="1Grow home page" className="flex flex-row gap-1 items-center justify-start">
              <Logo />
            </Link>
            <p className="text-muted-foreground font-medium text-sm w-full md:w-4/5">
              The intelligent business operating system for Training Institutes,
              Rental Businesses, and Event Companies.
            </p>
            <div className="mt-2 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="grid size-9 place-items-center rounded-xl text-muted-foreground transition-all hover:text-primary hover:bg-primary/5"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-col md:flex-row gap-6 md:gap-12 items-start" aria-label="Footer navigation">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-1 md:gap-4">
                <h4 className="uppercase font-heading text-sm text-muted-foreground font-semibold">
                  {column.title}
                </h4>
                <div className="flex flex-wrap md:flex-col gap-2 text-sm items-start">
                  {column.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-muted-foreground whitespace-nowrap font-medium hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="my-3 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
          <p className="whitespace-nowrap">
            &copy; {currentYear} 1Grow. All rights reserved.
          </p>
          <div className="flex flex-row gap-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
          </div>
        </div>
        <p className="whitespace-nowrap">
          Built by <a href="https://nexgenads.space" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">NexGenAds Technologies Pvt Ltd</a>
          &middot; Last reviewed: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </footer>
  )
}
