// import dependencies and files we need
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// config dot.env, use PORT in env

require("dotenv").config();

const PORT = process.env.PORT || 3001;
// initiate a session
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// let app use these tools
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

sequelize.sync({ force: false }).then(() => {
  app.listen(
    (PORT,
    () => {
      console.log(`Backend Server Online~! Now listening on ${PORT}`);
    })
  );
});
