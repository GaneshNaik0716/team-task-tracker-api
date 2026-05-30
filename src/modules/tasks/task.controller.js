const {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
  updateTaskStatusService,
} = require("./task.service");

const createTask = async (
  req,
  res,
  next
) => {
  try {
    const task =
      await createTaskService(
        req.body
      );

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (
  req,
  res,
  next
) => {
  try {
    const tasks =
      await getTasksService(
        req.query
      );

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (
  req,
  res,
  next
) => {
  try {
    const task =
      await getTaskByIdService(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (
  req,
  res,
  next
) => {
  try {
    const task =
      await updateTaskService(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (
  req,
  res,
  next
) => {
  try {
    await deleteTaskService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus =
  async (
    req,
    res,
    next
  ) => {
    try {
      const task =
        await updateTaskStatusService(
          req.params.id,
          req.body.status,
          req.user
        );

      return res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateStatus,
};