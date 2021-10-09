var express = require("express");
var passport = require("passport");
var bodyParser = require("body-parser");
var multer = require("multer");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
var fetch = require("node-fetch");

var app = express();
var upload = multer();
app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(cookieParser());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

var server = app.listen(3000, function () {
  console.log("listening on port " + server.address().port);
});

// JWT Strategy
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        function (req) {
          if (req && req.cookies) {
            return req.cookies["jwt"];
          }
          return null;
        },
      ]),
      secretOrKey: "thisissecretvalue",
    },
    function (jwtPayload, done) {
      return done(null, jwtPayload);
    }
  )
);

// info request
app.get(
  "/api/info",
  passport.authenticate("jwt", { sesion: false }),
  function (req, res) {
    console.log(`safe access from ${req.user.id}`)
    res.send(`Hello ${req.user.id}!!\nThis is secret information`);
  }
);

// set jwt token
function setJwtCookie(res, id) {
  var token = jwt.sign({ id }, "thisissecretvalue", { expiresIn: "1h" });
  res.cookie("jwt", token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    sameSite: true,
  });
}

// secure request with local strategy
var LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log("access to local strategy");
    if (username === "user" && password === "pass") {
      return done(null, username);
    } else {
      return done(null, false);
    }
  })
);

app.post(
  "/api/login/local",
  passport.authenticate("local", {
    session: false,
    failureRedirect: "/login",
  }),
  function (req, res) {
    setJwtCookie(res, req.user);
    return res.redirect("/");
  }
);

// secure request with OAuth2 strategy (42api)
var OAuth2Strategy = require("passport-oauth2").Strategy;
passport.use(
  "ftapi",
  new OAuth2Strategy(
    {
      authorizationURL: "https://api.intra.42.fr/oauth/authorize",
      tokenURL: "https://api.intra.42.fr/oauth/token",
      clientID: process.env.FTAPI_UID,
      clientSecret: process.env.FTAPI_SECRET,
      callbackURL: "http://localhost:3000/api/login/ftapi/callback",
      scope: ["public"]
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("access to oauth2 strategy");
      var res = await fetch("https://api.intra.42.fr/v2/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      var body = await res.json();
      return done(null, body.login);
    }
  )
);

app.get(
  "/api/login/ftapi",
  passport.authenticate("ftapi", { session: false, failureRedirect: "/login" }),
);

app.get(
  "/api/login/ftapi/callback",
  passport.authenticate("ftapi", { session: false, failureRedirect: "/login" }),
  async function (req, res) {
    setJwtCookie(res, req.user);
    return res.redirect("/");
  }
);
