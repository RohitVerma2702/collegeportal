var express = require('express');
var router = express.Router();
var datetime = require('node-datetime');
var dt = datetime.create();
var expressValidator=require('express-validator');
var admin=require('../models/Admindb')
var cell=require('../models/Membersdb');
var generator = require('generate-password');
var Student=require('../models/Studentdb');
var Parent=require('../models/Parentdb');
var faculty=require('../models/facultydb');
var Staff=require('../models/staffdb');
var mngmnt =require('../models/mngmntdb');
var Member=require('../models/Membersdb');
var Grv=require('../models/grievancedb');
var Grvtype=require('../models/grvtypedb');
var Mail_log=require('../models/Maildb');
var async=require('async')

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  //secure: false,
  auth: {
      user: "gportal33@gmail.com",
      pass: "grievance001"
  }
});
var mailOptions;
function requireLogin(req, res, next) {
    if (req.session.active==1&&req.session.type=='Admin') { /*if someone is logged in as cell member*/ 
      next(); // allow the next route to run                   
    } else {
      // require the user to log in
      res.redirect('/'); // or render a form, etc.
    }
  }
var app = express();
var sess;
  router.get('/Home',requireLogin, function(req, res, next) {
    res.render('Home2',{title:'Admin_Login'});
  });

  

router.get('/my-account',function(req,res,next){

  admin.getUserByID(req.session.user,function(err,user){
if(err) throw err;
else
{
  data={
    email:user.emailid,
    mobile:user.mobileno,
    name:user.name
  };
  res.send(data);
}

  });
});

