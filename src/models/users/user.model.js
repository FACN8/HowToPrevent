const dbConnection = require('../../database/db_connection')


const findByUsername = name =>
    new Promise((resolve, reject) => {
        // will stop at the first user found
        console.log(name)
        dbConnection.query('SELECT * FROM usernames WHERE name = $1', [name], (err, res) => {
            if (err) {
                return reject(new Error('No user was found'))
            }
            resolve(resolve.rows);
        });

    });

    
const addNewUser = async(name, email, password) =>
    new Promise((resolve, reject) => {
        // if the user exists then do not add him to our database
        findByUsername(name)
            .then(() => {
                dbConnection.query('INSERT INTO usernames (name, email, password) values($1, $2, $3)', [name, email, password], (err) => {
                    if (err) {
                        return reject(new Error('Didn`t add user'))
                    }
                    resolve('User has been added');
                });
            })
            .catch((err) => {
                console.log(err)
                return reject(new Error('User already exists in our database'))
            })
    });


module.exports = {
    findByUsername,
    addNewUser
}