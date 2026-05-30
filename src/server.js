require('dotenv').config();

const app = require('./app');

const redisClient = require('./config/redis');

const { PORT } = require('./config/env');

async function startServer() {
  try {
    await redisClient.connect();

    console.log('Redis connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

startServer();