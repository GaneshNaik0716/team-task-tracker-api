const jwt = require("jsonwebtoken");

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../config/env");

const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    JWT_ACCESS_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    JWT_REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(
    token,
    JWT_ACCESS_SECRET
  );
};

const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    JWT_REFRESH_SECRET
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};