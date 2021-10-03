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

var server = app.listen(3000, function () {
  console.log("listening on port " + server.address().port);
});

// insecure request
app.get("/api/insecure", function (req, res) {
  res.send("Insecure response.\n");
});

// secure request with local strategy
var LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log("local strategy")
    if (username === "admin" && password === "admin") {
      return done(null, username);
    } else {
      return done(null, false);
    }
  })
);

app.post('/api/secure/local', passport.authenticate('local', { session: false }), function(req, res){
  res.send("Secure response from " + JSON.stringify(req.body.username));
});

// secure request with OAuth2 strategy (42api)
var OAuth2Strategy = require("passport-oauth2").Strategy;
passport.use("ftapi", new OAuth2Strategy({
    authorizationURL: "https://api.intra.42.fr/oauth/authorize",
    tokenURL: "https://api.intra.42.fr/oauth/token",
    clientID: process.env.FTAPI_UID,
    clientSecret: process.env.FTAPI_SECRET,
    callbackURL: "http://localhost:3000/api/secre/ftapi/callback",
    // callbackURL: "https://42tokyo.jp/",
    // callbackURL: "https://example.com",
  }, function (accessToken, refreshToken, profile, done) {
    console.log("oauth2 strategy");
    return done(null, profile);
  }
));

app.get('/api/secure/ftapi/callback', passport.authenticate('ftapi', { session: false }), function(req, res) {
  console.log(req.body);
  console.log(req.body.username);
  res.send("Secure response from " + JSON.stringify(req.body.username));
  redirect('http://localhost:3000');
});

app.get('/api/secure/ftapi', passport.authenticate('ftapi', { session: false }), function(req, res) {
  console.log(req.body);
  console.log(req.body.username);
  res.send("Secure response from " + JSON.stringify(req.body.username));
});
