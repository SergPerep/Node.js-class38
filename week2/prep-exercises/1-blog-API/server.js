const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const handleErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  console.error(err);
  res.status(err.statusCode).json({ error: err.message });
};

const genPath = title => `./blogs/${title}.txt`;

app.use(express.json()); // decode request body as json

// GET ALL POSTS
app.get("/blogs", (req, res) => {
  const posts = fs.readdirSync("./blogs").map((file) => ({
    title: file.replace(/.txt$/, ""), // remove .txt in the name of the file
  }));
  res.send(posts);
});

// CREATE A NEW POST
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  const path = genPath(title);

  if (fs.existsSync(path)) {
    const err = new Error("File already exists");
    err.statusCode = 400;
    throw err;
  }
  fs.writeFileSync(path, content);
  res.send({ message: "Blog post saved" });
});

// UPDATE A POST
app.put("/posts/:title", (req, res) => {
  const title = req.params.title;
  const { content } = req.body;
  const path = genPath(title);

  if (!fs.existsSync(path)) {
    const err = new Error("This post does not exist!");
    err.statusCode = 400;
    throw err;
  }
  fs.writeFileSync(path, content);
  res.end("ok");
});

// DELETE A POST
app.delete("/blogs/:title", (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title;
  const path = genPath(title);

  if (!fs.existsSync(path)) {
    const err = new Error("This post does not exist!");
    err.statusCode = 400;
    throw err;
  }

  fs.unlinkSync(path);
  res.end("ok");
});

// GET A POST
app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const path = genPath(title);

  if (!fs.existsSync(path)) {
    const err = new Error("This post does not exist!");
    err.statusCode = 400;
    throw err;
  }

  const content = fs.readFileSync(path);
  res.send(content);
});

// HANDLE ERRORS
app.use(handleErrors);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
