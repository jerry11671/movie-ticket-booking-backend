require('dotenv').config()
const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeaders.split(' ')[1];

    try {
        const jwtVerified = jwt.verify(token, process.env.JWT_SECRET)

        if (!jwtVerified) {
            throw new UnauthenticatedError("Authentication invalid")
        }

        req.user = jwtVerified;
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid")
    }

}





module.exports = auth;
