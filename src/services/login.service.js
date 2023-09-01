const connection = require('../config/db')
const Boom = require('@hapi/boom')
const bcrypt = require('bcrypt');

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM users WHERE email = ?`, [email],
            function (err, user, fields) {
                if (err) {
                    const error = Boom.badImplementation('Database error');
                    reject(error);
                } else {
                    if (user.length > 0) {
                        const { password: hashPassword } = user[0];
                        bcrypt.compare(password, hashPassword, (err, result) => {
                            if (result) {
                                resolve(user[0])
                            } else {
                                resolve(result)
                            }
                        })
                    } else {
                        resolve({msg: "No se encontro el correo"})
                    }
                }
            }
        )
    })
}

module.exports = { login }