import { run } from '../index';

run(process.env.NODE_ENV || '')
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
