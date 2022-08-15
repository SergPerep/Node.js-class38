/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

import fetch from "node-fetch";

const baseURL = "https://reservation100-sandbox.mxapps.io/api";
const makeReservation = async (name, numberOfPeople) => {
  // YOUR CODE GOES IN HERE
  try {
    if (!(name && typeof name === "string")) throw new Error("Name is not correct");
    if(!(numberOfPeople && typeof numberOfPeople === "number" && numberOfPeople > 0)) throw new Error("Number of people is not correct");
    const body = { name, numberOfPeople };
    const response = await fetch(`${baseURL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    const resData = await response.json();
    console.log(resData)
  } catch (error) {
    console.error(error);
  }
};

makeReservation("Alan Woo", 3);
