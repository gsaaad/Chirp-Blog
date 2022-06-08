const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");

const sequelize = require("./config/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(require("./controllers"))

sequelize.sync({ force: false }).then(() => {
  console.log(`now listening on ${PORT}`);
});
