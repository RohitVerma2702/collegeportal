var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var staff = require('../models/staffdb')
var Grv = require('../models/grievancedb');
var Grvtype = require('../models/grvtypedb');
var datetime = require('node-datetime');
console.log('successful');
var dt = datetime.create();
var session = require('express-session');
var app = express();
var Mail_log = require('../models/Maildb');
var sess;
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  //secure: false,
  auth: {
    user: "gportal33@gmail.com",
    pass: "grievance001"
  }
});
var rand, mailOptions, host, link;
host = 'localhost:3000';
function requireLogin(req, res, next) {
  console.log(req.session.active)
  if (req.session.active == 1 && req.session.type == 'staff') { /*if someone is logged in as Student*/
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect('/'); // or render a form, etc.
  }
}

router.get('/my-account', requireLogin, function (req, res, next) {
  sess = req.session;
  staff.getinfobyID(sess.email, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log("unknown user");
      res.redirect('/unknw');
      return;
    }
    var data = {
      title: "staff",
      name: user.name,
      gender: user.gender,
      id: user.id,
      email: user.emailid,
      Desig: user.Desig,
      dep: user.dep,
      mobile: user.mobileno,
    }
    res.send(data);
  });
});


router.post('/password_reset', function (req, res, next) {
  var cpass = req.body.current_password;
  var npass = req.body.new_password;
  var npass2 = req.body.new_password1;

  staff.getinfobyID(req.session.email, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log("unknown user");
      return;
    }

    staff.comparePassword(cpass, user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {



        staff.update_password(sess.user, npass, function (err) {
          if (err) throw err;
          else {
            console.log(' password updated');
            //res.redirect('/Student/Home')
          }
        });
      }

      else {
        console.log('password doesnt match');
        res.redirect('/failed');
        return;
      }
    });

  })

})
router.get('/GRV', requireLogin, function (req, res, next) {//For finding a particular Grievance information
  Grv.grv_findbyid(req.query.grv_id, function (err, result) {
    if (err) throw err;
    var data = result
    res.send(data);
  }

  );
});

router.get('/My_Grievances', requireLogin, function (req, res, next) {
  Grv.grv_findbyuser(req.session.email, function (err, result) {
    if (err) throw err;
    var data = {
      info: result
    }
    res.send(data);
  }

  );
});

router.get('/Home', requireLogin, function (req, res, next) {
  res.render('Staff_dash', { title: 'staff', verify: sess.ver });
});

router.post('/login', function (req, res, next) {
  sess = req.session;
  if (!sess.user) {
    var id = req.body.id;
    var password = req.body.password;


    staff.getUserByID(id, function (err, user) {
      if (err) throw err;
      if (!user) {
        console.log("unknown user");
        //res.redirect('/staff/unknw');
        res.status(500).send('Unauthorized User');
        return;
      }
      if (user.access == 'approved') {
        staff.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            console.log('login sucsseful');

            sess.email = user.emailid;
            sess.user = user._id;
            sess.type = "staff";
            sess.active = 1;
            res.send('success');

          }
          else {
            console.log('invalid password');
            res.status(500).send('pass');
            return;
          }
        })
      }
      else {
        console.log('user not approved by admin');
        //res.redirect('/');
        res.status(500).send('not apprv');
        return;
      }
    });
  }
  else {
    res.status(500).send('some');
  }
});

router.post('/update', function (req, res, next) {
  var newvalues = {
    $set:
    {
      mobileno: req.body.mobile
    }

  };

  staff.updateuser(sess.email, newvalues, function (err, isUpdate) {
    if (err) throw err;
    else {
      console.log(' successfuly update ');
      res.redirect('/staff/Home#!/')
    }
  });

});



