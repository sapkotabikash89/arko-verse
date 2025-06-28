"use client"

import { Heart, BookOpen, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AboutContent() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About PrayerVerses.com
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sharing God's Word and inspiring faith through beautiful, accessible Bible verses
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                At PrayerVerses.com, our mission is to make God's Word accessible, beautiful, and inspiring for everyone. 
                We believe that Bible verses have the power to transform lives, provide comfort in difficult times, 
                and guide us in our daily walk with God. Through our platform, we aim to help people discover, 
                share, and meditate on Scripture in meaningful ways.
              </p>
            </CardContent>
          </Card>

          {/* Story */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                PrayerVerses.com was born from a simple desire to share the beauty and wisdom of God's Word 
                with the world. We recognized that in our fast-paced digital age, people needed a place where 
                they could easily find, read, and share Bible verses that speak to their hearts.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                What started as a small project has grown into a comprehensive platform that serves thousands 
                of people daily, helping them connect with Scripture through beautiful verse cards, topical 
                searches, and daily inspiration.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Accessibility</h3>
                  <p className="text-gray-600">Making God's Word available to everyone, regardless of their background or technical ability.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Beauty</h3>
                  <p className="text-gray-600">Presenting Scripture in visually appealing ways that honor the beauty of God's Word.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Accuracy</h3>
                  <p className="text-gray-600">Ensuring all Bible verses are accurately presented and properly attributed.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Community</h3>
                  <p className="text-gray-600">Building a community of believers who encourage one another through Scripture.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Join Our Community</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                We invite you to be part of our growing community of believers who find strength, comfort, 
                and inspiration in God's Word. Whether you're looking for daily encouragement, studying 
                specific topics, or simply want to explore the Bible, we're here to support your spiritual journey.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Share verses with friends, discover new passages, and let God's Word transform your life 
                one verse at a time. Together, we can spread the love and hope found in Scripture to every 
                corner of the world.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}