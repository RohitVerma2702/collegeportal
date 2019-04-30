var app = angular
			.module('grievances', ['ngRoute', 'ngMaterial'])
			.factory('swal', SweetAlert);

function SweetAlert() {
  return window.swal;
};

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/Faculty/grievances.ejs'
	})

	.when('/post', {
		templateUrl: '/Faculty/post.ejs'
	})

	.when('/my-account', {
		templateUrl: '/Faculty/myaccount.ejs'
	})

	.when('/resetpassword', {
		templateUrl: '/Faculty/reset-password.ejs'
	})

	.when('/reports', {
		templateUrl: '/Faculty/reports.ejs'
	})

	.otherwise({
		template: 'Not found'
	});
	
});