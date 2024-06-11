const rateLimit = require('express-rate-limit');

// Create a rate limiter
const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // Limit each IP to 3 login requests per windowMs
    message: "Too many login attempts from this IP, please try again after a minute",
    headers: true,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).render("login", {
            title: "Login",
            msg: options.message
        });
    }
});

module.exports = loginLimiter;