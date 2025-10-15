const express = require("express");
const {  adminOnly , protect } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");

const router = express.Router();

// User management routes
router.get("/", protect, getUsers); //Get all users (Admin only)
router.get("/:id", protect,  getUserById); //Get a specific user

module.exports = router;