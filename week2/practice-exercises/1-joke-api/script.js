/**
 * 1. Chuck Norris programs do not accept input
 *
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console.
 * Make use of `async/await` and `try/catch`
 *
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */

import fetch from "node-fetch";

const printChuckNorrisJoke = async () => {
  // YOUR CODE GOES IN HERE
  try {
    const response = await fetch("http://api.icndb.com/jokes/random");
    const { type, value } = await response.json();
    if (type !== "success") throw new Error("Received bad response from api");
    console.log("..." + value.joke);
  } catch (error) {
    console.error(error);
  }
};

printChuckNorrisJoke();
