const express = require('express')
const RegisterController = require('./controllers/RegisterController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const registerController = new RegisterController(sqlClient)
const pageController = new PageController()

// Routes
router.get('/', registerController.renderHomeWithRegister)

router.get('/register/create', registerController.renderRegisterCreationForm)
router.post('/register/create', registerController.insertAndRenderRegister)

router.get('/register/:id', registerController.renderSingleRegister)

router.get('/register/:id/update', registerController.renderRegisterUpdateForm)
router.post('/register/:id/update', registerController.updateAndRenderRegister)

router.post('/register/:id/delete', registerController.deleteRegisterAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
