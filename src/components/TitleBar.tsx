import React from 'react';
import { Menu, X } from 'lucide-react';

interface TitleBarProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

function TitleBar({ isMenuOpen, onMenuToggle }: TitleBarProps) {
  return (
    <header className="bg-blue-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center h-14">
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-blue-700 rounded-lg mr-4 transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-semibold">Bookmarks Manager</h1>
      </div>
    </header>
  );
}

export default TitleBar;