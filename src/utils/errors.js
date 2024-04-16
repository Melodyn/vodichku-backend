import { constants } from 'http2';

export class AppError extends Error { }

export class ConfigValidationError extends AppError {
  constructor(validationError) {
    super(validationError.errors.join('\n'));
    this.name = 'Config validation error';
  }
}