var app = angular.module('grievances', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/Admin/myaccount.ejs'
	})

	.when('/my-account', {
		templateUrl: '/Admin/myaccount.ejs'
	})

	.when('/education-group', {
		templateUrl: '/Admin/education-group.ejs'
	})

	.when('/course', {
		templateUrl: '/Admin/course.ejs'
	})

	.when('/class', {
		templateUrl: '/Admin/class.ejs'
	})

	.when('/grievance-type', {
		templateUrl: '/Admin/grievance-type.ejs'
	})

	.when('/student-termination', {
		templateUrl: '/Admin/student-termination.ejs'
	})

	.when('/parent-termination', {
		templateUrl: '/Admin/parent-termination.ejs'
	})

	.when('/resetpassword', {
		templateUrl: '/Admin/reset-password.ejs'
	})

	.when('/gcm', {
		templateUrl: '/Admin/gcm.ejs'
	})
	.when('/mngmnt',{
		templateUrl:'/Admin/mngmnt.ejs'
	})

	.when('/pending-students', {
		templateUrl: '/Admin/pending-students.ejs'
	})

	.when('/pending-parents', {
		templateUrl: '/Admin/pending-parents.ejs'
	})

	.when('/pending-nonteaching', {
		templateUrl: '/Admin/pending-nonteaching.ejs'
	})

	.when('/pending-faculty', {
		templateUrl: '/Admin/pending-faculty.ejs'
	})

	.when('/approved-students', {
		templateUrl: '/Admin/approved-students.ejs'
	})

	.when('/approved-parents', {
		templateUrl: '/Admin/approved-parents.ejs'
	})

	.when('/approved-nonteaching', {
		templateUrl: '/Admin/approved-nonteaching.ejs'
	})

	.when('/approved-faculty', {
		templateUrl: '/Admin/approved-faculty.ejs'
	})

	.when('/rejected-students', {
		templateUrl: '/Admin/rejected-students.ejs'
	})

	.when('/rejected-parents', {
		templateUrl: '/Admin/rejected-parents.ejs'
	})

	.when('/rejected-nonteaching', {
		templateUrl: '/Admin/rejected-nonteaching.ejs'
	})

	.when('/rejected-faculty', {
		templateUrl: '/Admin/rejected-faculty.ejs'
	})

	.when('/grievance-details', {
		templateUrl: '/Admin/grievance-details.ejs'
	})

	.when('/deleted-grievances', {
		templateUrl: '/Admin/deleted-grievances.ejs'
	})

	.when('/report1', {
		templateUrl: '/Admin/report1.ejs'
	})

	.when('/report2', {
		templateUrl: '/Admin/report2.ejs'
	})

	.when('/report3', {
		templateUrl: '/Admin/report3.ejs'
	})

	.when('/report4', {
		templateUrl: '/Admin/report4.ejs'
	})

	.when('/report5', {
		templateUrl: '/Admin/report5.ejs'
	})

	.when('/report21', {
		templateUrl: '/Admin/report21.ejs'
	})

	.when('/report22', {
		templateUrl: '/Admin/report22.ejs'
	})

	.when('/report23', {
		templateUrl: '/Admin/report23.ejs'
	})

	.when('/report24', {
		templateUrl: '/Admin/report24.ejs'
	})

	.when('/report31', {
		templateUrl: '/Admin/report31.ejs'
	})

	.when('/report32', {
		templateUrl: '/Admin/report32.ejs'
	})

	.when('/report33', {
		templateUrl: '/Admin/report33.ejs'
	})

	.when('/report34', {
		templateUrl: '/Admin/report34.ejs'
	})

	.when('/report41', {
		templateUrl: '/Admin/report41.ejs'
	})

	.when('/report42', {
		templateUrl: '/Admin/report42.ejs'
	})

	.when('/mail-log', {
		templateUrl: '/Admin/maillog.ejs'
	})

	.when('/label-editor', {
		templateUrl: '/Admin/labeleditor.ejs'
	})

	.otherwise({
		template: 'Not found'
	});
	$locationProvider.html5Mode(true);
});