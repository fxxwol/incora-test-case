const { HttpError, ctrlWrapper, excludePassword } = require('../helpers')
const config = require('../config')[process.env.NODE_ENV || 'development'];
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.postgres.options);
const { usersModel } = require('../models/Users');
const Users = usersModel(sequelize);

const create = async (req, res) => {
    const { email } = req.body
    const user = await Users.findOne({ where: { email } })

    if (user) {
        throw HttpError(409, "Email already in use")
    }
    const newUser = await Users.create({ ...req.body })
    res.status(201).json(newUser)
}

module.exports = {
    create: ctrlWrapper(create)
}