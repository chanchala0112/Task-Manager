const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); //Get all tasks (Asmin: all, User: assignrd)
router.get("/:id", protect, getTasksById); //Get tasks by ID
router.post("/:id", protect, adminOnly, createTask); //Create task (Admin only)
router.put("/:id", protect, updateTask) //Update task status
router.delete("/:id", protect, adminOnly, deleteTask); // Delete a task (Admin only)
router.put("/:id/status", protect, updateTaskStatus); // Update task status
router.put("/:id/todo", protect, updateTaskChecklist); //Update task checklist

module.exports = router;