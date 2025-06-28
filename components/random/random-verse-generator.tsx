"use client"

import { useState } from 'react';
import { Shuffle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VerseCard } from '@/components/verse/verse-card';
import { getRandomVerse, Verse } from '@/lib/bible-data';

const backgrounds = [
  "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

export function RandomVerseGenerator() {
  const [currentVerse, setCurrentVerse] = useState<any>({
    reference: "Genesis 1:1",
    text: "In the beginning God created the heaven and the earth.",
    topic: "Creation",
    background: backgrounds[0]
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomVerse = async () => {
    setIsGenerating(true);
    
    try {
      const randomVerse = await getRandomVerse();
      
      if (randomVerse) {
        setCurrentVerse({
          reference: randomVerse.reference,
          text: randomVerse.text,
          topic: "Faith",
          background: backgrounds[Math.floor(Math.random() * backgrounds.length)]
        });
      }
    } catch (error) {
      console.error('Error generating random verse:', error);
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
      }, 500);
    }
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