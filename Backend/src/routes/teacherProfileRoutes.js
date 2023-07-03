const express = require("express");
const router = express.Router();
const teacherProfileController = require("../controllers/teacherProfileController");
const authenticateToken = require("../middlewares/authMiddleware");
const requireRole = require("../middlewares/roleMiddleware");

// Create a teacher profile
router.post("/", teacherProfileController.createTeacherProfile);

// Get all teacher profiles
router.get("/", teacherProfileController.getAllTeacherProfiles);

// Get all detail teacher profile
router.get("/details", teacherProfileController.getAllDetailTeacherProfile);

// Get detail all teacher profile by ID
router.get(
	"/details/:id",
	teacherProfileController.getDetailTeacherProfileById
);

// Filter teacher profile by
router.post("/details", teacherProfileController.filterDetailTeacherProfile);

router.post(
	"/bookmark/",
	teacherProfileController.getAllTeacherProfileWithBookmarkByStudentId
);

// Get a teacher profile by ID
router.get("/:id", teacherProfileController.getTeacherProfileById);

// Update a teacher profile
router.put("/:id", teacherProfileController.updateTeacherProfile);

// Delete a teacher profile
router.delete("/:id", teacherProfileController.deleteTeacherProfile);

module.exports = router;
