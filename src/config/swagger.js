const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Team Task Tracker API",
      version: "1.0.0",
      description:
        "SDE II Take Home Assignment API",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        LoginRequest: {
          type: "object",
          properties: {
            email: {
              type: "string",
              example:
                "ganesh@gmail.com",
            },

            password: {
              type: "string",
              example: "password123",
            },
          },
        },

        RegisterRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Ganesh",
            },

            email: {
              type: "string",
              example:
                "ganesh@gmail.com",
            },

            password: {
              type: "string",
              example: "password123",
            },

            role: {
              type: "string",
              example: "ADMIN",
            },

            organizationName: {
              type: "string",
              example:
                "My Organization",
            },
          },
        },

        ProjectRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example:
                "Task Tracker Project",
            },

            description: {
              type: "string",
              example:
                "SDE II Assignment",
            },
          },
        },

        TaskRequest: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example:
                "Build Authentication",
            },

            description: {
              type: "string",
              example:
                "Implement JWT authentication",
            },

            priority: {
              type: "string",
              example: "HIGH",
            },

            assigneeId: {
              type: "string",
              example:
                "USER_ID",
            },

            projectId: {
              type: "string",
              example:
                "PROJECT_ID",
            },

            dueDate: {
              type: "string",
              example:
                "2026-06-15T00:00:00.000Z",
            },
          },
        },
      },
    },

    paths: {
      "/auth/register": {
        post: {
          tags: ["Authentication"],
          summary:
            "Register User",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref:
                    "#/components/schemas/RegisterRequest",
                },
              },
            },
          },
          responses: {
            201: {
              description:
                "User created",
            },
          },
        },
      },

      "/auth/login": {
        post: {
          tags: ["Authentication"],
          summary:
            "Login User",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref:
                    "#/components/schemas/LoginRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description:
                "Login successful",
            },
          },
        },
      },

      "/auth/me": {
        get: {
          tags: ["Authentication"],
          summary:
            "Current User",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "OK",
            },
          },
        },
      },

      "/projects": {
        get: {
          tags: ["Projects"],
          summary:
            "Get Projects",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "OK",
            },
          },
        },

        post: {
          tags: ["Projects"],
          summary:
            "Create Project",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref:
                    "#/components/schemas/ProjectRequest",
                },
              },
            },
          },
          responses: {
            201: {
              description:
                "Project created",
            },
          },
        },
      },

      "/tasks": {
        get: {
          tags: ["Tasks"],
          summary:
            "Get Tasks",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "OK",
            },
          },
        },

        post: {
          tags: ["Tasks"],
          summary:
            "Create Task",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref:
                    "#/components/schemas/TaskRequest",
                },
              },
            },
          },
          responses: {
            201: {
              description:
                "Task created",
            },
          },
        },
      },
    },
  },

  apis: [],
};

const swaggerSpec =
  swaggerJsdoc(options);

module.exports =
  swaggerSpec;