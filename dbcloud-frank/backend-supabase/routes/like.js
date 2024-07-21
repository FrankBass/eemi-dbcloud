const { Router } = require('express');
const Like = require('../models/like');
const checkAuth = require('../middlewares/checkAuth');

const router = new Router();

router.post('/likes', checkAuth(), async (req, res) => {
  const { articleId } = req.body;
  const like = await Like.create({
    ArticleId: articleId,
    UserId: req.user.id,
  });

  res.json(like);
});

router.delete('/likes', checkAuth(), async (req, res) => {
  const { articleId } = req.body;
  const like = await Like.findOne({
    where: {
      ArticleId: articleId,
      UserId: req.user.id,
    },
  });

  if (!like) {
    return res.sendStatus(404);
  }

  await like.destroy();
  res.sendStatus(204);
});

module.exports = router;
