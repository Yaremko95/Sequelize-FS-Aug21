import Author from "./Author.js"; //3.
import Article from "./Article.js";
import Review from "./Review.js";
import Category from "./Category.js";
import ArticleCategory from "./ArticleCategory.js";
// WAY 1
//hasMany
//belongsTo

Author.hasMany(Article, { onDelete: "CASCADE" }); // creates authorId in Article. Get Authors including articles
Article.belongsTo(Author, { onDelete: "CASCADE" }); // creates authorId in Article. Get Articles including authors

//Way 2

// Author.hasMany(Article, { foreignKey: "author_id" }); // creates authorId in Article
// Article.belongsTo(Author, { foreignKey: "author_id" }); // creates authorIs in Article

//Way 3
// Author.hasMany(Article); // creates authorId in Article
// Article.belongsTo(Author); // creates authorIs in Article

//REVIEWS-ARTICLES
//hasMany(Review)
//belongsTo

Article.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Article, { onDelete: "CASCADE" });

//REVIEW=AUTHOR
Author.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Author, { onDelete: "CASCADE" }); // Get reviews including authors

//ARTICLE-CATEGORY

Article.belongsToMany(Category, {
  through: { model: ArticleCategory, unique: false },
});
Category.belongsToMany(Article, {
  through: { model: ArticleCategory, unique: false },
});

export default { Author, Article, Review, Category, ArticleCategory };
