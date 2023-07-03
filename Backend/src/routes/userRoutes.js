const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");

// Create a user
router.post("/", async (req, res, next) => {
	try {
		const result = await userController.createUser(req.body);
		return res.status(200).json(result);
	} catch (error) {
		console.error("Error while creating user", error.message);
		return res.status(500).json({ message: error.message });
	}
});

// Get all users by roleID
router.get("/role/:id", async (req, res, next) => {
	try {
		const roleId = req.params.id;
		const user = await userController.getUserByRoleId(roleId);
		if (user) {
			return res.status(200).json(user);
		} else {
			return res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error while retrieving user", error.message);
		return res.status(500).json({ message: error.message });
	}
});

// Get a user by ID
router.get("/:id", async (req, res, next) => {
	try {
		const userId = req.params.id;
		const user = await userController.getUserById(userId);
		if (user) {
			return res.status(200).json(user);
		} else {
			return res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error while retrieving user", error.message);
		return res.status(500).json({ message: error.message });
	}
});

// Get all users
router.get("/", async (req, res, next) => {
	try {
		const users = await userController.getAllUsers();
		if (users) {
			return res.status(200).json(users);
		} else {
			return res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error while retrieving user", error.message);
		return res.status(500).json({ message: error.message });
	}
});
//getAllStudentWithBookmarkByTeacherProfileId

router.post("/bookmark", async (req, res, next) => {
	try {
		const users =
			await userController.getAllStudentWithBookmarkByTeacherProfileId(
				req.body
			);
		if (users) {
			return res.status(200).json(users);
		} else {
			return res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error while retrieving user", error.message);
		return res.status(500).json({ message: error.message });
	}
});

// Update a user
router.put("/:id", async (req, res, next) => {
	try {
		const userId = req.params.id;
		const result = await userController.updateUser(userId, req.body);
		return res.status(200).json(result);
	} catch (error) {
		console.error("Error while updating user", error.message);
		return res.status(500).json({ message: error.message });
	}
});

// Delete a user
router.delete("/:id", async (req, res, next) => {
	try {
		const userId = req.params.id;
		const result = await userController.deleteUser(userId);
		return res.status(200).json(result);
	} catch (error) {
		console.error("Error while deleting user", error.message);
		return res.status(500).json({ message: error.message });
	}
});

router.post("/register", async (req, res, next) => {
	try {
		const result = await userController.register(req.body);
		return res.status(200).json(result);
	} catch (error) {
		console.error("Error while register user", error.message);
		return res.status(500).json({ message: error.message });
	}
});

router.post("/login", async (req, res, next) => {
	const { user_name, password } = req.body;
	try {
		const result = await userController.login(user_name, password);
		return res.status(200).json(result);
	} catch (error) {
		console.error("Error while login user", error.message);
		return res.status(500).json({ message: error.message });
	}
});

module.exports = router;
