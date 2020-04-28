const router = require("express").Router();
const Users = require("../models/users-model.js");
const Favorites = require("../models/favorites-model.js");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.getAll();

    !users
      ? next({ message: "Error retrieving the users" })
      : res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await Users.getById(id);

    !user
      ? next({
          status: 404,
          message: "Error retrieving the user",
        })
      : res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  try {
    const updatedUser = await Users.update(user, id);

    !updatedUser
      ? next({
          status: 404,
          message: "Error updating the user",
        })
      : res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Users.remove(id);

    result !== 1
      ? next({
          status: 404,
          message: "Error deleting the user",
        })
      : res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
});

// user favorites endpoints
router.get("/:id/favorites", async (req, res, next) => {
  const { id } = req.params;

  try {
    const userFavorites = await Favorites.get(id);

    !userFavorites
      ? next({
          status: 404,
          message: "Error retrieving user favorites",
        })
      : res.status(200).json(userFavorites);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/favorites", async (req, res, next) => {
  const { id } = req.params;

  let userFavorite = req.body;
  userFavorite.user_id = id;

  try {
    const result = await Favorites.add(userFavorite);

    !result
      ? next({
          status: 404,
          message: "Error adding user favorite",
        })
      : res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id/favorites/:cityId", async (req, res, next) => {
  const { id } = req.params;
  const { cityId } = req.params;

  try {
    const result = await Favorites.remove(id, cityId);

    result !== 1
      ? next({
          status: 404,
          message: "Error deleting the favorite city",
        })
      : res.status(200).json({ message: "Favorite city succesfully deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
