const prisma = require("../../config/prisma");

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const createOrganization = async (name) => {
  return prisma.organization.create({
    data: {
      name,
    },
  });
};

const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

const createRefreshToken = async (data) => {
  return prisma.refreshToken.create({
    data,
  });
};

const findRefreshToken = async (tokenHash) => {
  return prisma.refreshToken.findFirst({
    where: {
      tokenHash,
      revoked: false,
    },
  });
};

const revokeRefreshToken = async (id) => {
  return prisma.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

module.exports = {
  findUserByEmail,
  createOrganization,
  createUser,
  createRefreshToken,
  findRefreshToken,
  revokeRefreshToken,
};