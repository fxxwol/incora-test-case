const { HttpError, ctrlWrapper, sequelize } = require('../helpers')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const config = require('../config')[process.env.NODE_ENV || 'development'];
// const Sequelize = require('sequelize');
require("dotenv").config();


// const sequelize = new Sequelize(config.postgres.options);
const { usersModel } = require('../models/Users');
const Users = usersModel(sequelize);
const { SECRET_KEY } = process.env

const create = async (req, res) => {
    const { email } = req.body
    const user = await Users.findOne({ where: { email } })

    if (user) {
        throw HttpError(409, "Email already in use")
    }
    const newUser = await Users.create({ ...req.body })
    res.status(201).json(newUser)
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } })
    if (!user) {
        throw HttpError(401, "Email or password invalid")
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user.id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '30s' })
    res.cookie("token", token, { httpOnly: true })
    res.json({token})
}

const getById = async (req, res) => {
    console.log('hi')
    const { id } = req.params;
    const user = await Users.findByPk(id)
    if (!user) {
        throw HttpError(404)
    }
    res.json(user)
}

const update = async (req, res) => {

}

module.exports = {
    create: ctrlWrapper(create),
    login: ctrlWrapper(login),
    getById: ctrlWrapper(getById),
    update: ctrlWrapper(update),
}