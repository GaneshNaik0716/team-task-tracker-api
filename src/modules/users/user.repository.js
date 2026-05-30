const prisma = require("../../config/prisma");

const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

const getUsers = async (organizationId) => {
  return prisma.user.findMany({
    where: {
      organizationId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      organizationId: true,
      createdAt: true,
    },
  });
};

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const updateUser = async (id, data) => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

const deleteUser = async (id) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
};