/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const { readFile } = require("fs");

const PORT = process.env.PORT || 3000;

//create a server
let server = http.createServer((req, res) => {
  // YOUR CODE GOES IN HERE
  switch (req.url) {
    case "/":
      readFile("./index.html", (err, buf) => {
        if (err) return console.error(err);
        const htmlStr = buf.toString();
        res.setHeader("Content-Type", "text/html");
        res.write(htmlStr);
        res.end();
      });
      break;
    case "/index.js":
      readFile("./index.js", (err, buf) => {
        if (err) return console.error(err);
        res.setHeader("Content-Type", "text/plain");
        const jsStr = buf.toString();
        res.write(jsStr);
        res.end();
      });
			break;
		case "/style.css":
			readFile("./style.css", (err, buf) => {
				if (err) return console.error(err);
				res.setHeader("Content-Type", "text/css");
				const cssStr = buf.toString();
				res.write(cssStr);
				res.end();
			})
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); // The server starts to listen on port 3000
