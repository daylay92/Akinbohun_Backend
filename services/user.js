const User = require('../models/user');
const { HttpException } = require('../utils/errors');

exports.addUser = async (data) => {
    const existingUser = await User.findOne({
        name: data.name.toLowerCase()
    });
    if (existingUser) throw new HttpException({
        status: 409,
        message: 'An existing user with the same name already exists'
    })
    const user = new User(data);
    return user.save();
}
