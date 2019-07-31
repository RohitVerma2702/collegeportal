var express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');
const fs=require('fs');
/*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname+ '-' + Date.now()+'.jpg')
    }
});
var uploads = multer({ storage: storage });*/
var uploads = multer({ dest: 'uploads/Users/' });
var Ruploads=multer({ dest: 'uploads/Members/' });
var uniqid = require('uniqid');
var Grv = require('../models/grievancedb');
var datetime = require('node-datetime');
var Admin = require('../models/Admindb');
var Member = require('../models/Membersdb');
var mngmnt = require('../models/mngmntdb');
var Grvtype = require('../models/grvtypedb');
var Mail_log = require('../models/Maildb');
var dt = datetime.create();
var formatted = dt.format('d/m/Y H:M:S');
var app = express();
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    //secure: false,
    auth: {
        user: "gportal33@gmail.com",
        pass: "grievance001"
    }
});
router.get('/reminder', function (req, res, next) {
    seq = req.query.seq;
    Member.find_member(seq, function (err, result) {
        if (err)
            throw error;
        else {
            console.log(result.length);
            for (i = 0; i < result.length; i++) {
                mailOptions = {
                    to: result[i].emailid,
                    subject: "Grievance Portal Reminder",
                    html: "Dear Grievance Cell Member,<br>A user has reminded you of a grievance you left unattended.Kindly login using your username and password to check grievance and give reply.<br>Thanks and Regard.<br>ANAND INTERNATIONAL COLLEGE OF ENGINEERING"
                }
                console.log(mailOptions);
                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                        //res.status(500).send('error');
                    } else {
                        var mail_doc = new Mail_log({//Entry into Mail Log
                            emailid: result[i].emailid,
                            subject: "Grievance Portal Reminder",
                            status: 'Sent',
                            date: new Date(dt.now())
                        });

                        Mail_log.mail_log(mail_doc, function (err) {
                            if (err) throw err;
                        });
                        console.log("Message sent: " + response.message);
                        //res.end("sent");
                    }
                });
            }
        }
        mngmnt.find_member(seq, function (err, result) {
            if (err)
                throw error;
            else {
                console.log(result.length);
                for (i = 0; i < result.length; i++) {
                    mailOptions = {
                        to: result[i].emailid,
                        subject: "Grievance Portal Reminder",
                        html: "Dear Grievance Cell Member,<br>A user has reminded you of a grievance you left unattended.Kindly login using your username and password to check grievance and give reply.<br>Thanks and Regard.<br>ANAND INTERNATIONAL COLLEGE OF ENGINEERING"
                    }
                    console.log(mailOptions)
                    smtpTransport.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            console.log(error);
                            //res.status(500).send('error');
                        } else {
                            var mail_doc = new Mail_log({//Entry into Mail Log
                                emailid: result[i].emailid,
                                subject: "Grievance Portal Reminder",
                                status: 'Sent',
                                date: new Date(dt.now())
                            });

                            Mail_log.mail_log(mail_doc, function (err) {
                                if (err) throw err;
                            });
                            console.log("Message sent: " + response.message);
                            //res.end("sent");
                        }
                    });
                }
            }
            Admin.admin_find(function (err, result) {
                if (err)
                    throw error;
                else {
                    console.log(result.length);
                    for (i = 0; i < result.length; i++) {

                        mailOptions = {
                            to: result[i].emailid,
                            subject: "Grievance Portal Reminder",
                            html: "Dear Admin,<br>A user has raised a reminder  of a grievance left unattended by concerned Cell Member.Kindly login using your username and password to check grievance.<br>Thanks and Regard.<br>ANAND INTERNATIONAL COLLEGE OF ENGINEERING"
                        }
                        console.log(mailOptions);
                        smtpTransport.sendMail(mailOptions, function (error, response) {
                            if (error) {
                                console.log(error);
                                //res.status(500).send('error');
                            } else {
                                var mail_doc = new Mail_log({//Entry into Mail Log
                                    emailid: result[i].emailid,
                                    subject: "Grievance Portal Reminder",
                                    status: 'Sent',
                                    date: new Date(dt.now()),
                                });

                                Mail_log.mail_log(mail_doc, function (err) {
                                    if (err) throw err;
                                });
                                console.log("Message sent");
                                //res.end("sent");
                            }
                        });
                    }
                }
            })

        })
        res.end();
    })


    res.end();

});
router.get('/grv_action', function (req, res, next) {


    var id = { grv_id: req.body.id }
    var newvalues = {
        $set:
        {
            status: 'viewed',
        }
    };

    Grv.update_grv(id, newvalues, function (err, isUpdate) {
        if (err) throw err;
        else {
            console.log(' successfuly update ');
            res.redirect('/Members/Home')
        }
    });

});

