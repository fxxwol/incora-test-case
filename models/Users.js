const { DataTypes } = require('sequelize');
const { patterns: { phonePattern, alphaPattern, passwordPattern} } = require('../helpers');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const usersModel = (sequelize) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'First name must only contain letters.',
                },
            },
        },
        last_name: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Last name must only contain letters.',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email address.',
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const hashedPassword = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hashedPassword);
            },
        },
    }, {
        timestamps: false
    });

    return Users
}

const createSchema = Joi.object({
    first_name: Joi.string().pattern(alphaPattern).required().messages({
        "string.pattern.base": "First name must only contain letters"
    }),
    last_name: Joi.string().pattern(alphaPattern).messages({
        "string.pattern.base": "Last name must only contain letters"
    }),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(phonePattern).messages({
        "string.pattern.base": "Invalid phone number format"
    }),
    password: Joi.string().pattern(passwordPattern).messages({
        "string.pattern.base": "Password should have at least one letter, one number and be 8 characters long."
    }).required()
})

module.exports = { usersModel, createSchema }