router.post('/update',function(req,res,next){
   var newvalues = {$set: 
     {
      mobileno:req.body.mobileno
   }};
 admin.updateuser(sess.email,newvalues,function(err,isUpdate){
    if(err) throw err;
  else
  {
    console.log(' successfuly update ');
    res.redirect('/Admin/Home#!/');
  }
 });

 });
 router.get('/rejected_user',requireLogin,function(req,res,next){//For Showing Rejected User(By Admin) list
  if(req.query.user=='student')
{
  Student.apprv_find('rejected',function(err,users){
  if(err) throw err;
  else{
    console.log(users);
  data={info:users}
  res.send(data);
  }
  })
}
else if(req.query.user=='parent')
{
  Parent.apprv_find('rejected',function(err,users){
  if(err) throw err;
  else{
   console.log(users);
  data={
    info:users
  }
  res.send(data)
  }
  })
}
else if(req.query.user=='staff')
{
 Staff.apprv_find('rejected',function(err,users){
 if(err) throw err;
 else
 {console.log(users);
   data={info:users}
 res.send(data)
 }
 })
}
else if(req.query.user=='faculty')
{
  faculty.apprv_find('rejected',function(err,users){
  if(err) throw err;
  else
  {
   console.log(users);
  data={
     info:users
   };
  res.send(data);
  }
  })
}

});


 router.get('/approve_user',requireLogin,function(req,res,next){//to Display all th Grievance Cell Member 
  console.log(req.query.user);
   if(req.query.user=='student')
{
 Student.apprv_find('approved',function(err,users){
 if(err) throw err;
 else{
   console.log(users);
  data={
    info:users
  }
 res.send(data);
 }
})
}
else if(req.query.user=='parent')
{
 Parent.apprv_find('approved',function(err,users){
 if(err) throw err;
 else{
   console.log(users);
  data={
    info:users
  }
 res.send(data)
 }//res.end('fetched complete');
})
}
else if(req.query.user=='staff')
{
 Staff.apprv_find('approved',function(err,users){
 if(err) throw err;
 else
 {console.log(users);
   data={
   info:users
 }
res.send(data)
 }
})
}
else if(req.query.user=='faculty')
{
 faculty.apprv_find('approved',function(err,users){
 if(err) throw err;
 else
 {
   console.log(users);
data={
    info:users
  };
 res.send(data);
}
})
}

   
   });
   router.post('/Deactivate_user',requireLogin,function(req,res,next){//To reject a particular user
    var user=req.body.type;
    var id={emailid:req.body.email};
    var newvalue={$set:{
      access:'rejected'}
    } 
    console.log(req.body.email);
    console.log(user)  
    if(user=='Faculty')
    {
      faculty.updateuser(req.body.email,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly Rejected Faculty");
        res.redirect('/');
      })
    }
    else if(user=='Student')
    {

      Student.updateuser(req.body.email,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly Rejected Student")
        res.redirect('/');
      })
    }
    else if(user=='Staff')
    {
      Staff.updateuser(req.body.email,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly Rejected Staff");
        res.redirect('/');
      })
    }
    else if(user=='Parent')
    {
      Parent.updateuser(req.body.email,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly Rejected Parent");
        res.redirect('/');
      })
    }
   });

   router.get('/pending_user',requireLogin,function(req,res,next){//To show the list of  user whose access is Pending (Not Approved By user) 
     console.log(req.query.user);
      if(req.query.user=='student')
  {
    Student.apprv_find('pending',function(err,users){
    if(err) throw err;
    else{
      console.log(users);
     data={
       info:users
     }
    res.send(data);
    }
  })
  }
  else if(req.query.user=='parent')
  {
    Parent.apprv_find('pending',function(err,users){
    if(err) throw err;
    else{
      console.log(users);
     data={
       info:users
     }
    res.send(data)
    }//res.end('fetched complete');
  })
  }
  else if(req.query.user=='staff')
  {
    Staff.apprv_find('pending',function(err,users){
    if(err) throw err;
    else
    {console.log(users);
      data={
      info:users
    }
   res.send(data)
    }
  })
  }
  else if(req.query.user=='faculty')
  {
    faculty.apprv_find('pending',function(err,users){
    if(err) throw err;
    else
    {
      console.log(users);
  data={
       info:users
     };
    res.send(data);
  }
  })
  }
  
      
      });

      router.post('/Approve_User',requireLogin,function(req,res,next){// To give access to a user(by Admin)
        var user=req.body.type;
    var id={emailid:req.body.email};
    var newvalue={$set:{
      access:'approved'
    }
    }   
    if(user=='Faculty')
    {
      faculty.updateuser(req.body.email,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly approved ");
        res.redirect('/');
      })
    }
    else if(user=='Student')
    {
      Student.updateuser(req.body.email,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly approved ");
        res.redirect('/');
      })
    }
    else if(user=='Staff')
    {
      Staff.updateuser(req.body.email,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly approved ");
        res.redirect('/');
      })
    }
    else if(user=='Parent')
    {
      Parent.updateuser(req.body.email,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly approved ");
        res.redirect('/');
      })
    }
      });
 router.post('/undo_rejected',requireLogin,function(req,res,next){//To Undo rejection of a user
  var user=req.body.type;
  var id={emailid:req.body.email};
  var newvalue={$set:{
    access:'approved'
  }
  }   
  if(user=='Faculty')
  {
    faculty.updateuser(req.body.email,newvalue,function(err){
      if(err) throw err;
      console.log("Successfuly approved ");
      res.redirect('/');
    })
  }
  else if(user=='Student')
  {
    Student.updateuser(req.body.email,newvalue,function(err){
      if(err) throw err;
      console.log("Successfuly approved ");
      res.redirect('/');
    })
  }
  else if(user=='Staff')
  {
    Staff.updateuser(req.body.email,newvalue,function(err){
      if(err) throw err;
      console.log("Successfuly approved ");
      res.redirect('/');
    })
  }
  else if(user=='Parent')
  {
    Parent.updateuser(req.body.email,newvalue,function(err){
      if(err) throw err;
      console.log("Successfuly approved");
      res.redirect('/');
    })
  }
  
 });
      router.get('/All_Grievances',requireLogin,function(req,res,next){
        console.log('hiii');
       query=req.query.active;
        Grv.grv_all(query,function(err,result)
        {
            if(err) throw err;
            console.log(result);
            var data={
              info:result
            }
      
        res.send(data);
    
            }
    
        );
        });
  
      router.get('/GRV',requireLogin,function(req,res,next){//For finding a particular Grievance information
        //console.log('hii'); 
        console.log(req.query.grv_id);
           Grv.grv_findbyid(req.query.grv_id,function(err,result)
        {
            if(err) throw err;
            console.log(result);
            var wqe={
            info:result
        }
        var data=result
        res.send(data);
            }
        
      );
        });
        router.post('/GRV_delete',requireLogin,function(req,res,next){//To deactivate a posted grievance 
          var id={grv_id:req.query.grv_id}
          var newvalues = {$set: 
               { active:0 }
              };
   
           Grv.update_grv(id,newvalues,function(err,isUpdate){
               if(err) throw err;
             else
             {
               console.log(' successfuly update ');
               res.redirect('/Members/Grievances');
             }
            }); 
           
        })

 router.get('/GCM_List',requireLogin,function(req,res,next){//to Display all th Grievance Cell Member 
  Member.find_all(function(err,result){
    if(err) throw err;
    else{
      console.log(result);
      var data={
        info:result
      }
    res.send(data);
  }
  })
  
  });

  router.get('/Mngmnt_List',requireLogin,function(req,res,next){//to Display all th Grievance Cell Member 
    mngmnt.find_all(function(err,result){
      if(err) throw err;
      else{
        console.log(result);
        var data={
          info:result
        }
      res.send(data);
    }
    })
    
    });
  router.post('/GCM_Deactivate',requireLogin,function(req,res,next){//To remove access permission from a GCM

    console.log(req.body.email);
    console.log('hii');
    var newvalue={$set:{
      access:'terminated'
    }}
    Member.updateuser(req.body.email,newvalue,function(err){
      if(err) throw err;
      console.log('GCM  Deactivated');
      res.redirect('/');
    });
  })
  router.post('/Mngmnt_Deactivate',requireLogin,function(req,res,next){//To remove access permission from a GCM
    console.log(req.body.email);
    console.log('hii');
    var newvalue={$set:{
      access:'terminated'
    }}
    mngmnt.updateuser(req.body.email,newvalue,function(err){
      if(err) throw err;
      console.log('GCM  Deactivated');
      res.redirect('/');
    });
  })
