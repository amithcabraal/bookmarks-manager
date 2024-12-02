import React, { useRef } from 'react';
import { BookmarkData } from '../types';
import { Download, Upload } from 'lucide-react';

interface ImportExportProps {
  bookmarks: BookmarkData[];
  onImport: (bookmarks: BookmarkData[]) => void;
  onClose: () => void;
}

function ImportExport({ bookmarks, onImport, onClose }: ImportExportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(bookmarks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bookmarks.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        const bookmarks = Array.isArray(data) ? data : [];
        onImport(bookmarks);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error importing bookmarks:', error);
        alert('Error importing bookmarks. Please check the file format.');
      }
    };
    reader.readAsText(file);
    onClose();
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleExport}
        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded"
      >
        <Download size={16} />
        Export Bookmarks
      </button>
      <label className="block">
        <div className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
          <Upload size={16} />
          Import Bookmarks
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default ImportExport;