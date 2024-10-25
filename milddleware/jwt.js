const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return next();
        } else {
            return res.status(401).send(error);
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(401).send(error);
    }
}

module.exports = verify;