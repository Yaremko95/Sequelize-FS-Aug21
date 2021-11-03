import express from "express";
import models from "../../db/models/index.js";
const { Article, Author } = models;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const articles = await Article.findAll({ include: Author });
      res.send(articles);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newArticle = await Article.create(req.body);
      res.send(newArticle);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const article = await Article.findByPk(req.params.id);
      res.send(article);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updated = await Article.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(updated);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Article.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ rows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;
