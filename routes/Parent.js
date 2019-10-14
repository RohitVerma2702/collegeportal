var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var Parent = require('../models/Parentdb')
var Grv = require('../models/grievancedb');
var Grvtype = require('../models/grvtypedb');
var datetime = require('node-datetime');
var nodemailer = require("nodemailer");
var generator = require('generate-password');
var Mail_log = require('../models/Maildb');
var dt = datetime.create();
console.log('successful');
var app = express();

var smtpTransport = nodemailer.createTransport({
  service: "Outlook",
  //secure: false,
  auth: {
    user: "Grievance33@outlook.com",
    pass: "grievance001"
  }
});
var rand, mailOptions, host, link;

host = 'localhost:3000';
function requireLogin(req, res, next) {
  console.log(req.session.active)
  if (req.session.active == 1 && req.session.type == 'Parent') { /*if someone is logged in as Parent*/
    next(); // allow the next route to run                   
  } else {
    // require the user to log in
    res.redirect('/'); // or render a form, etc.
  }
}

router.get('/my-account', requireLogin, function (req, res, next) {
  sess = req.session;
  Parent.getinfobyID(sess.user, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log("unknown user");
      res.redirect('/unknw');
      return;
    }
    var data = {
      title: 'Parent',
      name: user.name,
      rel: user.relation,
      cdate: user.Cdate,
      mobile: user.mobileno,
      email: user.emailid,
    }
    res.send(data);

  });
});

router.post('/password_reset', function (req, res, next) {
  var cpass = req.body.current_password;
  var npass = req.body.new_password;
  var npass2 = req.body.new_password1;
console.log(req.session.user);
  Parent.getinfobyID(req.session.user, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log("unknown user");
      res.status(500).send('Unknown user!');
      //res.redirect('/faculty/unknw');
      return;
    }

    Parent.comparePassword(cpass, user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        if (npass == npass2) {
          Parent.update_password(sess.user, npass, function (err) {
            if (err) throw err;
            else {
              console.log(' password updated');
              res.send('Password Updated!');
            }
          });
        }
        else{
          console.log('password doesnt match');
          res.status(500).send('Passwords do not match.');
        }
      }

      else {
        console.log('password doesnt match');
        res.status(500).send('Passwords do not match.');
        //res.redirect('/failed');
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
    data = {
      info: result
    }
    res.send(data);
  }

  );
});
router.get('/Home', requireLogin, function (req, res, next) {
  res.render('Parent-Dashboard', { title: 'Parent' });
});

router.post('/login', function (req, res, next) {
  sess = req.session;
  if (!sess.user) {
    var id = req.body.id;
    var password = req.body.password;

    Parent.getUserByID(id, function (err, user) {
      if (err) throw err;
      if (!user) {
        console.log("unknown user");
        res.status(500).send('Unauthorized User');
        return;
      }
      console.log(user.access);
      if ((user.access) == 'approved') {
        Parent.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            console.log('login successful');

            sess.user = user._id;
            sess.type = "Parent";
            sess.email = user.emailid;
            sess.active = 1;
            sess.name=user.name;
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
        res.status(500).send('not apprv');
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
      emailid: req.body.email,
      mobileno: req.body.mobile,
    }
  };

  Parent.updateuser(sess.email, newvalues, function (err, isUpdate) {
    if (err) throw err;
    else {
      console.log(' successfuly update ');
      res.redirect('/Parent/Home#!/my-account');
    }
  });

});

router.post('/register', function (req, res, next) {
  sess = req.session;
  if (!sess.user) {
    var name = req.body.name;//LHS should be same as that of attribute name in DB file and DB
    var email = req.body.email;
    var relation = req.body.relation;
    var ward_id = req.body.id;
    //var cdate=req.body.cdate;
    var mobile = req.body.mobile;
    var Last_year = req.body.Last_year;
    var password = req.body.password;
    var password2 = req.body.password2;
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('relation', 'relation field is required').notEmpty();
    // req.checkBody('cdate','course completion date field is required').notEmpty();
    req.checkBody('mobile', 'mobile no. field is required').notEmpty();
    req.checkBody('password', 'password field is required').notEmpty();
    req.checkBody('password2', 'password do not match').equals(password);

    var errors = req.validationErrors();
    if (errors) {
      console.log(errors);
      res.status(500).send('errors in validation');
      console.log('errors in validation');

    }
    else {
      Parent.getUserByID(email, function (err, user) {
        if (err) throw err;
        if (user) {
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
            else if (user.access = 'terminated')
              res.status(500).send('Already Registered but access terminated');
          }
          return;
        }
        else {
          var random = Math.floor((Math.random() * 100) + 54);
          var newUser = new Parent({
            name: name,
            // Cdate:cdate,
            ward_id: ward_id,
            Last_year: Last_year,
            relation: relation,
            emailid: email,
            mobileno: mobile,
            password: password,
            rand: random,
            status: "pending"
          });
          Parent.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);

            host = req.get('host');
            link = "http://" + req.get('host') + "/Parent/verify?rand=" + random + "&id=" + newUser._id;
            mailOptions = {
              from:'Grievance Portal <Grievance33@outlook.com>',
              to: user.emailid,
              subject: "Please confirm your Email account",
              html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
            }
            console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
                res.status(500).send('mail error');
              } else {
                var mail_doc = new Mail_log({//Entry into Mail Log
                  emailid: user.emailid,
                  subject: "Please confirm your Email account",
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
  } else {
    res.status(500).send('someone already logged in');
  }
});


router.get('/verify', function (req, res) {
  console.log(req.protocol + "://" + req.get('host'));
  console.log('id is ' + req.query.id);
  host='frvportal.herokuapp.com';
  if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
    console.log("Domain is matched. Information is from Authentic email");
    Parent.getinfobyID(req.query.id, function (err, user) {//finding user by Oid
      if (err) throw err;
      if (!user) {
        console.log("unknown user");
        req.flash('error', 'Unknown Error!');
        res.redirect('/');
        return;
      }


      console.log('value of random is ' + user.rand);
      if (req.query.rand == user.rand) {
        console.log("email is verified");
        req.flash('success', 'Your email has been verified!');
        res.redirect('/')
        //res.end("<h1>Email " + user.emailid + " is been Successfully verified");
        var newvalues = {
          $set:
          {
            status: "verified"  //updating status of user
          }
        };
        Parent.updateuser(user.emailid, newvalues, function (err) {
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
  Parent.getUserByID(id, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log("unknown user");
      //res.redirect('/Student/unknw');
      res.status(500).send('Unauthorized User');
      return;
    }
    var password = generator.generate({
      length: 10,
      numbers: true
  });
    Parent.update_password(id, password, function (err) {
      if (err) throw err;

      host = req.get('host');
      mailOptions = {
        from:'Grievance Portal <Grievance33@outlook.com>',
        to: id,
        subject: "Password Updated",
        html: "Hello,<br> your new password for EduGrievance Portal is: <br>" + password + "<br> Thanks and Regards <br> <b>Anand International College Of Engineering</b>"
      }
      console.log(mailOptions);
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
  console.log('hiitype');
  //console.log(req.session.email)
  //console.log(req.query.id)
  Grvtype.grvtype_find(function (err, result) {
    if (err) throw err;
    res.send(result);
  }

  );
});
module.exports = router;
