// Express
const express = require('express');
const app = express(express.json());

// Import
const http = require('http');
require('dotenv').config();

// Port declaration
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) { return val };
    if (port >= 0) { return port };
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Display error
const errorHandler = error => {
    if (error.syscall !== 'listen') { throw error };
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is a already in use.');
            break;
        default:
            throw error;
    }; 
}; 

// Server initialization
const server = http.createServer(app);

// Start server
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});
server.listen(port);