const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Users = require('../models/users');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        // console.log("This is the token");
        // console.log(token);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await Users.findOne({uuid: verifyToken.uuid})

        if (!rootUser) { throw new Error('User not found')}

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser.uuid;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized: No token provided')
        console.log(err);
    }
}

module.exports = authenticate;