const { ok } = require("assert");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use(express.json()); // decode request body as json

// YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/blogs", (req, res) => {
  try {
    const { title, content } = req.body;
    const pathToFile = path.join(__dirname, `/blogs/${title}.txt`);
    if (fs.existsSync(pathToFile))
      return res.status(400).send({
        status: 400,
        error: "File already exists",
      });
    fs.writeFileSync(pathToFile, content);
    res.send({
      status: 200,
      message: "Blog post saved",
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: 500,
      error: "Internal server error",
    });
  }
});

app.put("/posts/:title", (req, res) => {
  const title = req.params.title;
  const { content } = req.body;
  // What if the request does not have a title and/or content?
  const pathToFile = path.join(__dirname, `/blogs/${title}.txt`);
  console.log(pathToFile);
  if (!fs.existsSync(pathToFile))
    return res.send({
      status: 400,
      error: "This post does not exist!",
    });
  fs.writeFileSync(pathToFile, content);
  res.end("ok");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
