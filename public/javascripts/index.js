
$(document).ready(function(){
// Add smooth scrolling to link
 		$("#help1").on('click', function() {

        $('html, body').animate({
        	scrollTop: $('#help').offset().top
      	}, 800);
        return false;
  });

	  // Add smooth scrolling to link
 		$("#contact1").on('click', function() {

        $('html, body').animate({
        	scrollTop: $('#contact').offset().top
      	}, 800);
        return false;
  });
$('.closebtn').click(function(){
  $('.sidemenu').css('width', '0');
    $('.subheading,.select').show();


  });


    $('.register').hide();

$('.admin').click(function(){
    $('#mainsidemenu1').css('width', '40em');
    $('.subheading,.select').hide();

  });
$('.management').click(function(){
    $('#mainsidemenu2').css('width', '40em');
    $('.subheading,.select').hide();

  });
  $('.members').click(function(){
    $('#mainsidemenu4').css('width', '40em');
    $('.subheading,.select').hide();

  });
  $('.faculty').click(function(){
    $('#mainsidemenu3').css('width', '40em');
    $('.subheading,.select').hide();
    $('#3l').show();
    $('#3r').hide();

  });
$('.login3').click(function(){
    $('#3l').show();
    $('#3r').hide();

  });
  
  

  $('.register3').click(function(){
    $('#3r').show();
    $('#3l').hide();
  });
$('.grevience_cell_staff').click(function(){
    $('#mainsidemenu2').css('width', '40em');
    $('.subheading,.select').hide();

  });
$('.student').click(function(){
    $('#mainsidemenu5').css('width', '40em');
    $('#5l').show();
    $('#5r').hide();
    $('.subheading,.select').hide();


  });

$('.login5').click(function(){
    $('#5l').show();
    $('#5r').hide();

  });
  
  

  $('.register5').click(function(){
    $('#5r').show();
    $('#5l').hide();
  });
$('.parent').click(function(){
    $('#mainsidemenu6').css('width', '40em');
    $('#6l').show();
    $('#6r').hide();
    $('.subheading,.select').hide();

  });

$('.login6').click(function(){
    $('#6l').show();
    $('#6r').hide();

  });
  
  

  $('.register6').click(function(){
    $('#6r').show();
    $('#6l').hide();
  });
$('.nonteaching').click(function(){
    $('#mainsidemenu7').css('width', '40em');
    $('#7l').show();
    $('#7r').hide();
    $('.subheading,.select').hide();

  });

$('.login7').click(function(){
    $('#7l').show();
    $('#7r').hide();

  });
  
  

  $('.register7').click(function(){
    $('#7r').show();
    $('#7l').hide();
  });

  


  $('#opendropdownmenu').click(function(){
      $('.dropdown').toggleClass('dropdownheight');
      $('.opendropmenu').toggleClass('dropup');
  });


 

});