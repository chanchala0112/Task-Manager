const User = require("../modules/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate jwt token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//@desc register a new user
//route POST /api/auth/register
//@access public
const registerUser = async (req, res) => {
    try{
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

    //check if user already exists
    const userExists = await User.findOne({ email });
    if(userExists){
        return res.status(400).json({ message: "User already exists" });
    }
    //Determine user role: Admin if correct token is provided, othermember
    let role = "memeber";
    if(
        adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN
    ){
        role = "admin";
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImageUrl,
        role,
    });

    //Return user data with JWT
    res.status(201).json({
        _id: user._id,
        username: user.name,  
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
        token: generateToken(user._id),
    });

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });

    }
};

//@desc loginuser
//route POST /api/auth/login
//@access public
const loginUser = async (req, res) => {
    try{
        const { email, password} = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid credentials"});     
        }
        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res,statue(401).json({ message: "Invalide email or password"});
        }
        //Return user data with JWT
        res.json({
            _id: user._id,
            name: user.name,  
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            role: user.role,
            token: generateToken(user._id),
        });

    }catch(error){
        res.status(500),json({message: "Server error", error:error.message});
    }


};

//@desc get user profile
//route POST /api/auth/profile
//@access private {Requires JWT}
const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");
            if(!user){
                return res.status(404).json({ message: "User not found"});
            }
            res.json(user);

    }catch(error){
        res.status(500),json({message: "Server error", error:error.message});
    }
};

//@desc update user profile
//route POST /api/auth/profile
//@access private {Requires JWT}
const updateUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);

        if(!user) {
            return res.status(404).json({ message: "User not found"});
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user,email;

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,  
            email: updateUser.email,
            role: updateUser.role,
            token: generateToken(updateUser._id),
        });
    }catch(error){
        res.status(500),json({message: "Server error", error:error.message});
    }
};

module.exports = {
    registerUser, loginUser, getUserProfile, updateUserProfile
};

