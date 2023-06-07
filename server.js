const express = require("express");
const connectDB = require("./db/connect");

require("dotenv").config();
const request = require("request");
const cors = require("cors");
const playerRouter = require("./router/players");
const playerHistoryRouter = require("./router/playersHistory");
const fixturesRouter = require("./router/fixtures");
const { default: axios } = require("axios");

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/team", cors(), async (req, res) => {
  const { userID } = req.query;
  const response = await axios.get(
    `${process.env.FPL_API}/entry/${userID}/event/34/picks/`
  );
  res.json(response.data);
});

app.get("/api/manager-history", cors(), async (req, res) => {
  const { userID } = req.query;
  const response = await axios.get(
    `${process.env.FPL_API}/entry/${userID}/history/`
  );
  res.json(response.data);
});

app.get("/api/transfers", cors(), async (req, res) => {
  const { userID } = req.query;
  const response = await axios.get(
    `${process.env.FPL_API}/entry/${userID}/transfers/`
  );
  res.json(response.data);
});

app.use("/api/players", playerRouter);
app.use("/api/players-history", playerHistoryRouter);
app.use("/api/fixtures", fixturesRouter);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listens on port:${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
