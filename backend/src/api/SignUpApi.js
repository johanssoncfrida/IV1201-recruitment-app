'use strict';

const {check, validationResult} = require('express-validator');
const PersonDTO = require('../model/PersonDTO');
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
             * Post request handeling signup.
             * Response with status 200 returns a PersonDTO object
             * Error return response status 400
             */
            this.router.post(
                '/', 
                check('name')
                    .notEmpty(),
                check('surname')
                    .notEmpty(),
                check('pnr')
                    .notEmpty(),
                check('email')
                    .notEmpty(),
                check('password')
                    .notEmpty(),
                check('username')
                    .notEmpty(),
                async (req, res, next) => {
                    try {
                        const errors = validationResult(req);
                        if(!errors.isEmpty()) {
                            res.status(400).json({ error: errors.array() });
                            return;
                        }
                        const person = new PersonDTO(
                            undefined,
                            req.body.name,
                            req.body.surname,
                            req.body.pnr,
                            req.body.email,
                            req.body.password,
                            undefined,
                            req.body.username
                        )
                        const result = await this.contr.createPerson(person);
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