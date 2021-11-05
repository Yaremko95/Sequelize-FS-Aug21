import express from "express";
import models from "../../db/models/index.js";
import { articles } from "../../data/articles.js";
const { Article, Author, ArticleCategory, Category } = models;
import sequelize from "sequelize";
const { Op } = sequelize;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      console.log(req.query);
      const articles = await Article.findAndCountAll({
        include: [
          {
            model: Category,
            // where: {
            //   ...(req.query.category && {
            //     name: [req.query.category],
            //   }),
            // },
            through: { attributes: [] },
          },
          Author,
        ],
        //   order: [["createdAt", "DESC"]],

        //SEARCH BY TITLE ONLY
        // where: {
        //   ...(req.query.title && {
        //     title: {
        //       [Op.iLike]: `%${req.query.title}%`,
        //     },
        //   }),
        // },

        //SEARCH BY TITLE OR BY CONTENT

        where: {
          ...(req.query.search && {
            [Op.or]: [
              { title: { [Op.iLike]: `%${req.query.search}%` } },
              { content: { [Op.iLike]: `%${req.query.search}%` } },
            ],
          }),
        },

        limit: req.query.size,
        offset: parseInt(req.query.size * req.query.page),
      });
      res.send({
        data: articles.rows,
        total: articles.count,
        pages: Math.ceil(articles.count / req.query.size),
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { categories, ...rest } = req.body;
      const newArticle = await Article.create(rest);

      //assign one category
      // await ArticleCategory.create({
      //   categoryId: req.body.categoryId,
      //   articleId: newArticle.id,
      // });

      //assign multiple
      const valuesToInsert = categories.map((category) => ({
        categoryId: category,
        articleId: newArticle.id,
      }));
      console.log({ valuesToInsert });

      await ArticleCategory.bulkCreate(valuesToInsert);

      res.send(newArticle);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.route("/:articleId/categories").post(async (req, res, next) => {
  try {
    const { categories } = req.body;
    const values = categories.map((category) => ({
      categoryId: category,
      articleId: req.params.articleId,
    }));
    console.log({ values });
    const data = await ArticleCategory.bulkCreate(values);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.route("/bulkCreate").post(async (req, res, next) => {
  try {
    const data = await Article.bulkCreate(articles);
    res.send(data);
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
