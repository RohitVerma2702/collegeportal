var express = require('express');
var router = express.Router();
var Student = require('../models/Studentdb');
var Grvtype = require('../models/grvtypedb');
var Grv = require('../models/grievancedb');
var sess;
var datetime = require('node-datetime');
var dt = datetime.create();
var Mail_log = require('../models/Maildb');
var generator = require('generate-password');
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
  service: "outlook",
  //secure: false,
  auth: {
    user: "grievance33@outlook.com",
    pass: "grievance001"
  }
});
var rand, mailOptions, host, link;
host = 'localhost:5000'
function requireLogin(req, res, next) {
  console.log(req.session.active)
  if (req.session.active == 1 && req.session.type == 'Student') { /*if someone is logged in as Student*/
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect('/'); // or render a form, etc.
  }
}

router.get('/my-account', requireLogin, function (req, res, next) {
  sess = req.session;
  id = sess.user;
  console.log('id is ' + sess.user);
  Student.getinfobyID(id, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log("unknown user");
      res.redirect('/unknw');
      return;
    }
    var data = {
      title: "Student",
      email: user.emailid,
      name: user.name,
      id: user.id,
      gender: user.gender,
      dep: user.dep,
      Batch: user.Batch,
      cdate: user.Cdate,
      mobile: user.mobileno
    }
    res.send(data);
  });
});
router.get('/My_Grievances', requireLogin, function (req, res, next) {

  Grv.grv_findbyuser(req.session.email, function (err, result) {
    if (err) throw err;
    //console.log(result);
    var data = {
      info: result
    }

    res.send(data);
  }

  );
});
router.get('/GRV', requireLogin, function (req, res, next) {//For finding a particular Grievance information
  Grv.grv_findbyid(req.query.grv_id, function (err, result) {
    if (err) throw err;
    var data = result
    res.send(data);
  }

  );
});

router.get('/Home', requireLogin, function (req, res, next) {
  res.render('Student-Dashboard', { title: 'Student', verify: sess.ver });
});


router.post('/password_reset', function (req, res, next) {
  var cpass = req.body.current_password;
  var npass = req.body.new_password;
  var npass2 = req.body.new_password1;

  Student.getinfobyID(req.session.user, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log("unknown user");
      res.status(500).send('Unknown User!');
      //res.redirect('/faculty/unknw');
      return;
    }

    Student.comparePassword(cpass, user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        if (npass == npass2) {
        Student.update_password(sess.user, npass, function (err) {
          if (err) throw err;
          else {
            console.log(' password updated');
            res.send('Password Updated');
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

});
var sess;

router.post('/login', function (req, res, next) {
  sess = req.session;
  if (!sess.user) {
    var id = req.body.id;
    var password = req.body.password;


    Student.getUserByID(id, function (err, user) {
      if (err) throw err;
      if (!user) {
        console.log("unknown user");
        res.status(500).send('Unauthorized User');
        return;
      }
      if (user.access == 'approved') {
        Student.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            console.log('login sucsseful');

            sess.user = user._id;
            sess.type = "Student";
            sess.email = user.emailid;
            sess.active = 1;
            sess.batch=user.Batch;
            sess.name=user.name;
            sess.dep=user.dep;
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
  else
    res.status(500).send('some');

});
router.post('/update', function (req, res, next) {

  var newvalues = {
    $set:
    {
      emailid: req.body.emailid,
      mobileno: req.body.mobileno
    }
  };
  Student.updateuser(sess.email, newvalues, function (err, isUpdate) {
    if (err) throw err;
    else {
      console.log(' successfuly update ');
      res.redirect('/Student/Home#!/')
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
    var batch = req.body.batch;
    var id = req.body.id;
    //var cdate=req.body.cdate;
    var Last_year = req.body.Last_year;;
    var mobile = req.body.mobile;
    var password = req.body.password;
    var password2 = req.body.password2;
    console.log(req.body.name);
    console.log(req.body.email);
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('gender', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('dep', 'department field is required').notEmpty();
    req.checkBody('batch', 'batch/class field is required').notEmpty();
    // req.checkBody('cdate','course completion date field is required').notEmpty();
    req.checkBody('id', 'id field is required').notEmpty();
    req.checkBody('mobile', 'username field is required').notEmpty();
    req.checkBody('password', 'password field is required').notEmpty();
    req.checkBody('password2', 'password do not match').equals(password);

    var errors = req.validationErrors();
    if (errors) {
      console.log(errors);
      res.status(500).send('errors in validation');
      console.log('errors in validation');

    }
    else {
      Student.getUserByID(email, function (err, user) {
        if (err) throw err;
        if (user) {
          console.log("already reg verified");
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
          var newUser = new Student({
            name: name,//LHS should be same as that of attribute name in DB file and DB
            id: id,
            dep: dep,
            gender: gender,
            // Cdate:cdate,
            Last_year: Last_year,
            Batch: batch,
            emailid: email,
            mobileno: mobile,
            password: password,
            rand: random,
            status: "pending"
          });
          Student.createUser(newUser, function (err, user) {
            if (err) throw err;
            host = req.get('host');
            link = "http://" + req.get('host') + "/Student/verify?rand=" + random + "&id=" + newUser._id;
            mailOptions = {
              from:'Grievance Portal <gportal33@gmail.com>',
              to: user.emailid,
              subject: "Please confirm your Email account",
              html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
            }
            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
              }
              else {
                var mail_doc = new Mail_log({//Entry into Mail Log
                  emailid: user.emailid,
                  subject: "PLease Confirm your Email account",
                  status: 'Sent',
                  date: new Date(dt.now())
                });

                Mail_log.mail_log(mail_doc, function (err) {
                  if (err) throw err;
                });

              }
            });



          });
          console.log('success', 'you are now registered and can login');
          req.flash('success', 'you are now registered and can login');
          res.redirect('/');
        }
      });
    }
  }
  else {
    res.end('someone already logged in');
  }
});




router.get('/verify', function (req, res) {
  console.log(req.protocol + "://" + req.get('host'));
  console.log('id is ' + req.query.id);
  if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
    console.log("Domain is matched. Information is from Authentic email");
    Student.getinfobyID(req.query.id, function (err, user) {
      if (err) throw err;
      if (!user) {
        console.log("unknown user");
        req.flash('error', 'Unknown Error!');
        res.redirect('/');
        return;
      }
      if (req.query.rand == user.rand) {
        console.log("email is verified");
        //res.end("<h1>Email " + user.emailid + " is been Successfully verified");
        req.flash('success', 'Your email has been verified!');
        console.log('info sent...!');
        res.redirect('/');
        var newvalues = {
          $set:
          {
            status: "verified"
          }
        };
        Student.updateuser(user.emailid, newvalues, function (err) {
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
  Student.getUserByID(id, function (err, user) {
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
  var password=password;
    Student.update_password(id, password, function (err) {
      if (err) throw err;

      host = req.get('host');
      mailOptions = {
        from:'Grievance Portal <grievance33@outlook.com>',
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
            status: 'Sent'
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



/* author : Ankit Sharma
date: 31/10/2018 */

router.get('/grievance_type', requireLogin, function (req, res, next) {
  Grvtype.grvtype_find(function (err, result) {
    if (err) throw err;
//    console.log(result);

    res.send(result);
    //)
  }

  );
});

module.exports = router;