router.get('/Grievances',function(req,res,next){// for all pending grievances 
  console.log('hii'); 
  active=req.query.param;     
   Grv.grv_findforAdmin(function(active,err,result)
  {
      if(err) throw err;
      var data={
      info:result
  }
  res.send(data);
      });
  });
  
  router.post('/create',function(req,res,next){
    console.log(req.body.mngmnt);
    var name=req.body.name;
   var Des=req.body.Des;
   console.log(req.body.gtype);
   var gtype=req.body.gtype.map(Number);
   var email=req.body.email;
   var mobile=req.body.mobile;
   var password=generator.generate({
    length: 10,
    numbers: true
});


if((req.body.mngmnt)==1)
{
 mngmnt.getUserByID(email,function(err,user){
   if(user){
     console.log('mngmnt member already exists');
     res.status(500).send('mngmnt member already Exists');
   }
   else{ 
   var newuser=new mngmnt({
    name:name,
    designation:Des,
    Gtype:gtype,
    emailid:email,
    mobileno:mobile,
    password:password,
    access:'approved'
  });

    console.log("create management");
    var created=true;
    mngmnt.createUser(newuser,function(err,user){
      if(err) throw err;
      console.log(user);
     // res.end('Managment Member Created');
    });
    host=req.get('host');
    mailOptions={
         to :email,
         subject : "Added to Anand Cell ",
         html : "Hello "+name+", <br><br>Greetings from Anand International College of Engineering Online Grievance Redressal Portal!<br><br>You have been added as Cell Member to the Grievance Redressal Portal of Anand International College of Engineering<br><br>You can login with your email Id or mobile number as username and "+password+ " as password to access the posts and updates.<br><br>Thanks and Regards<br><br>Admin-Grievance Redressal Portal<br><br><h1>Anand International College of Engineering</h1><br>" 
     }
     
     console.log(mailOptions);
     smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
             console.log(error);
         res.end("error");
      }
      else{
       var mail_doc=new Mail_log({
         emailid:email,
         subject:"Added to Anand Cell ",
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
 
 
  }
})
}
  else{
    cell.getUserByID(email,function(err,user){
    if(err) throw err;
    if(user){
      console.log('mngmnt member already exists');
      res.status(500).send('mngmnt member already Exists');
       
    }
    else{
    var newuser=new cell({
      name:name,
      designation:Des,
      Gtype:gtype,
      emailid:email,
      mobileno:mobile,
      password:password,
      access:'approved'
    });
  
    console.log('cell created');
    var created=true;
  cell.createUser(newuser,function(err,user){
    if(err) throw err;
    console.log(user);
   });
   host=req.get('host');
   mailOptions={
        to :email,
        subject : "Added to Anand Cell ",
        html : "Hello "+name+", <br><br>Greetings from Anand International College of Engineering Online Grievance Redressal Portal!<br><br>You have been added as Cell Member to the Grievance Redressal Portal of Anand International College of Engineering<br><br>You can login with your email Id or mobile number as username and "+password+ " as password to access the posts and updates.<br><br>Thanks and Regards<br><br>Admin-Grievance Redressal Portal<br><br><h1>Anand International College of Engineering</h1><br>" 
    }
    
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }
     else{
      var mail_doc=new Mail_log({
        emailid:email,
        subject:"Added to Anand Cell ",
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

  
}
})  
}
  });

 router.post('/password_reset',function(req,res,next){
  var cpass=req.body.current_password;
  var  npass=req.body.new_password;
  var npass2=req.body.new_password1;
 

admin.getinfobyID(req.session.user,function(err, user){
  if(err) throw err;
  if(!user){
      console.log("unknown user");
      res.redirect('/faculty/unknw');
      return;
  }

        admin.comparePassword(cpass, user.password, function(err, isMatch){
            if(err) throw err;
              if(isMatch){
                admin.update_password(sess.email,npass,function(err){
                   if(err) throw err;
                 else
                 {
                   console.log(' password updated');
                   //res.redirect('/Student/Home')
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
    
  })

  router.post('/login',function(req,res,next){
sess=req.session;
if(!sess.user){
    var id=req.body.id;
    var password=req.body.password;
  
  
    admin.getUserByID(id,function(err, user){
      if(err) throw err;
      if(!user){
          console.log("unknown user");
          res.status(500).send('Unauthorized User');
          return false;
      }

      admin.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
           console.log('login successful');
          
           sess.user=user._id;
           sess.type='Admin';
           sess.email=user.emailid;
           sess.active=1;
           res.send('success');
        }
        else{
          console.log('invalid password');
          //res.redirect('/Admin/pass');
          res.status(500).send('pass');
          return false;
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
       admin.getUserByID(id,function(err, user){
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
       admin.update_password(id,password,function(err){
        if(err) throw err;
         
        host=req.get('host');
        mailOptions={
            to : id,
            subject : "Password Updated",
            html : "Hello,<br> your new password for EduGrievance Portal is: <br>"+password+"<br> Thanks and Regards <br> <b>Anand International College Of Engineering</b>" 
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error) throw err;
         else{
          var mail_doc=new Mail_log({
            emailid:id,
            subject:"Password Updated ",
            status:'Sent',
            date:new Date(dt.now()) 
          });
    
          Mail_log.mail_log(mail_doc,function(err){
            if(err) throw err;
          });
             console.log("Message sent");
             res.send('success');       
               }
    });
       });
       }); 
     });
  

     router.post('/termination',requireLogin,function(req,res,next){//For Permanent Termination of either 
      var newvalues={$set:{                                         //Student or Parent at end of Course Completion
        access:'terminated'
      }};
      if(req.query.type=='Student')
      {
      Student.Terminate(req.body.year,newvalues,function(err){
        if(err) throw err;
        console.log('Student Terminated');
      });
     
    }
    else if(req.query.type=='Parent'){
      Parent.Terminate(req.body.year,newvalues,function(err){
        if(err) throw err
        console.log('Parent Terminated');
      })
    }
    res.end();
     });

     router.get('/Mail_Log',requireLogin,function(req,res,next){
      Mail_log.find_mail(function(err,Result){
      if(err) throw err;
      console.log('Mail Log fetched');
      console.log(Result);
      data={info:Result}
      res.send(data);
      })
     });

// author: Ankit Sharma
//function to add new grievance type

router.get('/grievance_type',requireLogin,function(req,res,next){
  console.log('hiitype'); 
  console.log(req.session.email)
    //console.log(req.query.id)
      Grvtype.grvtype_find(function(err,result)
  {
      if(err) throw err;
     // console.log(result);
    data={info:result};
  console.log(data)
    res.send(data);
  //)
      }
  
  );
  });
router.post('/grvtype_deactivate',function(req,res,next){// For deactivating a Grievance type
grvtype={grvtype:req.body.grvtype};
console.log(req.body.grvtype)
var newvalue={$set:{active:false}};
Grvtype.update_grvtype(grvtype,newvalue,function(err){
if(err) throw err;
console.log('grvtype deleted');
res.redirect('/');
})
});
router.post('/grvtype_add',requireLogin,function(req,res,next){ //For adding a grievance type
  var grvtype=req.body.grvtype;
  var description=req.body.description;
  var newGrv=new Grvtype({
    grvtype:grvtype,
    description:description,
    active:true
  });
  Grvtype.grvtype_post(newGrv,function(err,grv){
    if(err) throw err;
    else{
      console.log("grievance is added successfuly");
      console.log(grv);
    }
    res.redirect('/Admin/Home');
  });

});


module.exports = router;
