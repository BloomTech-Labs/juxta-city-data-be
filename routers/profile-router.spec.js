const request = require("supertest");
const server = require("../server");
const db = require("../data/dbConfig");

let token;

describe("server.js", () => {
  beforeEach(async () => {
    await db("profile").truncate();
  });
});

describe("token", () => {
  beforeAll(() => {
    request(server)
      .post("/api/auth/signup")
      .send({
        username: "test123",
        password: "password",
      })
      .then((res) => {
        request(server)
          .post("/api/auth/signin")
          .send({
            username: "test123",
            password: "password",
          })
          .end((err, response) => {
            token = response.body.token; // save the token!
          });
      });
  });
});

describe("profile-router authentication", () => {
  // GET REQUESTS
  it("should return 401 status code from index route without JWT", async () => {
    const response = await request(server).get("/api/profile/");
    expect(response.status).toEqual(401);
  });
  it("should return 401 status code from /all", async () => {
    const response = await request(server).get("/api/profile/all");
    expect(response.status).toEqual(401);
  });
  it("should return 401 status code from /:id/user", async () => {
    const response = await request(server).get("/api/profile/:id/user");
    expect(response.status).toEqual(401);
  });
  it("should return 401 status code from /:id", async () => {
    const response = await request(server).get("/api/profile/:id");
    expect(response.status).toEqual(401);
  });
  it("should return 401 status code from /:id/all", async () => {
    const response = await request(server).get("/api/profile/:id/all");
    expect(response.status).toEqual(401);
  });
  // POST REQUEST
  it("should return 401 status code from /:id", async () => {
    const response = await request(server).post("/api/profile/:id");
    expect(response.status).toEqual(401);
  });
  // PUT REQUEST
  it("should return a 401 status code from /:id", async () => {
    const response = await request(server).put("/api/profile/:id");
    expect(response.status).toEqual(401);
  });
  // DELETE REQUEST
  it("should return a 401 status code from /:id", async () => {
    const response = await request(server).delete("/api/profile/:id");
    expect(response.status).toEqual(401);
  });
});

describe("profile-router with jwt", () => {
  it("should return 200 from index route with JWT", async () => {
    const response = await request(server)
      .get("/api/profile/")
      .set("authorization", token);
    expect(response.status).toEqual(200);
  });
});
