const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-Middleware");
const registerValidator = require("../middlewares/registerValidater");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const secretKey = require("../config/secretKey");
const User = require("../models/user");
const crypto = require("crypto");

router.post("/get", async (req, res) => {
  res.render("join.ejs");
});

//회원가입
router.post("/signup", registerValidator, async (req, res) => {
  try {
    const { email, password, name, phone, sex, birth } = req.body;
    const encryptedPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("base64"); //암호화

    const user = new User({ email, password, name, phone, sex, birth });
    user.password = encryptedPassword;
    await user.save();
    res.send({ result: "개꿀" });
  } catch (err) {
    res.status(400).send({
      errorMessage: "로그인에 실패하였습니다",
    });
  }
});

const loginValidater = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).trim().required(),
});

//로그인
router.post("/login", async (req, res) => {
  try {
    const { email, password } = await loginValidater.validateAsync(req.body);

    const encryptedPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("base64");
    const user = await User.findOne({
      $and: [{ email: email }, { password: encryptedPassword }],
    });
    if (!user) {
      res.status(401).send({ errorMessage: "로그인에 실패했습니다" });
      return;
    }

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
      },
      key
    );
    res.send({
      token,
    });
  } catch (err) {
    res.status(400).send({
      errorMessage: "로그인에 실패하였습니다. ",
    });
  }
});

//토큰 확인
router.get("/auth", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  res.send({});
});

module.exports = router;
