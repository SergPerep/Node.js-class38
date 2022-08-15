import express from "express";
const app = express();
import handleErrors from "./handleErrors.js";
import { AppError, NotFoundError } from "./AppErrors.js";
import { API_KEY } from "./sources/keys.js";
import fetch from "node-fetch";

const PORT = process.env.PORT || 3000;

app.use(express.json());

const logRequests = (req, res, next) => {
  console.log("\x1b[32m%s\x1b[0m", `-- ${req.method} ${req.path}`);
  next();
};

app.use(logRequests);

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", async (req, res, next) => {
  try {
    const { cityName } = req.body;

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await fetch(URL);

    if (response.status === 404) throw new NotFoundError("City not found!");
    const resData = await response.json();
    const temp = resData.main.temp;
    res.send({ cityName, temp });
  } catch (error) {
    next(error);
  }
});

app.use("*", (req, res) => {
  throw new AppError(`Cannot ${req.method} ${req.originalUrl}`, 404);
});

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`-> Server is running on port ${PORT}`);
});
