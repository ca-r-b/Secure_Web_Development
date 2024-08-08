const db = require("../db");

const User = {
  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  create: (userData, callback) => {
    const sql = "INSERT INTO users SET ?";
    db.query(sql, userData, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getIdByEmail: (email, callback) => {
    const sql = "SELECT id FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length > 0) {
        callback(null, results[0].id);
      } else {
        callback(null, null); // No user found
      }
    });
  },

  updatePicPath: (userId, picPath, callback) => {
    const sql = "UPDATE users SET picPath = ? WHERE id = ?";
    db.query(sql, [picPath, userId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  updatePhoneNum: (userId, phoneNum, callback) => {
    const sql = "UPDATE users SET phoneNum = ? WHERE id = ?";
    db.query(sql, [phoneNum, userId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  checkForDuplicates: (email, phone, idnumber, callback) => {
    const sql =
      "SELECT * FROM users WHERE email = ? OR phoneNum = ? OR idNumber = ?";
    db.query(sql, [email, phone, idnumber], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getUsers: (callback) => {
    const sql = `
      SELECT *
      FROM users
    `;

    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  deleteUser: (userID, callback) => {
    const sqlDeletePosts = "DELETE FROM posts WHERE posterId = ?"; // delete posts first
    const sqlDeleteUser = "DELETE FROM users WHERE id = ?"; // then delete user
  
    db.query(sqlDeletePosts, [userID], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      db.query(sqlDeleteUser, [userID], (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
    });
  },
  
};

module.exports = User;
