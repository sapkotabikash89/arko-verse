"use client"

import { Card, CardContent } from '@/components/ui/card';

export function PrivacyPolicy() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: January 23, 2024
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  At PrayerVerses.com, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us through our contact form</li>
                  <li>Create an account on our website</li>
                  <li>Participate in interactive features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Providing and maintaining our service</li>
                  <li>Sending you daily Bible verses and spiritual content</li>
                  <li>Responding to your comments and questions</li>
                  <li>Improving our website and user experience</li>
                  <li>Analyzing usage patterns and trends</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Information Sharing</h2>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                  except as described in this Privacy Policy. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With trusted service providers who assist us in operating our website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
                  the internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate information</li>
                  <li>The right to delete your personal information</li>
                  <li>The right to unsubscribe from our communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <p className="text-gray-700">
                    Email: privacy@prayerverses.com<br />
                    Address: 123 Faith Street, Hope City, HC 12345
                  </p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}