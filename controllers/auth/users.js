const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../../errors");
const User = require("../../models/auth/User");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail");
const { configURL } = require("../../utils/config");

const register = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    let errorFields = [];

    if (existingUsername) {
      errorFields.push("username");
    }
    if (existingEmail) {
      errorFields.push("email");
    }

    if (existingUsername || existingEmail) {
      const error = new BadRequestError("Duplicate values.");
      error.fields = errorFields;
      throw error;
    }

    const user = await User.create({
      ...req.body,
      emailToken: crypto.randomBytes(64).toString("hex"),
    });

    const verificationLink = `${configURL.frontURL}/verify/${user._id}/${user.emailToken}`;
    await sendEmail(email, "Verify email", verificationLink);

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("Please provide username and password");
    }
    const user = await User.findOne({ username });
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    if (!user.verified) {
      throw new UnauthenticatedError(
        "You have not verified your account, check your email"
      );
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  const { userID, emailToken } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userID, emailToken },
      { verified: true },
      { new: true }
    );
    if (!user) {
      throw new NotFoundError("Not valid verification link");
    }
    const token = user.createJWT();
    res
      .status(StatusCodes.OK)
      .json({ user, token, msg: "Congratulations! Your account is verified." });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, verifyEmail };
