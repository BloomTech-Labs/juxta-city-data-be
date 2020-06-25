const request = require("supertest");
const server = require("../server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db("profile").truncate();
});

user = {
  username: "test",
  email: "test@test.com",
  password: "password",
};

let token;

beforeAll((done) => {
  request(server).post("/api/auth/signup").send(user);
  request(server)
    .post("/api/auth/signin")
    .send({ username: "test", password: "password" })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

// describe("user signin", () => {
//   it("should create and signin user", async () => {
//     await request(server)
//       .post("/api/auth/signup")
//       .send(user)
//       .set("authorization", res.body.token);

//     const response = await request(server).post("/api/auth/signin").send(user);
//   });
// });

describe("profile-router authentication", () => {
  // GET REQUESTS
  describe("GET", () => {
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
  xit("should return 200 from index route with JWT", () => {
    return request(server)
      .get("/api/profile/")
      .set("authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });
});
