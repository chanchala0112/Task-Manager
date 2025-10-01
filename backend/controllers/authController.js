const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate jwt token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//@desc register a new user
//route POST /api/auth/register
//@access public
const registerUser = async (req, res) => {}

//@desc loginuser
//route POST /api/auth/login
//@access public
const loginUser = async (req, res) => {}
