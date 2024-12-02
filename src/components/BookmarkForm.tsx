import React, { useState, useEffect } from 'react';
import { BookmarkData } from '../types';
import { X } from 'lucide-react';

interface BookmarkFormProps {
  onSave: (bookmark: BookmarkData) => void;
  onClose: () => void;
  editBookmark?: BookmarkData;
}

function BookmarkForm({ onSave, onClose, editBookmark }: BookmarkFormProps) {
  const [formData, setFormData] = useState<BookmarkData>({
    Environment: '',
    Accessibility: '',
    Service: '',
    'Public URL': '',
    icon: '',
    Notes: ''
  });

  useEffect(() => {
    if (editBookmark) {
      setFormData(editBookmark);
    }
  }, [editBookmark]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editBookmark ? 'Edit Bookmark' : 'Add New Bookmark'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Environment</label>
            <input
              type="text"
              name="Environment"
              value={formData.Environment}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Accessibility</label>
            <input
              type="text"
              name="Accessibility"
              value={formData.Accessibility}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Service</label>
            <input
              type="text"
              name="Service"
              value={formData.Service}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="text"
              name="Public URL"
              value={formData['Public URL']}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Icon</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <input
              type="text"
              name="Notes"
              value={formData.Notes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {editBookmark ? 'Save Changes' : 'Add Bookmark'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookmarkForm;