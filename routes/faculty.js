var express = require('express');
var router = express.Router();
var expressValidator=require('express-validator');
var faculty=require('../models/facultydb')
var Grv=require('../models/grievancedb');
var session=require('express-session');
var Grvtype=require('../models/grvtypedb');
var nodemailer = require("nodemailer");
console.log('successful');
var Mail_log=require('../models/Maildb');
var app = express();
var datetime = require('node-datetime');
var dt = datetime.create();
var sess;
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
    if (req.session.active==1&&req.session.type=='faculty') { /*if someone is logged in as Student*/ 
      next(); // allow the next route to run                   
    } else {
      // require the user to log in
      res.redirect('/'); // or render a form, etc.
    }
  }
  router.get('/Home',requireLogin, function(req, res, next) {
    res.render('Faculty_dash',{title:'Student',verify:sess.ver});
  });
router.get('/my-account',requireLogin, function(req, res, next) {
  sess=req.session;
  faculty.getinfobyID(sess.user,function(err, user){
   if(err) throw err;
   if(!user){
       console.log("unknown user");
       res.redirect('/unknw');
       return;
   }
   
   var data={
     title:"Faculty",
    name: user.name,
    gender:user.gender,
    id:user.id,
    Desig:user.Desig,
    dep:user.dep,
    mobile:user.mobileno,
    emailid:user.emailid
   }
   res.send(data);
  });  
 });
 router.get('/GRV',requireLogin,function(req,res,next){//For finding a particular Grievance information
     Grv.grv_findbyid(req.query.grv_id,function(err,result)
  {
      if(err) throw err;
  var data=result
  res.send(data);
      }
  
);
  });

 router.get('/My_Grievances',requireLogin,function(req,res,next){//project all the grievances 
      Grv.grv_findbyuser(req.session.email,function(err,result)
  {
      if(err) throw err;
     var data={
      info:result
  }
res.send(data);      
}
  
  );
  });
  router.get('/GRV',requireLogin,function(req,res,next){//detail of indiviual grievance
       Grv.grv_findbyid(req.query.grv_id,function(err,result)
    {
    if(err) throw err;
    var data=result
    res.send(data);
        }
    
  );
    });


  router.post('/password_reset',function(req,res,next){
    var cpass=req.body.current_password;
    var  npass=req.body.new_password;
    var npass2=req.body.new_password1;
  
  faculty.getinfobyID(req.session.user,function(err, user){
    if(err) throw err;
    if(!user){
        console.log("unknown user");
        res.redirect('/faculty/unknw');
        return;
    }
  
          faculty.comparePassword(cpass, user.password, function(err, isMatch){
              if(err) throw err;
                if(isMatch){
  
                    
                    
                  faculty.update_password(sess.user,npass,function(err){
                     if(err) throw err;
                   else
                   {
                     console.log(' password updated');
                     res.send('Password Updated');
                   }
                  }); 
                  }
                  else{
                    console.log('password doesnt match');
                    res.redirect('/failed');
                    return;
                  }
      });
      })
    });

  router.post('/login',function(req,res,next){
    sess=req.session;
    if(!sess.user)
    {
    var id=req.body.id;
    var password=req.body.password;
    
  
  
    faculty.getUserByID(id,function(err, user){
      if(err) throw err;
      if(!user){
          console.log("unknown user");
          //res.redirect('/faculty/unknw');
          res.status(500).send('Unauthorized User');
          return;
      }
      if(user.access=='approved')
      {
      faculty.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
           console.log('login sucsseful');      
         
          sess.user=user._id;
          sess.type="faculty";
          sess.active=1;
         sess.email=user.emailid;
          res.send('success');
    
        }
        else{
          console.log('invalid password');
          res.status(500).send('pass');
          return;
        }
      })}
      else{
        console.log("user no approved by admin");
        res.status(500).send('not apprv');
      }
     });
    }
    else{
      res.status(500).send('some');
    }
    });
    router.post('/update',function(req,res,next){
      var newvalues = {$set: 
        {  
          mobileno:req.body.mobileno
      } 
    };
    faculty.updateuser(sess.email,newvalues,function(err,isUpdate){
       if(err) throw err;
     else
     {
       console.log(' successfuly update ');
       res.redirect('/faculty/Home#!/')
     }
    });
  
    });
  


    router.post('/register', function(req, res, next) {
     
      sess=req.session;
      if(!sess.user){
    var name=req.body.name;
    var email=req.body.email;
    var gender=req.body.gender;
    var dep=req.body.dep;
    var desig=req.body.desig;
    var id=req.body.id;
    var mobile=req.body.mobile;
    var password=req.body.password;
    var password2=req.body.password2;
    console.log(req.body.name);
    
    req.checkBody('name','Name field is required').notEmpty();
    req.checkBody('gender','Email field is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('dep','username field is required').notEmpty();
    req.checkBody('desig','username field is required').notEmpty();
    req.checkBody('id','username field is required').notEmpty();
    req.checkBody('mobile','username field is required').notEmpty();
    req.checkBody('password','password field is required').notEmpty();
    req.checkBody('password2','password do not match').equals(password);
  
    var errors=req.validationErrors();
    if(errors)
    { console.log(errors);
      res.status(500).send('error in validation');
      console.log('errors in validation');
      
    }
    else{
      faculty.getUserByID(email,function(err, user){ //for checking if user is already registered
        if(err) throw err;
        if(user){
            console.log("Already Registered");
            res.status(500).send('already reg verified');
            return;
        }
        else{
          var random=Math.floor((Math.random() * 100) + 54);
      var newUser=new faculty({
        name: name,//LHS should be same as that of attribute name in DB file and DB
        id: id,
        dep: dep,
        gender: gender,
        desig: desig,
        emailid: email,
        mobileno: mobile,
        password: password,
        rand:random,
        status:"pending"
      }); 
      //console.log('no errors');
    faculty.createUser(newUser,function(err,user){
      if(err) throw err;
      host=req.get('host');
      link="http://"+req.get('host')+"/faculty/verify?rand="+random+"&id="+newUser._id;
      mailOptions={
          to : user.emailid,
          subject : "Please confirm your Email account",
          html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
      }
      smtpTransport.sendMail(mailOptions, function(error, response){
       if(error){
              console.log(error);
          res.status(500).send('mail error');
       }else{
        var mail_doc=new Mail_log({//Entry into Mail Log
          emailid:user.emailid,
          subject:"Please confirm your Email account",
          status:'Sent',
          date:new Date(dt.now())
        });
  
        Mail_log.mail_log(mail_doc,function(err){
          if(err) throw err;
        });
              console.log("Message sent: " + response.message);
          res.end("sent");
           }
  });

    });
    console.log('success','you are now registered and can login');
    req.flash('success','you are now registered and can login');
  res.redirect('/');
}
      });
    }}
    else{
      res.status(500).send('someone already logged in');
    }
});

router.get('/verify',function(req,res){
  console.log(req.protocol+"://"+req.get('host'));
console.log('id is '+req.query.id);
  if((req.protocol+"://"+req.get('host'))==("http://"+host))
  {
      console.log("Domain is matched. Information is from Authentic email");
      //console.log("random no is " +sess.user.rand);  
      faculty.getinfobyID(req.query.id,function(err, user){
        if(err) throw err;
        if(!user){
            console.log("unknown user");
            res.redirect('/faculty/unknw');
            return;
        }
  
      
        console.log('value of random is '+user.rand);
      if(req.query.rand== user.rand)
      {
          console.log("email is verified");
          res.end("<h1>Email "+user.emailid+" is been Successfully verified");
          var newvalues={$set:
        {
           status:"verified"
        }};
        faculty.updateuser(user._id,newvalues,function(err){
           if(err) throw err;
        });
        }
      else
      {
          console.log("email is not verified");
          res.end("<h1>Bad Request</h1>");
      }});
  }
  else
  {
      res.end("<h1>Request is from unknown source");
  }
  });
  

  router.post('/forgot_pass',function(req,res,next){

    var id=req.body.id;
     faculty.getUserByID(id,function(err, user){
       if(err) throw err;
       if(!user){
           console.log("unknown user");
           res.status(500).send('Unauthorized User');
           return;
       }
       /*var password = generator.generate({
         length: 10,
         numbers: true
     });*/
     var password='sahil';
     faculty.update_password(id,password,function(err){
      if(err) throw err;
       
      host=req.get('host');
      mailOptions={
          to : id,
          subject : "Password Updated",
          html : "Hello,<br> your new password for EduGrievance Portal is: <br>"+password+"<br> Thanks and Regards <br> <b>Anand International College Of Engineering</b>" 
      }
      smtpTransport.sendMail(mailOptions, function(error, response){
       if(error) throw err;
       else{
        var mail_doc=new Mail_log({//Entry into Mail Log
          emailid:id,
          subject:"Password Update",
          status:'Sent',
          date:new Date(dt.now())
        });
  
        Mail_log.mail_log(mail_doc,function(err){
          if(err) throw err;
        });
           console.log("Message sent: " + response.message);
           res.send('success');       
             }
  });
     });
     }); 
   });

  router.get('/grievance_type',requireLogin,function(req,res,next){
        Grvtype.grvtype_find(function(err,result)
    {
        if(err) throw err;
        console.log(result);
      
    res.send(result);
        }
    
    );
    });


module.exports = router;