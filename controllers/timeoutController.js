const { logSessionTimeout } = require('../utils/logger');

const timeoutController = {
    logSessionTimeout: (req, res) => {
        const userId = req.session.user ? req.session.user.id : 'unknown';
        const reason = req.body.reason;
        logSessionTimeout(userId, reason);
        res.sendStatus(200);
    },

    checkSession: (req, res) => {
        const now = Date.now();
        const absoluteLimit = 10 * 1000; // 10 seconds for testing
        const startTime = req.session.startTime;

        if (startTime && (now - startTime > absoluteLimit)) {
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).send('Error destroying session');
                }
                return res.json({ message: 'Session expired due to absolute timeout.' });
            });
        } else {
            res.json({ message: 'Session is active.' });
        }
    }
};

module.exports = timeoutController;