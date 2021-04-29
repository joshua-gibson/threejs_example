const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", function (request, res) {
  res.contentType("html");
  res.sendFile(__dirname + "/index.html");
});

app.get("/main.js", function (req, res) {
  res.sendFile(__dirname + "/main.js");
});

app.get("/lib/three.js", function (req, res) {
  res.sendFile(__dirname + "/lib/three.js");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
