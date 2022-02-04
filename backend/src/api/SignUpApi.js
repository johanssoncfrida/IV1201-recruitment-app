'use strict';

const {check, validationResult} = require('express-validator');
const RequestHandler = require('./RequestHandler');

/**
 * This is the REST API for signing up a user.
 */
class SignUpApi extends RequestHandler {
    /**
     * Creates a new instance of the class.
     */
    constructor() {
        super();
    }

    /**
     * @return {String} the URL path this will handle.
     */
    get path() {
        return '/signup';
    }

    /**
     * Registers the functions handling the requests.
     */
    async registerHandler() {
        try {
            await this.getController();

            /**
             * At this moment this will only take a username as parameter
             * and just return that username as a JSON, if no username is 
             * included an error message is sent back
             */
            this.router.post(
                '/', 
                check('username')
                    .not()
                    .isEmpty(),
                async (req, res, next) => {
                    try {
                        const errors = validationResult(req);
                        if(!errors.isEmpty()) {
                            res.status(400).json({ error: errors.array() });
                            return;
                        }
                        const user = {
                            username: req.body.username
                        }
                        const result = this.contr.addUser(user);
                        res.status(200).json({ result: result });
                    } catch (err) {
                        res.status(500).json({ error: 'This did not work' });
                    }
                })

            /**
             * Just a test to see if the request handler works, it only answers
             * with a JSON containing a String.
             */
            this.router.get('/', (req, res, next) => {
                try {
                    const result = this.contr.testControllerCall();
                    res.status(200).json({ result: result });
                } catch (err) {
                    res.status(500).json({ error: 'This did not work' });
                }
            })
        } catch (err) {
            console.log('Error in signup registerhandler: ' + err);
        }
    }
}

module.exports = SignUpApi;