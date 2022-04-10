const authController = {}


// Login

authController.signIn = (req, res) => {
    const { username, password } = req.body
    if (username && password){
        req.getConnection((err, conn) => {
            conn.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
                if (results == 0 || (results[0].password != password)) {
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Contraseña Incorrectas",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'signin'
                    })
                }
                else {
                    req.session.loggedin = true
                    req.session.name = results[0].fullname
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexion Exitosa",
                        alertMessage: "Bienvenido a Xatruch Panel",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 2500,
                        ruta: 'panel'
                    })
                }
            })
        })
    }
}

module.exports = authController