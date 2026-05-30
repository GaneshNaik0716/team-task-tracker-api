const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),
  assigneeId: z.string(),
  projectId: z.string(),
  dueDate: z.string(),
});

const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),
  dueDate: z.string().optional(),
});

const updateStatusSchema = z.object({
  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "IN_REVIEW",
    "DONE",
    "BLOCKED",
  ]),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  updateStatusSchema,
};