import React from 'react';
import { BookmarkData } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface BookmarkListProps {
  bookmarks: BookmarkData[];
  onUpdate: (bookmarks: BookmarkData[]) => void;
  onEdit: (bookmark: BookmarkData) => void;
}

function BookmarkList({ bookmarks, onUpdate, onEdit }: BookmarkListProps) {
  const environments = bookmarks.reduce((acc, bookmark) => {
    if (!acc[bookmark.Environment]) {
      acc[bookmark.Environment] = {};
    }
    if (!acc[bookmark.Environment][bookmark.Accessibility]) {
      acc[bookmark.Environment][bookmark.Accessibility] = [];
    }
    acc[bookmark.Environment][bookmark.Accessibility].push(bookmark);
    return acc;
  }, {} as Record<string, Record<string, BookmarkData[]>>);

  const handleDelete = (bookmarkToDelete: BookmarkData) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      const updatedBookmarks = bookmarks.filter(b => 
        b.Service !== bookmarkToDelete.Service || 
        b.Environment !== bookmarkToDelete.Environment || 
        b['Public URL'] !== bookmarkToDelete['Public URL']
      );
      onUpdate(updatedBookmarks);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {Object.entries(environments).map(([env, accessibilities]) => (
        <div key={env} className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="bg-gray-800 text-white px-3 py-2 text-lg font-semibold">
            {env}
          </h2>
          <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {Object.entries(accessibilities).map(([accessibility, items]) => (
              <div key={accessibility} className="bg-gray-50 rounded-lg p-2">
                <h3 className="text-sm font-medium mb-2 text-gray-700 border-b border-gray-200 pb-1">
                  {accessibility}
                </h3>
                <ul className="space-y-0.5">
                  {items.map((item, index) => (
                    <li 
                      key={index}
                      className={`flex items-center justify-between py-0.5 px-2 hover:bg-white rounded group ${
                        item.icon ? `icon ${item.icon}` : ''
                      }`}
                    >
                      <a
                        href={item['Public URL'] ? `https://${item['Public URL']}` : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-[calc(100%-4rem)]"
                        title={`${item.Service}${item.Notes ? `\n\nNotes: ${item.Notes}` : ''}`}
                      >
                        {item.Service}
                      </a>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1 text-gray-600 hover:text-blue-600"
                          title="Edit bookmark"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1 text-gray-600 hover:text-red-600"
                          title="Delete bookmark"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookmarkList;