const express = require('express');
const router = express.Router()

const contactController = require('../controllers/contactController')

// Control Panel
router.get('/', contactController.listCustomerInfo)

// Get Customer by ID JSON
router.get('/customers/:id', contactController.listCustomerInfoJSON)

// Edit Status
router.post('/customers/edit/:id', contactController.editCustomerStatus)

module.exports = router