import React, { useState, useEffect } from 'react';
import { Menu, Plus } from 'lucide-react';
import TitleBar from './components/TitleBar';
import BookmarkList from './components/BookmarkList';
import TreeView from './components/TreeView';
import { loadBookmarks, saveBookmarks } from './utils/storage';
import { BookmarkData, ViewMode } from './types';
import SearchBar from './components/SearchBar';
import ImportExport from './components/ImportExport';
import BookmarkForm from './components/BookmarkForm';

function App() {
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('boxes');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<BookmarkData | undefined>();

  useEffect(() => {
    const data = loadBookmarks();
    setBookmarks(data);
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleSaveBookmarks = (newBookmarks: BookmarkData[]) => {
    setBookmarks(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  const handleAddBookmark = (bookmark: BookmarkData) => {
    if (editingBookmark) {
      const updatedBookmarks = bookmarks.map(b => 
        b.Service === editingBookmark.Service && 
        b.Environment === editingBookmark.Environment && 
        b['Public URL'] === editingBookmark['Public URL'] 
          ? bookmark 
          : b
      );
      setBookmarks(updatedBookmarks);
      saveBookmarks(updatedBookmarks);
      setEditingBookmark(undefined);
    } else {
      const newBookmarks = [...bookmarks, bookmark];
      setBookmarks(newBookmarks);
      saveBookmarks(newBookmarks);
    }
    setShowAddForm(false);
  };

  const handleEditBookmark = (bookmark: BookmarkData) => {
    setEditingBookmark(bookmark);
    setShowAddForm(true);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setIsMenuOpen(false);
  };

  const filteredBookmarks = bookmarks.filter(bookmark => 
    JSON.stringify(bookmark).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TitleBar 
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />
      
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform z-40 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full pt-16">
          <div className="p-4 space-y-4">
            <button 
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => handleViewModeChange('boxes')}
            >
              Box View
            </button>
            <button 
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => handleViewModeChange('tree')}
            >
              Tree View
            </button>
            <ImportExport 
              bookmarks={bookmarks}
              onImport={handleSaveBookmarks}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pt-20">
        <div className="flex justify-between items-center mb-4">
          <SearchBar 
            value={searchText}
            onChange={handleSearch}
          />
          <button
            onClick={() => {
              setEditingBookmark(undefined);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Add Bookmark
          </button>
        </div>
        
        {viewMode === 'boxes' ? (
          <BookmarkList 
            bookmarks={filteredBookmarks}
            onUpdate={handleSaveBookmarks}
            onEdit={handleEditBookmark}
          />
        ) : (
          <TreeView 
            bookmarks={filteredBookmarks}
            onUpdate={handleSaveBookmarks}
          />
        )}

        {showAddForm && (
          <BookmarkForm
            onSave={handleAddBookmark}
            onClose={() => {
              setShowAddForm(false);
              setEditingBookmark(undefined);
            }}
            editBookmark={editingBookmark}
          />
        )}
      </main>
    </div>
  );
}

export default App;