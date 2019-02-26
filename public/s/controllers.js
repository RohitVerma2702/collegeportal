

app.controller("Gcm_grievances", function ($http,$scope,$window) {
    $scope.msg = "I love London";
    $http.get("/Members/Grievances").then(function (response) {
        $scope.result=response.data.info;
        $('#loading').hide();
        $('#grievances').fadeIn(500);
    });

    $scope.popup = function(id){
        $('.detailbackground').fadeIn(500);
$scope.id=id;

        $http.get("/Members/GRV?grv_id="+$scope.id).then(function (response) {
            $('.detailbackground').fadeIn(500);
            $scope.data=response.data ;
            $scope.msg ="hiiiii";
        }); 
     
    }
    $scope.reply_popup = function(id){
        $('.detailbackground-reply').fadeIn(500);
$scope.id=id;

        $http.get("/Members/GRV?grv_id="+$scope.id).then(function (response) {
            $('.detailbackground-reply').fadeIn(500);
            $scope.data=response.data ;
            $scope.msg ="hiiiii";
        }); 
    }
    $scope.reply = function(id){
    
        $scope.form={
         reply:$scope.Reply,
         id:id    
        };
        $http.post("/post/reply",$scope.form).then(function(response){
            $window.location.reload();
        })
        
    }
    
    
});

app.controller("Gcm", function ($http,$scope,$mdDialog,$window) {
    $http.get("/Members/my-account").then(function (response) {
         $scope.name = response.data.name;
         $scope.Desg = response.data.designation;
         $scope.mobile = response.data.mobile;
         $scope.email = response.data.email;
         $scope.Gtype = response.data.gtype;
         $('#loading').hide();
         $('#account-details').fadeIn(500);
        });

        $http.get("/Members/grievance_type").then(function(response)
        {
            $scope.grievance_type=response.data;
        });
 
     $scope.submit=function(ev){
         $scope.form={
             mobileno:$scope.mobile,
         }
         $http.post("/Members/update",$scope.form).then(function(response){   
     });

     var update = $mdDialog.confirm()
     .title('Successfully Updated!')
      .targetEvent(ev)
      .ok('Thank You!');

$mdDialog.show(update).then(function() {
$window.location.reload();
})
     
     }
 
     $scope.resetpass=function(ev){
         $scope.new;
         $scope.form={
             current_password:$scope.current_password,
             new_password:$scope.new_password,
             new_password1:$scope.new_password1        
         } 
     $http.post("/Members/password_reset",$scope.form).then(function(response){
    $scope.new="yes" 
    })
          var confirmpass = $mdDialog.confirm()
          .title('Password Updated!')
          .targetEvent(ev)
          .ok('Thank You!');
          var error = $mdDialog.confirm()
          .title('error in updating')
          .targetEvent(ev)
          .ok('Thank You!');
            $mdDialog.show(confirmpass).then(function() {
            $window.location.reload();
            })

        
     }
 });


