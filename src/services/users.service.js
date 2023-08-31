const mysql = require("mysql2")
const Boom = require('@hapi/boom')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Academy',
    password: "secret",
});


const allUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM users',
            function (err, results, fields) {
                if (err) {
                    const error = Boom.badImplementation('Error al obtener usuarios', err);
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
};


const oneUser = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM users 
            WHERE id = ${id}`,
            function (err, results, fields) {
                if (err) {
                    const error = Boom.badImplementation('User not found');
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            }
        );
    });
};

module.exports = { allUsers, oneUser };
