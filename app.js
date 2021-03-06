const express = require("express");
const connect = require("./config/secretKey");
const mainRouter = require("./routers/index");
const app = express();
const router = express.Router();

app.use(
  "/",
  express.urlencoded({ extended: false }),
  express.json(),
  mainRouter
);


app.use(express.static(__dirname + '/views'));
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

const hello = "환영한다";

const aabcd = "abc";

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});