app.controller("Student_grievances", function ($http,$scope,$window) {
    $http.get("/Student/My_Grievances").then(function (response) {
        $scope.result=response.data.info;
        $('#loading').hide();
        $('#grievances').fadeIn(500);
    });
    $scope.popup = function(id){
        $('.detailbackground').fadeIn(500);
$scope.id=id;

        $http.get("/Student/GRV?grv_id="+$scope.id).then(function (response) {
            $('.detailbackground').fadeIn(500);
            $scope.data=response.data ;
            $scope.msg ="hiiiii";
        }); 
    }

    $scope.remind=function(sequence,ev){
        $scope.seq=sequence;
    $http.get("/post/reminder?seq="+$scope.seq).then(function(response){
    });
    
    var update = $mdDialog.confirm()
    .title('Reminder Sent!')
     .targetEvent(ev)
     .ok('Thank You!');

$mdDialog.show(update).then(function() {
$window.location.reload();
})    
    }
});
app.controller("Student", function ($http,$scope,$window,$mdDialog) {
    $http.get("/Student/my-account").then(function (response) {
         $scope.name = response.data.name;
         $scope.id = response.data.id;
         $scope.mobile = response.data.mobile;
         $scope.email = response.data.email;
         $scope.cdate = response.data.cdate;
         $scope.gender = response.data.gender;
         $scope.dep = response.data.dep;
         $scope.Batch = response.data.Batch;
         $('#loading').hide();
         $('#account-details').fadeIn(500);
        });
    
    //author: Ankit Sharma
    $http.get("/Student/grievance_type").then(function(response)
        {
            $scope.grievance_type=response.data;
        });




     $scope.submit=function(ev){
         $scope.form={
             emailid:$scope.email,
             mobileno:$scope.mobile,
         }
         $http.post("/Student/update",$scope.form).then(function(response){   
            
        });

        var update = $mdDialog.confirm()
        .title('Successfully Updated!')
         .targetEvent(ev)
         .ok('Thank You!');

$mdDialog.show(update).then(function() {
$window.location.reload();
})
     
     }
 
     $scope.resetpass=function(ev){
         $scope.form={
             current_password:$scope.current_password,
             new_password:$scope.new_password,
             new_password1:$scope.new_password1        
         } 
     $http.post("/Student/password_reset",$scope.form).then(function(response){
     })

     var confirmpass = $mdDialog.confirm()
          .title('Password Updated!')
          .targetEvent(ev)
          .ok('Thank You!');

    $mdDialog.show(confirmpass).then(function() {
      $window.location.reload();
    })

     }
 
     $scope.GrvPost=function(ev){
         $scope.form={
              type:$scope.Gtype,
              grv:$scope.Desc,
              file:$scope.file,
              subject:$scope.subject,
              usertype:"Student"
         }
         $http.post("/post/complaint",$scope.form).then(function(response){
           
         })

    var confirm = $mdDialog.confirm()
          .title('Grivance Posted!')
          .targetEvent(ev)
          .ok('Thank You!');

    $mdDialog.show(confirm).then(function() {
      $window.location.reload();
    })
 }
});
app.controller("Parent_grievances", function ($http,$scope) {
    $scope.msg = "I love London";
    $http.get("/Parent/My_Grievances").then(function (response) {
        $scope.result=response.data.info;
        $('#loading').hide();
        $('#grievances').fadeIn(500);
    });

    $scope.popup = function(id){
        $('.detailbackground').fadeIn(500);
        $scope.id=id;
        
                $http.get("/Parent/GRV?grv_id="+$scope.id).then(function (response) {
                   // $('.detailbackground').fadeIn(500);
                    $scope.data=response.data ;
                    $scope.msg ="hiiiii";
                }); 
             //   $('.detailbackground').fadeIn(500);
            }
        
            $scope.remind=function(sequence,ev){
                $scope.seq=sequence;
            $http.get("/post/reminder?seq="+$scope.seq).then(function(response){
            });    

         var update = $mdDialog.confirm()
         .title('Reminder Sent!')
          .targetEvent(ev)
          .ok('Thank You!');
 
 $mdDialog.show(update).then(function() {
 $window.location.reload();
 })
            }
});

app.controller("Parent", function ($http,$scope,$window,$mdDialog) {
    $http.get("/Parent/my-account").then(function (response) {
        $scope.name = response.data.name;
        $scope.relation = response.data.rel;
        $scope.mobile = response.data.mobile;
        $scope.email = response.data.email;
        $scope.cdate = response.data.cdate;
        $('#loading').hide();
        $('#account-details').fadeIn(500);
    });

    $http.get("/Parent/grievance_type").then(function(response){
        $scope.grievance_type=response.data;
    });

    $scope.submit=function(ev){
        $scope.form={
            email:$scope.email,
            mobile:$scope.mobile
        }
        $http.post("/Parent/update",$scope.form).then(function(response){
        })

        var update = $mdDialog.confirm()
        .title('Successfully Updated!')
         .targetEvent(ev)
         .ok('Thank You!');

$mdDialog.show(update).then(function() {
$window.location.reload();
})
    
    }

    $scope.resetpass=function(ev){
        $scope.form={
            current_password:$scope.current_password,
            new_password:$scope.new_password,
            new_password1:$scope.new_password1        
        } 
    $http.post("/Parent/password_reset",$scope.form).then(function(response){
    })

     var confirmpass = $mdDialog.confirm()
          .title('Password Updated!')
          .targetEvent(ev)
          .ok('Thank You!');

    $mdDialog.show(confirmpass).then(function() {
      $window.location.reload();
    })

    }

    $scope.GrvPost=function(ev){
        $scope.form={
             type:$scope.Gtype,
             grv:$scope.Desc,
             file:$scope.file,
             subject:$scope.subject
        }
        $http.post("/post/complaint",$scope.form).then(function(response){
        })
            var confirm = $mdDialog.confirm()
          .title('Grivance Posted!')
          .targetEvent(ev)
          .ok('Thank You!');

    $mdDialog.show(confirm).then(function() {
      $window.location.reload();
    })
    }
});


