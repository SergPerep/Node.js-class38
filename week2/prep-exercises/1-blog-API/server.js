const { ok } = require("assert");
const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 3000;

app.use(express.json()); // decode request body as json

// YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/blogs", (req, res) => {
  const posts = fs.readdirSync("./blogs").map(file => ({
    title: file.replace(/.txt$/, "") // remove .txt in the name of the file
  }));
  res.send(posts);
});

app.post("/blogs", (req, res) => {
  try {
    const { title, content } = req.body;
    const path = `./blogs/${title}.txt`;
    if (fs.existsSync(path))
      return res.status(400).send({
        status: 400,
        error: "File already exists",
      });
    fs.writeFileSync(path, content);
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
  const path = `./blogs/${title}.txt`;
  if (!fs.existsSync(path))
    return res.status(400).send({
      status: 400,
      error: "This post does not exist!",
    });
  fs.writeFileSync(path, content);
  res.end("ok");
});

app.delete("/blogs/:title", (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title;
  const path = `./blogs/${title}.txt`;

  if (!fs.existsSync(path))
    return res.status(400).send({
      status: 400,
      error: "This post does not exist!",
    });

  fs.unlinkSync(path);
  res.end("ok");
});

app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const path = `./blogs/${title}.txt`;

  if (!fs.existsSync(path))
    return res.status(400).send({
      status: 400,
      error: "This post does not exist!",
    });

  const content = fs.readFileSync(path);
  res.send(content);
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
