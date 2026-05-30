const prisma = require("../../config/prisma");

const createProject = async (data) => {
  return prisma.project.create({
    data,
  });
};

const getProjects = async (organizationId) => {
  return prisma.project.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getProjectById = async (id) => {
  return prisma.project.findUnique({
    where: {
      id,
    },
  });
};

const updateProject = async (
  id,
  data
) => {
  return prisma.project.update({
    where: {
      id,
    },
    data,
  });
};

const deleteProject = async (id) => {
  return prisma.project.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};