app.controller("NonTeaching_grievances", function ($http,$scope,$window) {
    $scope.msg = "I love London";
    $http.get("/staff/My_Grievances").then(function (response) {
        //$scope.result = response.result1;
        $scope.result=response.data.info;
        $('#loading').hide();
        $('#grievances').fadeIn(500);
    });

    $scope.popup = function(id){
        $('.detailbackground').fadeIn(500);
        $scope.id=id;
        
                $http.get("/staff/GRV?grv_id="+$scope.id).then(function (response) {
                    $('.detailbackground').fadeIn(500);
                    $scope.data=response.data ;
                    $scope.msg ="hiiiii";
                }); 
             //   $('.detailbackground').fadeIn(500);
            }
        
            $scope.remind=function(sequence,ev){
                $scope.seq=sequence;
            $http.get("/post/reminder?seq="+$scope.seq).then(function(response){
            });
            
         var update = $mdDialog.confirm()
         .title('Reminder Sent!')
          .targetEvent(ev)
          .ok('Thank You!');
 
 $mdDialog.show(update).then(function() {
 $window.location.reload();
 })    
            }

});

app.controller("NonTeaching", function ($http,$scope,$window,$mdDialog) {
    $scope.msg = "I love London";
 
    $http.get("/staff/my-account").then(function (response) {
         $scope.name = response.data.name;
         $scope.id = response.data.id;
         $scope.mobile = response.data.mobile;
         $scope.email = response.data.email;
         $scope.gender = response.data.gender;
         $scope.dep = response.data.dep;
         $scope.Desig = response.data.Desig;
         $('#loading').hide();
         $('#account-details').fadeIn(500);
        });
    
    //author: Ankit Sharma
    $http.get("/staff/grievance_type").then(function(response)
        {
            $scope.grievance_type=response.data;
        });




     $scope.submit=function(ev){
         $scope.form={
            // emailid:$scope.email,
             mobile:$scope.mobile,
         }
         $http.post("/staff/update",$scope.form).then(function(response){   
            
        })

        var update = $mdDialog.confirm()
        .title('Successfully Updated!')
         .targetEvent(ev)
         .ok('Thank You!');

$mdDialog.show(update).then(function() {
$window.location.reload();
})
     
     }
 
     $scope.resetpass=function(ev){
         $scope.form={
             current_password:$scope.current_password,
             new_password:$scope.new_password,
             new_password1:$scope.new_password1        
         } 
     $http.post("/staff/password_reset",$scope.form).then(function(response){
     })

     var confirmpass = $mdDialog.confirm()
          .title('Password Updated!')
          .targetEvent(ev)
          .ok('Thank You!');

    $mdDialog.show(confirmpass).then(function() {
      $window.location.reload();
    })

     }
 
     $scope.GrvPost=function(ev){
         $scope.form={
              type:$scope.Gtype,
              grv:$scope.Desc,
              file:$scope.file,
              subject:$scope.subject,
              usertype:"staff"
         }
         $http.post("/post/complaint",$scope.form).then(function(response){
           
         })

    var confirm = $mdDialog.confirm()
          .title('Grivance Posted!')
          .targetEvent(ev)
          .ok('Thank You!');

    $mdDialog.show(confirm).then(function() {
      $window.location.reload();
    })
 }
});


