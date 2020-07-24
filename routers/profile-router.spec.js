const request = require("supertest");
const server = require("../server");
const db = require("../data/dbConfig");
const authentication = require("../middleware/authentication");
jest.mock("../middleware/authentication");

beforeEach(() => db.seed.run());
beforeEach(() => authentication.mockClear());
afterAll(() => db.destroy());

describe("profile-router", () => {
  it("should return 401 from index route", async () => {
    authentication.mockImplementationOnce((req, res, next) => {
      const token = req.headers.authorization;
      if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if (err) {
            res.status(401).json({ message: "Not authorized to enter" });
          } else {
            req.decodedJwt = decodedToken;
            next();
          }
        });
      } else {
        res.status(401).json({ message: "Not authorized token not present" });
      }
    });
    const response = await request(server).get("/api/profile/");
    expect(response.status).toEqual(401);
  });
  it("should return 200 and get from index route", async () => {
    const response = await request(server).get("/api/profile/");
    expect(response.status).toEqual(200);
    expect(authentication).toBeCalled();
  });
  it("should return 200 and get", async () => {
    const response = await request(server).get("/api/profile/all");
    expect(response.status).toEqual(200);
    expect(authentication).toBeCalled();
  });
  it("should return 200 for get by user id", async () => {
    const response = await request(server).get("/api/profile/1/user");
    expect(response.status).toEqual(200);
    expect(authentication).toBeCalled();
  });
  it("should return 200 and get user by id", async () => {
    const response = await request(server).get("/api/profile/1");
    expect(response.status).toEqual(200);
    expect(authentication).toBeCalled();
  });
  it("should return 200 and gets all profile info based on user id", async () => {
    const response = await request(server).get("/api/profile/1/all");
    expect(response.status).toEqual(200);
    expect(authentication).toBeCalled();
  });
  it("should return 201 and post new profile endpoint", async () => {
    const response = await request(server)
      .post("/api/profile/6")
      .send({ first_name: "something", last_name: "else", user_id: 6 });
    expect(response.status).toEqual(201);
    expect(authentication).toBeCalled();
  });
  it("should return 200 and put update profile", async () => {
    const response = await request(server)
      .put("/api/profile/1")
      .send({ first_name: "name_test" });
    expect(response.status).toEqual(200);
    expect(authentication).toBeCalled();
  });
  it("should return 200 and delete the user's profile", async () => {
    const response = await request(server).delete("/api/profile/1");
    expect(response.status).toEqual(200);

    const user = await request(server).get("/api/profile/1");
    expect(user.status).toEqual(404);
  });
  // xit("should return 200 and update profile answers", async () => {
  //   const response = await request(server).put("/api/profile/1/answers").send();
  // });
});
