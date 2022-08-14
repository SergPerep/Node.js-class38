import express from "express";
import fs from "fs";
const app = express();
import { BadRequestError } from "./appErrors.js";
import handleErrors from "./handleErrors.js";

const PORT = process.env.PORT || 3000;

const genPath = (title) => `./blogs/${title}.txt`;

app.use(express.json()); // decode request body as json

// REQUEST LOGGER MIDDLEWARE
const logRequest = (req, res, next) => {
  console.log(`-- ${req.method} ${req.path}`);
  next();
};

// LOG REQUESTS
app.use(logRequest);

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
  res.status(201).send({ message: "Blog post saved" });
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
