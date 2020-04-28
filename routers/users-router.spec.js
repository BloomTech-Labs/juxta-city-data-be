const request = require("supertest");
const server = require("../server.js");

describe("users-router.js", () => {
  it("should return a status code of 200", async () => {
    const response = await request(server).get("/");
    expect(response.status).toEqual(200);
  });
});
