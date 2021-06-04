const express = require("express")
const passport = require("passport")
const app = express()
const io = require("socket.io")
const jade = require("ejs")
app.use(express.static("public"))
app.engine("html", require("ejs").renderFile)

app.post("/login", passport.authenticate("local"), function (req, res) {
  res.redirect("/users/" + req.user.username)
})

app.get("/", (req, res) => {
  res.render("index.html")
})

app.get("/login", (req, res) => {
  res.render("login.html")
})

app.listen(80)
