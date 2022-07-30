const express = require('express')
const router = express.Router()
const registerControllers = require('../controllers/register.controllers') 

router.post('/', registerControllers.post)


module.exports = router