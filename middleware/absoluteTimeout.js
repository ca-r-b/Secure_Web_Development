const absoluteTimeout = (req, res, next) => {
    const absoluteLimit = 10 * 1000; // 10 seconds for testing
    console.log('Absolute Timeout Middleware executed'); // Log to ensure middleware execution

    // Skip the timeout check for the logout route
    if (req.path === '/logout') {
        return next();
    }

    if (req.session && req.session.isLoggedIn) {
        const now = Date.now();
        const startTime = req.session.startTime;
        console.log(`Absolute Timeout Check: Now=${now}, StartTime=${startTime}, Diff=${now - startTime}`);

        if (startTime && (now - startTime > absoluteLimit)) {
            req.session.destroy(err => {
                if (err) {
                    return next(err);
                }
                res.status(200).json({ message: 'Session expired due to absolute timeout.' });
            });
        } else {
            next();
        }
    } else {
        next();
    }
};

module.exports = absoluteTimeout;