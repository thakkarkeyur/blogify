const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../models/user/user');

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                
                // Find the user by ID
                const user = await User.findById(decoded?.id).select("-password");

                // Attach the user to the request object
                req.user = user;

                next();
            }
        } catch (error) {
            throw new Error("Authorization failed! Login again!");
        }
    } else {
        throw new Error("There is no token attached to the header!");
    }
});

module.exports = authMiddleware;