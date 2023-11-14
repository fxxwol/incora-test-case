const express = require('express')
const { create, login, getById, update } = require('../controllers/users')
const validateBody = require('../middlewares/validateBody')
const { createSchema } = require('../models/Users')
const authAccess = require('../middlewares/authAccess')
const router = express.Router()

router.post('/', validateBody(createSchema), create)
router.post('/login', login)
router.get('/:id', getById)
router.put('/:id', authAccess, update)

module.exports = router