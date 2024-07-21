const { Router } = require("express");
const Article = require("../models/article");
const User = require("../models/user");
const checkAuth = require("../middlewares/checkAuth");
const { Op } = require("sequelize");

const router = new Router();

// Récupérer tous les articles publiés
router.get('/articles', async (req, res) => {
  const { status, authorId } = req.query;
  const filters = [];

  if (status) {
    filters.push({ status });
  }

  if (authorId) {
    filters.push({ UserId: authorId });
  }

  const articles = await Article.findAll({
    where: {
      [Op.and]: filters,
    },
    include: { model: User, as: 'user', attributes: ['pseudo'] },
  });

  res.json(articles);
});

// Récupérer un article spécifique par son ID
router.get('/articles/:id', async (req, res) => {
  const article = await Article.findByPk(req.params.id, {
    include: { model: User, as: 'user', attributes: ['pseudo'] },
  });

  if (!article || article.status === 'DRAFT') {
    return res.sendStatus(404);
  }

  res.json(article);
});

// Créer un nouvel article (nécessite une authentification)
router.post('/articles', checkAuth(), async (req, res) => {
  const { title, content, image_url, status } = req.body;
  const article = await Article.create({
    title,
    content,
    image_url,
    status,
    UserId: req.user.id,
  });
  res.json(article);
});

// Mettre à jour un article existant (nécessite une authentification)
router.put('/articles/:id', checkAuth(), async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  if (!article || article.UserId !== req.user.id) {
    return res.sendStatus(403);
  }
  const { title, content, image_url, status } = req.body;
  await article.update({ title, content, image_url, status });
  res.json(article);
});

module.exports = router;
