function errorHandler(err, req, res, next) {
    const isDebugMode = process.env.DEBUG === 'true';

    if (isDebugMode) {
        res.status(500).json({
          success: false,
          message: err.message,
          stack: err.stack,
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
          });
    }
}
module.exports = errorHandler;