
const constants = require('../constants');

module.exports = class HttpException extends Error {
  constructor(options = {}) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = options.message || constants.INTERNAL_SERVER_ERROR;
    this.status = options.status || 500;
  }
}
