const constants = require('./constants');
const { ValidationException, HttpException } = require('./errors');

exports.toUpperCaseAll = (word) =>
  word
    .trim()
    .split(' ')
    .map((eachWord) => eachWord[0].toUpperCase() + eachWord.slice(1))
    .join(' ');


exports.asyncExceptionHandler = (cb) => async (req, res, next) => {
    try {
        return await cb(req, res, next);
    } catch(error) {
        return next(error);
    }
}

exports.successResponse = ({ req, res, code = 200, data, message }) => {
    console.log(`HTTPRequest - ${code} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    return res.status(code).json({
        status: 'success',
        ...(message && {message: message || constants.SUCCESS_RESPONSE_MESSAGE}),
        data: data || {}
    });
}

exports.exceptionFilter = (error, req, res, _next) => {
    console.log(`${error.name} - ${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    let code = 500;
    let message = constants.INTERNAL_SERVER_ERROR;
   if (error instanceof ValidationException) {
       code = 400;
       message = error.message;
   }
   if (error instanceof HttpException) {
       code = error.status;
       message = error.message || message;
   }
   return res.status(code).json({
    status: 'fail',
    message,
   })
}