app.controller("Faculty_grievances", function ($http,$scope,$window) {
    $scope.msg = "I love London";
    $http.get("/faculty/My_Grievances").then(function (response) {
        //$scope.result = response.result1;
        $scope.result=response.data.info;
        $('#loading').hide();
        $('#grievances').fadeIn(500);
    });

    $scope.popup = function(id){
        $('.detailbackground').fadeIn(500);
        $scope.id=id;
        
                $http.get("/faculty/GRV?grv_id="+$scope.id).then(function (response) {
                    $('.detailbackground').fadeIn(500);
                    $scope.data=response.data ;
                    $scope.msg ="hiiiii";
                }); 
             //   $('.detailbackground').fadeIn(500);
            }
    $scope.remind=function(sequence){
        $scope.seq=sequence;
              $http.get("/post/reminder?seq="+$scope.seq).then(function(response){
              }); 
              
         var update = $mdDialog.confirm()
         .title('Reminder Sent!')
          .targetEvent(ev)
          .ok('Thank You!');
 
 $mdDialog.show(update).then(function() {
 $window.location.reload();
 })   
            }

});

app.controller("Faculty", function ($http,$scope,$window,$mdDialog) {
    // $scope.msg = "I love London";
 
    $http.get("/faculty/my-account").then(function (response) {
         $scope.name = response.data.name;
         $scope.id = response.data.id;
         $scope.mobile = response.data.mobile;
         $scope.email = response.data.emailid;
         $scope.gender = response.data.gender;
         $scope.dep = response.data.dep;
         $scope.Desig = response.data.Desig;
         $('#loading').hide();
         $('#account-details').fadeIn(500);
        });
    
    //author: Ankit Sharma
    $http.get("/faculty/grievance_type").then(function(response)
        {
            $scope.grievance_type=response.data;
        });




     $scope.submit=function(ev){
         $scope.form={
             //emailid:$scope.email,
             mobileno:$scope.mobile,
         }
         $http.post("/faculty/update",$scope.form).then(function(response){   
          
        })

        var update = $mdDialog.confirm()
        .title('Successfully Updated!')
         .targetEvent(ev)
         .ok('Thank You!');

$mdDialog.show(update).then(function() {
$window.location.reload();
})
     
     }
 
     $scope.resetpass=function(ev){
         $scope.form={
             current_password:$scope.current_password,
             new_password:$scope.new_password,
             new_password1:$scope.new_password1        
         } 
     $http.post("/faculty/password_reset",$scope.form).then(function(response){
     })

     var confirmpass = $mdDialog.confirm()
          .title('Password Updated!')
          .targetEvent(ev)
          .ok('Thank You!');

    $mdDialog.show(confirmpass).then(function() {
      $window.location.reload();
    })

     }
 
     $scope.GrvPost=function(ev){
         $scope.form={
              type:$scope.Gtype,
              grv:$scope.Desc,
              file:$scope.file,
              subject:$scope.subject,
              usertype:"faculty"
         }
         $http.post("/post/complaint",$scope.form).then(function(response){
           
         })

    var confirm = $mdDialog.confirm()
          .title('Grivance Posted!')
          .targetEvent(ev)
          .ok('Thank You!');

    $mdDialog.show(confirm).then(function() {
      $window.location.reload();
    })
 }
});



app.controller("Management_grievances", function ($http,$scope,$window) {
        
    $http.get("/mngmnt/Grievances").then(function (response) {
            //$scope.result = response.result1;
            $scope.result=response.data.info;
            $('#loading').hide();
            $('#grievances').fadeIn(500);
        });
    
        $scope.popup = function(id){
            $('.detailbackground').fadeIn(500);
    $scope.id=id;
    
            $http.get("/mngmnt/GRV?grv_id="+$scope.id).then(function (response) {
                $('.detailbackground').fadeIn(500);
                $scope.data=response.data ;
                $scope.msg ="hiiiii";
            }); 
         //   $('.detailbackground').fadeIn(500);
        }
        $scope.reply_popup = function(id){
            $('.detailbackground-reply').fadeIn(500);
    $scope.id=id;
    
            $http.get("/mngmnt/GRV?grv_id="+$scope.id).then(function (response) {
                $('.detailbackground-reply').fadeIn(500);
                $scope.data=response.data ;
                $scope.msg ="hiiiii";
            }); 
        }
        $scope.reply = function(id,ev){
        
            $scope.form={
             reply:$scope.Reply,
             id:id    
            };
               // $scope.reply=$scope.Reply
            $http.post("/post/reply",$scope.form).then(function(response){
                $window.location.reload();
        
            })
            
        }
    
});

