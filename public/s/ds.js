$(document).ready(function(){

	$('.report').click(function(){
		$('.reports').slideToggle(500);
	});

	$('.cacwr').click(function(){
		$('.cacwr-reports').slideToggle(500);
	});

	$('.rbogt').click(function(){
		$('.rbogt-reports').slideToggle(500);
	});

	$('.rbogcm').click(function(){
		$('.rbogcm-reports').slideToggle(500);
	});

	$('.pending-approval').click(function(){
		$('.approve').slideToggle(500);
	});

	$('.approved').click(function(){
		$('.approved-users').slideToggle(500);
	});

	$('.rejected-users').click(function(){
		$('.rejected').slideToggle(500);
	});

	$('.setting-toggle').click(function(){
		$('.settings').slideToggle(500);
	});
});