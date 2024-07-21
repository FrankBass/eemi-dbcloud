const Sequelize = require("sequelize");

const connection = new Sequelize(
  "postgresql://postgres.yfthbltjoylzcquavjki:hPq20XekPNGoRRuj@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
);

connection.authenticate().then(() => console.log("Database connected"));

module.exports = connection;
