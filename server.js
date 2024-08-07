require('dotenv').config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./db'); // Import the database connection
const absoluteTimeout = require('./middleware/absoluteTimeout');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const port = 3000;
const nocache = require("nocache");

// Use Helmet to set various HTTP headers for security
app.use(nocache());

app.use(helmet({
    referrerPolicy: { policy: 'no-referrer' },
    dnsPrefetchControl: { allow: false },
    expectCt: { enforce: true, maxAge: 30 },
    frameguard: { action: 'deny' }, // restricts who can put your site in a frame which can help mitigate things like clickjacking attacks.
    hidePoweredBy: true, // Hide the X-Powered-By header
    hsts: {
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true,
        preload: true,
    },
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: { policy: 'none' },
    xssFilter: true,
}));

// Enable CORS for all routes (for development)
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiter middleware
const loginLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 3, // Limit each IP to 3 login requests per windowMs
    message: "Too many login attempts, please try again after a minute",
    headers: true,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).render("login", {
            title: "Login",
            msg: options.message
        });
    }
});

// For Views
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.use(express.static("public"));

// For Backend
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
const sessionStore = new MySQLStore({}, db);

app.use(session({
    key: 'session_cookie_name',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Apply the absolute timeout middleware globally
app.use(absoluteTimeout);

// Route setup
const router = require("./routes/route.js");
app.use("/", router);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});