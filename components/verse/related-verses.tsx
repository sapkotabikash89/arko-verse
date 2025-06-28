"use client"

import { VerseCard } from '@/components/verse/verse-card';

interface RelatedVersesProps {
  reference: string;
}

export function RelatedVerses({ reference }: RelatedVersesProps) {
  // Sample related verses - in a real app, this would be determined by topic/theme
  const relatedVerses = [
    {
      reference: "1 John 4:8",
      text: "Whoever does not love does not know God, because God is love.",
      topic: "Love",
      background: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      reference: "1 Corinthians 13:4",
      text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
      topic: "Love",
      background: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      reference: "John 15:12",
      text: "My command is this: Love each other as I have loved you.",
      topic: "Love",
      background: "https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Related Verses
          </h2>
          <p className="text-gray-600 text-lg">
            Explore more verses with similar themes and messages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {relatedVerses.map((verse, index) => (
            <div key={index} className="transform hover:scale-105 transition-transform duration-300">
              <VerseCard verse={verse} showInteractive={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}