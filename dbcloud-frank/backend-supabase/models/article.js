const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const User = require("./user");

class Article extends Model {}

Article.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "DRAFT",
    },
    image_url: { type: DataTypes.STRING },
    UserId: { type: DataTypes.UUID, allowNull: false },
  },
  {
    sequelize: connection,
  }
);

Article.belongsTo(User, { as: 'author', foreignKey: 'UserId' });
User.hasMany(Article, { foreignKey: 'UserId' });

module.exports = Article;
