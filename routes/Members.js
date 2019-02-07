var express = require('express');
var router = express.Router();
var expressValidator=require('express-validator');
var Member=require('../models/Membersdb');
var Grv=require('../models/grievancedb');
const flash = require('express-flash-notification');
var session=require('express-session');
console.log('successful');
var app = express();
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
var rand,mailOptions,host,link;
host='localhost:3000'

function requireLogin(req, res, next) {
  console.log(req.session.active)
    if (req.session.active==1&&req.session.type=='Members') { /*if someone is logged in as cell member*/ 
      next(); // allow the next route to run                   
    } else {
      // require the user to log in
      res.redirect('/'); // or render a form, etc.
    }
  }

    router.get('/Grievances',requireLogin,function(req,res,next){
    console.log('hiii');
    console.log(req.session.grv_type)

    Grv.grv_findformembers_and_mngmnt(req.session.grv_type,function(err,result)
    {
        if(err) throw err;
        console.log(result);
        //res.render('gcm_dash',{
        var data={
          info:result
        }
    //})
    res.send(data);
  //)
        }

    );
    });

    router.get('/GRV',requireLogin,function(req,res,next){//For finding a particular Grievance information
      //console.log('hii'); 
      //console.log(req.query.grv_id);
         Grv.grv_findbyid(req.query.grv_id,function(err,result)
      {
          if(err) throw err;
          console.log(result);
          console.log(result.Gtype);
          var wqe={
          info:result
      }
      var data=result
      res.send(data);
          }
      
    );
      });

  router.get('/Home',requireLogin, function(req, res, next) {
    res.render('gcm_dash',{title:'Members',Gtype:sess.grv_type});
  });
  router.get('/err_valid', function(req, res, next) {
    res.render('err_valid',{title:'Faculty_Login'});
  });
  router.get('/logged', function(req, res, next) {
    res.render('logged',{title:'Faculty_Login'});
  });
  router.get('/unknw', function(req, res, next) {
    res.render('unknw',{title:'Faculty_Login'});
  });
  router.get('/password_reset',requireLogin, function(req, res, next) {
    res.render('password_reset',{title:'Members'});
  });
  
  router.get('/pass', function(req, res, next) {
    res.render('pass',{title:'Faculty_Login'});
  });

  router.get('/my-account', requireLogin,function(req, res, next) {
    sess=req.session;
    id=sess.user;
    console.log('id is '+sess.user);
    Member.getUserByID(id,function(err, user){
     if(err) throw err;
     if(!user){
         console.log("unknown user");
         res.redirect('/unknw');
         return;
     }  
  
   //res.render('gcm-myaccount',{
   var data ={
      title:"Member",
      designation:user.designation,
      name:user.name,
      gtype:user.Gtype,
      email:user.emailid,
      mobile:user.mobileno
    }
    //})
   res.send(data);
    });
  });



  router.post('/password_reset',function(req,res,next){
    var cpass=req.body.current_password;
    var  npass=req.body.new_password;
    var npass2=req.body.new_password1;
    console.log(cpass);
  
  Member.getUserByID(req.session.user,function(err, user){
    if(err) throw err;
    if(!user){
        console.log("unknown user");
        res.redirect('/faculty/unknw');
        return;
    }
  
          Member.comparePassword(cpass, user.password, function(err, isMatch){
              if(err) throw err;
                if(isMatch){
                    if(npass==npass2){
                  Member.update_password(sess.user,npass,function(err){
                     if(err) throw err;
                   else
                   {
                     console.log(' password updates');
                     res.redirect('/success')
                   }
                  });
                }
                else{
                  console.log("new password does'nt match");
                } 
                  }
  
                  else{
                    console.log('password doesnt match');
                    //res.redirect('/failed');
                    return;
                  }
      });
  
      })
      
    })
  router.post('/update',function(req,res,next){
    
    var id={ _id:sess.user};
     var newvalues = {$set: 
       {
        emailid:req.body.emailid,
        mobileno:req.body.mobileno
     }};
   Member.updateuser(id,newvalues,function(err,isUpdate){
      if(err) throw err;
    else
    {
      console.log(' successfuly update ');
      res.redirect('/Members/my-account')
    }
   });
  
   });

  router.post('/login',function(req,res,next){
    sess=req.session;
    if(!sess.user){
    var id=req.body.id;
    var password=req.body.password;
  
  
    Member.getUserByID(id,function(err, user){
      if(err) throw err;
      if(!user){
          console.log("unknown user");
          //res.redirect('/Members/unknw');
          res.status(500).send('Unauthorized User');
          return;
              }
      Member.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
           console.log('login sucsseful');      
           sess.user=user._id;
           sess.grv_type=user.Gtype;
          sess.type='Members';
          sess.name=user.name;
          sess.email=user.emailid;
          sess.active=1;
         
           //res.redirect('/Members/Grievances');
           res.send('success');
      
        }
        else{
          console.log('invalid password');
          res.status(500).send('pass');
        }
      })
        });
    }
    else{
      res.status(500).send('some');
    }
  });

  router.post('/forgot_pass',function(req,res,next){

    var id=req.body.id;
     Member.getUserByID(id,function(err, user){
       if(err) throw err;
       if(!user){
           console.log("unknown user");
           //res.redirect('/Student/unknw');
           res.status(500).send('Unauthorized User');
           return;
       }
       /*var password = generator.generate({
         length: 10,
         numbers: true
     });*/
     var password='sahil';
     Member.update_password(id,password,function(err){
      if(err) throw err;
       
      host=req.get('host');
      mailOptions={
          to : id,
          subject : "Password Updated",
          html : "Hello,<br> your new password for EduGrievance Portal is: <br>"+password+"<br> Thanks and Regards <br> <b>Anand International College Of Engineering</b>" 
      }
      console.log(mailOptions);
      smtpTransport.sendMail(mailOptions, function(err, response){
       if(err) throw err;
       else{
           console.log("Message sent: " + response.message);
           res.send('success');       
             }
  });
     });
     }); 
   });


     router.get('/grievance_type',requireLogin,function(req,res,next){
    console.log('hiitype'); 
    console.log(req.session.email)
      //console.log(req.query.id)
        Grvtype.grvtype_find(function(err,result)
    {
        if(err) throw err;
        console.log(result);
      
    res.send(result);
    //)
        }
    
    );
    });


module.exports = router;
