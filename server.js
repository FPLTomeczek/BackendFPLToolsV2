const express = require("express");
const connectDB = require("./db/connect");

require("dotenv").config();
const request = require("request");
const playerRouter = require("./router/players");

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

app.use("/api/players", playerRouter);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listens on port:${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();