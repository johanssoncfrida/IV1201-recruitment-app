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

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// This is only a dummy request handler to test the initial frontend's requests.
// Should not be a part of the application when signin API has been included!!!
//
// If you send an 'r' as the first letter in the request you'll be treated as a
// recruiter and that role will be sent. If your username contains an 'x' an error
// will be sent. This was just to check the behaviour of the frontend on an error.
//
// The response might contain other fields than username and password, maybe the 
// whole user. The 'result', 'role' and 'error' fields are expected in the frontend.
app.post('/signin/', (req, res) => {
    let role = req.body.username.startsWith("r") ? "recruiter" : "applicant";

    if(req.body.username.includes("x")) {
        res.status(400).json({ error: "Invalid value in username" });
    } else {
        res.status(200).json({ 
            result: 'Sign in success',
            role: role,
            username: req.body.username,
            password: req.body.password,
        });
    }
});
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const reqHandlerLoader = require('./api/RequestHandlerLoader');
reqHandlerLoader.loadRequestHandlers(app);
reqHandlerLoader.loadErrorHandlers(app);

const server = app.listen(
    process.env.SERVER_PORT,
    process.env.SERVER_HOST,
    () => {
        console.log('Server up at ' + server.address().address + ':' + server.address().port);
    }
);