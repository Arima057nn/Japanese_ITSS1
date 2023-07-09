const db = require("../services/db");

// Create a teacher profile
async function createTeacherProfile(teacherProfileData) {
	const query = `INSERT INTO TeacherProfile 
    (teacher_id, target_id, mail, phone_number, experience, level, tution, address, available_day, bio, available_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	const values = [
		teacherProfileData.teacher_id,
		teacherProfileData.target_id,
		teacherProfileData.mail,
		teacherProfileData.phone_number,
		teacherProfileData.experience,
		teacherProfileData.level,
		teacherProfileData.tution,
		teacherProfileData.address,
		teacherProfileData.available_day,
		teacherProfileData.bio,
		teacherProfileData.available_time,
	];

	try {
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error creating teacher profile:", error);
		throw error;
	}
}

// Get all teacher profiles
async function getAllTeacherProfiles() {
	const query = `SELECT * FROM TeacherProfile`;

	try {
		const teacherProfiles = await db.query(query);
		return teacherProfiles;
	} catch (error) {
		console.error("Error getting teacher profiles:", error);
		throw error;
	}
}

// Get all teacher profiles
async function getAllDetailTeacherProfile() {
	const query = `SELECT
  TeacherProfile.id,
  TeacherProfile.teacher_id,
  TeacherProfile.target_id,
  TeacherProfile.mail,
  TeacherProfile.phone_number,
  TeacherProfile.experience,
  TeacherProfile.level,
  TeacherProfile.tution,
  TeacherProfile.address,
  TeacherProfile.available_day,
	TeacherProfile.bio,
	TeacherProfile.available_time,
  User.user_name,
  User.first_name,
  User.last_name,
  User.sex,
  User.age
FROM
  TeacherProfile
JOIN
  User ON TeacherProfile.teacher_id = User.id
`;

	try {
		const teacherProfiles = await db.query(query);
		return teacherProfiles;
	} catch (error) {
		console.error("Error getting all detail teacher profiles:", error);
		throw error;
	}
}

// Get all teacher profiles
async function getAllTeacherProfileWithBookmarkByStudentId(data) {
	try {
		const query = `SELECT 
		TeacherProfile.id, 
		TeacherProfile.teacher_id, 
		TeacherProfile.target_id, 
		TeacherProfile.mail, 
		TeacherProfile.phone_number,
		TeacherProfile.experience, 
		TeacherProfile.level, 
		TeacherProfile.tution, 
		TeacherProfile.address, 
		TeacherProfile.available_day,
		TeacherProfile.bio,
		User.user_name,
		User.first_name,
		User.last_name,
		Bookmark.studentId, 
		Bookmark.teacher_profile_id, 
		Bookmark.target_id, 
		Bookmark.status
		
	FROM 
		TeacherProfile
	JOIN 
		Bookmark 
		ON 
		TeacherProfile.id = Bookmark.teacher_profile_id
	JOIN
		User
		ON
		TeacherProfile.teacher_id = User.id
	WHERE 
		Bookmark.studentId = ? 
		AND 
		Bookmark.status = ?;
	`;

		const values = [data.studentId, data.status];
		const teacherProfiles = await db.query(query, values);
		return teacherProfiles;
	} catch (error) {
		console.error("Error getting all detail teacher profiles:", error);
		throw error;
	}
}

// Get a teacher profile by ID
async function getDetailTeacherProfileById(teacherProfileId) {
	const query = `SELECT
  TeacherProfile.id,
  TeacherProfile.teacher_id,
  TeacherProfile.target_id,
  TeacherProfile.mail,
  TeacherProfile.phone_number,
  TeacherProfile.experience,
  TeacherProfile.level,
  TeacherProfile.tution,
  TeacherProfile.address,
  TeacherProfile.available_day,
	TeacherProfile.bio,
	TeacherProfile.available_time,
  User.user_name,
  User.first_name,
  User.last_name,
  User.sex,
  User.age
FROM
  TeacherProfile
JOIN
  User ON TeacherProfile.teacher_id = User.id
WHERE
	User.id = ?
`;
	const values = [teacherProfileId];

	try {
		const teacherProfile = await db.query(query, values);
		if (teacherProfile.length === 0) {
			throw new Error("Teacher profile not found");
		}
		return teacherProfile[0];
	} catch (error) {
		console.error("Error getting teacher profile:", error);
		throw error;
	}
}

// Get a teacher profile by ID
async function getTeacherProfileById(teacherProfileId) {
	const query = `SELECT * FROM TeacherProfile WHERE id = ?`;
	const values = [teacherProfileId];

	try {
		const teacherProfile = await db.query(query, values);
		if (teacherProfile.length === 0) {
			throw new Error("Teacher profile not found");
		}
		return teacherProfile[0];
	} catch (error) {
		console.error("Error getting teacher profile:", error);
		throw error;
	}
}

async function filterDetailTeacherProfile(teacherProfileData) {
	try {
		let query = `SELECT
		tp.id,
		tp.teacher_id,
		tp.target_id,
		tp.mail,
		tp.phone_number,
		tp.experience,
		tp.level,
		tp.tution,
		tp.address,
		tp.available_day,
		tp.bio,
		tp.available_time,
		User.user_name,
		User.first_name,
		User.last_name,
		User.sex,
		User.age,
		AVG(f.rating) AS average_rating
	FROM
		TeacherProfile tp
	JOIN
		User ON tp.teacher_id = User.id
	LEFT JOIN 
		Feedback f ON tp.id = f.teacher_profile_id
	WHERE 
	`;
		if (teacherProfileData.available_day !== undefined) {
			query += ` tp.available_day = ${teacherProfileData.available_day} AND `;
		}

		if (teacherProfileData.level !== undefined) {
			query += ` tp.level = ${teacherProfileData.level} AND`;
		}

		if (teacherProfileData.target_id !== undefined) {
			query += ` tp.target_id = ${teacherProfileData.target_id} AND`;
		}

		if (teacherProfileData.tution !== undefined) {
			query += ` tp.tution >= ${teacherProfileData.tution} AND`;
		}
		if (teacherProfileData.sex !== undefined) {
			query += ` User.sex = '${teacherProfileData.sex}' AND `;
		}

		if (teacherProfileData.age !== undefined) {
			query += ` User.age <= ${teacherProfileData.age} AND `;
		}

		if (teacherProfileData.experience !== undefined) {
			query += ` tp.experience LIKE '%${teacherProfileData.experience}%' AND `;
		}

		if (teacherProfileData.address !== undefined) {
			query += ` tp.address LIKE '%${teacherProfileData.address}%' AND `;
		}

		if (teacherProfileData.phone_number !== undefined) {
			query += ` tp.phone_number LIKE '%${teacherProfileData.phone_number}%' AND `;
		}

		if (teacherProfileData.mail !== undefined) {
			query += ` tp.mail LIKE '%${teacherProfileData.mail}%' AND `;
		}

		if (teacherProfileData.bio !== undefined) {
			query += ` tp.bio LIKE '%${teacherProfileData.bio}%' AND `;
		}

		if (teacherProfileData.available_time !== undefined) {
			query += ` tp.available_time LIKE '%${teacherProfileData.available_time}%' AND `;
		}

		query += ` 1 = 1 GROUP BY tp.id`;

		// console.log(query);

		const result = await db.query(query);
		return result;
	} catch (error) {
		console.error("Error updating teacher profile:", error);
		throw error;
	}
}

// Update a teacher profile
async function updateTeacherProfile(teacherProfileId, teacherProfileData) {
	try {
		const query = `UPDATE TeacherProfile SET 
    teacher_id = ?, target_id = ?, mail = ?, phone_number = ?, 
    experience = ?, level = ?, tution = ?, address = ?, available_day = ?, bio = ?, available_time = ?
    WHERE id = ?`;

		const data = await getTeacherProfileById(teacherProfileId);
		const values = [
			teacherProfileData.teacher_id || data.teacher_id,
			teacherProfileData.target_id || data.target_id,
			teacherProfileData.mail || data.mail,
			teacherProfileData.phone_number || data.phone_number,
			teacherProfileData.experience || data.experience,
			teacherProfileData.level || data.level,
			teacherProfileData.tution || data.tution,
			teacherProfileData.address || data.address,
			teacherProfileData.available_day || data.available_day,
			teacherProfileData.bio || data.bio,
			teacherProfileData.available_time || data.available_time,
			teacherProfileId,
		];

		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error updating teacher profile:", error);
		throw error;
	}
}

// Delete a teacher profile
async function deleteTeacherProfile(teacherProfileId) {
	const query = `DELETE FROM TeacherProfile WHERE id = ?`;
	const values = [teacherProfileId];

	try {
		const result = await db.query(query, values);
		return result;
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
