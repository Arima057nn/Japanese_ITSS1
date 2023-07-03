const TeacherProfile = require("../models/TeacherProfile");

// Create a teacher profile
async function createTeacherProfile(teacherProfileData) {
	try {
		const result = await TeacherProfile.createTeacherProfile(
			teacherProfileData
		);
		return result;
	} catch (error) {
		console.error("Error creating teacher profile:", error);
		throw error;
	}
}

// Get all teacher profiles
async function getAllTeacherProfiles() {
	try {
		const teacherProfiles = await TeacherProfile.getAllTeacherProfiles();
		return teacherProfiles;
	} catch (error) {
		console.error("Error getting teacher profiles:", error);
		throw error;
	}
}

// Get all teacher profiles
async function getAllDetailTeacherProfile() {
	try {
		const teacherProfiles = await TeacherProfile.getAllDetailTeacherProfile();
		return teacherProfiles;
	} catch (error) {
		console.error("Error getting all detail teacher profiles:", error);
		throw error;
	}
}

//getAllTeacherProfileWithBookmarkByStudentId
async function getAllTeacherProfileWithBookmarkByStudentId(data) {
	try {
		const teacherProfiles =
			await TeacherProfile.getAllTeacherProfileWithBookmarkByStudentId(data);
		return teacherProfiles;
	} catch (error) {
		console.error("Error getting all detail teacher profiles:", error);
		throw error;
	}
}
// Get a teacher profile by ID
async function getDetailTeacherProfileById(teacherProfileId) {
	try {
		const teacherProfile = await TeacherProfile.getDetailTeacherProfileById(
			teacherProfileId
		);
		if (!teacherProfile) {
			throw new Error("Teacher profile not found");
		}
		return teacherProfile;
	} catch (error) {
		console.error("Error getting teacher profile:", error);
		throw error;
	}
}

// Get a teacher profile by ID
async function getTeacherProfileById(teacherProfileId) {
	try {
		const teacherProfile = await TeacherProfile.getTeacherProfileById(
			teacherProfileId
		);
		if (!teacherProfile) {
			throw new Error("Teacher profile not found");
		}
		return teacherProfile;
	} catch (error) {
		console.error("Error getting teacher profile:", error);
		throw error;
	}
}

async function filterDetailTeacherProfile(teacherProfileData) {
	try {
		const teacherProfile = await TeacherProfile.filterDetailTeacherProfile(
			teacherProfileData
		);
		if (!teacherProfile) {
			throw new Error("Teacher profile not found");
		}
		return teacherProfile;
	} catch (error) {
		console.error("Error getting teacher profile:", error);
		throw error;
	}
}

// Update a teacher profile
async function updateTeacherProfile(teacherProfileId, teacherProfileData) {
	try {
		const teacherProfile = await TeacherProfile.updateTeacherProfile(
			teacherProfileId,
			teacherProfileData
		);
		if (!teacherProfile) {
			throw new Error("Teacher profile not found");
		}
		return teacherProfile;
	} catch (error) {
		console.error("Error updating teacher profile:", error);
		throw error;
	}
}

// Delete a teacher profile
async function deleteTeacherProfile(teacherProfileId) {
	try {
		const teacherProfile = await TeacherProfile.deleteTeacherProfile(
			teacherProfileId
		);
		if (!teacherProfile) {
			throw new Error("Teacher profile not found");
		}
		return { message: "Teacher profile deleted successfully" };
	} catch (error) {
		console.error("Error deleting teacher profile:", error);
		throw error;
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
