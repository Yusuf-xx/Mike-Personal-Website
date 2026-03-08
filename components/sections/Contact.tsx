'use client';

import { useState } from 'react';
import Section from '../ui/Section';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { submitMessage } from '@/app/actions/messages';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiMapPin } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';

const CONTACT_ADDRESS = {
  line1: '2200 Crooks Rd',
  line2: 'Troy, MI 48084, USA',
};
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=2200+Crooks+Rd,+Troy,+MI+48084,+USA&output=embed';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await submitMessage(formData);
      if (result.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" background="white">
      <div className="relative">
        <div className="h-px w-12 bg-accent-gold/60 mb-6" />
        <SectionHeader
          eyebrow="Contact"
          title="Get in touch"
          description="For inquiries on cybersecurity law, compliance, or advisory work."
          align="left"
          goldLine={false}
        />
      </div>

      <div className="grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="border border-border-muted bg-white p-8 md:p-10 shadow-card"
        >
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Your name"
            required
            disabled={isSubmitting}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            placeholder="your.email@example.com"
            required
            disabled={isSubmitting}
          />
          <Textarea
            label="Message"
            name="message"
            value={formData.message}
            onChange={(value) => setFormData({ ...formData, message: value })}
            placeholder="Your message..."
            required
            disabled={isSubmitting}
            rows={6}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>

          {submitStatus === 'success' && (
            <p className="mt-4 text-sm text-charcoal/70 text-center">
              Message sent successfully. I will get back to you soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="mt-4 text-sm text-red-600/90 text-center">
              Failed to send. Please try again or contact directly.
            </p>
          )}
        </form>

        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h3 className="font-serif text-xl font-semibold text-charcoal mb-6">
              Connect
            </h3>
            <div className="space-y-4">
              <div className="flex items-start text-charcoal/75">
                <FiMapPin className="mr-3 mt-1 shrink-0" size={20} />
                <address className="not-italic">
                  <span className="block font-medium text-charcoal">Address</span>
                  <span className="block mt-1">
                    {CONTACT_ADDRESS.line1}<br />
                    {CONTACT_ADDRESS.line2}
                  </span>
                </address>
              </div>
              <a
                href="mailto:hello@olakunleogunjimi.com"
                className="flex items-center text-charcoal/75 hover:text-navy transition-colors"
              >
                <FiMail className="mr-3" size={20} />
                <span>hello@olakunleogunjimi.com</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-charcoal/75 hover:text-navy transition-colors"
              >
                <FiLinkedin className="mr-3" size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-charcoal/75 hover:text-navy transition-colors"
              >
                <FiGithub className="mr-3" size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <Button variant="outline" className="w-full" type="button" onClick={() => window.location.href = '#cv'}>
            <FiDownload className="mr-2 inline" size={18} />
            Download Resume
          </Button>
        </div>
      </div>

      <div className="mt-16 max-w-5xl mx-auto">
        <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-charcoal/50 mb-4">
          Location
        </h3>
        <div className="aspect-video w-full overflow-hidden border border-border-muted bg-white">
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office location"
            className="block w-full h-full min-h-[280px]"
          />
        </div>
      </div>
    </Section>
  );
}
