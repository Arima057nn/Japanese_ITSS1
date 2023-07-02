import { axiosClient } from "./axios-client";

export const bookmarkApi = {
  getBookmarks() {
    return axiosClient.get(`/bookmarks`);
  },
  createBookmark(bookmark) {
    return axiosClient.post(`/bookmarks`, bookmark);
  },
  searchBookmark(bookmark) {
    return axiosClient.post(`/bookmarks/search`, bookmark);
  },
};
