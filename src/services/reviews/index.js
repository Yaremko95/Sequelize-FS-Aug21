import express from "express";
import models from "../../db/models/index.js";
import { reviews } from "../../data/reviews.js";
const { Author, Article, Review } = models;
const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [
        Author,
        {
          model: Article,
          attributes: {
            exclude: ["image"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.route("/bulkCreate").post(async (req, res, next) => {
  try {
    const data = await Review.bulkCreate(reviews);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.route("/:articleId/:authorId").post(async (req, res, next) => {
  try {
    const article = await Review.create({
      text: req.body.text,
      articleId: req.params.articleId,
      authorId: req.params.authorId,
    });
    res.send(article);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      //const review = await Review.findByPk(req.params.id)
      const review = await Review.findOne({
        where: {
          id: req.params.id,
        },
      });

      res.send(review);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const review = await Review.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(review);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Review.destroy({
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
