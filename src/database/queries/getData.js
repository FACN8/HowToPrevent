const dbConnection = require("../db_connection");

// const getAllData = cb => {
//     getUserTable(cb);
// };

// const getUserTable = cb => {
//     dbConnection.query("SELECT * FROM usernames;", (err, res) => {
//         if (err) return cb(err);

//         cb(null, res.rows);
//     });
// };



module.exports = {
    getAllData,
    getUserTable
}