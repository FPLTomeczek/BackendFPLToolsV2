const express = require("express");
const request = require("request");
require("dotenv").config();
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/team", (req, res) => {
  const { userID } = req.query;
  const url = `${process.env.FPL_API}/entry/${userID}/event/34/picks/`;
  request(url).pipe(res);
});

app.listen(port, () => console.log(`Server listens on port:${port}`));
