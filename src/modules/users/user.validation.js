const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(2),

  email: z.string().email(),

  password: z.string().min(6),

  role: z.enum([
    "ADMIN",
    "MANAGER",
    "MEMBER",
  ]),
});

module.exports = {
  createUserSchema,
};