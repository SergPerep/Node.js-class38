/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */
import fetch from "node-fetch";

const printBooks = async (username, password) => {
  // YOUR CODE GOES IN HERE
  try {
    if (!username) throw new Error("Missing credentials: username");
    if (!password) throw new Error("Missing credentials: password");
    const authCred = btoa(username + ":" + password);
    const response = await fetch(
      "https://restapiabasicauthe-sandbox.mxapps.io/api/books",
      {
        headers: {
          "Authorization": `Basic ${authCred}`,
        },
      }
    );
    const resData = await response.json();
    console.log(resData);
  } catch (error) {
    console.error(error);
  }
};

printBooks("admin", "hvgX8KlVEa");
