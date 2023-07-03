import { axiosClient } from "./axios-client";

export const userApi = {
  register(account) {
    return axiosClient.post(`/users/register`, account);
  },
  getUsers() {
    return axiosClient.get(`/users`);
  },
  updateUser(id, profile) {
    return axiosClient.put(`/users/${id}`, profile);
  },
};
