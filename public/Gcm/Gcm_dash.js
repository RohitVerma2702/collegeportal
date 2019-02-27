var app = angular.module('grievances', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/Gcm/grievances.ejs'
	})

	.when('/post', {
		templateUrl: '/Gcm/post.ejs'
	})

	.when('/my-account', {
		templateUrl: '/Gcm/myaccount.ejs'
	})

	.when('/resetpassword', {
		templateUrl: '/Gcm/reset-password.ejs'
	})

	.when('/report1', {
		templateUrl: '/Gcm/report1.ejs'
	})

	.when('/report2', {
		templateUrl: '/Gcm/report2.ejs'
	})

	.when('/report3', {
		templateUrl: '/Gcm/report3.ejs'
	})

	.when('/report4', {
		templateUrl: '/Gcm/report4.ejs'
	})

	.when('/report5', {
		templateUrl: '/Gcm/report5.ejs'
	})

	.when('/report21', {
		templateUrl: '/Gcm/report21.ejs'
	})

	.when('/report22', {
		templateUrl: '/Gcm/report22.ejs'
	})

	.when('/report23', {
		templateUrl: '/Gcm/report23.ejs'
	})

	.when('/report24', {
		templateUrl: '/Gcm/report24.ejs'
	})

	.when('/report31', {
		templateUrl: '/Gcm/report31.ejs'
	})

	.when('/report32', {
		templateUrl: '/Gcm/report32.ejs'
	})

	.when('/report33', {
		templateUrl: '/Gcm/report33.ejs'
	})

	.when('/report34', {
		templateUrl: '/Gcm/report34.ejs'
	})

	.when('/report41', {
		templateUrl: '/Gcm/report41.ejs'
	})

	.when('/report42', {
		templateUrl: '/Gcm/report42.ejs'
	})

	.otherwise({
		template: 'Not found'
	});
	
});