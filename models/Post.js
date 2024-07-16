
  
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
};

module.exports = Post;
