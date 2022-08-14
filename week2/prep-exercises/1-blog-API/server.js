import express from "express";
import fs from "fs";
const app = express();
import { BadRequestError } from "./appErrors.js";

const PORT = process.env.PORT || 3000;

// ERROR HANDLER MIDDLEWARE
const handleErrors = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    console.error(`${err.name}: ${err.message}`); // for developer
    res.status(err.statusCode).send({ error: err.message }); // for user
  }
  if (err.statusCode === 500) {
    console.error(err);
    res.status(err.statusCode).json({ error: err.message });
  }
};

const genPath = (title) => `./blogs/${title}.txt`;

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

  if (fs.existsSync(path)) throw new BadRequestError("File already exists");

  fs.writeFileSync(path, content);
  res.send({ message: "Blog post saved" });
});

// UPDATE A POST
app.put("/posts/:title", (req, res) => {
  const title = req.params.title;
  const { content } = req.body;
  const path = genPath(title);

  if (!fs.existsSync(path))
    throw new BadRequestError("This post does not exist!");

  fs.writeFileSync(path, content);
  res.end("ok");
});

// DELETE A POST
app.delete("/blogs/:title", (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title;
  const path = genPath(title);

  if (!fs.existsSync(path))
    throw new BadRequestError("This post does not exist!");

  fs.unlinkSync(path);
  res.end("ok");
});

// GET A POST
app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const path = genPath(title);

  if (!fs.existsSync(path))
    throw new BadRequestError("This post does not exist!");

  const content = fs.readFileSync(path);
  res.send(content);
});

// HANDLE ERRORS
app.use(handleErrors);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
