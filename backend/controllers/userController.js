const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@desc get all users (Admin only)
//@route GET /api/users
//@access Private (Admin)
const getUsers = async (req, res) => {
    try{
        const users = await User.find().select("-password");
        
        // Add task counts to each user
        const usersWithTaskCounts = await Promise.all(users.map(async(user) => {
            const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "Pending" });
            const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: "In Progress" });
            const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "Completed" });

            return {
                ...user._doc, //Include all existing user data         
                pendingTasks,
                inProgressTasks,
                completedTasks
            };
        }));

        res.json(usersWithTaskCounts);
    } catch (error){
        res.status(500).json({ message: "Server error" , error: error.message });
    }
};

//@desc Get user by ID
//@route GET /api/users/:id
//@access private
const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({message: "User not found"});
        res.json(user);
    } catch (error){
        res.status(500).json({ message: "Server error" , error: error.message });
    }
};

//@desc Update user (Admin only)
//@route PUT /api/users/:id
//@access Private (Admin)
const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//@desc Delete user (Admin only)
//@route DELETE /api/users/:id
//@access Private (Admin)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };