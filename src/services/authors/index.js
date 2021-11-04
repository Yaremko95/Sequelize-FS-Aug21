import express from "express";
import models from "../../db/models/index.js";
import Review from "../../db/models/Review.js";
import { authors } from "../../data/authors.js";
const { Author, Article } = models;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const authors = await Author.findAll({
        include: { model: Article, include: Review },
      });
      res.send(authors);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Author.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.route("/bulkCreate").post(async (req, res, next) => {
  try {
    const data = await Author.bulkCreate(authors);
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
      const author = await Author.findByPk(req.params.id);
      res.send(author);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      delete req.body.email;
      delete req.body.id;
      const newAuthor = await Author.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
          returning: true,
        }
      );
      res.send(newAuthor[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Author.destroy({
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
