const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("./project.repository");

const createProjectService = async (
  payload,
  currentUser
) => {
  const project =
    await createProject({
      name: payload.name,
      description:
        payload.description,
      organizationId:
        currentUser.organizationId,
    });

  return project;
};

const getProjectsService = async (
  currentUser
) => {
  return getProjects(
    currentUser.organizationId
  );
};

const getProjectByIdService =
  async (id) => {
    const project =
      await getProjectById(id);

    if (!project) {
      throw new Error(
        "Project not found"
      );
    }

    return project;
  };

const updateProjectService =
  async (id, payload) => {
    return updateProject(
      id,
      payload
    );
  };

const deleteProjectService =
  async (id) => {
    return deleteProject(id);
  };

module.exports = {
  createProjectService,
  getProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
};