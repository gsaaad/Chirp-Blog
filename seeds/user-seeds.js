const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = [
  {
    firstName: "George",
    lastName: "Saad",
    userName: "Gsaaad",
    email: "gsaad0@cbc.ca",
    password: "password123",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    userName: "M22Johnson",
    email: "M22Johnson@cbc.ca",
    password: "test",
  },
  {
    firstName: "John",
    lastName: "Mike",
    userName: "JMike",
    email: "JMike@cbc.ca",
    password: "test",
  },
  ,
  {
    firstName: "Mary",
    lastName: "Elliot",
    userName: "MElliot",
    email: "MElliot@cbc.ca",
    password: "test",
  },
  {
    firstName: "Edward",
    lastName: "Lopez",
    userName: "ELopez",
    email: "ELopez@cbc.ca",
    password: "test",
  },
  {
    firstName: "Sydney",
    lastName: "Michelle",
    userName: "SMichelle",
    email: "SMichelle@cbc.ca",
    password: "test",
  },
  {
    firstName: "Michelle",
    lastName: "Johnson",
    userName: "MJohnson",
    email: "MJohnson@cbc.ca",
    password: "test",
  },
  {
    firstName: "Pardy",
    lastName: "Johnson",
    userName: "PJohnson",
    email: "PJohnson@cbc.ca",
    password: "test",
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
  });

module.exports = seedUsers;
