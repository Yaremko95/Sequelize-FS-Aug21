import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Article = sequelize.define("article", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  //Way 3

  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: "authors",
      key: "id",
    },
  },

  // Way 2.
  //   author_id:{
  //       type:DataTypes.INTEGER
  //   }
});

export default Article;
