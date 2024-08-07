const absoluteTimeout = (req, res, next) => {
    const absoluteLimit = 2 * 60 * 1000; // 2 minutes
    console.log('Absolute Timeout Middleware executed');

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
                res.status(200).json({ message: 'Your session has expired. Please login again. ' });
            });
        } else {
            next();
        }
    } else {
        next();
    }
};

module.exports = absoluteTimeout;