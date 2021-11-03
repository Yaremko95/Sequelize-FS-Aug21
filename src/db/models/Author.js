import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Author = sequelize.define(
  "authors",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        isEmail: true,
      },
    },
  }
  //   {
  //     timestamps: false,
  //   }
);

console.log("executes Author.js"); //4.

export default Author;
