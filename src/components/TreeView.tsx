import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { BookmarkData } from '../types';

interface TreeViewProps {
  bookmarks: BookmarkData[];
  onUpdate: (bookmarks: BookmarkData[]) => void;
}

function TreeView({ bookmarks }: TreeViewProps) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {Object.entries(environments).map(([env, accessibilities]) => (
        <div key={env} className="mb-4">
          <button
            onClick={() => toggleExpand(env)}
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-50 rounded"
          >
            {expanded[env] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            <span className="font-medium">{env}</span>
          </button>
          
          {expanded[env] && (
            <div className="ml-6 mt-2">
              {Object.entries(accessibilities).map(([accessibility, items]) => (
                <div key={accessibility} className="mb-2">
                  <button
                    onClick={() => toggleExpand(`${env}-${accessibility}`)}
                    className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-50 rounded"
                  >
                    {expanded[`${env}-${accessibility}`] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                    <span>{accessibility}</span>
                  </button>
                  
                  {expanded[`${env}-${accessibility}`] && (
                    <ul className="ml-6 space-y-2">
                      {items.map((item, index) => (
                        <li 
                          key={index}
                          className={`flex items-center p-2 hover:bg-gray-50 rounded ${
                            item.icon ? `icon ${item.icon}` : ''
                          }`}
                        >
                          <a
                            href={`https://${item.Public_URL}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {item.Service}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TreeView;