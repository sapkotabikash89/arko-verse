import Link from 'next/link';
import { BookOpen, Heart, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  PrayerVerses
                </span>
                <span className="text-xs text-purple-200 -mt-1">.com</span>
              </div>
            </Link>
            <p className="text-purple-200 text-sm leading-relaxed">
              Your daily source of inspiration and spiritual guidance through God's Word. 
              Discover, share, and reflect on beautiful Bible verses every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/verse-of-the-day" className="text-purple-200 hover:text-white transition-colors">
                  Daily Verse
                </Link>
              </li>
              <li>
                <Link href="/random-verse" className="text-purple-200 hover:text-white transition-colors">
                  Random Verse
                </Link>
              </li>
              <li>
                <Link href="/topics" className="text-purple-200 hover:text-white transition-colors">
                  Browse Topics
                </Link>
              </li>
              <li>
                <Link href="/read-the-bible" className="text-purple-200 hover:text-white transition-colors">
                  Read the Bible
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Topics */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Popular Topics</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/topic/love" className="text-purple-200 hover:text-white transition-colors">
                  Love
                </Link>
              </li>
              <li>
                <Link href="/topic/faith" className="text-purple-200 hover:text-white transition-colors">
                  Faith
                </Link>
              </li>
              <li>
                <Link href="/topic/hope" className="text-purple-200 hover:text-white transition-colors">
                  Hope
                </Link>
              </li>
              <li>
                <Link href="/topic/peace" className="text-purple-200 hover:text-white transition-colors">
                  Peace
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Connect</h3>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <Facebook className="h-5 w-5 text-purple-200 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-purple-200 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-purple-200 hover:text-white cursor-pointer transition-colors" />
                <Mail className="h-5 w-5 text-purple-200 hover:text-white cursor-pointer transition-colors" />
              </div>
              <div className="text-sm text-purple-200">
                <p>Share the Word, Spread the Love</p>
                <p className="flex items-center mt-1">
                  Made with <Heart className="h-4 w-4 mx-1 text-red-400" /> for His glory
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-purple-200 text-sm">
              © {new Date().getFullYear()} PrayerVerses.com. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-purple-200 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-purple-200 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/about" className="text-purple-200 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-purple-200 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}