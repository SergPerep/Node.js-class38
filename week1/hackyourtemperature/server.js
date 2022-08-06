import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`--- Server is running on port ${PORT}`);
});
