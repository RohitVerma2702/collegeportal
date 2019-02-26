var app = angular.module('grievances', ['ngRoute', 'ngMaterial']);

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
	$locationProvider.html5Mode(true);

});