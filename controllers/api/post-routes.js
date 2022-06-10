const router = require("express").Router();
const { Post, User } = require("../../models");
const authUser = require("../../utils/Authenticator");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_text", "post_url", "created_at"],
    include: [
      {
        model: User,
        attributes: ["userName"],
      },
    ],
  })
    .then((postData) => {
      res.json(postData);
    })
    .catch((err) => {
      console.log("There's an error in getting all posts");
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_text", "post_url", "created_at"],
    include: [{ model: User, attributes: ["userName"] }],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "There's no post with this ID" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log("There's an error with getting a post by its ID" + err);
      res.status(500).json(err);
    });
});

router.post("/", authUser, (req, res) => {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    post_url: req.body.post_url,
    user_id: req.sessionID,
  })
    .then((postData) => {
      res.json(postData);
    })
    .catch((err) => {
      console.log("There was an error in posting/creating new post " + err);
      res.status(500).json(err);
    });
});
module.exports = router;
