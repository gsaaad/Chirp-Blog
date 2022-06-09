const router = require("express").Router();
const User = require("../../models/User");

router.get("/", (req, res) => {
  // find all users and exclude password, another layer of security
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err, "There was an error in getting all users... Try again!");
    });
});
module.exports = router;
