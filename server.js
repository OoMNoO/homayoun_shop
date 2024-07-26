const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;
const routes = require("./routes");
app.use(express.static("frontend"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
