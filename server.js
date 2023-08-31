const express = require("express");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const {
  playersRouter,
  playersHistoryRouter,
  fixturesRouter,
  teamsRouter,
  gameweeksRouter,
} = require("./router/index");
const { default: axios } = require("axios");

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/picks", cors(), async (req, res) => {
  const { userID } = req.query;
  try {
    const gameweeks = await axios.get(
      "https://fpltools-api.onrender.com/api/gameweeks"
    );
    const nextGW = gameweeks.data.find((gw) => gw.finished === false).id;
    const response = await axios.get(
      `${process.env.FPL_API}/entry/${userID}/event/${nextGW}/picks/`
    );
    res.json(response.data);
  } catch (error) {
    res.json({ msg: `User team with id: ${userID} not found` });
  }
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

app.use("/api/players", playersRouter);
app.use("/api/players-history", playersHistoryRouter);
app.use("/api/fixtures", fixturesRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/gameweeks", gameweeksRouter);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listens on port:${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
