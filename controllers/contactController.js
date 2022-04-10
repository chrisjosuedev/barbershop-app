const controller = {}

// Render Panel Customer List
controller.listCustomerInfo = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const customerListQuery = `SELECT customers.*, suscriptions.desc_suscription
                                        FROM customers
                                        INNER JOIN suscriptions ON customers.id_suscription = suscriptions.id`
            conn.query(customerListQuery, (err, customers) => {
                res.render('panel', {
                    data: customers,
                    login: true,
                    name: req.session.name
                })
            })
        })
    }
    else {
        res.redirect('/signin')
    }
    
}

// List Custmer Info [Return JSON]
controller.listCustomerInfoJSON = (req, res) => {
    const { id } = req.params
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM customers WHERE id = ?", [id], (err, customersList) => {
            res.json(customersList)
        })
    })
}

// Edit Customer Status
controller.editCustomerStatus = (req, res) => {
    const { id } = req.params
    const { status_contact } = req.body
    req.getConnection((err, conn) => {
        conn.query("UPDATE customers set status_contact = ? WHERE id = ?", [status_contact, id], (err, customer) => {
            res.redirect('/panel')
        })
    })
}

// Insert Customer Info
controller.saveCustomerInfo = (req, res) => {
    const newCustomerData = req.body
    req.getConnection((err, conn) => {
        const customerQuery = `INSERT INTO customers set ?`
        conn.query(customerQuery, [newCustomerData], (err, customer) => {
            if (err) {
                res.redirect('/failure')
            }
            res.redirect('/success')
        })
    })
}

module.exports = controller