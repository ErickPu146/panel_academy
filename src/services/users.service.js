const connection = require('../config/db')
const Boom = require('@hapi/boom')
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALTS);

const allUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM users',
            function (err, results, fields) {
                if (err) {
                    const error = Boom.badImplementation('Database error');
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
                    const error = Boom.badImplementation('Database error');
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            }
        );
    });
};

const createUser = (data) => {
    const { names, last_names, email, password, nickname } = data;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            connection.query(
                `INSERT INTO users (names, last_names, email, password, nickname) 
                VALUES (?, ?, ?, ?, ?)`,
                [names, last_names, email, hash, nickname],
                function (err, results, fields) {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            const error = Boom.badRequest('El correo electrónico ya está en uso');
                            reject(error);
                        } else {
                            const error = Boom.badImplementation('Database error');
                            reject(error);
                        }
                    } else {
                        connection.query(
                            `SELECT * FROM users WHERE id = ?`,
                            [results.insertId],
                            function (err, results, fields) {
                                if (err) {
                                    const error = Boom.badImplementation('Database error', err);
                                    reject(error);
                                } else {
                                    resolve(results[0]);
                                }
                            }
                        );
                    }
                }
            );
        });

    });
};

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM users WHERE id = ${id}`,
            function (err, results, fields) {
                if (err) {
                    const error = Boom.badImplementation('Database error');
                    reject(error);
                } else if (results.length === 0) {
                    const error = Boom.notFound('User not found');
                    reject(error);
                } else {
                    connection.query(
                        `DELETE FROM users WHERE id = ${id}`,
                        function (err, results, fields) {
                            if (err) {
                                const error = Boom.badImplementation('Database error');
                                reject(error);
                            } else {
                                resolve({ msg: "Se eliminó con éxito" });
                            }
                        }
                    );
                }
            }
        );
    });
}

const updateUser = (id, data) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM users WHERE id = ?`,
            [id],
            function (err, results, fields) {
                if (err) {
                    const error = Boom.badImplementation('Database error');
                    reject(error);
                } else if (results.length === 0) {
                    const error = Boom.notFound('User not found');
                    reject(error);
                } else {
                    const user = results[0];
                    const names = data.names || user.names;
                    const last_names = data.last_names || user.last_names;
                    const email = data.email || user.email;
                    const password = data.password || user.password;
                    const nickname = data.nickname || user.nickname;

                    connection.query(
                        `UPDATE users SET names = ?, last_names = ?, email = ?, password = ?, nickname = ? WHERE id = ?`,
                        [names, last_names, email, password, nickname, id],
                        function (err, results, fields) {
                            if (err) {
                                const error = Boom.badImplementation('Database error');
                                reject(error);
                            } else {
                                resolve({ msg: "actualizado con éxito" });
                            }
                        }
                    );
                }
            }
        );
    });
};


module.exports = { allUsers, oneUser, createUser, deleteUser, updateUser };
