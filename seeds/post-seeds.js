const { Post } = require("../models");

const postData = [
  {
    title: "Post1",
    post_text: "THIS IS THE POST TEXT!!!!!",
    post_url: "http://example.org/boat/argument",
    user_id: 1,
  },
  {
    title: "Post2",
    post_text: "THIS IS THE POST TEXT!!!!!",
    post_url: "http://example.org/boat/argument",
    user_id: 2,
  },
  {
    title: "Post3",
    post_text: "THIS IS THE POST TEXT!!!!!",
    post_url: "http://example.org/boat/argument",
    user_id: 3,
  },
  {
    title: "Post4",
    post_text: "THIS IS THE POST TEXT!!!!!",
    post_url: "http://example.org/boat/argument",
    user_id: 4,
  },
  {
    title: "Post1",
    post_text: "THIS IS THE POST TEXT!!!!!",
    post_url: "http://example.org/boat/argument",
    user_id: 1,
  },
  {
    title: "Post2",
    post_text: "THIS IS THE POST TEXT!!!!!",
    post_url: "http://example.org/boat/argument",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
