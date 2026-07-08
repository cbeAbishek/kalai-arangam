import Link from 'next/link'
import { Globe, Mail, MessageCircle, Send } from 'lucide-react'
import { Logo } from '@/components/logo'

const Tape = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="95" height="80" viewBox="0 0 95 80" fill="none" className="w-[80px] h-[36px]" aria-hidden="true">
    <path d="M1 45L70.282 5L88.282 36.1769L19 76.1769L1 45Z" fill="#222222"/>
    <path d="M69.6829 39.997C74.772 36.9233 80.2799 35.022 85.4464 32.0415C85.5584 31.9769 85.6703 31.912 85.782 31.8468L83.9519 38.6769C80.2833 32.3886 75.7064 26.4975 72.2275 20.0846C70.0007 15.9783 67.7966 11.8425 65.6183 7.69261L72.9746 9.66373C70.566 10.9281 68.1526 12.1837 65.7375 13.4301C59.1543 16.828 52.5477 20.1634 45.9059 23.4675C39.2779 26.7637 32.6138 30.0293 25.946 33.2683C21.417 35.4683 16.8774 37.6611 12.3408 39.8468C10.3494 40.8065 8.36335 41.7623 6.37228 42.7203C4.88674 43.4348 3.40117 44.1492 1.91563 44.8637C1.70897 44.9628 1.48389 45.0108 1.28779 44.994C1.0916 44.977 0.940536 44.8975 0.866099 44.7681C0.791689 44.6386 0.798739 44.4674 0.882816 44.289C0.966978 44.111 1.12195 43.9408 1.31146 43.8119C2.68692 42.8791 4.06239 41.9462 5.43785 41.0134C6.96571 39.9774 8.49068 38.9427 10.0185 37.9078C10.5758 38.2934 11.1526 38.4968 11.9006 38.3019C12.2823 38.2024 12.7844 37.9628 13.0812 37.66C13.3477 37.388 13.4958 37.092 13.6361 36.8103C13.7828 36.5157 13.922 36.236 14.1819 36.0157C14.6227 35.6416 14.9608 35.1461 15.3159 34.6256C15.4451 34.4362 15.5766 34.2432 15.7162 34.0517C17.1755 33.0653 18.6355 32.0797 20.0958 31.0952C20.7161 30.8123 21.2829 30.546 21.7287 30.2596C22.1286 30.0027 22.4405 29.6732 22.7349 29.3173C22.9611 29.1651 23.1873 29.0128 23.4135 28.8606C24.8734 27.8785 26.3349 26.8977 27.7969 25.9178C29.0653 25.3742 30.3884 24.7936 32.0404 23.9203C32.7524 23.544 33.4842 23.2235 34.1877 22.9153C35.2267 22.4601 36.204 22.0318 36.9653 21.4906C37.4742 21.1289 38.0837 20.8769 38.6916 20.6256C39.507 20.2886 40.3209 19.9521 40.8884 19.3523C41.2452 18.9751 41.5509 18.5904 41.8339 18.234C42.2841 17.6669 42.6773 17.1712 43.1308 16.8909C43.9827 16.3643 44.6366 15.763 45.2128 15.2329C45.9058 14.5954 46.4871 14.0607 47.1661 13.8832C47.2691 13.8563 47.3895 13.83 47.5253 13.8008C48.2409 13.6467 49.3854 13.4004 50.6721 12.4297C51.1302 12.084 51.5022 11.6584 51.8663 11.2413C52.3964 10.634 52.9113 10.0444 53.6546 9.74536C53.7656 9.70072 53.9081 9.70004 54.0379 9.7022C54.1972 9.70487 54.3826 9.71891 54.5926 9.76695C54.8026 9.81498 55.0063 9.88381 55.1555 9.9989C55.4992 10.2637 55.9885 10.7847 56.2859 11.2375C56.5833 11.6904 56.78 12.1717 56.8456 12.401C58.0808 13.7453 59.3159 15.0897 60.5511 16.434C60.3869 16.4299 60.2413 16.3856 60.1248 16.2812C60.0083 16.1768 59.927 16.0203 59.9059 15.8256C59.8891 15.6698 59.8841 15.5059 59.9059 15.358C59.9277 15.2102 59.9737 15.0875 60.0669 14.996C60.1532 14.9111 60.2594 14.8569 60.3702 14.8359C60.4809 14.8148 60.5909 14.8273 60.681 14.8679C60.7712 14.909 60.8381 14.9757 60.8775 15.0473C60.9164 15.1189 60.9268 15.1897 60.9191 15.2472L60.9122 15.2972C60.8882 15.4723 60.8287 15.6302 60.6666 15.7638C60.5123 15.8911 60.2832 15.9823 60.0039 15.9486C60.0429 15.9974 60.0818 16.0462 60.1208 16.095C60.3395 16.3687 60.5881 16.6529 60.8193 16.9305C60.8799 17.0018 60.9624 17.0742 61.0614 17.1419C61.3349 17.8777 61.922 19.303 63.3353 21.5211C65.6972 25.1682 68.7994 28.9723 70.9294 31.4179C73.0594 33.8635 74.1165 35.5937 74.1165 35.5937L83.9519 38.6769L85.782 31.8468C85.6703 31.912 85.5584 31.9769 85.4464 32.0415C80.2799 35.022 74.772 36.9233 69.6829 39.997Z" fill="#222222"/>
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
