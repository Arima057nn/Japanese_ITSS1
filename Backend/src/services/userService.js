const User = require("../models/User");

// Create a user
async function createUser(userData) {
	try {
		const result = await User.create(userData);
		return result;
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}

// Get all users
async function getAllUsers() {
	try {
		const user = await User.getAllUsers();
		return user;
	} catch (error) {
		console.error("Error retrieving user:", error);
		throw error;
	}
}

// Get all user by Role ID
async function getUserByRoleId(roleId) {
	try {
		const user = await User.getUserByRoleId(roleId);
		return user;
	} catch (error) {
		console.error("Error retrieving user:", error);
		throw error;
	}
}

// Get a user by ID
async function getUserById(userId) {
	try {
		const user = await User.getUserById(userId);
		return user;
	} catch (error) {
		console.error("Error retrieving user:", error);
		throw error;
	}
}
//getAllStudentWithBookmarkByTeacherProfileId
async function getAllStudentWithBookmarkByTeacherProfileId(data) {
	try {
		const user = await User.getAllStudentWithBookmarkByTeacherProfileId(data);
		return user;
	} catch (error) {
		console.error(
			"Error retrieving student with Bookmark by teacher profile ID:",
			error
		);
		throw error;
	}
}

// Update a user
async function updateUser(userId, userData) {
	try {
		const result = await User.updateUser(userId, userData);
		return result;
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
}

// Delete a user
async function deleteUser(userId) {
	try {
		const result = await User.deleteUser(userId);
		return result;
	} catch (error) {
		console.error("Error deleting user:", error);
		throw error;
	}
}

// register a user
async function register(registerData) {
	try {
		const result = await User.register(registerData);
		return result;
	} catch (error) {
		console.error("Error register user:", error);
		throw error;
	}
}

// login a user
async function login(user_name, password) {
	try {
		const result = await User.login(user_name, password);
		return result;
	} catch (error) {
		console.error("Error login user:", error);
		throw error;
	}
}

module.exports = {
	createUser,
	getUserById,
	updateUser,
	deleteUser,
	getAllUsers,
	register,
	login,
	getUserByRoleId,
	getAllStudentWithBookmarkByTeacherProfileId,
};
