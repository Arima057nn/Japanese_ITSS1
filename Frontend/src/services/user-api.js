import { axiosClient } from "./axios-client";

export const userApi = {
  register(account) {
    return axiosClient.post(`/users/register`, account);
  },
  getUsers() {
    return axiosClient.get(`/users`);
  },
  getUser(id) {
    return axiosClient.get(`/users/${id}`);
  },
  updateUser(id, profile) {
    return axiosClient.put(`/users/${id}`, profile);
  },
  getStudents(teacher) {
    return axiosClient.post(`/users/bookmark`, teacher);
  },
};
