var mysql = require('mysql2');

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "Root@1234",
    database : "dish_db",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

exports.sqlQuery = (query) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
                connection.query (query, ( err,rows )=>{
                    if(err) {
                        console.log(err);
                    }
                    else {
                        resolve(rows);
                    }
            })
        })
    })
}