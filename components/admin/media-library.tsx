"use client"

import { useState } from 'react';
import { Upload, Search, Filter, Grid3X3, List, Trash2, Edit, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mediaFiles = [
  { id: 1, name: 'sunset-landscape.jpg', type: 'image', size: '2.4 MB', date: '2024-01-23', url: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'mountain-view.jpg', type: 'image', size: '1.8 MB', date: '2024-01-22', url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'ocean-waves.jpg', type: 'image', size: '3.1 MB', date: '2024-01-21', url: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, name: 'forest-path.jpg', type: 'image', size: '2.7 MB', date: '2024-01-20', url: 'https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, name: 'city-lights.jpg', type: 'image', size: '1.9 MB', date: '2024-01-19', url: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 6, name: 'flower-field.jpg', type: 'image', size: '2.2 MB', date: '2024-01-18', url: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=400' },
];

export function MediaLibrary() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Media Library</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search media files..."
                  className="pl-10 border-gray-300 focus:border-purple-400 focus:ring-purple-200"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Files</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaFiles.map((file) => (
            <Card key={file.id} className="group border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="secondary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 truncate">{file.name}</h4>
                  <p className="text-sm text-gray-500">{file.size} • {file.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900">File</th>
                    <th className="text-left p-4 font-medium text-gray-900">Type</th>
                    <th className="text-left p-4 font-medium text-gray-900">Size</th>
                    <th className="text-left p-4 font-medium text-gray-900">Date</th>
                    <th className="text-right p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mediaFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <span className="font-medium text-gray-900">{file.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 capitalize">{file.type}</td>
                      <td className="p-4 text-gray-600">{file.size}</td>
                      <td className="p-4 text-gray-600">{file.date}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}