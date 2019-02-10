var express = require('express');
var router = express.Router();
var multer  = require('multer');
var uploads=multer({dest:'./uploads'});
var uniqid=require('uniqid');
var Grv=require('../models/grievancedb');
var datetime = require('node-datetime');
var Admin=require('../models/Admindb');
var Member=require('../models/Membersdb');
var Grvtype=require('../models/grvtypedb');
var Mail_log=require=('../models/Maildb');
var dt = datetime.create();
var formatted = dt.format('d/m/Y H:M:S');
var session=require('express-session');

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
router.get('/reminder',function(req,res,next){
seq=req.query.seq;
Member.find_member(seq,function(err,result){
if (err)
throw error;
else
{
console.log(result.length);
    for(i=0;i<result.length;i++)
{
    mailOptions={
        to : result[i].emailid,
        subject : "Grievance Portal Reminder",
        html : "Dear Grievance Cell Member,<br>A user has reminded you of a grievance you left unattended.Kindly login using your username and password to check grievance and give reply.<br>Thanks and Regard.<br>ANAND INTERNATIONAL COLLEGE OF ENGINEERING" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        //res.status(500).send('error');
     }else{
        var mail_doc=new Mail_log({//Entry into Mail Log
            emailid:result[i].emailid,
            subject:"Grievance Portal Reminder",
            status:'Sent'
          });
    
          Mail_log.mail_log(mail_doc,function(err){
            if(err) throw err;
          });
            console.log("Message sent: " + response.message);
        //res.end("sent");
         }
});
} 
}
Admin.admin_find(function(err,result){
if(err)
throw error;
else
{
    console.log(result.length);
    for(i=0;i<result.length;i++){

        mailOptions={
            to : result[i].emailid,
            subject : "Grievance Portal Reminder",
            html : "Dear Admin,<br>A user has raised a reminder  of a grievance left unattended by concerned Cell Member.Kindly login using your username and password to check grievance.<br>Thanks and Regard.<br>ANAND INTERNATIONAL COLLEGE OF ENGINEERING" 
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
                console.log(error);
            //res.status(500).send('error');
         }else{
            var mail_doc=new Mail_log({//Entry into Mail Log
                emailid:result[i].emailid,
                subject:"Grievance Portal Reminder",
                status:'Sent'
              });
        
              Mail_log.mail_log(mail_doc,function(err){
                if(err) throw err;
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

});
router.get('/grv_action',function(req,res,next){

    
    var id={grv_id:req.body.id}
    var newvalues = {$set: 
        {
          //reply:req.body.reply,
          status:'viewed',
          //action:'replied'
        }};

    Grv.update_grv(id,newvalues,function(err,isUpdate){
        if(err) throw err;
      else
      {
        console.log(' successfuly update ');
        res.redirect('/Members/Home')
      }
     });

})


/*router.get('/Grievances',function(req,res,next){
console.log('hii'); 
  //console.log(req.query.id)
    Grv.grv_find(function(err,result)
{
    if(err) throw err;
   // console.log(result);
    res.render('post2',{
    result:result
})
    }

);
});*/
/*
router.get('/Grievances_user',function(req,res,next){
    console.log('hii'); 
    console.log(req.session.email)
      //console.log(req.query.id)
        Grv.grv_findbyuser(req.session.email,function(err,result)
    {
        if(err) throw err;
        console.log(result);
        res.render('grievances',{
        result:result
    })
        }
    
    );
    });*/

    router.post('/reply',uploads.single('file'), function(req, res, next) {

        var id={grv_id:req.body.id}
       var newvalues = {$set: 
            {
              reply:req.body.reply,
              status:'disposed',
              GCM:req.session.name,
              Reply_date:new Date(dt.now())   
                     }};

        Grv.update_grv(id,newvalues,function(err,isUpdate){
            if(err) throw err;
          else
          {
            console.log(' successfuly update ');
            res.redirect('/Members/Grievances')
          }
         });

    })
router.post('/complaint',uploads.single('file'), function(req, res, next) {
    sess=req.session;
var comp=req.body.grv;
var type=req.body.type;
var sub=req.body.subject;
var file=req.file;
var utype=req.body.usertype;
var gseq=type.substr(0,type.indexOf('&'));
var gtype=type.substr(type.indexOf('&')+1);
if(!req.file)
{
    file='no file';
}
else{
    file=file.filename
}
req.checkBody('type','type field is required').notEmpty();

var errors=req.validationErrors();
if(errors)
{ console.log(errors);
    res.render('err_valid',{
  errors: errors
});
  console.log('errors in validation');
  
}
else{
var doc=new Grv({
    grv_id:uniqid(), //generates a unique id for each grievance 
    time:new Date(dt.now()), // add time of post
    Utype:utype, //req.query.type, // user type ex. Parent,Student etc.
    Gtype:gtype, // Grievance type
    gseq:gseq, // grievance sequence no.
    subject:sub, //Subject of grievance
    Grv:comp, // Grievance posted
    Grievant:sess.email,
    active:1,
    status:'pending', // Status of Grv. pending/viewed/disposed/deleted
    file:file //any Doc. to be uploaded

});
Grv.grv_post(doc,function(err,doc){
    if(err) throw err;
    console.log(doc);
    //res.end('complaint posted');
    console.log('Grievance Posted');
      res.redirect('/'+utype+'/Home');
});
}

});




module.exports = router;