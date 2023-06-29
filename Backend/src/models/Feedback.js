// feedbackModel.js
const db = require("../services/db");

// Create a feedback
async function createFeedback(feedbackData) {
	const query = `INSERT INTO Feedback 
    (studentId, teacher_profile_id, feedback_content, rating) 
    VALUES 
    (?, ?, ?, ?)`;

	const values = [
		feedbackData.studentId,
		feedbackData.teacher_profile_id,
		feedbackData.feedback_content,
		feedbackData.rating,
	];

	try {
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error while creating feedback:", error.message);
		throw error;
	}
}

// Read all feedbacks
async function getAllFeedbacks() {
	const query = "SELECT * FROM Feedback";

	try {
		const result = await db.query(query);
		return result;
	} catch (error) {
		console.error("Error while getting feedbacks:", error.message);
		throw error;
	}
}

// Read a feedback by ID
async function getFeedbackById(feedbackId) {
	const query = "SELECT * FROM Feedback WHERE teacher_profile_id = ?";

	try {
		const result = await db.query(query, [feedbackId]);
		return result;
	} catch (error) {
		console.error("Error while getting feedback:", error.message);
		throw error;
	}
}

// Update a feedback by ID
async function updateFeedback(feedbackId, feedbackData) {
	try {
		const query = `UPDATE Feedback SET 
    studentId = ?, 
    teacher_profile_id = ?, 
    feedback_content = ?, 
    rating = ? 
    WHERE id = ?`;

		const data = await getFeedbackById(feedbackId);

		const values = [
			feedbackData.studentId || data.studentId,
			feedbackData.teacher_profile_id || data.teacher_profile_id,
			feedbackData.feedback_content || data.feedback_content,
			feedbackData.rating || data.rating,
			feedbackId,
		];
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error while updating feedback:", error.message);
		throw error;
	}
}

// Delete a feedback by ID
async function deleteFeedback(feedbackId) {
	const query = "DELETE FROM Feedback WHERE id = ?";

	try {
		const result = await db.query(query, [feedbackId]);
		return result;
	} catch (error) {
		console.error("Error while deleting feedback:", error.message);
		throw error;
	}
}

module.exports = {
	createFeedback,
	getAllFeedbacks,
	getFeedbackById,
	updateFeedback,
	deleteFeedback,
};
