// feedbackService.js
const Feedback = require("../models/Feedback");

// Create a feedback
async function createFeedback(data) {
	try {
		const result = await Feedback.createFeedback(data);
		return result;
	} catch (error) {
		console.error("Error creating feedback:", error);
		throw error;
	}
}

// Read all feedbacks
async function getAllFeedbacks() {
	try {
		const result = await Feedback.getAllFeedbacks();
		return result;
	} catch (error) {
		console.error("Error getting feedbacks:", error);
		throw error;
	}
}

// Read a feedback by ID
async function getFeedbackById(feedbackId) {
	try {
		const result = await Feedback.getFeedbackById(feedbackId);
		return result;
	} catch (error) {
		console.error("Error getting feedback:", error);
		throw error;
	}
}

// Update a feedback by ID
async function updateFeedback(feedbackId, data) {
	try {
		const feedback = await Feedback.updateFeedback(feedbackId, data);
		if (feedback) {
			await feedback.update(data);
			return feedback;
		} else {
			throw new Error(`Feedback with ID ${feedbackId} not found`);
		}
	} catch (error) {
		console.error("Error updating feedback:", error);
		throw error;
	}
}

// Delete a feedback by ID
async function deleteFeedback(feedbackId) {
	try {
		const feedback = await Feedback.deleteFeedback(feedbackId);
		if (feedback) {
			return { message: "Feedback deleted successfully" };
		} else {
			throw new Error(`Feedback with ID ${feedbackId} not found`);
		}
	} catch (error) {
		console.error("Error deleting feedback:", error);
		throw error;
	}
}

async function getListAvgRatingOfTeacherProfile() {
	try {
		const feedback = await Feedback.getListAvgRatingOfTeacherProfile();
		if (feedback) {
			return feedback;
		} else {
			throw new Error(`Teacher Profile not found`);
		}
	} catch (error) {
		console.error("Error get list Avg Rating from feedback:", error);
		throw error;
	}
}

async function getAvgRatingOfTeacherProfileByTeacherProfileId(
	teacher_profile_id
) {
	try {
		const feedback =
			await Feedback.getAvgRatingOfTeacherProfileByTeacherProfileId(
				teacher_profile_id
			);
		if (feedback) {
			return feedback;
		} else {
			throw new Error(`Not found`);
		}
	} catch (error) {
		console.error(
			`Error get Avg of TeacherProfile with ID ${teacher_profile_id} feedback:`,
			error
		);
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
