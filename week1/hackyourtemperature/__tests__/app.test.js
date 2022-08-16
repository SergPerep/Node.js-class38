import app from "../app.js";
import supertest from "supertest";
const request = supertest(app);

describe("POST /", () => {
  describe("OK", () => {

    it("Has status code 200", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "Amsterdam" });
      expect(response.statusCode).toBe(200);
    });

    it("Has cityName", async () => {
      const cityName = "London";
      const response = await request.post("/weather").send({ cityName });
      expect(response.body.cityName).toBeDefined();
    });

    it("Has temperature", async() => {
      const response = await request.post("/weather").send({ cityName: "Amsterdam" });
      expect(response.body.temp).toBeDefined();
    })
  });

  describe("City not found", () => {

    it("Has status code 404", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "ajugsdqwd" });
      expect(response.statusCode).toBe(404);
    });

    it("Sends 'weather text' in body: 'City not found!'", async() => {
      const response = await request
      .post("/weather")
      .send({ cityName: "ajugsdqwd" });
    expect(response.body.weatherText).toBeDefined();
    expect(response.body.weatherText).toBe("City not found!");
    })
  });

  describe("City is empty string", () => {
    it("Has status code 400", async () => {
      const response = await request.post("/weather").send({ cityName: "" });
      expect(response.statusCode).toBe(400);
    });

    it("Sends error in body: 'Missing credentials: cityName'", async() => {
      const response = await request
      .post("/weather")
      .send({ cityName: "" });
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe("Missing credentials: cityName");
    });
  });

  describe("City is not provided", () => {

    it("Has status code 400", async () => {
      const response = await request.post("/weather").send({});
      expect(response.statusCode).toBe(400);
    });

    it("Sends error in body: 'Missing credentials: cityName'", async() => {
      const response = await request
      .post("/weather")
      .send({});
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe("Missing credentials: cityName");
    });
  });
});

describe("Nonexisting path", () => {
  it("Has status code 404", async () => {
    const response = await request.get("/o;ihaef/aef");
    expect(response.statusCode).toBe(404);
  });

  it("Sends error in body: 'Cannot <method> <path>'", async() => {
    const response = await request
    .post("/ilaugefa/awef")
    .send({ cityName: "Amsterdam" });
  expect(response.body.error).toBeDefined();
  expect(response.body.error).toBe("Cannot POST /ilaugefa/awef");
  });
});
