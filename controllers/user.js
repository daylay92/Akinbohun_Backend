const { addUser } = require('../services/user');
const { successResponse } = require('../utils/helpers');

exports.addUser = async (req, res, _next) => {
  const { id, name, createdAt } = await addUser(req.body);
  return successResponse({
    req,
    res,
    code: 201,
    data: {
        id,
        name,
        createdAt,
    },
    message: 'Successfully created user'
  });
};
