const express = require("express");
const router = express.Router();
const userRouter = require("./ user");

router.use("/user", userRouter);


router.get("/", (req, res) => {
  res.render('<h1>환영한다</h1>');
});

module.exports = router;
