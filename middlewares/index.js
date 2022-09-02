const errors = require('../utils/errors');

exports.validateRequest =
  ({ params, query, body }) =>
  (req, _res, next) => {
    if (params) {
      const response = params.validate(req.params);
      if (response.error)
        return next(
          new errors.ValidationException({
            message: response.error.details[0].message
          })
        );
    } else if (query) {
      const response = query.validate(req.query);
      if (response.error) return next(new errors.ValidationException({ message: response.error.details[0].message }));
    } else if (body) {
      const response = body.validate(req.body);
      if (response.error) return next(new errors.ValidationException({ message: response.error.details[0].message }));
    }
    return next();
  };

exports.checkEntityExistsById =
  async ({ reqKey = 'params', fieldName = 'id', Model }) =>
  async (req, _res, next) => {
    const id = req[reqKey][fieldName];
    const response = await Model.findById(id);
    if (!response)
      next(
        new errors.HttpException({
          message: `${Model.name.toLowerCase()} was not found`,
          status: 400
        })
      );
    req.entity = response;
    return next();
  };
