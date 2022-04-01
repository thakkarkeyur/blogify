const express = require('express');

const { 
    userRegisterController, 
    loginUserController, 
    fetchUsersController,
    deleteUserController,
    fetchUserDetailsController,
    userProfileController,
    updateProfileController,
    updatePasswordController,
} = require('../../controllers/user/userController');

const authMiddleware = require('../../middlewares/auth/authMiddleware');
const userRoutes = express.Router();


userRoutes.post('/register', userRegisterController);
userRoutes.post('/login', loginUserController);
userRoutes.get('/', authMiddleware, fetchUsersController);
userRoutes.get('/profile/:id', authMiddleware, userProfileController);
userRoutes.put('/:id', authMiddleware, updateProfileController);
userRoutes.put('/password', authMiddleware, updatePasswordController);
userRoutes.delete('/:id', deleteUserController);
userRoutes.get('/:id', fetchUserDetailsController);

module.exports = userRoutes;