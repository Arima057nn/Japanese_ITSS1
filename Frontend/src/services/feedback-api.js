import { axiosClient } from "./axios-client";

export const feedbackApi = {
  getFeedbacks() {
    return axiosClient.get(`/feedbacks`);
  },

  getFeedback(id) {
    return axiosClient.get(`/feedbacks/${id}`);
  },

  createFeedback(feedback) {
    return axiosClient.post(`/feedbacks`, feedback);
  },
};
