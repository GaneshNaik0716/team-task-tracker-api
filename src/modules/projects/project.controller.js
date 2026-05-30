const {
  createProjectService,
  getProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
} = require("./project.service");

const createProject = async (
  req,
  res,
  next
) => {
  try {
    const project =
      await createProjectService(
        req.body,
        req.user
      );

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const getProjects = async (
  req,
  res,
  next
) => {
  try {
    const projects =
      await getProjectsService(
        req.user
      );

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (
  req,
  res,
  next
) => {
  try {
    const project =
      await getProjectByIdService(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (
  req,
  res,
  next
) => {
  try {
    const project =
      await updateProjectService(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (
  req,
  res,
  next
) => {
  try {
    await deleteProjectService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};