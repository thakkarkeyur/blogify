const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Creating new Schema
const userSchema = new mongoose.Schema (
    {
        firstName: {
            type: String,
            required: [true, "First name is required!"], 
        },
        lastName: {
            type: String,
            required: [true, "Last name is required!"],
        },
        profilePicture: {
            type: String,
            default: "../images/maleAvtar.png",
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
        },
        bio: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
        },
        postCount: {
            type: Number,
            default: 0,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["admin", "guest", "blogger"],
        }, 
    },
    {
        toJSON: {
            virtual: true,
        },
        toObject: {
            virtual: true,
        },
        timestamps: true,
    }
);

// Hash Password
userSchema.pre('save', async function(next) {
    // Check if the password field is not modified 
    if (!this.isModified('password')) {
        next();    
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Decrypt and match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Compile Schema into Models
const User = mongoose.model('User', userSchema);

module.exports = User;