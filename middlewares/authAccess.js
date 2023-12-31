const jwt = require("jsonwebtoken");
const { sequelize } = require('../helpers')
const { HttpError } = require("../helpers");
require('dotenv').config()
const { SECRET_KEY } = process.env;

const { usersModel } = require('../models/Users');
const Users = usersModel(sequelize);

const authAccess = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    let token = null;
    if (authorization && authorization.startsWith('Bearer ')) {
        token = authorization.split(' ')[1];
    } else {
        token = req.cookies && req.cookies.token
    }

    if (!token) {
        next(HttpError(401));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await Users.findByPk(id);
        if (!user) {
            next(HttpError(401));
        }
        req.user = user;
        next();
    }
    catch {
        next(HttpError(401));
    }
}

module.exports = authAccess;