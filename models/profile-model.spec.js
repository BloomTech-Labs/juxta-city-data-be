const db = require("../data/dbConfig");
const Profile = require("./profile-model");

beforeEach(() => db.seed.run());

// const user = {
//   user_id: 1,
//   first_name: "Lester",
//   last_name: "Kester",
//   dob: "2001-02-02",
//   address: "876 w 16th St",
//   city: "New York",
//   state: "New York",
//   zip: 92312,
// };

describe("profile-model", () => {
  describe("post", () => {
    it("insert", async () => {
      const insert = await Profile.insertProfileInfo({
        user_id: 5,
        first_name: "tester2",
        last_name: "retset2",
        address: "something s blvd st2",
        city: "pittsfield2",
        image_url: null,
        surveyinfo: null,
        cloudinary_id: null,
        dob: null,
        state: "maine2",
        zip: 95012,
      });
      const profiles = await db("profile");
      expect(profiles).toHaveLength(6);
    });
  });
  describe("get", () => {
    it("should make get request to server and return length of 1", async () => {
      const profile = await Profile.get();
      expect(profile).toHaveLength(5);
    });
    it("should make a get request to server and return all", async () => {
      const profile2 = await Profile.getAll();
      expect(profile2).toHaveLength(5);
    });
    it("should make get request to server and return one profile", async () => {
      const profile3 = await Profile.getProfileByUserId(5);
      expect(profile3).toHaveLength(1);
    });
  });
  describe("find", () => {
    it("find user by id", async () => {
      const user = await Profile.find(5);
      expect(user).toHaveLength(1);
    });
    it("find profiles by id", async () => {
      const userProfile = await Profile.findProfiles(5);
      expect(userProfile).toHaveLength(1);
    });
    it("find profile by id", async () => {
      const someProfile = await Profile.findProfile(1);
      expect({ first_name: "Lester" }).toBeTruthy();
    });
  });
  describe("update", () => {
    it("update profile info", async () => {
      const updated = await Profile.updateProfileInfo(1, {
        address: "something s blvd st",
        city: "pittsfield",
        first_name: "tester",
        last_name: "retset",
        state: "ca",
        zip: 95012,
      });

      const updatedUser = await Profile.getProfileByUserId(1);
      console.log(updatedUser);
      expect(updatedUser[0].state).toBe("ca");
    });
  });
  describe("delete", () => {
    it("delete profile by id", async () => {
      const deleted = await Profile.deleteProfile(6);
      const newProfiles = await db("profile");
      expect(newProfiles).toHaveLength(5);
    });
  });
});
