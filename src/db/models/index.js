import Author from "./Author.js"; //3.
import Article from "./Article.js";

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

export default { Author, Article };
