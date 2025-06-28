"use client"

import { useState, useRef } from 'react';
import { Share2, Copy, Download, Upload, Heart, ExternalLink, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import Link from 'next/link';
import { referenceToSlug } from '@/lib/bible-data';

interface Verse {
  reference: string;
  text: string;
  topic?: string;
  date?: string;
  background?: string;
}

interface VerseCardProps {
  verse: Verse;
  showInteractive?: boolean;
  customBackground?: string;
}

export function VerseCard({ verse, showInteractive = false, customBackground }: VerseCardProps) {
  const [currentBackground, setCurrentBackground] = useState(customBackground || verse.background || '');
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasCustomBackground, setHasCustomBackground] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`);
      toast.success("Verse copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy verse");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${verse.reference} - PrayerVerses.com`,
          text: `"${verse.text}" - ${verse.reference}`,
          url: window.location.href,
        });
      } catch (error) {
        toast.error("Sharing failed");
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
      
      const link = document.createElement('a');
      link.download = `${referenceToSlug(verse.reference)}-verse.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast.success("Verse image downloaded!");
    } catch (error) {
      toast.error("Failed to download image");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentBackground(e.target?.result as string);
        setHasCustomBackground(true);
        toast.success("Background updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = () => {
    setCurrentBackground(verse.background || '');
    setHasCustomBackground(false);
    toast.success("Background removed!");
  };

  const backgroundStyle = currentBackground
    ? { backgroundImage: `url(${currentBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };

  const verseSlug = referenceToSlug(verse.reference);

  return (
    <div className="space-y-4">
      {/* Main Verse Card */}
      <Card 
        ref={cardRef}
        className="relative overflow-hidden border-0 shadow-2xl max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
      >
        <CardContent className="p-0">
          <div 
            className="relative p-12 text-center text-white min-h-[400px] flex flex-col justify-center"
            style={backgroundStyle}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Remove Background Button */}
            {hasCustomBackground && (
              <button
                onClick={handleRemoveBackground}
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {/* Content */}
            <div className="relative z-10 space-y-6">
              <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-white drop-shadow-lg">
                "{verse.text}"
              </blockquote>
              
              <div className="space-y-4">
                <Link 
                  href={`/verse/${verseSlug}`}
                  className="inline-block"
                >
                  <p className="text-xl font-semibold text-yellow-200 hover:text-yellow-100 transition-colors cursor-pointer">
                    {verse.reference}
                  </p>
                </Link>
                
                {/* Topic */}
                {verse.topic && (
                  <div className="text-center">
                    <Link 
                      href={`/topic/${verse.topic.toLowerCase()}`}
                      className="inline-block"
                    >
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors cursor-pointer font-medium">
                        {verse.topic}
                      </span>
                    </Link>
                  </div>
                )}

                {/* Watermark */}
                <div className="text-white/80 text-sm font-medium">
                  prayerverses.com
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Controls */}
      {showInteractive && (
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="bg-white/90 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="bg-white/90 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-white/90 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Download className="h-4 w-4 mr-2" />
            {isDownloading ? 'Downloading...' : 'Download'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/90 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Change Background
          </Button>

          <Link href={`/verse/${verseSlug}`}>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full
            </Button>
          </Link>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleBackgroundUpload}
        className="hidden"
      />
    </div>
  );
}