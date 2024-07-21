const { Model, DataTypes } = require('sequelize');
const connection = require('./db');
const User = require('./user');
const Article = require('./article');

class Comment extends Model {}

Comment.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ArticleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Article,
      key: 'id'
    }
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize: connection,
  tableName: 'comments'
});

Comment.belongsTo(User, { foreignKey: 'UserId' });
Comment.belongsTo(Article, { foreignKey: 'ArticleId' });
User.hasMany(Comment, { foreignKey: 'UserId' });
Article.hasMany(Comment, { foreignKey: 'ArticleId' });

module.exports = Comment;
