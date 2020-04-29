const request = require("supertest");
const server = require("../server.js");

describe("users-router.js", () => {
  it("should return a status code of 401 without JWT", async () => {
    const response = await request(server).get("/api/users/");
    expect(response.status).toEqual(401);
  });
  it("should return a status of 401 without JWT for /:id", async () => {
    const response = await request(server).get("/api/users/1");
    expect(response.status).toEqual(401);
  });
  it("should return a status of 401 without JWT for /:id/favorites", async () => {
    const response = await request(server).get("/api/users/1/favorites");
    expect(response.status).toEqual(401);
  });
  it("should return a status of 401 without JWT for /:id/favorites/:cityId", async () => {
    const response = await request(server).get("/api/users/1/favorites/1");
    expect(response.status).toEqual(401);
  });

  it("expects HTML", () => {
    return request(server).get("/api/users/").expect("Content-Type", /json/);
  });
});
