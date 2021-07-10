const Joi = require('joi')
const User = require('../models/user')

const registerValidater = Joi.object({
    email: Joi.string().email().required(),
    name : Joi.string().required(),
    sex: Joi.string().required(),
    phone: Joi.string().required(),
    bitrh: Joi.date().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

module.exports = async (req,res, next) => {
    try {

        const { email, name, sex, phone, birth, password, confirmPassword} = await registerValidater.validateAsync(req.body);

        if(email === password) {
            res.status(400).send({
                errorMessage: "이메일과 비밀번호는 동일하게 지정할 수 없습니다"
            })
            return;
        }

        const existEmail = await User.findOne({ email });

        if (existEmail) {
            res.status(400).send({
                errorMessage: "다른 이메일을 사용해주세요"
            })
            return;
        }
        next();

    } catch(err) {
        res.status(400).send({
            errorMessage:'요청한 형식이 올바르지 않습니다'
        });
        
    };
};

