import express from "express";
const app = express();
import handleErrors from "./handleErrors.js";
import { AppError } from "./AppErrors.js";

const PORT = process.env.PORT || 3000;

app.use(express.json());

const logRequests = (req, res, next) => {
  console.log("\x1b[32m%s\x1b[0m", `-- ${req.method} ${req.path}`);
  next();
}

app.use(logRequests);

app.get("/", (req, res) => {
  try {
    res.send("Hello from backend to frontend!");
  } catch (error) {
    console.error(error);
  }
});

app.post("/weather", (req, res) => {
  try {
    const { cityName } = req.body;
    res.send(cityName);
  } catch (error) {
    console.error(error);
  }
});


app.use("*", (req, res) => {
  throw new AppError(`Cannot ${req.method} ${req.originalUrl}`, 404);
})
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`-> Server is running on port ${PORT}`);
});
