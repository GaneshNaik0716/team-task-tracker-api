const express = require("express");

const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./user.controller");

const {
  authenticate,
} = require("../../middleware/auth.middleware");

const {
  authorize,
} = require("../../middleware/rbac.middleware");

router.use(
  authenticate,
  authorize("ADMIN")
);

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;