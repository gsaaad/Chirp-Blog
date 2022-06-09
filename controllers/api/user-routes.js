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
// logging in
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      userName: req.body.userName,
    },
  }).then((userData) => {
    if (!userData) {
      res
        .status(400)
        .json({ message: "That username does not exist Try Again" });
      return;
    }
    // check for password
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password.. " });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.userName = userData.userName;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged In!" });
    });
  });
});
// logging out
router.post("/logout", (req, res) => {
  // if user is logged in
  if (req.session.loggedIn) {
    // destroy connection
    req.session.destroy(() => {
      console.log("Logging out~!");
      res
        .status(204)
        .json({ message: "You are now logged out... See you next time !!" })
        .end();
    });
  } else {
    res.status(404).end();
  }
});
// user updating information
router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData) {
        req
          .status(404)
          .json({ message: "There's no user with that id, Try again!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log("There's an error in updating a user.. Try again!");
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData) {
        res
          .status(404)
          .json({ message: "There's no user with that ID.. Try again" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log("There's an error when to delete a user.. Try again");
    });
});

module.exports = router;
