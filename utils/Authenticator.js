const authUser = (req, res, next) => {
  if (!req.sesssion.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = authUser;
