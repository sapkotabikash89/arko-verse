"use client"

import { useState } from 'react';
import { Save, Eye, Upload, Bold, Italic, Link, Image as ImageIcon, List, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";

export function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState('draft');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    toast.success('Post saved successfully!');
  };

  const handlePublish = () => {
    toast.success('Post published successfully!');
  };

  const editorTools = [
    { icon: Bold, label: 'Bold' },
    { icon: Italic, label: 'Italic' },
    { icon: Link, label: 'Link' },
    { icon: ImageIcon, label: 'Image' },
    { icon: List, label: 'List' },
    { icon: Quote, label: 'Quote' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Blog Editor</h2>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish} className="bg-purple-600 hover:bg-purple-700">
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your post title..."
                  className="text-2xl font-bold border-0 shadow-none p-0 focus:ring-0 focus:border-0"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <Textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your post..."
                  className="min-h-[80px] border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                />
              </div>

              {/* Editor Toolbar */}
              <div className="border-t border-b border-gray-200 py-3">
                <div className="flex items-center space-x-2">
                  {editorTools.map((tool, index) => {
                    const IconComponent = tool.icon;
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="p-2 h-8 w-8"
                        title={tool.label}
                      >
                        <IconComponent className="h-4 w-4" />
                      </Button>
                    );
                  })}
                  <div className="border-l border-gray-300 h-6 mx-2" />
                  <Button variant="ghost" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your post content..."
                  className="min-h-[500px] border-gray-300 focus:border-purple-400 focus:ring-purple-200 font-mono"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="devotional">Devotional</SelectItem>
                    <SelectItem value="bible-study">Bible Study</SelectItem>
                    <SelectItem value="prayer">Prayer</SelectItem>
                    <SelectItem value="inspiration">Inspiration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-4">
                  Upload a featured image for your post
                </p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Image
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <Textarea
                  placeholder="SEO meta description..."
                  className="min-h-[80px] border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <Input
                  type="text"
                  placeholder="Enter keywords separated by commas"
                  className="border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}