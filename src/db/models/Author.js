import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Author = sequelize.define(
  "authors",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
