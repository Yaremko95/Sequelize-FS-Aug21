import express from "express";
import cors from "cors";
import { testConnection, connectDB } from "./db/index.js"; //1.
import authorsRouter from "./services/authors/index.js";
import articlesRouter from "./services/articles/index.js";
// import models from "./db/models/index.js"; //2.

const server = express();

const { PORT = 5001 } = process.env;

server.use(cors());

server.use(express.json());
server.use("/authors", authorsRouter);
server.use("/articles", articlesRouter);

server.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  await testConnection();
  await connectDB();
});

server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});
