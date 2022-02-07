'use strict';

/**
 * This is the main entry point of the server, where exress is started
 * and the server is setup.
 */


const path = require('path');
// __dirname is the absolute path to the directory of this file
// using path.join(__dirname, '..') will jump out from the src folder
const BACKEND_ROOT_DIR = path.join(__dirname, '..');

// Config to specify a custom path to .env
const result = require('dotenv-safe').config({
    path: path.join(BACKEND_ROOT_DIR, '.env'),
    example: path.join(BACKEND_ROOT_DIR, '.env.example')
});

const express = require('express');
const app = express();

app.use(express.json());
// Will parse incoming request bodies before handlers
const httpBodyParser = require('body-parser');
app.use(httpBodyParser.json());

// Will parse incoming cookies before handlers
const httpCookieParser = require('cookie-parser');
app.use(httpCookieParser());

app.get('/', (req, res) => {
    return res.send('Welcome to the recruitment app!');
});

const reqHandlerLoader = require('./api/RequestHandlerLoader');
reqHandlerLoader.loadRequestHandlers(app);

const server = app.listen(
    process.env.SERVER_PORT,
    process.env.SERVER_HOST,
    () => {
        console.log('Server up at ' + server.address().address + ':' + server.address().port);
    }
);