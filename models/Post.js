
  
const db = require("../db");
const Post = {

  create: (postData, callback) => {
    const sql = "INSERT INTO posts SET ?";
    db.query(sql, postData, (err, results) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  
  getPosts: (callback) => {
    const sql = `
      SELECT p.*, u.picPath, u.firstName, u.lastName, u.phoneNum
      FROM posts p
      JOIN users u ON u.id = p.posterId
    `;

    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  deletePost: (postID, callback) => {
    const sql = "DELETE FROM posts WHERE id = ?";
    db.query(sql, postID, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

};

module.exports = Post;
