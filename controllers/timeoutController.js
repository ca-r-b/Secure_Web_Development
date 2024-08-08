const timeoutController = {
    checkSession: (req, res, next) => {
        const absoluteLimit = 60 * 60 * 1000; // 2 minutes
        const now = Date.now();
        const startTime = req.session.startTime;

        if (req.path === '/logout') {
            return next();
        }

        if (req.session && req.session.isLoggedIn) {
            if (startTime && (now - startTime > absoluteLimit)) {
                req.session.destroy(err => {
                    if (err) {
                        console.error('Error destroying session:', err);
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