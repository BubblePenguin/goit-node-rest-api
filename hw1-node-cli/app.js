const express = require("express");
const books = require("./data/books.js");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("./public/server.log", `\n${method} ${url} | ${date}`);
  next();
});

app.get("/", async (request, response) => {
  response.send(
    `<h2>OMFG IT WORKS</h2>\n<p>${request.method}</p>\n<p>${request.url}</p>`
  );
  // console.log(request);
});

app.get("/contacts", async (req, res) => {
  res.send();
});

app.get("/books", async (req, res) => {
  res.json(books);
});

app.use((req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

app.listen(3000, () => console.log("omg, im in web"));
