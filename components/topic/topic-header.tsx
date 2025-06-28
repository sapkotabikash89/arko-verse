"use client"

import { Heart, Star, Shield, Sun, Leaf, Crown, Zap, Compass, Upload } from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface TopicHeaderProps {
  topic: string;
}

const topicIcons: { [key: string]: any } = {
  love: Heart,
  faith: Star,
  hope: Sun,
  peace: Leaf,
  strength: Shield,
  wisdom: Crown,
  courage: Zap,
  guidance: Compass,
};

const topicColors: { [key: string]: string } = {
  love: 'from-red-500 to-pink-500',
  faith: 'from-yellow-500 to-orange-500',
  hope: 'from-orange-500 to-red-500',
  peace: 'from-green-500 to-teal-500',
  strength: 'from-blue-500 to-indigo-500',
  wisdom: 'from-purple-500 to-indigo-500',
  courage: 'from-indigo-500 to-purple-500',
  guidance: 'from-teal-500 to-green-500',
};

export function TopicHeader({ topic }: TopicHeaderProps) {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const IconComponent = topicIcons[topic.toLowerCase()] || Heart;
  const gradientColor = topicColors[topic.toLowerCase()] || 'from-purple-500 to-indigo-500';

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
        toast.success("Background updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradientColor}`}
        style={backgroundStyle}
      >
        {backgroundImage && <div className="absolute inset-0 bg-black/40" />}
      </div>
      
      {/* Content */}
      <div className="container mx-auto max-w-4xl relative z-10 text-center text-white">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <IconComponent className="h-12 w-12" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Bible Verses About {topic}
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Discover God's wisdom and guidance on the topic of {topic.toLowerCase()} through these inspiring Bible verses
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 rounded-xl"
          >
            <Upload className="h-5 w-5 mr-2" />
            Custom Background
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleBackgroundUpload}
          className="hidden"
        />
      </div>
    </section>
  );
}