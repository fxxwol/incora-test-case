const express = require('express')
const { create } = require('../controllers/users')
const validateBody = require('../middlewares/validateBody')
const { createSchema } = require('../models/Users')
const router = express.Router()

router.post('/', validateBody(createSchema), create)
// router.post('/login',)
// router.get('/:id',)
// router.put('/:id',)

module.exports = router