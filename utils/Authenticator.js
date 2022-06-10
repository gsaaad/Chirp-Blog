// authenticating the user's password
const authUser = (req, res, next) => {
  // todo change to session when logging in, insomnia doesn't check session
  if (!req.body.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = authUser;
