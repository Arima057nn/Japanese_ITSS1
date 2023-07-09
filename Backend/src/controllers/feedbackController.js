// feedbackController.js
const feedbackService = require("../services/feedbackService");

// Create a feedback
async function createFeedback(data) {
	try {
		const result = await feedbackService.createFeedback(data);
		return result;
	} catch (error) {
		console.error("Error while creating feedback:", error.message);
		throw error;
	}
}

// Read all feedbacks
async function getAllFeedbacks() {
	try {
		const result = await feedbackService.getAllFeedbacks();
		return result;
	} catch (error) {
		console.error("Error while getting feedbacks:", error.message);
		throw error;
	}
}

// Read a feedback by ID
async function getFeedbackById(feedbackId) {
	try {
		const result = await feedbackService.getFeedbackById(feedbackId);
		return result;
	} catch (error) {
		console.error("Error while getting feedback:", error.message);
		throw error;
	}
}

// Update a feedback by ID
async function updateFeedback(feedbackId, data) {
	try {
		const result = await feedbackService.updateFeedback(feedbackId, data);
		return result;
	} catch (error) {
		console.error("Error while updating feedback:", error.message);
		throw error;
	}
}

// Delete a feedback by ID
async function deleteFeedback(feedbackId) {
	try {
		const result = await feedbackService.deleteFeedback(feedbackId);
		return result;
	} catch (error) {
		console.error("Error while deleting feedback:", error.message);
		throw error;
	}
}

async function getListAvgRatingOfTeacherProfile() {
	try {
		const result = await feedbackService.getListAvgRatingOfTeacherProfile();
		return result;
	} catch (error) {
		console.error("Error while getting avg rating:", error.message);
		throw error;
	}
}

async function getAvgRatingOfTeacherProfileByTeacherProfileId(
	teacher_profile_id
) {
	try {
		const result =
			await feedbackService.getAvgRatingOfTeacherProfileByTeacherProfileId(
				teacher_profile_id
			);
		return result;
	} catch (error) {
		console.error("Error while getting avg rating:", error.message);
		throw error;
	}
}

module.exports = {
	createFeedback,
	getAllFeedbacks,
	getFeedbackById,
	updateFeedback,
	deleteFeedback,
	getListAvgRatingOfTeacherProfile,
	getAvgRatingOfTeacherProfileByTeacherProfileId,
};
