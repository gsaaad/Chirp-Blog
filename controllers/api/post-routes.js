const router = require("express").Router();
const { Post, User } = require("../../models");
const authUser = require("../../utils/Authenticator");

// get all posts
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
// get posts by id
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
// create Post
router.post("/", authUser, (req, res) => {
  Post.create({
    // take body title, post_text, post_url and check session for User_id and create post with these
    title: req.body.title,
    post_text: req.body.post_text,
    post_url: req.body.post_url,
    user_id: req.session.user_id,
  })
    .then((postData) => {
      res.json(postData);
    })
    .catch((err) => {
      console.log("There was an error in posting/creating new post " + err);
      res.status(500).json(err);
    });
});

// update the post
router.put("/:id", authUser, (req, res) => {
  console.log("id", req.params.id);

  Post.update(
    {
      title: req.body.title,
      post_text: req.body.post_text,
      post_url: req.body.post_url,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "There's no post with this ID" });
        return;
      }

      res.json(postData);
    })
    .catch((err) => {
      console.log(
        "There's an error when updating the post [title or post text]" + err
      );
      res.status(500).json(err);
    });
});

// delete post
router.delete("/:id", authUser, (req, res) => {
  console.log("id", req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "There's no post with this id" });
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log("There's an error when deleting a post.. Try again!" + err);
      res.status(500).json(err);
    });
});

module.exports = router;
