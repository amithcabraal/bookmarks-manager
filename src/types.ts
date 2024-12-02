export interface BookmarkData {
  Environment: string;
  Accessibility: string;
  Service: string;
  'Public URL': string;
  icon?: string;
  Notes: string;
}

export type ViewMode = 'boxes' | 'tree';