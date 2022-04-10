const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactController')
const authController = require('../controllers/authController')

// Website Principal Xatruch Barbershop

// Routes

// Landing
router.get('/', (req, res) => {
    res.render('home')
})

// Suscription Success
router.get('/success', (req, res) => {
    res.render('success')
})

// Suscription Failure
router.get('/failure', (req, res) => {
    res.render('failure')
})

// Contact Form
router.post('/save', contactController.saveCustomerInfo)

// Sign In Admin
router.get('/signin', (req, res) => {
    res.render('login')
})

// Post Login
router.post('/signin', authController.signIn)

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/signin')
    })
})

module.exports = router