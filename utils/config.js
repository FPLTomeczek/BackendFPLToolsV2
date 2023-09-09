const dev = {
  frontURL: "http://localhost:5173",
  apiURL: "http://localhost:3001/api",
};

const prod = {
  frontURL: "https://fpltools.onrender.com",
  apiURL: "https://fpltools-api.onrender.com/api",
};

const configURL = process.env.NODE_ENV === "development" ? dev : prod;

module.exports = { configURL };
