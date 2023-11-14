const express = require('express')
const { create, login, getById, update } = require('../controllers/users')
const validateBody = require('../middlewares/validateBody')
const { schemas: {createSchema, loginSchema, updateSchema}} = require('../models/Users')
const authAccess = require('../middlewares/authAccess')
const router = express.Router()

router.post('/', validateBody(createSchema), create)
router.post('/login', validateBody(loginSchema), login)
router.get('/:id', getById)
router.put('/:id', authAccess, validateBody(updateSchema), update)

module.exports = router