const { Router } = require('express');
const Comment = require('../models/comment');
const User = require('../models/user');
const Article = require('../models/article');
const checkAuth = require('../middlewares/checkAuth');

const router = new Router();

router.post('/comments', checkAuth(), async (req, res) => {
  const { content, articleId } = req.body;

  const user = await User.findByPk(req.user.id);
  const article = await Article.findByPk(articleId);

  if (!user || !article) {
    return res.status(400).json({ error: 'User or article not found' });
  }

  try {
    const comment = await Comment.create({
      content,
      ArticleId: articleId,
      UserId: req.user.id
    });

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/comments', async (req, res) => {
  const { articleId } = req.query;
  const comments = await Comment.findAll({
    where: { ArticleId: articleId },
    include: { model: User, attributes: ['pseudo'] },
    order: [['createdAt', 'ASC']]
  });

  res.json(comments);
});

module.exports = router;
