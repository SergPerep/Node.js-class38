const express = require('express')
const app = express();

const PORT = process.env.PORT || 3000;

// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
})