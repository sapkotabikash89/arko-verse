"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, Share2, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BlogPostProps {
  slug: string;
}

interface BlogPostData {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
}

const blogPosts: { [key: string]: BlogPostData } = {
  'understanding-gods-love-through-scripture': {
    id: 1,
    title: "Understanding God's Love Through Scripture",
    content: `
      <p>God's love is perhaps the most profound and transformative truth in all of Scripture. From Genesis to Revelation, we see the consistent thread of divine love woven throughout the biblical narrative. This love is not merely an emotion or feeling, but the very essence of who God is.</p>

      <h2>The Nature of God's Love</h2>
      <p>The apostle John declares in 1 John 4:8 that "God is love." This isn't just saying that God has love or shows love, but that love is His very nature. Everything God does flows from this fundamental aspect of His character.</p>

      <blockquote>"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16</blockquote>

      <p>This verse encapsulates the depth of God's love - it's sacrificial, universal, and eternal. God's love moved Him to action, to give the ultimate gift for our salvation.</p>

      <h2>Unconditional and Unchanging</h2>
      <p>Unlike human love, which can be fickle and conditional, God's love is steadfast and unchanging. Romans 8:38-39 assures us that nothing can separate us from the love of God that is in Christ Jesus our Lord.</p>

      <p>This truth should transform how we view ourselves and others. We are loved not because of what we do, but because of who God is. This love is the foundation for our identity and security.</p>

      <h2>Living in God's Love</h2>
      <p>Understanding God's love should change how we live. When we truly grasp the depth of His love for us, it naturally overflows into love for others. As 1 John 4:19 says, "We love because he first loved us."</p>

      <p>Take time today to meditate on God's love for you. Let it sink deep into your heart and transform your perspective on life, relationships, and your purpose.</p>
    `,
    excerpt: "Explore the depth and breadth of God's unconditional love as revealed through Bible verses. Discover how His love transforms our hearts and relationships.",
    author: "Sarah Johnson",
    date: "January 23, 2024",
    category: "Faith",
    image: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Love", "Scripture", "Faith", "God's Character"]
  },
  'finding-peace-in-difficult-times': {
    id: 2,
    title: "Finding Peace in Difficult Times",
    content: `
      <p>Life has a way of throwing unexpected challenges our way. Whether it's health issues, financial struggles, relationship problems, or global uncertainties, we all face difficult seasons. But as believers, we have access to a peace that transcends understanding.</p>

      <h2>The Source of True Peace</h2>
      <p>Jesus himself promised us peace in John 14:27: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."</p>

      <p>This peace is different from the temporary relief the world offers. It's a deep, abiding peace that comes from knowing God is in control, even when our circumstances seem chaotic.</p>

      <h2>Practical Steps to Peace</h2>
      <p>While peace is a gift from God, there are practical steps we can take to experience it more fully:</p>

      <ul>
        <li><strong>Prayer:</strong> Philippians 4:6-7 tells us to present our requests to God with thanksgiving, and His peace will guard our hearts and minds.</li>
        <li><strong>Scripture Meditation:</strong> God's Word is a source of comfort and strength. Psalm 119:165 says, "Great peace have those who love your law."</li>
        <li><strong>Trust:</strong> Isaiah 26:3 promises perfect peace to those whose minds are steadfast because they trust in God.</li>
      </ul>

      <blockquote>"You will keep in perfect peace those whose minds are steadfast, because they trust in you." - Isaiah 26:3</blockquote>

      <h2>Peace in the Storm</h2>
      <p>Remember that peace doesn't mean the absence of storms, but the presence of God in the midst of them. Just as Jesus calmed the storm for His disciples, He can bring calm to the storms in our lives.</p>

      <p>Today, whatever you're facing, bring it to God in prayer. Trust in His goodness and sovereignty. His peace is available to you right now.</p>
    `,
    excerpt: "When life gets overwhelming, where do we turn? Learn how to find true peace through prayer, scripture, and trusting in God's perfect plan.",
    author: "Michael Chen",
    date: "January 22, 2024",
    category: "Peace",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Peace", "Prayer", "Trust", "Difficult Times"]
  }
};

export function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postData = blogPosts[slug];
    if (postData) {
      setPost(postData);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The requested blog post could not be found.</p>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Back to Blog
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{post.date}</span>
            <User className="h-4 w-4 mr-1" />
            <span className="mr-4">{post.author}</span>
            <Link href={`/topic/${post.category.toLowerCase()}`}>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-200 cursor-pointer">
                {post.category}
              </span>
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Article Content */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Link key={index} href={`/topic/${tag.toLowerCase()}`}>
                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-100 cursor-pointer border border-purple-200">
                  <Tag className="h-3 w-3 mr-1 inline" />
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Share Buttons */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Share this post</h3>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Like
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </article>
  );
}