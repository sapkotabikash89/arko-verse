"use client"

import Link from 'next/link';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: "Understanding God's Love Through Scripture",
    excerpt: "Explore the depth and breadth of God's unconditional love as revealed through Bible verses. Discover how His love transforms our hearts and relationships.",
    author: "Sarah Johnson",
    date: "January 23, 2024",
    category: "Faith",
    image: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "understanding-gods-love-through-scripture"
  },
  {
    id: 2,
    title: "Finding Peace in Difficult Times",
    excerpt: "When life gets overwhelming, where do we turn? Learn how to find true peace through prayer, scripture, and trusting in God's perfect plan.",
    author: "Michael Chen",
    date: "January 22, 2024",
    category: "Peace",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "finding-peace-in-difficult-times"
  },
  {
    id: 3,
    title: "The Power of Prayer in Daily Life",
    excerpt: "Prayer is more than just asking for things. Discover how to develop a meaningful prayer life that transforms your relationship with God.",
    author: "Emily Rodriguez",
    date: "January 21, 2024",
    category: "Prayer",
    image: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "the-power-of-prayer-in-daily-life"
  },
  {
    id: 4,
    title: "Building Faith Through Bible Study",
    excerpt: "Learn practical methods for studying the Bible that will deepen your understanding and strengthen your faith journey.",
    author: "David Thompson",
    date: "January 20, 2024",
    category: "Bible Study",
    image: "https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "building-faith-through-bible-study"
  },
  {
    id: 5,
    title: "Walking in God's Grace Daily",
    excerpt: "Grace isn't just for salvation - it's for every moment of our lives. Learn how to live in the fullness of God's grace each day.",
    author: "Rachel Adams",
    date: "January 19, 2024",
    category: "Grace",
    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800",
    slug: "walking-in-gods-grace-daily"
  },
  {
    id: 6,
    title: "Trusting God's Timing",
    excerpt: "Waiting can be difficult, but God's timing is always perfect. Discover how to trust His plan even when we don't understand.",
    author: "James Wilson",
    date: "January 18, 2024",
    category: "Trust",
    image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=800",
    slug: "trusting-gods-timing"
  }
];

export function BlogList() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Christian Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find encouragement, wisdom, and inspiration for your spiritual journey through our collection of faith-based articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </section>
  );
}