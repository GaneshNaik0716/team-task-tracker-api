const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const swaggerUi = require(
  "swagger-ui-express"
);

const swaggerSpec = require(
  "./config/swagger"
);

const routes = require("./routes");

const {
  errorHandler,
} = require("./middleware/error.middleware");

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;