const express = require('express')
const connect = require("./config");
const mainRouter = require("./routers/index");
const app = express();
const router = express.Router();

app.use(
  "/",
  express.urlencoded({ extended: false }),
  express.json(),
  mainRouter
);

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

const hello = "환영한다"
const fuck = "you"
const git = "stash"

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});