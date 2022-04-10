const express = require('express')
const path = require('path')
const app = express()
const mysql = require('mysql')
const myConnection = require('express-myconnection')
const session = require('express-session')

// Settings
app.set('port', process.env.PORT || 3000)

// Plantillas
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


// MySQL Conection
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'db_xatruch'
}, 'single'))

app.use(express.urlencoded({ extended: false}))

// Variables de Sesion
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Server
app.listen(app.get('port'), () => {
    console.log('Server is Running!')
})

// Public
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use(require('./routes'))
app.use('/panel', require('./routes/panel'))