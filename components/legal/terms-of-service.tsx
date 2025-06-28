"use client"

import { Card, CardContent } from '@/components/ui/card';

export function TermsOfService() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: January 23, 2024
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using PrayerVerses.com, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Use License</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials on PrayerVerses.com for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Content Usage</h2>
                <p className="text-gray-700 leading-relaxed">
                  The Bible verses and related content on this website are provided for personal study, reflection, and sharing. 
                  You are encouraged to share individual verses with proper attribution. However, systematic downloading or 
                  reproduction of large portions of content is prohibited without written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">User Conduct</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When using our website, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use the service for lawful purposes only</li>
                  <li>Respect the rights and dignity of others</li>
                  <li>Not upload or share inappropriate content</li>
                  <li>Not attempt to harm or disrupt the website's functionality</li>
                  <li>Maintain the confidentiality of any account credentials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Disclaimer</h2>
                <p className="text-gray-700 leading-relaxed">
                  The materials on PrayerVerses.com are provided on an 'as is' basis. PrayerVerses.com makes no warranties, 
                  expressed or implied, and hereby disclaims and negates all other warranties including without limitation, 
                  implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                  of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Limitations</h2>
                <p className="text-gray-700 leading-relaxed">
                  In no event shall PrayerVerses.com or its suppliers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability to 
                  use the materials on PrayerVerses.com, even if PrayerVerses.com or an authorized representative has been 
                  notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Revisions</h2>
                <p className="text-gray-700 leading-relaxed">
                  The materials appearing on PrayerVerses.com could include technical, typographical, or photographic errors. 
                  PrayerVerses.com does not warrant that any of the materials on its website are accurate, complete, or current. 
                  PrayerVerses.com may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <p className="text-gray-700">
                    Email: legal@prayerverses.com<br />
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