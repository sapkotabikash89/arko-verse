"use client"

import { VerseCard } from '@/components/verse/verse-card';

const featuredVerses = [
  {
    reference: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    topic: "Love",
    background: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    reference: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me.",
    topic: "Strength",
    background: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    reference: "Jeremiah 29:11",
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    topic: "Hope",
    background: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export function FeaturedVerses() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Featured Bible Verses
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover some of the most beloved and inspiring verses from Scripture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredVerses.map((verse, index) => (
            <div key={index} className="transform hover:scale-105 transition-transform duration-300">
              <VerseCard verse={verse} showInteractive={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}