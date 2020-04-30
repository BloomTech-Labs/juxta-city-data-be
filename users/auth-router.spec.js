const db = require("../data/dbConfig.js");
const request = require("supertest");
const server = require("../server.js");

const newUser = {
  username: "test" + Date.now(),
  password: "test123",
};

describe("auth-router.js", () => {
  beforeEach(async () => {
    await db.raw("truncate users, users restart identity cascade");
  });

  describe("the /api endpoints", async () => {
    it("", async () => {
      const response = await request(server).get("");
      expect(response.status).toEqual();
    });
  });
});
