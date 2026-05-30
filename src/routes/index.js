const express = require("express");

const router = express.Router();

const authRoutes = require(
  "../modules/auth/auth.routes"
);

const userRoutes = require(
  "../modules/users/user.routes"
);

const projectRoutes = require(
  "../modules/projects/project.routes"
);

const taskRoutes = require(
  "../modules/tasks/task.routes"
);

router.use(
  "/auth",
  authRoutes
);

router.use(
  "/users",
  userRoutes
);

router.use(
  "/projects",
  projectRoutes
);

router.use(
  "/tasks",
  taskRoutes
);

module.exports = router;