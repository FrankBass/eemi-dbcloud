
const express = require("express");
require("./models/db");
const router = require("./routes/index");
const app = express();

app.use(express.json());

app.use("/", express.static("public"));
app.use("/api", router);

app.listen(3000, () => console.log("Server listening on port", 3000));

