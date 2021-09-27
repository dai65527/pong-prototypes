var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(4000, function() {
  console.log("listening on port " + server.address().port);
});

app.use(express.static("public"));

app.get("/api/insecure", function(req, res) {
  res.send("Insecure response.\n");
});
