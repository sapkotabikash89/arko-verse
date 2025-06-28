import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | PrayerVerses.com',
  description: 'Contact PrayerVerses.com for questions, feedback, or support. We\'d love to hear from you and help with your spiritual journey.',
  keywords: 'contact PrayerVerses, customer support, feedback, questions',
  openGraph: {
    title: 'Contact Us - Get in Touch',
    description: 'Contact PrayerVerses.com for questions, feedback, or support.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}