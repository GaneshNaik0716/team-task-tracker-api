const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("./project.controller");

const {
  authenticate,
} = require("../../middleware/auth.middleware");

const {
  authorize,
} = require("../../middleware/rbac.middleware");

router.use(
  authenticate,
  authorize(
    "ADMIN",
    "MANAGER"
  )
);

router.post("/", createProject);

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.patch("/:id", updateProject);

router.delete("/:id", deleteProject);

module.exports = router;