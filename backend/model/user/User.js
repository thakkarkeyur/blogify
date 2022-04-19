const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
//create schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      required: [true, "First name is required"],
      type: String,
    },
    lastName: {
      required: [true, "Last name is required"],
      type: String,
    },
    profilePhoto: {
      type: String,
      default:
        'https://res.cloudinary.com/dapgeo6cm/image/upload/v1650094086/maleAvatar_k3zdgg.png',
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Hei buddy Password is required"],
    },
    postCount: {
      type: Number,
      default: 0,
    },
    // isBlocked: {
    //   type: Boolean,
    //   default: false,
    // },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Blogger"],
    },

    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//virtual method to populate created post
userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

//Account Type
// userSchema.virtual("accountType").get(function () {
//   const totalFollowers = this.followers?.length;
//   return totalFollowers >= 1 ? "Pro Account" : "Starter Account";
// });

//Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// //Verify account
// userSchema.methods.createAccountVerificationToken = async function () {
//   //create a token
//   const verificationToken = crypto.randomBytes(32).toString("hex");
//   this.accountVerificationToken = crypto
//     .createHash("sha256")
//     .update(verificationToken)
//     .digest("hex");
//   this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000; //10 minutes
//   return verificationToken;
// };

// //Password reset/forget

// userSchema.methods.createPasswordResetToken = async function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
//   return resetToken;
// };

//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;
