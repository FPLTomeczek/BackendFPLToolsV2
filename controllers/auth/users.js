const { BadRequestError, UnauthenticatedError } = require("../../errors");
const User = require("../../models/auth/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res, next) => {
  try {
    const { login, email } = req.body;

    const existingLogin = await User.findOne({ login });
    const existingEmail = await User.findOne({ email });

    let errorFields = [];

    if (existingLogin) {
      errorFields.push("login");
    }
    if (existingEmail) {
      errorFields.push("email");
    }

    if (existingLogin || existingEmail) {
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
    const { login, password } = req.body;

    if (!login || !password) {
      throw new BadRequestError("Please provide login and password");
    }
    const user = await User.findOne({ login });
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
