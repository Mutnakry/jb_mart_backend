// // const mysql = require("mysql");
// const mysql = require('mysql2');


// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"pos",
//     port:"3306",
//     dateStrings: 'don'

// })

// module.exports=db;




// Ensure mysql2 is imported only once
const mysql = require('mysql2');

// Using createPool is recommended over createConnection for better management
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'pos',
//     port: '3306',
//     dateStrings: true,
//     connectionLimit: 10,
// });

const db = mysql.createPool({
    host: 'dpg-cukqc4ggph6c738c6vcg-a.render.com', // ✅ Use Render's MySQL Hostname
    user: 'postgresql_mysql_user',                // ✅ Your Render DB Username
    password: 'DhaDFVBS7J5lhh6lRgfLLfqci7xAN18e', // ✅ Your Render DB Password
    database: 'postgresql_mysql',                 // ✅ Your Render DB Name
    port: 5432,                                   // ✅ Render's DB Port (Usually 5432 for PostgreSQL)
    dateStrings: true,
    connectionLimit: 10,
});


// Export the pool instead of a single connection
module.exports = db;
