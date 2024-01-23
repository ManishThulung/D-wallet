const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const Token = require("../Model/tokenModel");
const Account = require("../Model/accountModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + process.env.JWT_EXPIRE_TIME),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-porto"] === "https",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    address: req.body.address,
    private_key: req.body.private_key,
    mnemonic: req.body.mnemonic,
  });

  createSendToken(user, 201, req, res);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "fail",
      message: "Please provide valid credentials!",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      status: "fail",
      message: "User not found!",
    });
  }

  const isPasswordCorrect = await correctPassword(password, user.password);

  if (!isPasswordCorrect) {
    res.status(401).json({
      status: "fail",
      message: "Please provide valid credentials!",
    });
  }

  createSendToken(user, 200, req, res);
};

exports.allToken = async (req, res) => {
  try {
    const tokens = await Token.find();

    res.status(200).json({
      status: "success",
      data: {
        tokens,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.createToken = async (req, res) => {
  try {
    const token = await Token.create({
      name: req.body.name,
      address: req.body.address,
      symbol: req.body.symbol,
    });

    res.status(201).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.allAccount = async (req, res) => {
  try {
    const accounts = await Account.find();

    res.status(200).json({
      status: "success",
      data: {
        accounts,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.createAccount = async (req, res) => {
  try {
    const account = await Account.create({
      privateKey: req.body.privateKey,
      address: req.body.address,
    });

    res.status(201).json({
      status: "success",
      data: {
        account,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
