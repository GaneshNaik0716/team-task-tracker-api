const bcrypt = require("bcrypt");

const {
  findUserByEmail,
  createOrganization,
  createUser,
  createRefreshToken,
  findRefreshToken,
  revokeRefreshToken,
} = require("./auth.repository");

const {
  hashPassword,
  comparePassword,
} = require("../../utils/password");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../utils/jwt");

const register = async (payload) => {
  const {
    name,
    email,
    password,
    role,
    organizationName,
  } = payload;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const organization = await createOrganization(
    organizationName
  );

  const passwordHash = await hashPassword(password);

  const user = await createUser({
    name,
    email,
    passwordHash,
    role,
    organizationId: organization.id,
  });

 const { passwordHash: _, ...safeUser } = user;

return safeUser;
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword =
    await comparePassword(
      password,
      user.passwordHash
    );

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    userId: user.id,
    role: user.role,
    organizationId: user.organizationId,
  };

  const accessToken =
    generateAccessToken(payload);

  const refreshToken =
    generateRefreshToken(payload);

  const tokenHash = await bcrypt.hash(
    refreshToken,
    10
  );

  await createRefreshToken({
    tokenHash,
    userId: user.id,
    expiresAt: new Date(
      Date.now() +
        7 * 24 * 60 * 60 * 1000
    ),
  });

const { passwordHash: _, ...safeUser } = user;

return {
  user: safeUser,
  accessToken,
  refreshToken,
};
};

module.exports = {
  register,
  login,
};