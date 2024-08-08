const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logfile.log' })
    ]
});

// function logSessionTimeout(userId, reason) {
//     logger.info('Session timeout', { userId, reason });
// }

// module.exports = { logSessionTimeout };