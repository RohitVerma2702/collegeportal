var express = require('express');
var router = express.Router();
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
var session = require('express-session');
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
  console.log(req.session.active);
  console.log('1');
    if (req.session.active==1&&req.session.type=='Admin') { /*if someone is logged in as cell member*/ 
      next(); // allow the next route to run                   
    } else {
      // require the user to log in
      res.redirect('/'); // or render a form, etc.
    }
  }
console.log('successful');
var app = express();
var sess;
  router.get('/Home',requireLogin, function(req, res, next) {
    res.render('Home2',{title:'Admin_Login'});
  });
  router.get('/unknw', function(req, res, next) {
    res.render('unknw');
  });
  router.get('/pass', function(req, res, next) {
    res.render('pass');
  });
  router.get('/create',requireLogin ,function(req, res, next) {
    var sess=req.session;
    if(sess.user)
    res.render('create_cell');
    else
    res.render('view');
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
    
  var id={ _id:sess.user};
   var newvalues = {$set: 
     {
       //gender:req.body.gender,
      //emailid:req.body.emailid,
      mobileno:req.body.mobileno
   }};
 admin.updateuser(id,newvalues,function(err,isUpdate){
    if(err) throw err;
  else
  {
    console.log(' successfuly update ');
    res.redirect('/Admin/Home#!/');
  }
 });

 });
 router.get('/rejected_user',requireLogin,function(req,res,next){
  console.log(req.query.user);
  if(req.query.user=='student')
{
Student.apprv_find('rejected',function(err,users){
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
Parent.apprv_find('rejected',function(err,users){
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
Staff.apprv_find('rejected',function(err,users){
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
   router.post('/Deactivate_user',requireLogin,function(req,res,next){
    var user=req.body.type;
    var id={emailid:req.body.email};
    var newvalue={$set:{
      access:'rejected'}
    } 
    console.log(req.body.email);
    console.log(user)  
    if(user=='Faculty')
    {
      faculty.updateuser(id,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly Rejected Faculty");
        res.redirect('/');
      })
    }
    else if(user=='Student')
    {

      Student.updateuser(id,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly Rejected Student")
        res.redirect('/');
      })
    }
    else if(user=='Staff')
    {
      Staff.updateuser(id,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly Rejected Staff");
        res.redirect('/');
      })
    }
    else if(user=='Parent')
    {
      Parent.updateuser(id,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly Rejected Parent");
        res.redirect('/');
      })
    }
   });

   router.get('/pending_user',requireLogin,function(req,res,next){//to Display all th Grievance Cell Member 
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

      router.post('/Approve_User',requireLogin,function(req,res,next){
        var user=req.body.type;
    var id={emailid:req.body.email};
    var newvalue={$set:{
      access:'approved'
    }
    }   
    if(user=='Faculty')
    {
      faculty.updateuser(id,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly approved ");
        res.redirect('/');
      })
    }
    else if(user=='Student')
    {
      Student.updateuser(id,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly approved ");
        res.redirect('/');
      })
    }
    else if(user=='Staff')
    {
      Staff.updateuser(id,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly approved ");
        res.redirect('/');
      })
    }
    else if(user=='Parent')
    {
      Parent.updateuser(id,newvalue,function(err){
        if(err) throw err;
        console.log("Successfuly approved ");
        res.redirect('/');
      })
    }
      });
 router.post('/undo_rejected',requireLogin,function(req,res,next){
  var user=req.body.type;
  var id={emailid:req.body.email};
  var newvalue={$set:{
    access:'approved'
  }
  }   
  if(user=='Faculty')
  {
    faculty.updateuser(id,newvalue,function(err){
      if(err) throw err;
      console.log("Successfuly approved ");
      res.redirect('/');
    })
  }
  else if(user=='Student')
  {
    Student.updateuser(id,newvalue,function(err){
      if(err) throw err;
      console.log("Successfuly approved ");
      res.redirect('/');
    })
  }
  else if(user=='Staff')
  {
    Staff.updateuser(id,newvalue,function(err){
      if(err) throw err;
      console.log("Successfuly approved ");
      res.redirect('/');
    })
  }
  else if(user=='Parent')
  {
    Parent.updateuser(id,newvalue,function(err){
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
        router.post('/GRV_delete',requireLogin,function(req,res,next){
          console.log(req.query.grv_id);
          var id={grv_id:req.query.grv_id}
          var newvalues = {$set: 
               {
                 active:0 
                     
                }
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
  router.post('/GCM_Deactivate',requireLogin,function(req,res,next){
    console.log(req.body.email);
    console.log('hii');
    Member.Delete_Gcm(req.body.email,function(err){
      if(err) throw err;
      console.log('GCM  Deactivated');
      res.redirect('/');
    });
  })
router.get('/approve',requireLogin,function(req,res,next){
  //var x=req.query.status;
  if(req.query.type=='Student')
{
  Student.apprv_find(req.query.status,function(err,users){
  if(err) throw err;
res.render('post1',{
  result:users,
  type:req.query.status,
  user:req.query.type
});
  //res.end('fetched complete');
})
}
else if(req.query.type=='Parent')
{
  Parent.apprv_find(req.query.status,function(err,users){
  if(err) throw err;
res.render('post1',{
  result:users,
  type:req.query.status,
  user:req.query.type
});
  //res.end('fetched complete');
})
}
else if(req.query.type=='staff')
{
  Staff.apprv_find(req.query.status,function(err,users){
  if(err) throw err;
   res.render('post1',{
    result:users,
    type:req.query.status,
    user:req.query.type
   }); 
  })
}
else if(req.query.type=='faculty')
{
  faculty.apprv_find(req.query.status,function(err,users){
  if(err) throw err;
res.render('post1',{
  result:users,
  type:req.query.status,
  user:req.query.type
});
  //res.end('fetched complete');
})
}

});
router.get('/Grievances',function(req,res,next){// for all pending grievances 
  console.log('hii'); 
  active=req.query.param;
    //console.log(req.query.id)body
      Grv.grv_findforAdmin(function(active,err,result)
  {
      if(err) throw err;
     // console.log(result);
      var data={
      info:result
  }
  res.send(data);
      });
  });
  
  router.post('delete_grv',function(req,res,next){//for deleting any grievances
var newvalues={
  active:0
};
    Grv.update_grv(req.body.id,newvalues,function(err){
      if(err)
      throw errror;
    })
  });

  router.post('deactivate_grvtype',function(req,res,next){//for deleting any grievances
    var newvalues={
      active:false
    };
    Grvtype.update_grvtype(req.body.id,newvalues,function(err){
          if(err)
          throw errror;
        })
      });


router.get('/existing_request',requireLogin,function(req,res,next){
  console.log(req.query.email);
  console.log(req.query.status);
  console.log(req.query.user);
  if(req.query.status==1)//all those who are rejected
  { console.log('in approved');
   if(req.query.user=='Student')
   {
    var id={emailid:req.query.email};
    var newvalues = {$set: 
      { status:'approved' }};
      
  Student.updateuser(id,newvalues,function(err,isUpdate){
     if(err) throw err;
   else
   {
     console.log(' successfuly update ');
     res.redirect('/Admin/Home');
     //res.redirect('/Parent/dashboard')
   }
  
  }); 
   }
   else if(req.query.user=='Parent')
   {
    var id={ emailid:req.query.email};
    var newvalues = {$set: 
      { status:'approved' }};
  
  Parent.updateuser(id,newvalues,function(err,isUpdate){
     if(err) throw err;
   else
   {
     console.log(' successfuly update ');
     res.redirect('/Admin/Home')
   }
  });
  
   }
   else if(req.query.user=='staff')
   {
    var id={ emailid:req.query.email};
    var newvalues = {$set: 
      { status:'approved' }};
      
  Staff.updateuser(id,newvalues,function(err,isUpdate){
     if(err) throw err;
   else
   {
     console.log(' successfuly update ');
     res.redirect('/Admin/Home');
     //res.redirect('/Parent/dashboard')
   }
  });
   }
   else if(req.query.user=='faculty')
   {
    var id={ emailid:req.query.email};
    var newvalues = {$set: 
      { status:'approved' }};
      
  faculty.updateuser(id,newvalues,function(err,isUpdate){
     if(err) throw err;
   else
   {
     console.log(' successfuly update ');
     res.redirect('/Admin/Home');
     //res.redirect('/Parent/dashboard')
   }
  });
   }
  }
  else{   //all those who are approved
    console.log('in rejected');
    if(req.query.user=='Student')
    {
     var id={ emailid:req.query.email};
     var newvalues = {$set: 
       { status:'rejected' }};
       
   Student.updateuser(id,newvalues,function(err,isUpdate){
      if(err) throw err;
    else
    {
      console.log(' successfuly update ');
      res.redirect('/Admin/Home');
      //res.redirect('/Parent/dashboard')
    }
   
   }); 
    }
    else if(req.query.user=='Parent')
    {
     var id={ emailid:req.query.email};
     var newvalues = {$set: 
       { status:'rejected' }};
   
   Parent.updateuser(id,newvalues,function(err,isUpdate){
      if(err) throw err;
    else
    {
      console.log(' successfuly update ');
      res.redirect('/Admin/Home');
      //res.redirect('/Parent/dashboard')
    }
   });
   
    }
    else if(req.query.user=='staff')
    {
     var id={ emailid:req.query.email};
     var newvalues = {$set: 
       { status:'rejected' }};
       
   Staff.updateuser(id,newvalues,function(err,isUpdate){
      if(err) throw err;
    else
    {
      console.log(' successfuly update ');
      res.redirect('/Admin/Home');
      //res.redirect('/Parent/dashboard')
    }
   });
    }
    else if(req.query.user=='faculty')
    {
     var id={ emailid:req.query.email};
     var newvalues = {$set: 
       { status:'rejected' }};
       
   faculty.updateuser(id,newvalues,function(err,isUpdate){
      if(err) throw err;
    else
    {
      console.log(' successfuly update ');
      res.redirect('/Admin/Home');
      //res.redirect('/Parent/dashboard')
    }
   });
    }
  }
  

});
router.get('/Pending_user',requireLogin,function(req,res,next){   //Pending approval 
var email=req.query.email;
console.log(req.query.email);
console.log(req.query.status);
console.log(req.query.user);
if(req.query.status==1)
{ console.log('in approved');
 if(req.query.user=='Student')
 {
  var id={emailid:req.query.email};
  var newvalues = {$set: 
    { status:'approved' }};
    
Student.updateuser(id,newvalues,function(err,isUpdate){
   if(err) throw err;
 else
 {
   console.log(' successfuly update ');
   res.redirect('/Admin/Home');
   //res.redirect('/Parent/dashboard')
 }

}); 
 }
 else if(req.query.user=='Parent')
 {
  var id={ emailid:req.query.email};
  var newvalues = {$set: 
    { status:'approved' }};

Parent.updateuser(id,newvalues,function(err,isUpdate){
   if(err) throw err;
 else
 {
   console.log(' successfuly update ');
   res.redirect('/Admin/Home');
 }
});

 }
 else if(req.query.user=='staff')
 {
  var id={ emailid:req.query.email};
  var newvalues = {$set: 
    { status:'approved' }};
    
Staff.updateuser(id,newvalues,function(err,isUpdate){
   if(err) throw err;
 else
 {
   console.log(' successfuly update ');
   res.redirect('/Admin/Home');
   //res.redirect('/Parent/dashboard')
 }
});
 }
 else if(req.query.user=='faculty')
 {
  var id={ emailid:req.query.email};
  var newvalues = {$set: 
    { status:'approved' }};
    
faculty.updateuser(id,newvalues,function(err,isUpdate){
   if(err) throw err;
 else
 {
   console.log(' successfuly update ');
   res.redirect('/Admin/Home');
   //res.redirect('/Parent/dashboard')
 }
});
 }
}
else{
  console.log('in rejected');
  if(req.query.user=='Student')
  {
   var id={ emailid:req.query.email};
   var newvalues = {$set: 
     { status:'rejected' }};
     
 Student.updateuser(id,newvalues,function(err,isUpdate){
    if(err) throw err;
  else
  {
    console.log(' successfuly update ');
    res.redirect('/Admin/Home')
    //res.redirect('/Parent/dashboard')
  }
 
 }); 
  }
  else if(req.query.user=='Parent')
  {
   var id={ emailid:req.query.email};
   var newvalues = {$set: 
     { status:'rejected' }};
 
 Parent.updateuser(id,newvalues,function(err,isUpdate){
    if(err) throw err;
  else
  {
    console.log(' successfuly update ');
    res.redirect('/Admin/Home');
    //res.redirect('/Parent/dashboard')
  }
 });
 
  }
  else if(req.query.user=='staff')
  {
   var id={ emailid:req.query.email};
   var newvalues = {$set: 
     { status:'rejected' }};
     
 Staff.updateuser(id,newvalues,function(err,isUpdate){
    if(err) throw err;
  else
  {
    console.log(' successfuly update ');
    res.redirect('/Admin/Home');
    //res.redirect('/Parent/dashboard')
  }
 });
  }
  else if(req.query.user=='faculty')
  {
   var id={ emailid:req.query.email};
   var newvalues = {$set: 
     { status:'rejected' }};
     
 faculty.updateuser(id,newvalues,function(err,isUpdate){
    if(err) throw err;
  else
  {
    console.log(' successfuly update ');
    res.redirect('/Admin/Home');
    //res.redirect('/Parent/dashboard')
  }
 });
  }
}
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
   var newuser=new mngmnt({
    name:name,
    designation:Des,
    Gtype:gtype,
    emailid:email,
    mobileno:mobile,
    password:password
  });

    console.log("create management");
    mngmnt.createUser(newuser,function(err,user){
      if(err) throw err;
      console.log(user);
      res.end('Managment Member Created');
    });
  }
  else{
    var newuser=new cell({
      name:name,
      designation:Des,
      Gtype:gtype,
      emailid:email,
      mobileno:mobile,
      password:password
    });
  
    console.log('cell created');
  cell.createUser(newuser,function(err,user){
    if(err) throw err;
    console.log(user);
    res.end('Cell Member Created');
  });
  }


  host=req.get('host');
   // link="http://"+req.get('host')+"/Student/verify?rand="+rand+"&id="+sess.user;
    //link="https://www.google.com/"
    mailOptions={
        to :email,
        subject : "Added to Anand Cell ",
        html : "Hello "+name+", <br><br>Greetings from Anand International College of Engineering Online Grievance Redressal Portal!<br><br>You have been added as Cell Member to the Grievance Redressal Portal of Anand International College of Engineering<br><br>You can login with your email Id or mobile number as username and "+password+ " as password to access the posts and updates.<br><br>Thanks and Regards<br><br>Admin-Grievance Redressal Portal<br><br><h1>Anand International College of Engineering</h1><br>" 
    }
    //console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});




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
                admin.update_password(sess.user,npass,function(err){
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
          //res.redirect('/Admin/unknw');
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
     // sess.user=user._id;
      //sess.type='Admin';
      //sess.active=1;
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
             console.log("Message sent: " + response.message);
             res.send('success');       
               }
    });
       });
       }); 
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
router.post('/grvtype_deactivate',function(req,res,next){
grvtype={grvtype:req.body.grvtype};
console.log(req.body.grvtype)
var newvalue={$set:{active:false}};
Grvtype.update_grvtype(grvtype,newvalue,function(err){
if(err) throw err;
console.log('grvtype deleted');
res.redirect('/');
})
});
  router.get('/grvtype_add',requireLogin ,function(req, res, next) {
    var sess=req.session;
    if(sess.user)
    res.render('add_grvtype');
    else
    res.render('view');
  });
router.post('/grvtype_add',requireLogin,function(req,res,next){   
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


/* author : Ankit Sharma
date: 31/10/2018 */

   /*router.get('/grievance_type',requireLogin,function(req,res,next){
    console.log('hiitype'); 
 
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

*/
module.exports = router;
