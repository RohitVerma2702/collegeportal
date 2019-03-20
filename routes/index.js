var express = require('express');
var router = express.Router();
var session = require('express-session');
var nodemailer = require("nodemailer");
var app = express();

var sess;
function requireLogin(req, res, next) {
  if (req.session.active) {
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect("/s1"); // or render a form, etc.
  }
}
app.all("/*", requireLogin, function (req, res, next) {
  next(); // if the middleware allowed us to get here,
  // just move on to the next route handler
});
router.get('/', function (req, res, next) {
  sess = req.session;

  if (sess.active) {
    res.redirect('/' + sess.type + '/Home#!/');

  }
  else {
    res.render('view3');
  }
});

router.get('/logout', function (req, res, next) {
  sess = req.session;
  console.log(sess.user + ' is logged out');
  req.session.destroy(function (err) {
    if (err) throw err;
  });
  res.render('view3', { title: 'Members' });
})

module.exports = router;
