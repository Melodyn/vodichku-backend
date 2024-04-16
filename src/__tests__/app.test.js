import { expect, test, describe } from 'vitest';

import { run } from '../index.js';
import { ConfigValidationError } from '../utils/errors.js';

describe('Positive cases', () => {
  let app;
  console.log({ env: process.env.NODE_ENV });

  test('Run app', async () => {
    app = await run(process.env.NODE_ENV).catch((e) => e);
    expect(app).not.toBeInstanceOf(Error);
  });

  test('App exist', () => {
    expect(app).not.toBeFalsy();
    expect(app).toEqual(expect.objectContaining({
      server: expect.any(Object),
      config: expect.any(Object),
      stop: expect.any(Function),
    }));
  });

  test('Stop app', async () => {
    await expect(app.stop()).resolves.not.toThrow();
  });
});

describe('Negative cases', () => {
  let app;

  test('Run app', async () => {
    await expect(run('no config')).rejects.toThrow();
  });

  test('Invalid config', async () => {
    const err = await run('invalid').catch((e) => e);
    expect(err).toBeInstanceOf(ConfigValidationError);
    expect(err.message.includes('HOST is a required field')).toBe(true);
  });
});
