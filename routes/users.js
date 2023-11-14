const express = require('express')
const { create, login, getById, update } = require('../controllers/users')
const validateBody = require('../middlewares/validateBody')
const { schemas: {createSchema, loginSchema, updateSchema}} = require('../models/Users')
const authAccess = require('../middlewares/authAccess')
const router = express.Router()

router.post('/users', validateBody(createSchema), create)
router.post('/login', validateBody(loginSchema), login)
router.get('/users/:id', getById)
router.put('/users/:id', authAccess, validateBody(updateSchema), update)

module.exports = router