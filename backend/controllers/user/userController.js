const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User = require("../../models/user/user");
const validateMongodbId = require("../../utils/validateMongodbID");


// ----------------------------------------------------------------
// Register
// ----------------------------------------------------------------

const userRegisterController = expressAsyncHandler (async (req, res) => {
    // Check if user already exists
    const userExists = await User.findOne({ email: req?.body?.email });

    if (userExists) throw new Error("User already exists!");
    
    try {
        // Register User
        const user = await User.create({
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            password: req?.body?.password,
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});


// ----------------------------------------------------------------
// Login
// ----------------------------------------------------------------

const loginUserController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    // Check if user exists
    const userFound = await User.findOne({ email });
    
    // Check if entered password is correct
    if (userFound && (await userFound.isPasswordMatched(password))) {
        res.json({
            _id: userFound?._id,
            firstName: userFound?.firstName,
            lastName: userFound?.lastName,
            email: userFound?.email,
            profilePicture: userFound?.profilePicture,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Password!")
    }

    // if (!userFound) {
    //     throw new Error("User not registered!");
    // }
    // res.json("user login");
});


// ----------------------------------------------------------------
// Users
// ----------------------------------------------------------------

const fetchUsersController = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
});


// ----------------------------------------------------------------
// Delete User
// ----------------------------------------------------------------

const deleteUserController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if User ID is valid
    validateMongodbId(id);

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);
    } catch (error) {
        res.json(error);
    }
});


// ----------------------------------------------------------------
// Fetch User Details
// ----------------------------------------------------------------

const fetchUserDetailsController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if User ID is valid
    validateMongodbId(id);

    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});


// ----------------------------------------------------------------
// User Profile
// ----------------------------------------------------------------

const userProfileController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const myProfile = await User.findById(id);
        res.json(myProfile);        
    } catch (error) {
        res.json(error);
    }
});


// ----------------------------------------------------------------
// Update Profile
// ----------------------------------------------------------------

const updateProfileController = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.user;
    validateMongodbId(_id);

    const user = await User.findByIdAndUpdate(
        _id, 
        {
            firstName: req?.body?.firstName, 
            lastName: req?.body?.lastName,
            email: req?.body?.email,    
            profilePicture: req?.body?.profilePicture,
            bio: req?.body?.bio,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    res.json(user);
});


// ----------------------------------------------------------------
// Update Password
// ----------------------------------------------------------------

const updatePasswordController = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbId(_id);
    
    // Find the user by ID
    const user = await User.findById(_id);
    
    if (password) {
        user.password = password;
        const updatedUser = await user.save();
        res.json(updatedUser);
    }
    res.json(user);
});

module.exports = { 
    userRegisterController, 
    loginUserController, 
    fetchUsersController, 
    deleteUserController,
    fetchUserDetailsController,
    userProfileController,
    updateProfileController,
    updatePasswordController,
};