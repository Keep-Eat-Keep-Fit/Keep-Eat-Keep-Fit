//in case the live of session come to end,we need to let the user login again
const isLoggedIn = (req, res, next) => {
  if(req.session.currentUser){
      next(); 
  } else {
      res.redirect("/login")
  }
};
module.exports = isLoggedIn;