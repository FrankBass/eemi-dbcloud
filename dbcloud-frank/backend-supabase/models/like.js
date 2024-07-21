
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const User = require("./user");
const Article = require("./article");

class Like extends Model {}

Like.init({}, { sequelize: connection });

Like.belongsTo(User);
Like.belongsTo(Article);
User.hasMany(Like);
Article.hasMany(Like);

module.exports = Like;
