'use strict';

const jwt = require('jsonwebtoken');

class Authorization {

    static get AUTH_COOKIE_NAME() {
        return 'personAuth';
    }

    static setAuthCookie(person, res) {
        const onlyAccessibleFromHttp = {httpOnly: true};
        const isSessionCookie = {expires: 0};
        
        const jwtToken = jwt.sign(
            {username: person.username},
            process.env.JWT_SECRET,
            {
                expiresIn: '30 minutes',
            },
        );

        const cookieOptions = {
            ...onlyAccessibleFromHttp,
            ...isSessionCookie,
        };

        res.cookie('personAuth', jwtToken, cookieOptions);
    }
}

module.exports = Authorization;