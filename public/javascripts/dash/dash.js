var app = angular.module('grievances', ['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: 'grievances.ejs'
	})

	.when('/my-account', {
		templateUrl: 'myaccount.html'
	})

	.when('/resetpassword', {
		templateUrl: 'reset-password.html'
	})

	.when('/reports', {
		templateUrl: 'reports.html'
	})

	.otherwise({
		template: 'Not found'
	});

});
