const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

// User management routes
router.get("/", protect, adminOnly, getUsers); //Get all users (Admin only)
router.get("/:id", protect, adminOnly, getUserById); //Get a specific user (Admin only)
router.put("/:id", protect, adminOnly, updateUser); //Update user (Admin only)
router.delete("/:id", protect, adminOnly, deleteUser); //Delete user (Admin only)

module.exports = router;