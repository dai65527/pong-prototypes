var express = require("express");
var passport = require("passport");
var bodyParser = require("body-parser");
var multer = require('multer');

var app = express();
var upload = multer();
app.use(upload.array()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());

var server = app.listen(4000, function () {
  console.log("listening on port " + server.address().port);
});

app.get("/api/insecure", function (req, res) {
  res.send("Insecure response.\n");
});

var LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log("hello")
    if (username === "admin" && password === "admin") {
      return done(null, username);
    } else {
      return done(null, false);
    }
  })
);

app.post('/api/secure/local', passport.authenticate('local', { session: false }), function(req, res){
  console.log(req.body);
  console.log(req.body.username);
  res.send("Secure response from " + JSON.stringify(req.body.username));
});
