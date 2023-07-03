const e = require("express");
const { use } = require("../routes/userRoutes");
const userService = require("../services/userService");

// Create a user
async function createUser(data) {
	try {
		const result = await userService.createUser(data);
		return result;
	} catch (error) {
		console.error("Error while creating user:", error.message);
		throw error;
	}
}

// Get all users
async function getAllUsers() {
	try {
		const users = await userService.getAllUsers();
		if (users) {
			return users;
		} else {
			return res.status(404).json({ message: "Users not found" });
		}
	} catch (error) {
		console.error("Error while retrieving user:", error.message);
		throw error;
	}
}
// Get all user by Role ID
async function getUserByRoleId(roleId) {
	try {
		const user = await userService.getUserByRoleId(roleId);
		if (user) {
			return user;
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error while retrieving user:", error.message);
		throw error;
	}
}

// Get a user by ID
async function getUserById(userId) {
	try {
		const user = await userService.getUserById(userId);
		if (user) {
			return user;
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error while retrieving user:", error.message);
		throw error;
	}
}
//getAllStudentWithBookmarkByTeacherProfileId
async function getAllStudentWithBookmarkByTeacherProfileId(data) {
	try {
		const user = await userService.getAllStudentWithBookmarkByTeacherProfileId(
			data
		);
		if (user) {
			return user;
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error while retrieving user:", error.message);
		throw error;
	}
}

// Update a user
async function updateUser(userId, data) {
	try {
		const result = await userService.updateUser(userId, data);
		return result;
	} catch (error) {
		console.error("Error while updating user:", error.message);
		throw error;
	}
}

// Delete a user
async function deleteUser(userId) {
	try {
		const result = await userService.deleteUser(userId);
		return result;
	} catch (error) {
		console.error("Error while deleting user:", error.message);
		throw error;
	}
}

// Register a user
async function register(registerData) {
	try {
		const result = await userService.register(registerData);
		return result;
	} catch (error) {
		console.error("Error while register user:", error.message);
		throw error;
	}
}

// Login a user
async function login(user_name, password) {
	try {
		const result = await userService.login(user_name, password);
		return result;
	} catch (error) {
		console.error("Error while login user:", error.message);
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
