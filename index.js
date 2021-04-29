const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", function (request, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
