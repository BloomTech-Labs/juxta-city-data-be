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
  beforeEach(async () => {
    await db.raw("truncate users, users restart identity cascade");
  });

  describe("the /api endpoints", async () => {
    it("should return a 404 status code", async () => {
      const response = await request(server).get("/api/auth/");
      expect(response.status).toEqual(404);
    });
    it("should return a JSON object", async () => {
      const response = await request(server).get("/api/auth");
      expect(response.type).toEqual("text/html");
    });
    it("should return an 400 status code with no payload for login", async () => {
      const response = await request(server).post("/api/auth/signup");
      expect(response.status).toEqual(400);
    });
    it("should return a JSON object from /signup", async () => {
      const response = await request(server)
        .post("/api/auth/signup")
        .send(newUser);
      expect(response.status).toBe(201);
      expect(response.type).toEqual("application/json");
    });
    it("should return an 400 status code from /signup with no payload for login", async () => {
      const response = await request(server).post("/api/auth/signin");
      expect(response.status).toEqual(400);
    });
    it("should return a JSON object from /signup", async () => {
      await request(server).post("/api/auth/signup").send(newUser);
      const response = await request(server)
        .post("/api/auth/login")
        .send(newUser);
      expect(response.status).toBe(200);
      expect(response.type).toEqual("application/json");
    });
  });
});