app.controller("Management_active_deactive_grv", function ($http,$scope,$window,$mdDialog) {
    $scope.popup = function(id){
        $('.detailbackground').fadeIn(500);
$scope.id=id;

        $http.get("/mngmnt/GRV?grv_id="+$scope.id).then(function (response) {
            $('.detailbackground').fadeIn(500);
            $scope.data=response.data ;
            $scope.msg ="hiiiii";
        }); 
     //   $('.detailbackground').fadeIn(500);
    }
    $scope.delete = function(id,ev){
$scope.id=id;

        $http.post("/mngmnt/GRV_delete?grv_id="+$scope.id).then(function (response) {
            var update = $mdDialog.confirm()
            .title('Successfully Deleted!')
            .targetEvent(ev)
            .ok('Thank You!');
    
      $mdDialog.show(update).then(function() {
        $window.location.reload();
      });
        }); 
    }
    

    $scope.init=function(active){
    if(active==1)
    {
    $http.get('/mngmnt/All_Grievances?active='+'1').then(function(response){
   $scope.result=response.data.info;
   $('#loading').hide();
   $('#grievances').fadeIn(500);
    });
    }
    else if(active==0)
    {
        $http.get('/mngmnt/All_Grievances?active='+'0').then(function(response){
            $scope.result=response.data.info;
            $('#loading').hide();
            $('#grievances').fadeIn(500);
             });
    }
}
});
app.controller("Management", function ($http,$scope,$window,$mdDialog) {
    // $scope.msg = "I love London";
 
    $http.get("/mngmnt/my-account").then(function (response) {
        $scope.name = response.data.name;
        $scope.Desg = response.data.designation;
        $scope.mobile = response.data.mobile;
        $scope.email = response.data.email;
        $scope.Gtype = response.data.gtype;
        $('#loading').hide();
        $('#account-details').fadeIn(500);
     });
     $scope.submit=function(ev){
        $scope.form={
            //emailid:$scope.email,
            mobileno:$scope.mobile,
        }
        $http.post("/mngmnt/update",$scope.form).then(function(response){   
       

       })

       var update = $mdDialog.confirm()
       .title('Successfully Updated!')
        .targetEvent(ev)
        .ok('Thank You!');

$mdDialog.show(update).then(function() {
$window.location.reload();
})
    
       
    }
    
    //author: Ankit Sharma
    $http.get("/mngmnt/grievance_type").then(function(response)
        {
            $scope.grievance_type=response.data;
        });
 
     $scope.resetpass=function(ev){
         $scope.form={
             current_password:$scope.current_password,
             new_password:$scope.new_password,
             new_password1:$scope.new_password1        
         } 
     $http.post("/mngmnt/password_reset",$scope.form).then(function(response){
     })

     var confirmpass = $mdDialog.confirm()
          .title('Password Updated!')
          .targetEvent(ev)
          .ok('Thank You!');

    $mdDialog.show(confirmpass).then(function() {
      $window.location.reload();
    })

 }
});

