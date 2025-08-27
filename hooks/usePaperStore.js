import { create } from 'zustand';

export const usePaperStore = create((set) => ({
  paperData: [],
  selectedPapers: [],
  downloadProgress: 0,
  downloadMode: '1',
  
  setPaperData: (data) => set({ paperData: data }),
  setSelectedPapers: (papers) => set({ selectedPapers: papers }),
  setDownloadProgress: (progress) => set({ downloadProgress: progress }),
  setDownloadMode: (mode) => set({ downloadMode: mode }),
  
  clearSelection: () => set({ selectedPapers: [] }),
  resetDownload: () => set({ downloadProgress: 0 }),
}));