const prisma = require("../../config/prisma");

const createTask = async (data) => {
  return prisma.task.create({
    data,
  });
};

const getTaskById = async (id) => {
  return prisma.task.findUnique({
    where: {
      id,
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      project: true,
    },
  });
};

const getTasks = async ({
  page = 1,
  limit = 10,
  status,
  priority,
  assigneeId,
}) => {
  const where = {};

  if (status) {
    where.status = status;
  }

  if (priority) {
    where.priority = priority;
  }

  if (assigneeId) {
    where.assigneeId = assigneeId;
  }

  const skip =
    (page - 1) * limit;

  const [tasks, total] =
    await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: {
          createdAt: "desc",
        },
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),

      prisma.task.count({
        where,
      }),
    ]);

  return {
    tasks,
    total,
    page: Number(page),
    limit: Number(limit),
  };
};

const updateTask = async (
  id,
  data
) => {
  return prisma.task.update({
    where: {
      id,
    },
    data,
  });
};

const deleteTask = async (id) => {
  return prisma.task.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createTask,
  getTaskById,
  getTasks,
  updateTask,
  deleteTask,
};