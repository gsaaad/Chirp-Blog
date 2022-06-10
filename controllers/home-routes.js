const router = require("express").Router();

const { User, Post } = require("../models");

// homepage

router.get("/", (req, res) => {
  console.log("Homepage");
  Post.findAll({
    attributes: ["id", "title", "post_url", "post_text", "created_at"],
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName", "userName"],
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("homepage", {
        posts,
        logginedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(
        "There's an error in getting all posts, render, in home routes" + err
      );
    });
});

// router.get("/post/:id", (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "title", "post_url", "post_text", "created_at"],
//     include: [
//       {
//         model: User,
//         attributes: ["firstName", "lastName", "userName"],
//       },
//     ],
//   })
//     .then((postData) => {
//       if (!postData) {
//         res
//           .status(404)
//           .json({ message: "There's no post with this ID.. Try again" });
//         return;
//       }
//       const post = postData.get({ plain: true });
//       res.render("single-post", {
//         post,
//         loggedIn: req.session.loggedIn,
//       });
//     })
//     .catch((err) => {
//       console.log(
//         "There's an error in getting post by ID, in home routes" + err
//       );
//     });
// });

module.exports = router;
