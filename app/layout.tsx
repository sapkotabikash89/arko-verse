import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PrayerVerses.com - Daily Bible Verses, Scripture Search & Inspirational Content',
  description: 'Discover daily Bible verses, search scriptures by topic or reference, and find spiritual inspiration. Access thousands of Bible verses with beautiful backgrounds and sharing features.',
  keywords: 'Bible verses, daily scripture, Christian inspiration, prayer, faith, biblical quotes, scripture search',
  authors: [{ name: 'PrayerVerses.com' }],
  openGraph: {
    title: 'PrayerVerses.com - Daily Bible Verses & Scripture Search',
    description: 'Discover daily Bible verses, search scriptures by topic or reference, and find spiritual inspiration.',
    url: 'https://prayerverses.com',
    siteName: 'PrayerVerses.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrayerVerses.com - Daily Bible Verses & Scripture Search',
    description: 'Discover daily Bible verses, search scriptures by topic or reference, and find spiritual inspiration.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}