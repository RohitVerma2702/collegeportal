$(document).ready(function(){  
  $('body').show();

  console.log($(window).width());

  $(function() {
      // Smooth Scrolling
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });

  $(function(){
    $("#home, #totop").click(function(){
      $("html,body").animate({
        scrollTop: 0       //$("#top").offset().top
      },1000);
      ;return false;
    });
  });

//back to top button appearing.....
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      $('#totop').fadeIn(200);
    } else {
      $('#totop').fadeOut(200);
    }
  });


$('.wrapper ul li a').click(function(){
  $('.heading').hide();
});

//to show different login forms....
$('.admin-login').click(function(){
  $('.forms').hide();
  $('.adminlogin').fadeIn(1000);
});
$('.management-login').click(function(){
  $('.forms').hide();
  $('.mngmntlogin').fadeIn(1000);
});
$('.faculty-login').click(function(){
  $('.forms').hide();
  $('.facultylogin').fadeIn(1000);
});
$('.gcm-login').click(function(){
  $('.forms').hide();
  $('.gcmlogin').fadeIn(1000);
});
$('.student-login').click(function(){
  $('.forms').hide();
  $('.studentlogin').fadeIn(1000);
});
$('.parent-login').click(function(){
  $('.forms').hide();
  $('.parentlogin').fadeIn(1000);
});
$('.nonteaching-login').click(function(){
  $('.forms').hide();
  $('.nonteachinglogin').fadeIn(1000);
});


//to show the signup forms......
$('#facultysignup').click(function(){
  $('.forms').fadeOut(100);
  $('.faculty-reg-form').delay(100).fadeIn(1000);
});
$('#studentsignup').click(function(){
  $('.forms').fadeOut(100);
  $('.student-reg-form').delay(100).fadeIn(1000);
});
$('#parentsignup').click(function(){
  $('.forms').fadeOut(100);
  $('.parent-reg-form').delay(100).fadeIn(1000);
});
$('#nonteachingsignup').click(function(){
  $('.forms').fadeOut(100);
  $('.nonteaching-reg-form').delay(100).fadeIn(1000);
});

//working of the close button.....
$('.closebtn').click(function(){
  $('.forms').fadeOut(500);
  $('.heading').delay(500).fadeIn(1000);

});


$('.Admin_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Admin_forgotpass').delay(500).fadeIn(1000);
  $('#forgotemail .fa-times').addClass('hide');
});
$('.Student_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Student_forgotpass').delay(500).fadeIn(1000);
  $('#forgotemail .fa-times').addClass('hide');
});
$('.Staff_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Staff_forgotpass').delay(500).fadeIn(1000);
  $('#forgotemail .fa-times').addClass('hide');
});
$('.Parent_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Parent_forgotpass').delay(500).fadeIn(1000);
  $('#forgotemail .fa-times').addClass('hide');
});
$('.Faculty_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Faculty_forgotpass').delay(500).fadeIn(1000);
  $('#forgotemail .fa-times').addClass('hide');
});
$('.Gcm_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Gcm_forgotpass').delay(500).fadeIn(1000);
  $('#forgotemail .fa-times').addClass('hide');
});

$('.mngmnt_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.mngmnt_forgotpass').delay(500).fadeIn(1000);
  $('#forgotemail').addClass('hide');
});

//yearpicker for course year...
$(function() {
    $('#datepicker-student').datepicker({
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy',
        onClose: function(dateText, inst) {
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, 1));
        }
    });
 $(".date-picker-year").focus(function () {
        $(".ui-datepicker-month").hide();
    });
});

//yearpicker for course year...
$(function() {
    $('#datepicker-parent').datepicker({
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy',
        onClose: function(dateText, inst) {
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, 1));
        }
    });
 $(".date-picker-year").focus(function () {
        $(".ui-datepicker-month").hide();
    });
});


//scroll reveal for the heading grievance portal....

        $('.heading, #logo').removeClass('hide');

        window.sr = ScrollReveal();

        sr.reveal('#logo', {
          duration: 1000,
          origin:'left',
          distance:'300px',
          delay: '300'
        });

        sr.reveal('#heading1', {
          duration: 1000,
          origin:'bottom',
          distance: '300px',
          easing: 'cubic-bezier(0.5, 0, 0, 1.3)'
        });

        sr.reveal('#heading2', {
          duration: 1100,
          origin:'bottom',
          distance: '350px',
          easing: 'cubic-bezier(.5, 0, .2, 1.2)'
        });

        // sr.reveal('#aboutheading', {
        //   duration: 2000,
        //   origin:'top',
        //   distance: '300px',
        //   viewFactor: 0.5
        // });

        // sr.reveal('#ourteam', {
        //   duration: 2000,
        //   origin:'left',
        //   distance: '300px',
        //   viewFactor: 1
        // });

        // sr.reveal('#aboutinfo', {
        //   duration: 1000,
        //   origin:'right',
        //   distance: '300px',
        //   viewFactor: 0
        // });

        sr.reveal('#contactheading', {
          duration: 2000,
          origin:'top',
          distance:'300px',
          viewFactor: 0.5
        });

        sr.reveal('#contactinfo', {
          duration: 1000,
          origin:'left',
          distance:'300px',
          viewFactor: 0.5
        });

        sr.reveal('#map', {
          duration: 1000,
          origin:'right',
          distance:'300px',
          viewFactor: 0.5
        });

$('#about-us-button').click(function(){
  $('#maincontainer, footer').fadeOut(1500);
  $('.aboutuspage').show();
  $('.aboutuspage div, .aboutuspage i, .aboutuspage h1').delay(500).fadeIn();
});

$('.aboutuspage i').click(function(){
  $('#maincontainer, footer').fadeIn(500);
  $('.aboutuspage').fadeOut(100);
  $('.aboutuspage div, .aboutuspage i, .aboutuspage h1').hide();
});

$('.aboutuspage div, .aboutuspage i, .aboutuspage h1').hide();

});
