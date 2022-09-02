
const constants = require('../constants');

module.exports = class ValidationException extends Error {
  constructor(options = {}) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = options.message || constants.BAD_REQUEST;
    this.status = options.status || 400;
  }
}