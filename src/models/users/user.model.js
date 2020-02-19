const dbConnection = require('../../database/db_connection')


const findByUsername = name =>
    new Promise((resolve, reject) => {
        // will stop at the first user found
        dbConnection.query('SELECT * FROM usernames WHERE name = $1', [name], (err, res) => {
            if (err) {
                return reject(new Error('No user was found'))
            }
            resolve(res.rows);
        });

    });


const addNewUser = (name, email, password) =>

    new Promise((resolve, reject) => {
        // if the user exists then do not add him to our database
        findByUsername(name)
            .then(() => {
                dbConnection.query('INSERT INTO usernames (name, email, password) values($1, $2, $3)', [name, email, password], (err, res) => {
                    if (err) {
                        return reject(new Error('Didn`t add user'))
                    }
                    resolve("success NIGGAS");
                });
            })
            .catch((err) => {
                return reject(new Error('User already exists in our database'))
            })
    });

const addProfile = (name_id) => {
    new Promise((resolve, reject) => {
        // will stop at the first user found
        dbConnection.query('INSERT INTO profile(name_id) VALUES ($1)', [name_id], (err) => {
            if (err) {
                return reject(new Error('No user was found'))
            }
            resolve("success");
        });
    });
}

const getProfile = (name_id) =>
    new Promise((resolve, reject) => {
        // will stop at the first user found
        dbConnection.query('SELECT * FROM profile WHERE name_id = $1', [name_id], (err, res) => {
            if (err) {
                return reject(new Error('No user was found'))
            }
            resolve(res.rows);
        });

    });

module.exports = {
    findByUsername,
    addNewUser,
    addProfile,
    getProfile
}