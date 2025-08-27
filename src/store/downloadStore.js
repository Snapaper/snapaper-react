import { create } from 'zustand';
import Cookies from 'js-cookie';

const useDownloadStore = create((set) => ({
  downloadMode: Cookies.get('snapaper_download') || '1',
  setDownloadMode: (mode) => {
    Cookies.set('snapaper_download', mode);
    set({ downloadMode: mode });
  },
}));

export default useDownloadStore;
