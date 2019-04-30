var app = angular
			.module('grievances', ['ngRoute', 'ngMaterial'])
			.factory('swal', SweetAlert);

function SweetAlert() {
  return window.swal;
};

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/NonTeaching/grievances.ejs'
	})

	.when('/post', {
		templateUrl: '/NonTeaching/post.ejs'
	})

	.when('/my-account', {
		templateUrl: '/NonTeaching/myaccount.ejs'
	})

	.when('/resetpassword', {
		templateUrl: '/NonTeaching/reset-password.ejs'
	})

	.when('/reports', {
		templateUrl: '/NonTeaching/reports.ejs'
	})

	.otherwise({
		template: 'Not found'
	});
	
});