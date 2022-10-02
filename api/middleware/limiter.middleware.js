const rateLimit = require('express-rate-limit');


// Configuration of connection limiter
const limiter = rateLimit({
    windowsMS: 5 * 60 * 1000,   // millisecondes of the window connection
    max: 10,    //Limit request for each IP per window
    standardHeaders: true,  // Return rate limit info in the "RateLimit-*" headers
    legacyHeaders: false    // Disable the "x-RateLimit-*" headers
});

module.exports = limiter