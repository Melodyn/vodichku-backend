import { configValidator } from './utils/configValidator.js';

const run = async (envName) => {
  process.on('unhandledRejection', (err) => {
    if (!envName.toLowerCase().includes('test')) {
      console.error(err);
    }
    process.exit(1);
  });

  const config = await configValidator(envName);

  const server = { log: { info: console.log } };

  const stop = async () => {
    server.log.info('Stop app', config);

    server.log.info('  Stop database');
    // await db.close();
    server.log.info('  Stop server');
    // await server.close();
    server.log.info('App stopped');

    if (!config.IS_TEST_ENV) {
      process.exit(0);
    }
  };

  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);

  const app = { server, config, stop };

  return app;
};

export { run };
