const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateStatus,
} = require("./task.controller");

const {
  authenticate,
} = require("../../middleware/auth.middleware");

router.use(authenticate);

router.post("/", createTask);

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch(
  "/:id/status",
  updateStatus
);

module.exports = router;