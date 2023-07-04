import { axiosClient } from "./axios-client";

export const bookmarkApi = {
  createBookmark(bookmark) {
    return axiosClient.post(`/bookmarks`, bookmark);
  },
  searchBookmark(bookmark) {
    return axiosClient.post(`/bookmarks/search`, bookmark);
  },
  deleteBookmark(bookmark) {
    return axiosClient.delete(`/bookmarks/delete`, { data: bookmark });
  },
  updateBookmark(bookmark) {
    return axiosClient.put(`bookmarks/update`, bookmark);
  },
};
