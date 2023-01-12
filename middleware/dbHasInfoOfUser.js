//when the database already has the full information of the user
const dbHasInfoOfUser = (req, res, next) => { 
    if (req.session.currentUser.age && req.session.currentUser.gender && req.session.currentUser.weight && req.session.currentUser.height) {
      next();
    } else {
      res.redirect("/user-profile/edit")
    }; 
};
module.exports = dbHasInfoOfUser;