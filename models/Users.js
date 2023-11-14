const { DataTypes } = require('sequelize');
const { patterns: { phonePattern, alphaPattern, passwordPattern} } = require('../helpers');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const commonMessages = {
    alphaPatternMsg: 'Must only contain letters',
    phonePatternMsg: 'Invalid phone number format',
    passwordPatternMsg: 'Should have at least one letter, one number, and be 8 characters long.',
};

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
        },
        last_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        "string.pattern.base": commonMessages.alphaPatternMsg
    }),
    last_name: Joi.string().pattern(alphaPattern).messages({
        "string.pattern.base": commonMessages.alphaPatternMsg
    }),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(phonePattern).messages({
        "string.pattern.base": commonMessages.phonePatternMsg
    }),
    password: Joi.string().pattern(passwordPattern).messages({
        "string.pattern.base": commonMessages.passwordPatternMsg
    }).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordPattern).messages({
        "string.pattern.base": commonMessages.passwordPatternMsg
    }).required()
})

const updateSchema = Joi.object({
    first_name: Joi.string().pattern(alphaPattern).messages({
        "string.pattern.base": commonMessages.alphaPatternMsg
    }),
    last_name: Joi.string().pattern(alphaPattern).messages({
        "string.pattern.base": commonMessages.alphaPatternMsg
    }),
    email: Joi.string().email(),
    phone: Joi.string().pattern(phonePattern).messages({
        "string.pattern.base": commonMessages.phonePatternMsg
    }),
    password: Joi.string().pattern(passwordPattern).messages({
        "string.pattern.base": commonMessages.passwordPatternMsg
    })
})

const schemas = {createSchema, loginSchema, updateSchema}
module.exports = { usersModel, schemas }