const db = require('../db');

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
                console.log(err);
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getHighestIdPlusOne: async () => {
        try {
            const [rows] = await db.promise().query('SELECT IFNULL(MAX(id), 0) AS maxId FROM users');
            const highestId = rows[0].maxId || 0; // If there are no rows, highestId is 0
            return highestId + 1;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching highest ID');
        }
    }

};

module.exports = User;
