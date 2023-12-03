const User = require("../models/User");
const { error, success } = require("../utils/responseWrap");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send(error(400, "All Fields Are Required"));
    }
    //* Other Validation Check...

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send(error(409, "User is Already Registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //* Create new user...

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const successMessage = `User ${name} Created Successfully.`;

    return res.send(
      success(201, {
        message: successMessage,
      })
    );
  } catch (e) {
    return res.send(error(401, e.message));
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "All Fields Are Required"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.send(error(409, "User is Not Registered"));
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.send(error(403, "Incorrect Password"));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id,
      email: user.email,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return res.send(
      success(200, {
        accessToken,
      })
    );
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
//? Make this validation for api refresh access accessToken
//? this api will be check refresh token validity and generate a new access token

const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    return res.send(error(401, "Refresh Token in cookie is Required"));
  }

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );

    const accessToken = generateAccessToken({
      _id: decoded._id,
      email: decoded.email,
    });

    return res.send(
      success(201, {
        accessToken,
      })
    );
  } catch (e) {
    return res.send(error(401, "Invalid Refresh Token"));
  }
};

//* Internal Main Function For JWT...

const generateAccessToken = (data) => {
  try {
    return jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const generateRefreshToken = (data) => {
  try {
    return jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
};
