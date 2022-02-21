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

    static async isSignedIn(contr, req, res) {
        const authCookie = req.cookies.personAuth;
        if(!authCookie) {
            res.status(401).json({
                error: 'Unauthorized. No auth token'
            });
            return false;
        }
        try {
            const JWTPayload = jwt.verify(authCookie, process.env.JWT_SECRET);
            console.log(JWTPayload);
            const personDoesNotExist = await contr.isUsernameAvailable(JWTPayload.username);
            if(personDoesNotExist) {
                res.clearCookie('personAuth');
                res.status(401).json({
                    error: 'Unauthorized. Invalid auth token'
                });
                return false;
            }
            return true;
        } catch (err) {
            res.clearCookie('personAuth');
            res.status(401).json({
                error: 'Unauthorized. Invalid auth token'
            });
            return false;
        }
    }

}

module.exports = Authorization;