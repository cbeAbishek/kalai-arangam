'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  Clock,
  Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const contactMethods = [
  { icon: Mail, label: 'Email', value: 'support@1grow.in', href: 'mailto:support@1grow.in', color: 'text-blue-500 bg-blue-500/10' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/919566372450', color: 'text-emerald-500 bg-emerald-500/10' },
  { icon: Phone, label: 'Phone', value: '+91 95663 72450', href: 'tel:+919566372450', color: 'text-amber-500 bg-amber-500/10' },
  { icon: MapPin, label: 'Location', value: 'Tamil Nadu, India', href: '#', color: 'text-rose-500 bg-rose-500/10' },
]

const responseFeatures = [
  { icon: Clock, title: '24-Hour Response', desc: 'We reply to every message within one business day.' },
  { icon: Globe, title: 'Remote Support', desc: 'Get help from anywhere with our online support team.' },
  { icon: CheckCircle, title: 'Dedicated Manager', desc: 'Enterprise plans include a dedicated account manager.' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send')
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-blue">
              Contact
            </span>
            <h1 className="mt-5 text-balance font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Get in touch
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Have questions about 1grow? We would love to hear from you.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_400px]">
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center py-12 text-center"
                    >
                      <div className="mb-4 grid size-16 place-items-center rounded-full bg-emerald-500/10">
                        <CheckCircle className="size-8 text-emerald-500" />
                      </div>
                      <h3 className="font-heading text-xl font-bold">Message Sent!</h3>
                      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                        Thank you for reaching out. We will get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 rounded-xl border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="font-heading text-xl font-bold">Send us a message</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Fill out the form and we will get back to you within 24 hours.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium">
                            Name <span className="text-destructive">*</span>
                          </label>
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium">
                            Email <span className="text-destructive">*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium">Phone</label>
                          <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9876543210"
                            maxLength={10}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium">Company</label>
                          <input
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your company"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium">
                          Subject <span className="text-destructive">*</span>
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className={cn(inputClass, !formData.subject && "text-muted-foreground")}
                        >
                          <option value="">Select a topic...</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Product Demo">Product Demo</option>
                          <option value="Pricing">Pricing</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Feedback">Feedback</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium">
                          Message <span className="text-destructive">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Tell us more about how we can help..."
                          className={cn(inputClass, "resize-none")}
                        />
                      </div>

                      {error && (
                        <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md disabled:opacity-50 sm:w-auto"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="size-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            <div className="flex flex-col gap-4">
              <Reveal delay={0.1}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {contactMethods.map((m) => (
                    <a
                      key={m.label}
                      href={m.href}
                      target={m.href.startsWith('http') ? '_blank' : undefined}
                      rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20"
                    >
                      <div className={cn("grid size-11 place-items-center rounded-xl", m.color)}>
                        <m.icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{m.label}</p>
                        <p className="mt-0.5 text-sm font-semibold group-hover:text-primary transition-colors">{m.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-heading text-sm font-bold">Why contact us?</h3>
                  <div className="mt-3 space-y-3">
                    {responseFeatures.map((f) => (
                      <div key={f.title} className="flex items-start gap-3">
                        <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                          <f.icon className="size-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{f.title}</p>
                          <p className="text-xs text-muted-foreground">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