router.post('/register', function (req, res, next) {
  sess = req.session;
  if (!sess.user) {
    var name = req.body.name;
    var email = req.body.email;
    var gender = req.body.gender;
    var dep = req.body.dep;
    var desig = req.body.desig;
    var id = req.body.id;
    var mobile = req.body.mobile;
    var password = req.body.password;
    var password2 = req.body.password2;
    console.log(req.body.name);

    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('gender', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('dep', 'username field is required').notEmpty();
    req.checkBody('desig', 'username field is required').notEmpty();
    req.checkBody('id', 'username field is required').notEmpty();
    req.checkBody('mobile', 'username field is required').notEmpty();
    req.checkBody('password', 'password field is required').notEmpty();
    req.checkBody('password2', 'password do not match').equals(password);

    var errors = req.validationErrors();
    if (errors) {
      console.log(errors);
      res.staff(500).send('errors in validation');
      console.log('errors in validation');

    }
    else {
      staff.getUserByID(email, function (err, user) {
        if (err) throw err;
        if (user) {
          console.log("Already Registered user");
          if (user.status == "pending") {
            res.status(500).send('already reg not verified');
          }
          else {
            if (user.access == 'pending')
              res.status(500).send('Already Registered and verified Waiting for admin approval');
            else if (user.access == 'approved')
              res.status(500).send('Already Registered,verified and admin approved. Now you can Login');
            else if (user.access == 'rejected')
              res.status(500).send('Already Registered,verified but admin rejected');
          }
          return;
        } else {
          var random = Math.floor((Math.random() * 100) + 54);
          var newUser = new staff({
            name: name,//LHS should be same as that of attribute name in DB file and DB
            id: id,
            dep: dep,
            gender: gender,
            Desig: desig,
            emailid: email,
            mobileno: mobile,
            password: password,
            rand: random,
            status: "pending",
          });
          //console.log('no errors');
          staff.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
            host = req.get('host');
            link = "http://" + req.get('host') + "/staff/verify?rand=" + random + "&id=" + newUser._id;
            mailOptions = {
              to: user.emailid,
              subject: "Please confirm your Email account",
              html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
            }
            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
                res.status(500).send('mail error');
              } else {
                var mail_doc = new Mail_log({//Entry into Mail Log
                  emailid: user.emailid,
                  subject: "Password Update",
                  status: 'Sent',
                  date: new Date(dt.now())
                });

                Mail_log.mail_log(mail_doc, function (err) {
                  if (err) throw err;
                });
                console.log("Message sent");
                res.end("sent");
              }
            });

          });
          console.log('success', 'you are now registered and can login');
          res.redirect('/');

        }
      });
    }
  }
  else {
    res.status(500).send('someone already logged in');
  }
});




router.get('/verify', function (req, res) {
  console.log(req.protocol + "://" + req.get('host'));
  console.log('id is ' + req.query.id);
  if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
    console.log("Domain is matched. Information is from Authentic email");
    //console.log("random no is " +sess.user.rand);
    staff.getinfobyID(req.query.id, function (err, user) {
      if (err) throw err;
      if (!user) {
        console.log("unknown user");
        res.redirect('/faculty/unknw');
        return;
      }


      console.log('value of random is ' + user.rand);
      if (req.query.rand == user.rand) {
        console.log("email is verified");
        res.end("<h1>Email " + user.emailid + " is been Successfully verified");
        var id = { _id: user._id }
        var newvalues = {
          $set:
          {
            status: "verified"
          }
        };
        staff.updateuser(id, newvalues, function (err) {
          if (err) throw err;
        });
      }
      else {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
      }
    });
  }
  else {
    res.end("<h1>Request is from unknown source");
  }
});


router.post('/forgot_pass', function (req, res, next) {

  var id = req.body.id;
  staff.getUserByID(id, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log("unknown user");
      //res.redirect('/Student/unknw');
      res.status(500).send('Unauthorized User');
      return;
    }
    /*var password = generator.generate({
      length: 10,
      numbers: true
  });*/
    var password = 'sahil';
    staff.update_password(id, password, function (err) {
      if (err) throw err;

      host = req.get('host');
      mailOptions = {
        to: id,
        subject: "Password Updated",
        html: "Hello,<br> your new password for EduGrievance Portal is: <br>" + password + "<br> Thanks and Regards <br> <b>Anand International College Of Engineering</b>"
      }
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) throw err;
        else {
          var mail_doc = new Mail_log({//Entry into Mail Log
            emailid: id,
            subject: "Password Update",
            status: 'Sent',
            date: new Date(dt.now())
          });

          Mail_log.mail_log(mail_doc, function (err) {
            if (err) throw err;
          });
          console.log("Message sent");
          res.send('success');
        }
      });
    });
  });
});

router.get('/grievance_type', requireLogin, function (req, res, next) {
  Grvtype.grvtype_find(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  }

  );
});



module.exports = router;
