$(document).ready(function(){

  console.log($(window).width());

/*  $(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar-fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    console.log($(document).scrollTop());
    if ($(document).scrollTop() == 0) {
      $('.underline').removeClass('underline');
      $('#navhome').addClass('underline');
    }
  });
});

  $('#tog').click(function(){
    $('.navbar-fixed-top').toggleClass('scrolled');
  });

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

$('.options li').click(function(){
  $('.title1').addClass('title');
  $('.title1').removeClass('title1');
});


$('#1l, #2l, #3l, #4l, #5l, #6l, #7l, #3r, #5r, #6r, #7r').hide();

// to get login forms of each category individually...
$('#admin').click(function(){
 $('#1l').fadeIn(1000);
 $('#2l, #3l, #4l, #5l, #6l, #7l, #3r, #5r, #6r, #7r').hide();
});

$('#management').click(function(){
 $('#2l').fadeIn(1000);
 $('#1l, #3l, #4l, #5l, #6l, #7l, #3r, #5r, #6r, #7r').hide();
});

$('#faculty').click(function(){
 $('#3l').fadeIn(1000);
 $('#2l, #1l, #4l, #5l, #6l, #7l, #3r, #5r, #6r, #7r').hide();
});

$('#grievance_cell_staff').click(function(){
 $('#4l').fadeIn(1000);
 $('#2l, #3l, #1l, #5l, #6l, #7l, #3r, #5r, #6r, #7r').hide();
});

$('#student').click(function(){
 $('#5l').fadeIn(1000);
 $('#2l, #3l, #4l, #1l, #6l, #7l, #3r, #5r, #6r, #7r').hide();
});

$('#parent').click(function(){
 $('#6l').fadeIn(1000);
 $('#2l, #3l, #4l, #5l, #1l, #7l, #3r, #5r, #6r, #7r').hide();
});

$('#nonteaching').click(function(){
 $('#7l').fadeIn(1000);
 $('#2l, #3l, #4l, #5l, #6l, #1l, #3r, #5r, #6r, #7r').hide();
});

 // to get the registration form of each category....

 $('#r3').click(function(){
   $('#3r').fadeIn(1000);
   $('#2l, #3l, #4l, #5l, #6l, #1l, #7l, #5r, #6r, #7r').hide();
 });

 $('#r5').click(function(){
   $('#5r').fadeIn(1000);
   $('#2l, #3l, #4l, #5l, #6l, #1l, #3r, #7l, #6r, #7r').hide();
 });

 $('#r6').click(function(){
   $('#6r').fadeIn(1000);
   $('#2l, #3l, #4l, #5l, #6l, #1l, #3r, #5r, #7l, #7r').hide();
 });

 $('#r7').click(function(){
   $('#7r').fadeIn(1000);
   $('#2l, #3l, #4l, #5l, #6l, #1l, #3r, #5r, #6r, #7l').hide();
 });

 $('.open').click(function(){
  $('.options').fadeToggle(500);
});

 //this is for getting the left border in every list option...
 var headerr = document.getElementById("options");
 var btnss = headerr.getElementsByClassName("btn");
 for (var i = 0; i < btnss.length; i++) {
  btnss[i].addEventListener("click", function() {
    var currentt = document.getElementsByClassName("1");
    currentt[0].className = currentt[0].className.replace(" 1", "");
    this.className += " a";
  });
}
// Add active class to the current button (highlight it)
var header = document.getElementById("options");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("a");
    current[0].className = current[0].className.replace(" a", "");
    this.className += " a";
  });
}

// Add active class to the current button (highlight it)
var header = document.getElementById("linkcontainer");
var btnh = header.getElementsByClassName("btnh");
for (var i = 0; i < btnh.length; i++) {
  btnh[i].addEventListener("click", function() {
    var currenth = document.getElementsByClassName("underline");
    currenth[0].className = currenth[0].className.replace(" underline", "");
    this.className += " underline";
  });
}

$(".navbar-nav li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
  });

$('#lgnbtn, .options li').click(function(){

  if ($(window).width() < 768) {
    $('.options').fadeToggle();
    $('.options').css({
      'position': 'fixed',
      'top': '0',
    });

    $('.options li').css({
      'text-align': 'center'
    });
  }else{
    $('options').show();
    $('.options').css({
      'position': 'absolute'
    });

    $('.options li').css({
      'text-align': 'left'
    });
  }

});

        window.sr = ScrollReveal();
        sr.reveal('.navbar', {
          duration: 1000,
          origin:'top'
        });

        sr.reveal('#sitetitle', {
          duration: 1000,
          origin:'bottom',
          delay: '500',
          distance:'300px'
        });


    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $('#totop').fadeIn();
        } else {
            $('#totop').fadeOut();
        }
    });
    $('#totop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });*/

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
});
$('.Student_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Student_forgotpass').delay(500).fadeIn(1000);
});
$('.Staff_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Staff_forgotpass').delay(500).fadeIn(1000);
});
$('.Parent_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Parent_forgotpass').delay(500).fadeIn(1000);
});
$('.Faculty_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Faculty_forgotpass').delay(500).fadeIn(1000);
});
$('.Gcm_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.Gcm_forgotpass').delay(500).fadeIn(1000);
});

$('.mngmnt_forgotpassword').click(function(){
  $('.forms').fadeOut(500);
  $('.mngmnt_forgotpass').delay(500).fadeIn(1000);
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

        sr.reveal('#aboutheading', {
          duration: 2000,
          origin:'left',
          distance: '300px',
          viewFactor: 0.5
        });

        sr.reveal('#aboutinfo', {
          duration: 1000,
          origin:'right',
          distance: '300px',
          viewFactor: 0.5
        });

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

});
