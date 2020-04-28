const request = require("supertest");
const server = require("../server.js");

describe("users-router.js", () => {
  it("should return a status code of 200", async () => {
    const response = await request(server).get("/");
    expect(response.status).toEqual(200);
  });
  it("should return a status of 404 if not logged in for /:id", async () => {
    const response = await request(server).get("/1");
    expect(response.status).toEqual(404);
  });
  it("should return a status of 404 if not logged in for /:id/favorites", async () => {
    const response = await request(server).get("/1/favorites");
    expect(response.status).toEqual(404);
  });
  it("should return a status of 404 if not logged in for /:id/favorites/:cityId", async () => {
    const response = await request(server).get("/1/favorites/1");
    expect(response.status).toEqual(404);
  });

  it("expects JSON", () => {
    return request(server).get("/").expect("Content-Type", /html/);
  });
});
