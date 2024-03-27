const jwt = require('jsonwebtoken')
const HttpError = require("../models/errorModels")

const authMiddleware = async (req, res, next) => {
     
    // Check user role or any other authorization criteria here if needed
    const authorization = req.headers.Authorization || req.headers.authorization
    if (authorization && authorization.startsWith("Bearer")) {
        const token = authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if (err) return next(new HttpError("Unauthorized. Invalid token", 403))
            req.user = info;
            next()
        })
    } else {
        return next(new HttpError("Unauthorized. No token", 402))
    }
}

module.exports = authMiddleware;