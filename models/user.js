const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: 'Hubert.95_3', 
  database: 'dailyBlueprint',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// // Get all users
// exports.getAllUsers = () => {
//   return new Promise((resolve, reject) => {
//     pool.query('SELECT * FROM user', (err, results) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(results);
//     });
//   });
// };

// // Add a new user
// exports.addUser = (username, email, password) => {
//   return new Promise((resolve, reject) => {
//     pool.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, results) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(results);
//     });
//   });
// };

// Delete a user by user_id
// exports.deleteUserById = (userId) => {
//   return new Promise((resolve, reject) => {
//     pool.query('DELETE FROM user WHERE user_id = ?', [userId], (err, results) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(results);
//     });
//   });
// };



exports.getUserByUsername = async (username) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM user WHERE username = ?', [username]);
    return rows.length > 0 ? rows[0] : null; 
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

exports.getUserByEmail = async (email) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

exports.createUser = async ({ username, email, password }) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

exports.deleteUserByEmail = async (email) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query('DELETE FROM user WHERE email = ?', [email]);
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};