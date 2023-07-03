const teacherProfileService = require("../services/teacher_profile");

// Create a teacher profile
async function createTeacherProfile(req, res, next) {
	try {
		const result = await teacherProfileService.createTeacherProfile(req.body);
		return res.status(200).json(result);
	} catch (error) {
		console.error("Error while creating teacher profile:", error.message);
		return res.status(500).json({ message: error.message });
	}
}

// Get all teacher profiles
async function getAllTeacherProfiles(req, res, next) {
	try {
		const teacherProfiles = await teacherProfileService.getAllTeacherProfiles();
		return res.status(200).json(teacherProfiles);
	} catch (error) {
		console.error("Error while getting teacher profiles:", error.message);
		return res.status(500).json({ message: error.message });
	}
}

// Get a teacher profile by ID
async function getAllDetailTeacherProfile(req, res, next) {
	try {
		const teacherProfile =
			await teacherProfileService.getAllDetailTeacherProfile();
		return res.status(200).json(teacherProfile);
	} catch (error) {
		console.error("Error while getting all teacher profile:", error.message);
		return res.status(500).json({ message: error.message });
	}
}

// Get a teacher profile by studentID with Bookmark
async function getAllTeacherProfileWithBookmarkByStudentId(req, res, next) {
	try {
		const result =
			await teacherProfileService.getAllTeacherProfileWithBookmarkByStudentId(
				req.body
			);
		return res.status(200).json(result);
	} catch (error) {
		console.error("Error while getting target-teacher profile:", error.message);
		return res.status(500).json({ message: error.message });
	}
}

// Get a teacher profile by ID
async function getDetailTeacherProfileById(req, res, next) {
	try {
		const teacherProfileId = req.params.id;
		const teacherProfile =
			await teacherProfileService.getDetailTeacherProfileById(teacherProfileId);
		return res.status(200).json(teacherProfile);
	} catch (error) {
		console.error("Error while getting detail teacher profile:", error.message);
		return res.status(500).json({ message: error.message });
	}
}

// Get a teacher profile by ID
async function getTeacherProfileById(req, res, next) {
	try {
		const teacherProfileId = req.params.id;
		const teacherProfile = await teacherProfileService.getTeacherProfileById(
			teacherProfileId
		);
		return res.status(200).json(teacherProfile);
	} catch (error) {
		console.error("Error while getting teacher profile:", error.message);
		return res.status(500).json({ message: error.message });
	}
}

// Update a teacher profile
async function updateTeacherProfile(req, res, next) {
	try {
		const teacherProfileId = req.params.id;
		const teacherProfileData = req.body;
		const result = await teacherProfileService.updateTeacherProfile(
			teacherProfileId,
			teacherProfileData
		);
		return res.status(200).json(result);
	} catch (error) {
		console.error("Error while updating teacher profile:", error.message);
		return res.status(500).json({ message: error.message });
	}
}

// Update a teacher profile
async function filterDetailTeacherProfile(req, res, next) {
	try {
		const teacherProfileData = req.body;
		const result = await teacherProfileService.filterDetailTeacherProfile(
			teacherProfileData
		);
		return res.status(200).json(result);
	} catch (error) {
		console.error("Error while updating teacher profile:", error.message);
		return res.status(500).json({ message: error.message });
	}
}

// Delete a teacher profile
async function deleteTeacherProfile(req, res, next) {
	try {
		const teacherProfileId = req.params.id;
		const result = await teacherProfileService.deleteTeacherProfile(
			teacherProfileId
		);
		return res.status(200).json(result);
	} catch (error) {
		console.error("Error while deleting teacher profile:", error.message);
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	createTeacherProfile,
	getAllTeacherProfiles,
	getTeacherProfileById,
	updateTeacherProfile,
	deleteTeacherProfile,
	getAllDetailTeacherProfile,
	getDetailTeacherProfileById,
	filterDetailTeacherProfile,
	getAllTeacherProfileWithBookmarkByStudentId,
};
