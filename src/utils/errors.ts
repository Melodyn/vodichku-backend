import { constants } from 'http2';
import { ValidationError } from 'yup';

export class AppError extends Error { }

export class ConfigValidationError extends AppError {
  constructor(validationError: ValidationError) {
    super(validationError.errors.join('\n'));
    this.name = 'Config validation error';
  }
}