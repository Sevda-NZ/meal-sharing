import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();
const now = new Date();

// You can delete this route once you add your own routes
apiRouter.get("/future-meals", (req, res) => {
  knex("Meal")
    .select("*")
    .where("when", ">", now)
    .then((meals) => {
      res.send(meals);
    });
});

apiRouter.get("/past-meals", (req, res) => {
  knex("Meal")
    .select("*")
    .where("when", "<", now)
    .then((meals) => {
      res.send(meals);
    });
});

apiRouter.get("/all-meals", (req, res) => {
  knex("Meal")
    .select("*")
    .orderBy("id", "asc")
    .then((meals) => {
      res.send(meals);
    });
});
apiRouter.get("/first-meal", (req, res) => {
  knex("Meal")
    .select("*")
    .first("id")
    .then((meals) => {
      res.send(meals);
    });
});
apiRouter.get("/last-meal", (req, res) => {
  knex("Meal")
    .select("*")
    .limit(1)
    .then((meals) => {
      res.send(meals);
    });
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
