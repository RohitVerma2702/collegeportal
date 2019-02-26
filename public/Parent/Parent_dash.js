var app = angular.module('grievances', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/Parent/grievances.ejs'
	})

	.when('/post', {
		templateUrl: '/Parent/post.ejs'
	})

	.when('/my-account', {
		templateUrl: '/Parent/myaccount.ejs'
	})

	.when('/resetpassword', {
		templateUrl: '/Parent/reset-password.ejs'
	})

	.when('/reports', {
		templateUrl: '/Parent/reports.ejs'
	})

	.otherwise({
		template: 'Not found'
	});
});