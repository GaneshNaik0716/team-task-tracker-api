const {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} = require("./user.service");

const createUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await createUserService(
        req.body,
        req.user
      );

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (
  req,
  res,
  next
) => {
  try {
    const users =
      await getUsersService(
        req.user
      );

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await getUserByIdService(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await updateUserService(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (
  req,
  res,
  next
) => {
  try {
    await deleteUserService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};