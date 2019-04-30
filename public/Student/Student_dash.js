var app = angular
			.module('grievances', ['ngRoute', 'ngMaterial'])
			.factory('swal', SweetAlert);

function SweetAlert() {
  return window.swal;
};

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/Student/grievances.ejs'
	})

	.when('/post', {
		templateUrl: '/Student/post.ejs'
	})

	.when('/my-account', {
		templateUrl: '/Student/myaccount.ejs'
	})

	.when('/resetpassword', {
		templateUrl: '/Student/reset-password.ejs'
	})

	.when('/reports', {
		templateUrl: '/Student/reports.ejs'
	})

	.otherwise({
		template: 'Not found'
	});
	

});