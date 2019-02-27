var app1= angular.module('grievances', ['ngRoute']);

app1.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/s/grievances.ejs',
		//controller:'grievances'
	})

	.when('/post', {
		templateUrl: '/s/post.ejs'
	})

	.when('/my-account', {
		templateUrl: '/s/myaccount.ejs',
		controller:'myaccount'
	})

	.when('/resetpassword', {
		templateUrl: '/s/reset-password.ejs'
	})

	.when('/reports', {
		templateUrl: '/s/reports.ejs'
	})

	.otherwise({
		template: 'Not found'
	});
	
});
$(document).ready(function(){


	var arrow = $(".arrow_up");
	var form = $(".logout");
	var status = false;
	$(".a").click(function(event){
		event.preventDefault();
		if (status==false) {
			arrow.fadeIn();
			form.fadeIn();
			status=true;
		}
		else{
			arrow.fadeOut();
			form.fadeOut();
			status=false;
		}
	})
})