const jwt = require('jsonwebtoken')
const Joi = require('joi')
const key = require('../config/secretKey')

module.exports = async (req, res, next) => {

    const { authorization } = req.headers;
    const [ tokenType, tokenValue ] = authorization.split(' ');
    
    if (tokenType !== 'Bearer' || !tokenValue) {
        res.status(401).send({
            errorMessge: "로그인 후 사용해주세요",
        });
        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, key);
        const foundUser = await User.findById(userId);
        res.locals.user = foundUser;
        next();

    } catch (error) {
        res.status(401).send({
            errorMessge: "로그인 후 사용해주세요! "
        })
    }

} 