var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var Member = require('../models/Membersdb');
var Grv = require('../models/grievancedb');
var grvtype = require('../models/grvtypedb');
const flash = require('express-flash-notification');
var session = require('express-session');
var Mail_log = require('../models/Maildb');
var generator = require('generate-password');
var datetime = require('node-datetime');
console.log('successful');
var app = express();
var dt = datetime.create();
var nodemailer = require("nodemailer");
var sess;
var bcrypt = require('bcryptjs');
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  //secure: false,
  auth: {
    user: "gportal33@gmail.com",
    pass: "grievance001"
  }
});
var rand, mailOptions, host, link;
host = 'localhost:3000'

function requireLogin(req, res, next) {
  console.log(req.session.active)
  if (req.session.active == 1 && req.session.type == 'Members') { /*if someone is logged in as cell member*/
    next(); // allow the next route to run                   
  } else {
    // require the user to log in
    res.redirect('/'); // or render a form, etc.
  }
}

router.get('/Grievances', requireLogin, function (req, res, next) {
  Grv.grv_findformembers_and_mngmnt(req.session.grv_type, function (err, result) {
    if (err) throw err;
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
  res.render('gcm_dash', { title: 'Members', Gtype: sess.grv_type });
});

router.get('/my-account', requireLogin, function (req, res, next) {
  sess = req.session;
  id = sess.user;
  Member.getUserByID(id, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log("unknown user");
      res.redirect('/unknw');
      return;
    }
    grvtype.grvtype_find_seq(user.Gtype, function (err, result) {//for finding grvtype using there seq
      if (err) throw err;
      var data = {
        title: "Member",
        designation: user.designation,
        name: user.name,
        gtype: result.map(i => [i.grvtype]),
        email: user.emailid,
        mobile: user.mobileno
      }

      res.send(data);
    })
  });
});



router.post('/password_reset', function (req, res, next) {
  var cpass = req.body.current_password;
  var npass = req.body.new_password;
  var npass2 = req.body.new_password1;
  console.log(cpass);

  Member.getUserByID(req.session.user, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(500).send('Unknown User!');
      //res.redirect('/faculty/unknw');
      return;
    }

    Member.comparePassword(cpass, user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        if (npass == npass2) {
          Member.update_password(sess.user, npass, function (err) {
            if (err) throw err;
            else {
              console.log(' password updates');
              res.send('Password Updated!');
              //res.redirect('/success')
            }
          });
        }
        else {
          console.log("new password does'nt match");
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
router.post('/update', function (req, res, next) {

  var newvalues = {
    $set:
    {
      mobileno: req.body.mobileno
    }
  };
  Member.updateuser(sess.email, newvalues, function (err, isUpdate) {
    if (err) throw err;
    else {
      console.log(' successfuly update ');
      res.redirect('/Members/my-account')
    }
  });

});

router.post('/login', function (req, res, next) {
  sess = req.session;
  if (!sess.user) {
    var id = req.body.id;
    var password = req.body.password;


    Member.getUserByID(id, function (err, user) {
      if (err) throw err;
      if (!user) {
        console.log("unknown user");
        //res.redirect('/Members/unknw');
        res.status(500).send('Unauthorized User');
        return;
      }
      if (user.access == 'approved') {
        Member.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            console.log('login sucsseful');
            sess.user = user._id;
            sess.grv_type = user.Gtype;
            sess.type = 'Members';
            sess.name = user.name;
            sess.email = user.emailid;
            sess.active = 1;

            //res.redirect('/Members/Grievances');
            res.send('success');

          }
          else {
            console.log('invalid password');
            res.status(500).send('pass');
          }
        })
      }
      else {
        console.log('Access Denied');
        res.status(500).send('apprv');
      }
    });
  }
  else {
    res.status(500).send('some');
  }
});

router.post('/forgot_pass', function (req, res, next) {

  var id = req.body.id;
  Member.getUserByID(id, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log("unknown user");
      res.status(500).send('Unauthorized User');
      return;
    }
    var password = generator.generate({
      length: 10,
      numbers: true
  });
    Member.update_password(id, password, function (err) {
      if (err) throw err;

      host = req.get('host');
      mailOptions = {
        to: id,
        subject: "Password Updated",
        html: "Hello,<br> your new password for EduGrievance Portal is: <br>" + password + "<br> Thanks and Regards <br> <b>Anand International College Of Engineering</b>"
      }
      console.log(mailOptions);
      smtpTransport.sendMail(mailOptions, function (err, response) {
        if (err) throw err;
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
    //)
  }

  );
});


module.exports = router;
