const express = require('express')
const router = express.Router();

// Middlewares
const { Register_UnregisterValidation, SendValidation } = require('./middleware/Validations')
const AppValidation = require('./middleware/AppValidation')

// Handlers
const register = require('./repositories/register')
const unregister = require('./repositories/unregister')
const sender = require('./repositories/sender')

router.get('/', (request, response, next) => {
    response.status(200).json({ response: `The app is working propertly.` })
})

router.post('/:app/register', [Register_UnregisterValidation, AppValidation], register)

router.post('/:app/unregister', [Register_UnregisterValidation, AppValidation], unregister)

router.post('/:app/send', [SendValidation,AppValidation], sender)


module.exports = router;