app.controller("Management_GCM", function ($http,$scope,$window,$mdDialog) {

 $http.get("/mngmnt/GCM_List").then(function(response){
  $scope.members=response.data.info;
  $('#loading').hide();
  $('#grievances').fadeIn(500);
 });

})
app.controller("Management_apprv_user", function ($http,$scope,$window,$mdDialog) {

    $scope.init=function(user){
    if(user=='faculty')
    {    
    $http.get('/mngmnt/approve_user?user='+'faculty').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#apprv_list').fadeIn(500);
       
    });
 
    }
    else if(user=='parent')
    {
    $http.get('/mngmnt/approve_user?user='+'parent').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#apprv_list').fadeIn(500);
       
    });
    } 
     
     
     else if(user=='staff')
     {
     $http.get('/mngmnt/approve_user?user='+'staff').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#apprv_list').fadeIn(500);
       
    });

    }
    else if(user=='student') 
    {  
    $http.get('/mngmnt/approve_user?user='+'student').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#apprv_list').fadeIn(500);
    });
    }
} 
   });
   app.controller("Management_pending_user", function ($http,$scope,$window,$mdDialog) {

    $scope.init=function(user){
    if(user=='faculty')
    {    
    $http.get('/mngmnt/pending_user?user='+'faculty').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#pending_list').fadeIn(500);
       
    });
 
    }
    else if(user=='parent')
    {
    $http.get('/mngmnt/pending_user?user='+'parent').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#pending_list').fadeIn(500);
       
    });
    } 
     
     
     else if(user=='staff')
     {
     $http.get('/mngmnt/pending_user?user='+'staff').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#pending_list').fadeIn(500);
       
    });

    }
    else if(user=='student') 
    {  
    $http.get('/mngmnt/pending_user?user='+'student').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#pending_list').fadeIn(500);
    });
    }
} 
   });


   app.controller("Management_grievances_report",function($http,$scope,$window){
$scope.consolidate=function(){


     $http.post('/mngmnt/consolidate_grv').then(function(response){
     
     });
   }
   $scope.Detail=function(){


    $http.post('/mngmnt/detail_grv').then(function(response){
    
    });
  }


});
   

//------------------------------------ADMIN-------------------------------------------------------//


app.controller("Admin", function ($http,$scope,$window,$mdDialog) {

    $http.get("/Admin/my-account").then(function (response) {
         $scope.name = response.data.name;
         $scope.mobile = response.data.mobile;
         $scope.email = response.data.email;
         $('#loading').hide();
         $('#account-details').fadeIn(500);
     });

     $scope.submit=function(ev){
         $scope.form={
             //emailid:$scope.email,
             mobileno:$scope.mobile,
         }
         $http.post("/Admin/update",$scope.form).then(function(response){   
           
        });
        var update = $mdDialog.confirm()
        .title('Successfully Updated!')
         .targetEvent(ev)
         .ok('Thank You!');

$mdDialog.show(update).then(function() {
$window.location.reload();
}); 
     
     }
 
     $scope.resetpass=function(ev){
         $scope.form={
             current_password:$scope.current_password,
             new_password:$scope.new_password,
             new_password1:$scope.new_password1        
         } 
     $http.post("/Admin/password_reset",$scope.form).then(function(response){
         
     })

     var confirmpass = $mdDialog.confirm()
          .title('Password Updated!')
          .targetEvent(ev)
          .ok('Thank You!');

    $mdDialog.show(confirmpass).then(function() {
      $window.location.reload();
    })

     }
 
    
});

