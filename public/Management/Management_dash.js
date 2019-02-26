var app = angular.module('grievances', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/Management/grievances.ejs'
	})

	.when('/my-account', {
		templateUrl: '/Management/myaccount.ejs'
	})

	.when('/resetpassword', {
		templateUrl: '/Management/reset-password.ejs'
	})

	.when('/gcm', {
		templateUrl: '/Management/gcm.ejs'
	})

	.when('/pending-students', {
		templateUrl: '/Management/pending-students.ejs'
	})

	.when('/pending-parents', {
		templateUrl: '/Management/pending-parents.ejs'
	})

	.when('/pending-nonteaching', {
		templateUrl: '/Management/pending-nonteaching.ejs'
	})

	.when('/pending-faculty', {
		templateUrl: '/Management/pending-faculty.ejs'
	})

	.when('/approved-students', {
		templateUrl: '/Management/approved-students.ejs'
	})

	.when('/approved-parents', {
		templateUrl: '/Management/approved-parents.ejs'
	})

	.when('/approved-nonteaching', {
		templateUrl: '/Management/approved-nonteaching.ejs'
	})

	.when('/approved-faculty', {
		templateUrl: '/Management/approved-faculty.ejs'
	})

	.when('/grievance-details', {
		templateUrl: '/Management/grievance-details.ejs'
	})

	.when('/deleted-grievances', {
		templateUrl: '/Management/deleted-grievances.ejs'
	})

	.when('/report1', {
		templateUrl: '/Management/report1.ejs'
	})

	.when('/report2', {
		templateUrl: '/Management/report2.ejs'
	})

	.when('/report3', {
		templateUrl: '/Management/report3.ejs'
	})

	.when('/report4', {
		templateUrl: '/Management/report4.ejs'
	})

	.when('/report5', {
		templateUrl: '/Management/report5.ejs'
	})

	.when('/report21', {
		templateUrl: '/Management/report21.ejs'
	})

	.when('/report22', {
		templateUrl: '/Management/report22.ejs'
	})

	.when('/report23', {
		templateUrl: '/Management/report23.ejs'
	})

	.when('/report24', {
		templateUrl: '/Management/report24.ejs'
	})

	.when('/report31', {
		templateUrl: '/Management/report31.ejs'
	})

	.when('/report32', {
		templateUrl: '/Management/report32.ejs'
	})

	.when('/report33', {
		templateUrl: '/Management/report33.ejs'
	})

	.when('/report34', {
		templateUrl: '/Management/report34.ejs'
	})

	.when('/report41', {
		templateUrl: '/Management/report41.ejs'
	})

	.when('/report42', {
		templateUrl: '/Management/report42.ejs'
	})

	.otherwise({
		template: 'Not found'
	});
	$locationProvider.html5Mode(true);
});