const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logfile.log' })
    ]
});

// Log user session timeout
function logSessionTimeout(userId, reason) {
    logger.info('User log out', { userId, reason });
}

// Log login attempt (success)
function logLoginSuccess(userId) {
    logger.info('Login attempt successful', { userId });
}

// Log login attempt (failed)
function logLoginFailed(email) {
    logger.warn('Login attempt failed', { email });
}

// Log post submission
function logPostSubmitted(userId, postId) {
    logger.info('Post submitted successfully', { userId, postId });
}

// Log post submission error
function logPostSubmissionError(userId, error) {
    logger.error('Post submission failed', { userId, error });
}

// Log phone number edit
function logPhoneNumEdited(userId, phoneNum) {
    logger.info('Phone number edited', { userId, phoneNum });
}

// Log phone number edit error
function logPhoneNumError(userId, error) {
    logger.error('Phone number edit failed', { userId, error });
}

// Log post delete
function logPostDeleted(userId, postId) {
    logger.info('Post deleted', { userId, postId });
}

// Log account deletion
function logAccountDeleted(userId) {
    logger.info('Account deleted', { userId });
}

// Log account edit
function logAccountEdited(userId) {
    logger.info('Account edited', { userId });
}

// Log account creation
function logAccountCreated(userId) {
    logger.info('Account created', { userId });
}

// Log profile picture upload
function logProfilePictureUpload(userId, imgPath) {
    logger.info('Profile picture uploaded', { userId, imgPath });
}

// Log profile picture upload error
function logProfilePictureUploadError(userId, error) {
    logger.error('Profile picture upload failed', { userId, error });
}

// Log admin access denied
function logAdminAccessDenied(userId) {
    logger.warn('Admin access denied', { userId });
}

// Log admin home access
function logAdminHomeAccess(userId) {
    logger.info('Admin home accessed', { userId });
}

// Log user deletion
function logUserDeleted(adminId, userId) {
    logger.info('User deleted', { adminId, userId });
}

// Log admin access attempt
function logAdminAccessAttempt(adminId, error) {
    logger.error('Admin access attempt failed', { adminId, error });
}

module.exports = {
    logSessionTimeout,
    logLoginSuccess,
    logLoginFailed,
    logPostSubmitted,
    logPostSubmissionError,
    logPhoneNumEdited,
    logPhoneNumError,
    logPostDeleted,
    logAccountDeleted,
    logAccountEdited,
    logAccountCreated,
    logProfilePictureUpload,
    logProfilePictureUploadError,
    logAdminAccessDenied,
    logAdminHomeAccess,
    logUserDeleted,
    logAdminAccessAttempt
};