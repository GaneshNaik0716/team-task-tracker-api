const {
  createTask,
  getTaskById,
  getTasks,
  updateTask,
  deleteTask,
} = require("./task.repository");

const {
  canTransition,
} = require("./task.status");

const {
  getCache,
  setCache,
  deleteCache,
} = require("../../utils/cache");

const createTaskService = async (
  payload
) => {
  const task = await createTask({
    title: payload.title,
    description:
      payload.description,
    priority: payload.priority,
    dueDate: new Date(
      payload.dueDate
    ),
    assigneeId:
      payload.assigneeId,
    projectId:
      payload.projectId,
  });

  await deleteCache(
    `tasks:${payload.assigneeId}`
  );

  return task;
};

const getTasksService = async (
  query
) => {
  const cacheKey = `tasks:${
    query.assigneeId || "all"
  }`;

  const cachedData =
    await getCache(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const tasks =
    await getTasks(query);

  await setCache(
    cacheKey,
    tasks,
    300
  );

  return tasks;
};

const getTaskByIdService =
  async (id) => {
    const task =
      await getTaskById(id);

    if (!task) {
      throw new Error(
        "Task not found"
      );
    }

    return task;
  };

const updateTaskService =
  async (id, payload) => {
    const task =
      await getTaskById(id);

    const updatedTask =
      await updateTask(
        id,
        payload
      );

    await deleteCache(
      `tasks:${task.assigneeId}`
    );

    return updatedTask;
  };

const deleteTaskService =
  async (id) => {
    const task =
      await getTaskById(id);

    await deleteTask(id);

    await deleteCache(
      `tasks:${task.assigneeId}`
    );

    return true;
  };

const updateTaskStatusService =
  async (
    taskId,
    newStatus,
    currentUser
  ) => {
    const task =
      await getTaskById(taskId);

    if (!task) {
      throw new Error(
        "Task not found"
      );
    }

    const isManager =
      currentUser.role ===
      "MANAGER";

    const isAssignee =
      task.assigneeId ===
      currentUser.userId;

    if (
      !isManager &&
      !isAssignee
    ) {
      throw new Error(
        "Only assignee or manager can update status"
      );
    }

    const valid =
      canTransition(
        task.status,
        newStatus
      );

    if (!valid) {
      throw new Error(
        `Invalid transition from ${task.status} to ${newStatus}`
      );
    }

    const updateData = {
      status: newStatus,
    };

    if (
      newStatus === "DONE"
    ) {
      updateData.completedAt =
        new Date();
    }

    const updatedTask =
      await updateTask(
        taskId,
        updateData
      );

    await deleteCache(
      `tasks:${task.assigneeId}`
    );

    return updatedTask;
  };

module.exports = {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
  updateTaskStatusService,
};