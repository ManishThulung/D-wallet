const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide your name"],
  },
  email: {
    type: String,
    required: [true, "Provide your email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Provide your password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Provide your passwordConfirm"],
    // this validate runs only in the time of creation not in password update
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password doesn't match!",
    },
  },
  private_key: String,
  address: String,
  mnemonic: String,
});

userSchema.pre("save", async function (next) {
  // only run this if password is modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // only returns users who are active
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  enteredPassword,
  actualPassword
) {
  return await bcrypt.compare(enteredPassword, actualPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // if not changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
