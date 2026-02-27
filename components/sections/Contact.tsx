'use client';

import { useState } from 'react';
import Section from '../ui/Section';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { submitMessage } from '@/app/actions/messages';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiMapPin } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';

// Customize your address and map: get embed URL from Google Maps → Share → Embed a map
const CONTACT_ADDRESS = {
  line1: '123 Security Avenue, Suite 100',
  line2: 'Cyber City, CC 12345',
};
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133273394!2d-73.987844923471!3d40.748440971388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1633024800000!5m2!1sen!2sus';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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
    <Section id="contact" background="gray">
      <SectionHeader
        eyebrow="Contact"
        title="Let’s talk about strengthening your security posture."
        description="Share a few details about your environment and objectives, and I’ll follow up with concrete next steps."
      />

      <div className="grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2 mx-auto">
        <div>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white/90 p-8 shadow-soft"
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
              placeholder="Tell me about your project or inquiry..."
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
              <p className="mt-4 text-green-600 text-center">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-4 text-red-600 text-center">
                Failed to send message. Please try again or contact me directly.
              </p>
            )}
          </form>
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-cyber-black mb-6">
              Connect With Me
            </h3>
            <div className="space-y-4">
              <div className="flex items-start text-gray-600">
                <FiMapPin className="mr-3 mt-1 shrink-0" size={24} />
                <address className="not-italic">
                  <span className="block font-medium text-cyber-black">Address</span>
                  <span className="block mt-1">
                    {CONTACT_ADDRESS.line1}<br />
                    {CONTACT_ADDRESS.line2}
                  </span>
                </address>
              </div>
              <a
                href="mailto:contact@example.com"
                className="flex items-center text-gray-600 hover:text-primary-blue transition-colors duration-200"
              >
                <FiMail className="mr-3" size={24} />
                <span>contact@example.com</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-primary-blue transition-colors duration-200"
              >
                <FiLinkedin className="mr-3" size={24} />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-primary-blue transition-colors duration-200"
              >
                <FiGithub className="mr-3" size={24} />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>

          <div>
            <Button variant="outline" className="w-full">
              <FiDownload className="mr-2 inline" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>

      {/* Map: update MAP_EMBED_URL above with your location (Google Maps → Share → Embed a map) */}
      <div className="mt-16 mx-auto max-w-5xl">
        <h3 className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-gray-500">
          Location
        </h3>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office location map"
            className="block w-full h-full min-h-[280px]"
          />
        </div>
      </div>
    </Section>
  );
}
