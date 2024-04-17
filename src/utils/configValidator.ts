import * as yup from 'yup';
import path from 'path';
import _ from 'lodash';
import dotenv from 'dotenv';
import { ConfigValidationError } from './errors';

const envsMap = {
  prod: 'production',
  dev: 'development',
  test: 'test',
  invalid: 'invalid',
};

const readFromFile = (configPath: string) => dotenv.config({
  path: path.resolve(__dirname, '..', configPath),
}).parsed;
const envConfigMap = {
  [envsMap.prod]: readFromFile('.env'),
  [envsMap.dev]: readFromFile('development.env'),
  [envsMap.test]: readFromFile('test.config'),
  [envsMap.invalid]: readFromFile('invalid.config'),
};

const checkEnv = (expected: string) => ([current]: string[], schema: yup.Schema) => schema.default(current === expected);

const configSchema = yup.object({
  NODE_ENV: yup.string().oneOf(_.values(envsMap)).required(),
  IS_TEST_ENV: yup.boolean().when('NODE_ENV', checkEnv(envsMap.test)).required(),
  IS_DEV_ENV: yup.boolean().when('NODE_ENV', checkEnv(envsMap.dev)).required(),
  IS_PROD_ENV: yup.boolean().when('NODE_ENV', checkEnv(envsMap.prod)).required(),
  PORT: yup.number().required(),
  HOST: yup.string().required(),
  LOG_LEVEL: yup.string().required(),
}).required();

export const configValidator = (envName: string) => {
  const envExists = _.has(envConfigMap, envName);
  if (!envExists) throw new Error(`Unexpected env "${envName}"`);
  const envConfig = envConfigMap[envName];

  return configSchema
    .validate(envConfig, { abortEarly: false })
    .catch((err) => {
      throw new ConfigValidationError(err);
    });
};
