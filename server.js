const express = require("express");
const request = require("request");
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/team", (req, res) => {
  //   const { id } = req.body;
  const url =
    "https://fantasy.premierleague.com/api/entry/7770/event/34/picks/";

  request(url).pipe(res);
});

app.listen(port, () => console.log(`Server listens on port:${port}`));
