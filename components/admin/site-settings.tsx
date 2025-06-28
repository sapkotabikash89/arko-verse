"use client"

import { useState } from 'react';
import { Save, Palette, Type, Code, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from "sonner";

export function SiteSettings() {
  const [siteName, setSiteName] = useState('PrayerVerses.com');
  const [siteDescription, setSiteDescription] = useState('Daily Bible verses and spiritual inspiration');
  const [primaryColor, setPrimaryColor] = useState('#7c3aed');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState([16]);
  const [headingSize, setHeadingSize] = useState([32]);
  const [fontWeight, setFontWeight] = useState([400]);
  const [lineHeight, setLineHeight] = useState([1.6]);
  const [paragraphSpacing, setParagraphSpacing] = useState([16]);
  const [customCSS, setCustomCSS] = useState('');

  const handleSave = () => {
    // In a real app, this would save to a database
    const settings = {
      siteName,
      siteDescription,
      primaryColor,
      secondaryColor,
      fontFamily,
      fontSize: fontSize[0],
      headingSize: headingSize[0],
      fontWeight: fontWeight[0],
      lineHeight: lineHeight[0],
      paragraphSpacing: paragraphSpacing[0],
      customCSS
    };
    
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  const applySettings = () => {
    // Apply settings to the document
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--secondary-color', secondaryColor);
    root.style.setProperty('--font-family', fontFamily);
    root.style.setProperty('--font-size', `${fontSize[0]}px`);
    root.style.setProperty('--heading-size', `${headingSize[0]}px`);
    root.style.setProperty('--font-weight', fontWeight[0].toString());
    root.style.setProperty('--line-height', lineHeight[0].toString());
    root.style.setProperty('--paragraph-spacing', `${paragraphSpacing[0]}px`);
    
    toast.success('Settings applied!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Site Settings</h2>
        <div className="flex space-x-3">
          <Button onClick={applySettings} variant="outline">
            Apply Preview
          </Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <Input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site URL
                  </label>
                  <Input
                    type="url"
                    defaultValue="https://prayerverses.com"
                    className="border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Description
                </label>
                <Textarea
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  className="min-h-[100px] border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Email
                  </label>
                  <Input
                    type="email"
                    defaultValue="admin@prayerverses.com"
                    className="border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <Select defaultValue="UTC">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">Color Preview</h4>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 rounded-lg shadow-md"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div 
                    className="w-16 h-16 rounded-lg shadow-md"
                    style={{ backgroundColor: secondaryColor }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      These colors will be applied throughout your site's interface
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Typography Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Font Family
                </label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Body Font Size: {fontSize[0]}px
                  </label>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    max={24}
                    min={12}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heading Font Size: {headingSize[0]}px
                  </label>
                  <Slider
                    value={headingSize}
                    onValueChange={setHeadingSize}
                    max={48}
                    min={20}
                    step={2}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Weight: {fontWeight[0]}
                  </label>
                  <Slider
                    value={fontWeight}
                    onValueChange={setFontWeight}
                    max={900}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Line Height: {lineHeight[0]}
                  </label>
                  <Slider
                    value={lineHeight}
                    onValueChange={setLineHeight}
                    max={2.5}
                    min={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paragraph Spacing: {paragraphSpacing[0]}px
                </label>
                <Slider
                  value={paragraphSpacing}
                  onValueChange={setParagraphSpacing}
                  max={32}
                  min={8}
                  step={2}
                  className="w-full"
                />
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">Typography Preview</h4>
                <div style={{ 
                  fontFamily: fontFamily,
                  fontSize: `${fontSize[0]}px`,
                  fontWeight: fontWeight[0],
                  lineHeight: lineHeight[0]
                }}>
                  <h1 style={{ fontSize: `${headingSize[0]}px`, marginBottom: `${paragraphSpacing[0]}px` }}>
                    Sample Heading
                  </h1>
                  <p style={{ marginBottom: `${paragraphSpacing[0]}px` }}>
                    This is a sample paragraph to show how your chosen typography settings will look. 
                    The font family, size, weight, and spacing all contribute to the overall readability and aesthetic of your content.
                  </p>
                  <p className="text-sm text-gray-600">Small text and captions will appear like this.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom CSS
                </label>
                <Textarea
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                  placeholder="/* Add your custom CSS here */"
                  className="min-h-[200px] font-mono text-sm border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Add custom CSS to override default styles. Changes will be applied site-wide.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Feature Toggles</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Dark Mode</p>
                      <p className="text-sm text-gray-600">Enable dark mode toggle for users</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Comments</p>
                      <p className="text-sm text-gray-600">Allow comments on blog posts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Social Sharing</p>
                      <p className="text-sm text-gray-600">Show social sharing buttons</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}