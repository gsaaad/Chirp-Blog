// get the dependencies and Models
const router = require("express").Router();
const { User, Post } = require("../../models");

// all users
router.get("/", (req, res) => {
  // find all users and exclude password, another layer of security
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err, "There was an error in getting all users... Try again!");
    });
});
// user by ID
router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_url", "created_at"],
      },
    ],
  })
    .then((userData) => {
      if (!userData) {
        res
          .status(404)
          .json({ message: "There's no user with this ID, Try again..." });
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err, "There's an error in getting a user by ID, Try again!");
    });
});
// create new ID // POST
router.post("/", (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.userName;
        req.session.loggedIn = true;
        res.json(userData);
      });
    })
    .catch((err) => {
      console.log(
        "There was an error in creating/session New User, Try again!"
      );
    });
});
module.exports = router;
