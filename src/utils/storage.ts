import { BookmarkData } from '../types';

const STORAGE_KEY = 'bookmarks';

export function loadBookmarks(): BookmarkData[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    const data = JSON.parse(stored);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    return [];
  }
}

export function saveBookmarks(bookmarks: BookmarkData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error saving bookmarks:', error);
  }
}