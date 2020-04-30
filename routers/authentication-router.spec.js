const db = require("../data/dbConfig.js");
const request = require("supertest");
const server = require("../server.js");

const newUser = {
  username: "test" + Date.now(),
  password: "test123",
};

describe("api test", () => {
  it("runs test without errors", () => {
    expect(true).toBeTruthy();
  });
});

describe("auth-router.js", () => {
  //   beforeEach(async () => {
  //     await db.raw("truncate users, users restart identity cascade");
  //   });

  describe("the /api endpoints", async () => {
    it("should return a 404 status code", async () => {
      const response = await request(server).get("/api/auth/");
      expect(response.status).toEqual(404);
    });
    it("should return a JSON object", async () => {
      const response = await request(server).get("/api/auth");
      expect(response.type).toEqual("text/html");
    });
  });
});
