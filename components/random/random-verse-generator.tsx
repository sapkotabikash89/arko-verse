"use client"

import { useState } from 'react';
import { Shuffle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VerseCard } from '@/components/verse/verse-card';

const randomVerses = [
  {
    reference: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    topic: "Trust",
    background: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    reference: "Isaiah 41:10",
    text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    topic: "Courage",
    background: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    reference: "Psalm 23:1",
    text: "The Lord is my shepherd, I lack nothing.",
    topic: "Peace",
    background: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    reference: "Matthew 11:28",
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    topic: "Rest",
    background: "https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    reference: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    topic: "Faith",
    background: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export function RandomVerseGenerator() {
  const [currentVerse, setCurrentVerse] = useState(randomVerses[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomVerse = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * randomVerses.length);
      setCurrentVerse(randomVerses[randomIndex]);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shuffle className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              Random Bible Verse
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let God surprise you with exactly the verse you need to hear today. Click the button below to discover a random Bible verse.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <VerseCard verse={currentVerse} showInteractive={true} />
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={generateRandomVerse}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl px-8"
          >
            {isGenerating ? (
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Shuffle className="h-5 w-5 mr-2" />
            )}
            {isGenerating ? 'Generating...' : 'Generate Random Verse'}
          </Button>
        </div>
      </div>
    </section>
  );
}