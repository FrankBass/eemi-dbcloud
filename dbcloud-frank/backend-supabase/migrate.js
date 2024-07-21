
const connection = require("./models/db");
require("./models/user");
require("./models/article");
require("./models/comment");
require("./models/like");

connection
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .then(() => connection.close());
