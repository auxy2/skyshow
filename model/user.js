import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be greater than 8 characters"],
      select: false,
      trim: true
    },
    gender: {
      type: String
    },
    token: String,
    role: {
      type: String,
      default: "user"
    },
    passConfirm: {
      type: String,
      minlength: [8, "Password must be greater than 8 characters"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match"
      },
      trim: true
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      minlength: [11, "Phone Number is too short"],
      maxlength: [11, "Phone Number is too long"],
      trim: true
    },
    addressLine1: String,
    addressLine2: String,
    token: {
      type: Number,
      select: false
    },
    otpOption: String,
    profilePhoto: {
      type: String,
      default: ""
    },
    passwordChangedAt: {
      type: Date
    },
    tokenExpiresIn: {
      type: Date,
      default: new Date()
    },
    verified: {
      type: Boolean,
      default: false
    },
    activity: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

UserSchema.index({ email: 1, username: 1 });
UserSchema.index({ phoneNumber: 1 });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passConfirm = undefined;
  next();
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passConfirm = undefined;
  next();
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew)
    this.passwordChangedAt = Date.now();
  next();
});

UserSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

UserSchema.methods.changePassAfter = function (JWT_TIME_STMP) {
  if (this.passwordChangedAt) {
    const changeTimeStanp = parseInt(this.passwordChangedAt.getTime() / 1000);
    return JWT_TIME_STMP < changeTimeStanp;
  }
  return false;
};

export default mongoose.model("User", UserSchema);