app.controller("Admin_GCM", function ($http,$scope,$window,$mdDialog) {


    $http.get("/Admin/GCM_List").then(function(response){
     $scope.members=response.data.info;
     $('#loading').hide();
     $('#grievances').fadeIn(500);
    });

    $http.get('/Admin/grievance_type').then(function(response){
        $scope.result=response.data.info;
    });    

    $scope.Deactivate=function(user,ev){
   $scope.form={email:user};
   $http.post("/Admin/GCM_Deactivate",$scope.form).then(function(response){
   
});
   var confirmpass = $mdDialog.confirm()
   .title('GCM Deactivated!')
   .targetEvent(ev)
   .ok('Thank You!');

$mdDialog.show(confirmpass).then(function() {
$window.location.reload();
})
}
   
$scope.create=function(ev){
    $scope.form={
        name:$scope.name,
        email:$scope.email,
        mobile:$scope.mobile,
        Des:$scope.desig,
        gtype:$scope.Gtype,
        mngmnt:$scope.mngmnt
    };
    $http.post('/Admin/create',$scope.form).then(function(response){    
       
  });
  var update = $mdDialog.confirm()
  .title('Created!')
  .targetEvent(ev)
  .ok('Thank You!');

$mdDialog.show(update).then(function() {
$window.location.reload();

    });
}
   });
   app.controller("Admin_mngmnt", function ($http,$scope,$window,$mdDialog) {


    $http.get("/Admin/Mngmnt_List").then(function(response){
     $scope.members=response.data.info;
     $('#loading').hide();
     $('#grievances').fadeIn(500);
    });
    $scope.Deactivate=function(user,ev){
        $scope.form={email:user};
        $http.post("/Admin/Mngmnt_Deactivate",$scope.form).then(function(response){
        
     });
        var confirmpass = $mdDialog.confirm()
        .title('Management member Deactivated!')
        .targetEvent(ev)
        .ok('Thank You!');
     
     $mdDialog.show(confirmpass).then(function() {
     $window.location.reload();
     })
     }
})
   app.controller('Admin_Rejected_user',function($http,$scope,$window){
    $scope.init=function(user,ev){
        if(user=='faculty')
        {
        $http.get('/Admin/rejected_user?user='+'faculty').then(function(response){
            $scope.users=response.data.info;  
            $('#loading').hide();
            $('#rejected_list').fadeIn(500);
           
        });
     
        }
        else if(user=='parent')
        {
        $scope.msg="user is parent";
        $http.get('/Admin/rejected_user?user='+'parent').then(function(response){
            $scope.users=response.data.info;    
            $('#loading').hide();
            $('#rejected_list').fadeIn(500);
           
        });
        } 
         
         
         else if(user=='staff')
         {
           
         $http.get('/Admin/rejected_user?user='+'staff').then(function(response){
            $scope.users=response.data.info;    
            $('#loading').hide();
            $('#rejected_list').fadeIn(500);
           
        });
    
        }
        else if(user=='student') 
        {          
        $http.get('/Admin/rejected_user?user='+'student').then(function(response){
            $scope.users=response.data.info;    
            $('#loading').hide();
            $('#rejected_list').fadeIn(500);
        });
        }
    }

    $scope.Undo_rejected=function(type,user,ev){
        $scope.form={
            type:type,
            email:user
        }

        $http.post('/Admin/undo_rejected',$scope.form).then(function(success){
            var update = $mdDialog.confirm()
            .title('User Deactivated!')
            .targetEvent(ev)
            .ok('Thank You!');
    
      $mdDialog.show(update).then(function() {
        $window.location.reload();
      });

        });
        


    }
   })
   app.controller("Admin_apprv_user", function ($http,$scope,$window,$mdDialog) {

    $scope.init=function(user){
    if(user=='faculty')
    {    
    $http.get('/Admin/approve_user?user='+'faculty').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#apprv_list').fadeIn(500);
       
    });
 
    }
    else if(user=='parent')
    {
    $http.get('/Admin/approve_user?user='+'parent').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#apprv_list').fadeIn(500);
       
    });
    } 
     
     
     else if(user=='staff')
     {
     $http.get('/Admin/approve_user?user='+'staff').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#apprv_list').fadeIn(500);
       
    });

    }
    else if(user=='student') 
    {  
    $scope.msg="user is student";
     
    $http.get('/Admin/approve_user?user='+'student').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#apprv_list').fadeIn(500);
    });
    }
}
$scope.Deactivate_user=function(type,user,ev){
    $scope.form={
        type:type,
        email:user
    }
    $http.post('/Admin/Deactivate_user',$scope.form).then(function(success){
        var update = $mdDialog.confirm()
        .title('User Deactivated!')
        .targetEvent(ev)
        .ok('Thank You!');

  $mdDialog.show(update).then(function() {
    $window.location.reload();
  });

    });


}

   });
   app.controller("Admin_pending_user", function ($http,$scope,$window,$mdDialog) {

    $scope.init=function(user){
    if(user=='faculty')
    {  
    $http.get('/Admin/pending_user?user='+'faculty').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#pending_list').fadeIn(500);
       
    });
 
    }
    else if(user=='parent')
    {
  
    $http.get('/Admin/pending_user?user='+'parent').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#pending_list').fadeIn(500);
       
    });
    } 
     
     
     else if(user=='staff')
     {
     $http.get('/Admin/pending_user?user='+'staff').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#pending_list').fadeIn(500);
       
    });

    }
    else if(user=='student') 
    { 
    $http.get('/Admin/pending_user?user='+'student').then(function(response){
        $scope.users=response.data.info;    
        $('#loading').hide();
        $('#pending_list').fadeIn(500);
    });
    }
}


