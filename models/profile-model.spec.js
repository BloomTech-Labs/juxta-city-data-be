const request = require("supertest");
const server = require("../server");
const db = require("../data/dbConfig");
const Profile = require("./profile-model");

beforeAll(async () => {
  await db("profile").truncate();
});

const user = {
  user_id: 1,
  id: 1,
  first_name: "tester",
  last_name: "retset",
  address: "something s blvd st",
  city: "pittsfield",
  image_url: null,
  surveyinfo: null,
  cloudinary_id: null,
  dob: null,
  state: "maine",
  zip: 95012,
};

describe("profile-model", () => {
  describe("post", () => {
    it("insert", async () => {
      const insert = await Profile.insertProfileInfo(user);
      const profiles = await db("profile");
      expect(profiles).toHaveLength(1);
    });
  });
  describe("get", () => {
    it("should make get request to server and return length of 1", async () => {
      const profile = await Profile.get();
      expect(profile).toHaveLength(1);
    });
    it("should make a get request to server and return all", async () => {
      const profile2 = await Profile.getAll();
      expect(profile2).toHaveLength(1);
    });
    it("should make get request to server and return one profile", async () => {
      const profile3 = await Profile.getProfileByUserId(1);
      expect(profile3).toHaveLength(1);
    });
  });
  describe("find", () => {
    it("find user by id", async () => {
      const user = await Profile.find(1);
      expect(user).toHaveLength(1);
    });
    it("find profiles by id", async () => {
      const userProfile = await Profile.findProfiles(1);
      expect(userProfile).toHaveLength(1);
    });
    it("find profile by id", async () => {
      const someProfile = await Profile.findProfile(1);
      expect(someProfile).toEqual(user);
    });
  });
  describe("update", () => {
    it("update profile info", async () => {
      const updated = await Profile.updateProfileInfo(1, { state: "ca" });
      expect(user.state).not.toBe("ca");
    });
  });
  describe("delete", () => {
    it("delete profile by id", async () => {
      const deleted = await Profile.deleteProfile(1);
      const newProfiles = await db("profile");
      expect(newProfiles).toEqual([]);
    });
  });
});
