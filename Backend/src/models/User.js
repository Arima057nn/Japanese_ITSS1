const { json } = require("express");
const db = require("../services/db");
const helper = require("../ultilities/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const e = require("express");

// Create a user
async function create(userData) {
	const query = `INSERT INTO User 
      (user_name, password, roleId, first_name, last_name, sex, age) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?)`;

	const values = [
		userData.user_name,
		userData.password,
		userData.roleId == null ? 2 : userData.roleId,
		userData.first_name == null ? "" : userData.first_name,
		userData.last_name == null ? "" : userData.last_name,
		userData.sex == null ? "" : userData.sex,
		userData.age == null ? 0 : userData.age,
	];

	try {
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error while creating user", error.message);
		throw error;
	}
}

// Get all users
async function getAllUsers() {
	const query = "SELECT * FROM User ORDER BY id ASC";
	const values = [];

	try {
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error while getting user", error.message);
		throw error;
	}
}

// Get a user by ID
async function getUserById(userId) {
	const query = "SELECT * FROM User WHERE id = ?";
	const values = [userId];

	try {
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error while get user", error.message);
		throw error;
	}
}

// Get a user by ID
async function getUserByRoleId(roleId) {
	const query = "SELECT * FROM User WHERE roleId = ?";
	const values = [roleId];

	try {
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error while get user", error.message);
		throw error;
	}
}

// Get a user by Username
async function getUserByUsername(username) {
	const query = "SELECT * FROM User WHERE user_name = ?";
	const values = [username];

	try {
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error while get user", error.message);
		throw error;
	}
}

async function getAllStudentWithBookmarkByTeacherProfileId(data) {
	try {
		const query = `SELECT 
		User.id, 
		User.user_name,
    User.first_name,
    User.last_name,
    User.sex,
    User.age,
		Bookmark.teacher_profile_id, 
		Bookmark.target_id, 
		Bookmark.status
	FROM 
		User
	JOIN 
		Bookmark 
		ON 
		User.id = Bookmark.studentId
	WHERE 
		Bookmark.teacher_profile_id = ?
		AND 
		Bookmark.status = ?`;
		const value = [data.teacher_profile_id, data.status];
		const result = db.query(query, value);
		return result;
	} catch (error) {
		throw error;
	}
}

// Update a user
async function updateUser(userId, userData) {
	const data = await getUserById(userId);
	const user = data[0];
	const query = `UPDATE User SET
      user_name = ?,
      password = ?,
      roleId = ?,
      first_name = ?,
      last_name = ?,
      sex = ?,
      age = ?
      WHERE id = ?`;

	const values = [
		userData.user_name == null ? user.user_name : userData.user_name,
		userData.password == null ? user.password : userData.password,
		userData.roleId == null ? user.roleId : userData.roleId,
		userData.first_name == null ? user.first_name : userData.first_name,
		userData.last_name == null ? user.last_name : userData.last_name,
		userData.sex == null ? user.sex : userData.sex,
		userData.age == null ? user.age : userData.age,
		userId,
	];
	try {
		const result = db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error while updating user", error.message);
		throw error;
	}
}

// Delete a user
async function deleteUser(userId) {
	const query = "DELETE FROM User WHERE id = ?";
	const values = [userId];

	try {
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error while deleting user", error.message);
		throw error;
	}
}

// register a user
async function register(registerData) {
	try {
		// Check if the user already exists
		const existingUser = await getUserByUsername(registerData.user_name);
		console.log(existingUser);
		if (existingUser.length > 0) {
			throw { message: "User already exists" };
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(registerData.password, 10);

		const userData = {
			...registerData,
			password: hashedPassword,
		};
		// Create a new user
		const newUser = await create(userData);
		return newUser;
	} catch (error) {
		console.error("Error while registering user:", error.message);
		throw error;
	}
}

async function login(user_name, password) {
	try {
		// Find the user by username
		const data = await getUserByUsername(user_name);
		const user = data[0];
		if (!user) {
			throw { message: "Invalid credentials" };
		}

		// Compare the provided password with the stored hashed password
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw { message: "Invalid credentials" };
		}

		// Generate a JWT with a secret key
		const payload = {
			user_id: user.id,
			user_name: user.user_name,
			roleId: user.roleId,
			first_name: user.first_name,
			last_name: user.last_name,
		};
		const token = jwt.sign(payload, config.jwtSecret, {
			expiresIn: "1h",
		});
		// Return the JWT as a response
		return { ...payload, TokenId: token };
	} catch (error) {
		console.error("Error while logging in:", error.message);
		throw error;
	}
}

module.exports = {
	create,
	getUserById,
	updateUser,
	deleteUser,
	getAllUsers,
	getUserByUsername,
	register,
	login,
	getUserByRoleId,
	getAllStudentWithBookmarkByTeacherProfileId,
};
