const { BadRequestError, UnauthenticatedError } = require("../../errors");
const User = require("../../models/auth/User");
const { StatusCodes } = require("http-status-codes");

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

    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user, token });
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
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
