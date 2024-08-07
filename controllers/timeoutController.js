const { logSessionTimeout } = require('../utils/logger');

const timeoutController = {
    logSessionTimeout: (req, res) => {
        const userId = req.session.user.id ? req.session.user.id : 'unknown';
        const reason = req.body.reason;
        logSessionTimeout(userId, reason);
        res.sendStatus(200);
    },

    checkSession: (req, res, next) => {
        // console.log('Absolute Timeout Middleware executed');
        const absoluteLimit = 5 * 60 * 1000; // 5 minutes
        const now = Date.now();
        const startTime = req.session.startTime;

        if (req.path === '/logout') {
            return next();
        }

        if (req.session && req.session.isLoggedIn) {
            // console.log(`Absolute Timeout Check: Now=${now}, StartTime=${startTime}, Diff=${now - startTime}`);
            if (startTime && (now - startTime > absoluteLimit)) {
                req.session.destroy(err => {
                    if (err) {
                        return res.status(500).send('Error destroying session');
                    }
                    return res.status(200).json({ message: 'Your session has expired. Please login again.' });
                });
            } else {
                next();
            }
        } else {
            next();
        }
    }
};

module.exports = timeoutController;