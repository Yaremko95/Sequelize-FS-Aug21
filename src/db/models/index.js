import Author from "./Author.js"; //3.
import Article from "./Article.js";

// WAY 1
//hasMany
//belongsTo

// Author.hasMany(Article); // creates authorId in Article
// Article.belongsTo(Author); // creates authorIs in Article

//Way 2

// Author.hasMany(Article, { foreignKey: "author_id" }); // creates authorId in Article
// Article.belongsTo(Author, { foreignKey: "author_id" }); // creates authorIs in Article

//Way 3
Author.hasMany(Article); // creates authorId in Article
Article.belongsTo(Author); // creates authorIs in Article

export default { Author, Article };
