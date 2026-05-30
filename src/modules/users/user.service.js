const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
} = require("./user.repository");

const {
  hashPassword,
} = require("../../utils/password");

const createUserService = async (
  payload,
  currentUser
) => {
  const {
    name,
    email,
    password,
    role,
  } = payload;

  const existingUser =
    await findUserByEmail(email);

  if (existingUser) {
    throw new Error(
      "Email already exists"
    );
  }

  const passwordHash =
    await hashPassword(password);

  const user = await createUser({
    name,
    email,
    passwordHash,
    role,
    organizationId:
      currentUser.organizationId,
  });

  const {
    passwordHash: _,
    ...safeUser
  } = user;

  return safeUser;
};

const getUsersService = async (
  currentUser
) => {
  return getUsers(
    currentUser.organizationId
  );
};

const getUserByIdService = async (
  id
) => {
  const user =
    await getUserById(id);

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  const {
    passwordHash,
    ...safeUser
  } = user;

  return safeUser;
};

const updateUserService = async (
  id,
  payload
) => {
  const updatedUser =
    await updateUser(id, payload);

  const {
    passwordHash,
    ...safeUser
  } = updatedUser;

  return safeUser;
};

const deleteUserService = async (
  id
) => {
  return deleteUser(id);
};

module.exports = {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};