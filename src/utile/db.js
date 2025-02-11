// // // const mysql = require("mysql");
// // const mysql = require('mysql2');


// // const db = mysql.createConnection({
// //     host:"localhost",
// //     user:"root",
// //     password:"",
// //     database:"pos",
// //     port:"3306",
// //     dateStrings: 'don'

// // })

// // module.exports=db;



// // Ensure mysql2 is imported only once
// const mysql = require('mysql2');

// // Using createPool is recommended over createConnection for better management
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin123',
//     database: 'pos',
//     port: '3306',
//     dateStrings: true,  
//     connectionLimit: 10,
// });

// // Export the pool instead of a single connection
// module.exports = db;







const mysql = require('mysql2');

// Use environment variables for database configuration
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', // Fallback to 'localhost' for local development
    user: process.env.DB_USER || 'root',      // Fallback to 'root' for local development
    password: process.env.DB_PASSWORD || 'admin123', // Fallback to 'admin123' for local development
    database: process.env.DB_NAME || 'pos',   // Fallback to 'pos' for local development
    port: process.env.DB_PORT || '3306',      // Fallback to '3306' for local development
    dateStrings: true,
    connectionLimit: 10,
});

// Export the pool for use in other parts of the application
module.exports = db;