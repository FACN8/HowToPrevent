const dbConnection = require('../../database/db_connection')


const findByUsername = username =>
    new Promise((resolve, reject) => {
        // will stop at the first user found
        dbConnection.query("SELECT * FROM users WHERE user = ($1)", [username], (err, res) => {
            if (err) {
                return reject(new Error('No user was found'))
            }
            resolve(res.rows);
        });

    });
const addNewUser = async(username, email, password) =>
    new Promise((resolve, reject) => {

        const newUser = [
            username,
            email,
            password
        ];

        // if the user exists then do not add him to our database
        findByUsername(username)
            .then(() => {
                dbConnection.query("INSERT INTO users (username, email, password) values($1, $2, $3)", [newUser], (err) => {
                    if (err) {
                        return reject(new Error('Didn`t add user'))
                    }
                    resolve('User has been added');
                });
            })
            .catch(() => {
                return reject(new Error('User already exists in out database'))
            })
    });


module.exports = {
    findByUsername,
    addNewUser
}