router.post('/reply', Ruploads.single('file'), function (req, res, next) {//For Replying to particular Grievance

    var id = { grv_id: req.body.id }
    console.log(req.body.email);
    var file=req.file;
    if (!req.file) {
        file = 'no file';
        console.log('npooooooooo');
    }
    else {
        file = file.filename
        console.log('yesssssssssss');
    }
    var newvalues = {
        $set:
        {
            reply: req.body.reply,
            status: 'disposed',
            GCM: req.session.name,
            Reply_file:file,
            Reply_date: new Date(dt.now())
        }
    };

    mailOptions = {
        to: req.body.email,
        subject: "Grievance Portal Update",
        html: "Dear User,<br>The Grievance raised by you has been Acknowledged and Replied by the concerned cell/management Member please login to your account and view the details.<br>Thanks and Regard.<br>ANAND INTERNATIONAL COLLEGE OF ENGINEERING"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            //res.status(500).send('error');
        } else {
            var mail_doc = new Mail_log({//Entry into Mail Log
                emailid: req.body.email,
                subject: "Grievance Portal Update",
                status: 'Sent',
                date: new Date(dt.now()),
            });

            Mail_log.mail_log(mail_doc, function (err) {
                if (err) throw err;
            });
            console.log("Message sent");
            //res.end("sent");
        }
    })


    Grv.update_grv(id, newvalues, function (err, isUpdate) {
        if (err) throw err;
        else {
            console.log(' successfuly update');
            res.redirect('/Members/Home')
        }
    });

})


router.post('/complaint', uploads.single('file'), function (req, res, next) {//To raise a Grievance
    sess = req.session;
    var comp = req.body.grv;
    var type = req.body.type;
    var sub = req.body.subject;
    var file = req.file;
    var utype = req.body.usertype;
    var gseq = type.substr(0, type.indexOf('&'));
    var gtype = type.substr(type.indexOf('&') + 1);
    var dep=null;
    var batch=null;  
    if(sess.dep)
    {
         dep=sess.dep;
    }
    if(sess.batch)
    {
         batch=sess.batch;
    }
    if (!req.file) {
        file = 'no file';
        console.log('no file');
    }
    else {
        file = file.filename;
    }
    req.checkBody('type', 'type field is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.render('err_valid', {
            errors: errors
        });
        console.log('errors in validation');

    }
    else {
        var doc = new Grv({
            grv_id: uniqid(), //generates a unique id for each grievance 
            time: new Date(dt.now()), // add time of post
            Utype: utype, //req.query.type, // user type ex. Parent,Student etc.
            Gtype: gtype, // Grievance type
            gseq: gseq, // grievance sequence no.
            subject: sub, //Subject of grievance
            Grv: comp, // Grievance posted
            Grievant: sess.email,
            name:sess.name,
            active: 1,
            dep:dep,
            Batch:batch,
            status: 'pending', // Status of Grv. pending/viewed/disposed/deleted
            file: file //any Doc. to be uploaded

        });
        Grv.grv_post(doc, function (err, doc) {
            if (err) throw err;
            //console.log(doc);
            console.log('Grievance Posted');
            res.redirect('/' + utype + '/Home');
        });
        Member.find_member(gseq, function (err, result) {
            if (err)
                throw error;
            else {
                console.log(result.length);
                for (i = 0; i < result.length; i++) {
                    mailOptions = {
                        to: result[i].emailid,
                        subject: "Grievance Portal Reminder",
                        html: "Dear Grievance Cell Member,<br>A user has posted a grievance .Kindly login using your username and password to check grievance and give reply.<br>Thanks and Regard.<br>ANAND INTERNATIONAL COLLEGE OF ENGINEERING"
                    }
                    smtpTransport.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            console.log(error);
                            //res.status(500).send('error');
                        } else {
                            var mail_doc = new Mail_log({//Entry into Mail Log
                                emailid: result[i].emailid,
                                subject: "New Grievance",
                                status: 'Sent',
                                date: new Date(dt.now())
                            });

                            Mail_log.mail_log(mail_doc, function (err) {
                                if (err) throw err;
                            });
                            //console.log("Message sent: " + response.message);
                            //res.end("sent");
                        }
                    });
                }
            }
            Admin.admin_find(function (err, result) {
                if (err)
                    throw error;
                else {
                    console.log(result.length);
                    for (i = 0; i < result.length; i++) {

                        mailOptions = {
                            to: result[i].emailid,
                            subject: "Grievance Portal Reminder",
                            html: "Dear Admin,<br>A user has raised a grievance .Kindly login using your username and password to check grievance.<br>Thanks and Regard.<br>ANAND INTERNATIONAL COLLEGE OF ENGINEERING"
                        }
                        //console.log(mailOptions);
                        smtpTransport.sendMail(mailOptions, function (error, response) {
                            if (error) {
                                console.log(error);
                                //res.status(500).send('error');
                            } else {
                                var mail_doc = new Mail_log({//Entry into Mail Log
                                    emailid: result[i].emailid,
                                    subject: "New Grievance",
                                    status: 'Sent',
                                    date: new Date(dt.now()),
                                });

                                Mail_log.mail_log(mail_doc, function (err) {
                                    if (err) throw err;
                                });
                                console.log("Message sent");
                                //res.end("sent");
                            }
                        });
                    }
                }
            })

        })


    }

});
app.use(express.static(path.join(__dirname, "public")));
router.get('/download', function (req, res, next) {
  
type=req.query.type;
if(type=='User')
{
    res.download(path.join(__dirname, "../uploads/Users/"+req.query.file),req.query.file,function(err){
        if(err) console.log("error");
    });
}
else
{
    res.download(path.join(__dirname, "../uploads/Members/"+req.query.file),req.query.file,function(err){
        if(err) console.log("error");
    });
}
 

});


module.exports = router;