const app = require('./src/app');
const logger = require('./src/config/logger');
const env = require('./src/config/envConfig') 

app.listen(env.port, () => {
  logger.info(`Listening to port : ${env.port} on ${env.env}`);
});