$scope.Approve=function(type,user,ev){
    $scope.form={
        type:type,
        email:user
    }
    $http.post('/Admin/Approve_User',$scope.form).then(function(success){
        var update = $mdDialog.confirm()
        .title('User Approved!')
        .targetEvent(ev)
        .ok('Thank You!');

  $mdDialog.show(update).then(function() {
    $window.location.reload();
  });

    });


}
   });

   app.controller("Admin_active_deactive_grv", function ($http,$scope,$window,$mdDialog) {
    $scope.popup = function(id){
        $('.detailbackground').fadeIn(500);
$scope.id=id;

        $http.get("/Admin/GRV?grv_id="+$scope.id).then(function (response) {
            $('.detailbackground').fadeIn(500);
            $scope.data=response.data ;

        });
    }
    $scope.delete = function(id,ev){
$scope.id=id;

        $http.post("/Admin/GRV_delete?grv_id="+$scope.id).then(function (response) {
            var update = $mdDialog.confirm()
            .title('Successfully Deleted!')
            .targetEvent(ev)
            .ok('Thank You!');
    
      $mdDialog.show(update).then(function() {
        $window.location.reload();
      });
        }); 
    }
    

    $scope.init=function(active){
    if(active==1)
    {
    $http.get('/Admin/All_Grievances?active='+'1').then(function(response){
   $scope.result=response.data.info;
   $('#loading').hide();
   $('#grievances').fadeIn(500);
    });
    }
    else if(active==0)
    {
        $http.get('/Admin/All_Grievances?active='+'0').then(function(response){
            $scope.result=response.data.info;
            $('#loading').hide();
            $('#grievances').fadeIn(500);
             });
    }
}
});
app.controller('GRV_TYPE',function($http,$scope,$window,$mdDialog){
    $http.get('/Admin/grievance_type').then(function(response){
    $scope.result=response.data.info;
    $('#loading').hide();
    $('#grv_type').fadeIn(500);
    });

$scope.deactivate=function(id,ev){
    $scope.form={
        grvtype:id
    };
$http.post('/Admin/grvtype_deactivate',$scope.form).then(function(response){
    var update = $mdDialog.confirm()
    .title('Successfully Deleted!')
    .targetEvent(ev)
    .ok('Thank You!');

$mdDialog.show(update).then(function() {
$window.location.reload();
});
    
})
}
$scope.Create=function(ev){
    $scope.form ={
        grvtype:$scope.grvname,
        description:$scope.description
    };

    $http.post('/Admin/grvtype_add',$scope.form).then(function(success){

    });

    var Created = $mdDialog.confirm()
    .title('Successfully Created!')
    .targetEvent(ev)
    .ok('Thank You!');

$mdDialog.show(Created).then(function() {
$window.location.reload();

});    
}


});

app.controller('Termination',function($http,$window,$mdDialog,$scope){
$scope.Termination=function(Type,ev){
    $scope.form={
        year:$scope.year
    }  
    $http.post('/Admin/termination?type='+Type,$scope.form).then(function(response){
        });
        
        var Created = $mdDialog.confirm()
        .title('Successfully Terminated!')
        .targetEvent(ev)
        .ok('Thank You!');
    
    $mdDialog.show(Created).then(function() {
    $window.location.reload();
    
    });      
}
})

app.controller('Mail_Log',function($http,$window,$mdDialog,$scope){
    $http.get('/Admin/Mail_Log').then(function(response){
     $scope.maillog=response.data.info;
    });
})


