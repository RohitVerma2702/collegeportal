//email validation variable 're'...
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

$('#adminlogin').click(function(e) {
	e.preventDefault();
	var a = document.adminlogin.id.value;
	var b = document.adminlogin.password.value;
	if (a=="" || b=="") {
		$('.adminlogin small').text('Please fill all the fields.');
		return false;
	}
	else if (!re.test(a)) {
		$('.adminlogin small').text('Enter valid Email address.');
		return false;	
	}
	else{
		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				id: a,
				password: b,
			},
			url: 'http://localhost:3000/Admin/login', //node.js server is running
			error: function(error){
				if(error.responseText == 'Unauthorized User'){
					console.log(error.responseText);
					$('.adminlogin small').text('Unauthorized User!');
					return false;
				}
				else if (error.responseText == 'pass') {
					console.log(error.responseText);
					$('.adminlogin small').text('Invalid Password!');
					return false;
					
				}
				else if (error.responseText == 'some') {
					console.log(error.responseText);
					$('.adminlogin small').text('Someone already logged in!');
					return false;
				}
				else{
					console.log('Unknown Error');
					$('.adminlogin small').text('Unknown Error! Please try again.');
					return false;
				}
			},
			success: function(data) {
				if (data === 'success') {
					console.log(data);
					$('.adminlogin .fa-spinner').fadeIn(100);
					$('.adminlogin small').text('');
					window.location.href = "http://localhost:3000/Admin/Home";
					return false;
				}
			}
		});
	}
});


$('#mngmntlogin').click(function(e) {
	e.preventDefault();
	var a = document.mngmntlogin.id.value;
	var b = document.mngmntlogin.password.value;
	if (a=="" || b=="") {
		$('.mngmntlogin small').text('Please fill all the fields.');
		return false;
	}
	else if (!re.test(a)) {
		$('.mngmntlogin small').text('Enter valid Email address.');
		return false;	
	}
	else{
		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				id: a,
				password: b,
			},
			url: 'http://localhost:3000/mngmnt/login', //node.js server is running
			error: function(error){
				if(error.responseText == 'Unauthorized User'){
					console.log(error.responseText);
					$('.mngmntlogin small').text('Unauthorized User!');
					return false;
				}
				else if (error.responseText == 'pass') {
					console.log(error.responseText);
					$('.mngmntlogin small').text('Invalid Password!');
					return false;
					
				}
				else if (error.responseText == 'some') {
					console.log(error.responseText);
					$('.mngmntlogin small').text('Someone already logged in!');
					return false;
				}
				else{
					console.log('Unknown Error');
					$('.mngmntlogin small').text('Unknown Error! Please try again.');
					return false;
				}
			},
			success: function(data) {
				if (data === 'success') {
					console.log(data);
					$('.mngmntlogin .fa-spinner').fadeIn(100);
					$('.mngmntlogin small').text('');
					window.location.href = "http://localhost:3000/mngmnt/Home";
					return false;
				}
			}
		});
	}
});


$('#facultylogin').click(function(e) {
	e.preventDefault();
	var a = document.facultylogin.id.value;
	var b = document.facultylogin.password.value;
	if (a=="" || b=="") {
		$('.facultylogin small').text('Please fill all the fields.');
		return false;
	}
	else if (!re.test(a)) {
		$('.facultylogin small').text('Enter valid Email address.');
		return false;	
	}
	else{
		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				id: a,
				password: b,
			},
			url: 'http://localhost:3000/faculty/login', //node.js server is running
			error: function(error){
				if(error.responseText == 'Unauthorized User'){
					console.log(error.responseText);
					$('.facultylogin small').text('Unauthorized User!');
					return false;
				}
				else if (error.responseText == 'pass') {
					console.log(error.responseText);
					$('.facultylogin small').text('Invalid Password!');
					return false;
					
				}
				else if (error.responseText == 'some') {
					console.log(error.responseText);
					$('.facultylogin small').text('Someone already logged in!');
					return false;
				}
				else{
					console.log('Unknown Error');
					$('.facultylogin small').text('Unknown Error! Please try again.');
					return false;
				}
			},
			success: function(data) {
				if (data === 'success') {
					console.log(data);
					$('.facultylogin .fa-spinner').fadeIn(100);
					$('.facultylogin small').text('');
					window.location.href = "http://localhost:3000/faculty/Home";
					return false;
				}
			}
		});
	}
});


$('#gcmlogin').click(function(e) {
	e.preventDefault();
	var a = document.gcmlogin.id.value;
	var b = document.gcmlogin.password.value;
	if (a=="" || b=="") {
		$('.gcmlogin small').text('Please fill all the fields.');
		return false;
	}
	else if (!re.test(a)) {
		$('.gcmlogin small').text('Enter valid Email address.');
		return false;	
	}
	else{
		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				id: a,
				password: b,
			},
			url: 'http://localhost:3000/Members/login', //node.js server is running
			error: function(error){
				if(error.responseText == 'Unauthorized User'){
					console.log(error.responseText);
					$('.gcmlogin small').text('Unauthorized User!');
					return false;
				}
				else if (error.responseText == 'pass') {
					console.log(error.responseText);
					$('.gcmlogin small').text('Invalid Password!');
					return false;
					
				}
				else if (error.responseText == 'some') {
					console.log(error.responseText);
					$('.gcmlogin small').text('Someone already logged in!');
					return false;
				}
				else{
					console.log('Unknown Error');
					$('.gcmlogin small').text('Unknown Error! Please try again.');
					return false;
				}
			},
			success: function(data) {
				if (data === 'success') {
					console.log(data);
					$('.gcmlogin .fa-spinner').fadeIn(100);
					$('.gcmlogin small').text('');
					window.location.href = "http://localhost:3000/Members/Home";
					return false;
				}
			}
		});
	}
});


$('#studentlogin').click(function(e) {
	e.preventDefault();
	var a = document.studentlogin.id.value;
	var b = document.studentlogin.password.value;
	if (a=="" || b=="") {
		$('.studentlogin small').text('Please fill all the fields.');
		return false;
	}
	else if (!re.test(a)) {
		$('.studentlogin small').text('Enter valid Email address.');
		return false;	
	}
	else{
		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				id: a,
				password: b,
			},
			url: 'http://localhost:3000/Student/login', //node.js server is running
			error: function(error){
				if(error.responseText == 'Unauthorized User'){
					console.log(error.responseText);
					$('.studentlogin small').text('Unauthorized User!');
					return false;
				}
				else if (error.responseText == 'pass') {
					console.log(error.responseText);
					$('.studentlogin small').text('Invalid Password!');
					return false;
					
				}
				else if (error.responseText == 'some') {
					console.log(error.responseText);
					$('.studentlogin small').text('Someone already logged in!');
					return false;
				}
				else{
					console.log('Unknown Error');
					$('.studentlogin small').text('Unknown Error! Please try again.');
					return false;
				}
			},
			success: function(data) {
				if (data === 'success') {
					console.log(data);
					$('.studentlogin .fa-spinner').fadeIn(100);
					$('.studentlogin small').text('');
					window.location.href = "http://localhost:3000/Student/Home";
					return false;
				}
			}
		});
	}
});


$('#parentlogin').click(function(e) {
	e.preventDefault();
	var a = document.parentlogin.id.value;
	var b = document.parentlogin.password.value;
	if (a=="" || b=="") {
		$('.parentlogin small').text('Please fill all the fields.');
		return false;
	}
	else if (!re.test(a)) {
		$('.parentlogin small').text('Enter valid Email address.');
		return false;	
	}
	else{
		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				id: a,
				password: b,
			},
			url: 'http://localhost:3000/Parent/login', //node.js server is running
			error: function(error){
				if(error.responseText == 'Unauthorized User'){
					console.log(error.responseText);
					$('.parentlogin small').text('Unauthorized User!');
					return false;
				}
				else if (error.responseText == 'pass') {
					console.log(error.responseText);
					$('.parentlogin small').text('Invalid Password!');
					return false;
					
				}
				else if (error.responseText == 'some') {
					console.log(error.responseText);
					$('.parentlogin small').text('Someone already logged in!');
					return false;
				}
				else{
					console.log('Unknown Error');
					$('.parentlogin small').text('Unknown Error! Please try again.');
					return false;
				}
			},
			success: function(data) {
				if (data === 'success') {
					console.log(data);
					$('.parentlogin .fa-spinner').fadeIn(100);
					$('.parentlogin small').text('');
					window.location.href = "http://localhost:3000/Parent/Home";
					return false;
				}
			}
		});
	}
});


$('#nonteachinglogin').click(function(e) {
	e.preventDefault();
	var a = document.nonteachinglogin.id.value;
	var b = document.nonteachinglogin.password.value;
	if (a=="" || b=="") {
		$('.nonteachinglogin small').text('Please fill all the fields.');
		return false;
	}
	else if (!re.test(a)) {
		$('.nonteachinglogin small').text('Enter valid Email address.');
		return false;	
	}
	else{
		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				id: a,
				password: b,
			},
			url: 'http://localhost:3000/staff/login', //node.js server is running
			error: function(error){
				if(error.responseText == 'Unauthorized User'){
					console.log(error.responseText);
					$('.nonteachinglogin small').text('Unauthorized User!');
					return false;
				}
				else if (error.responseText == 'pass') {
					console.log(error.responseText);
					$('.nonteachinglogin small').text('Invalid Password!');
					return false;
					
				}
				else if (error.responseText == 'some') {
					console.log(error.responseText);
					$('.nonteachinglogin small').text('Someone already logged in!');
					return false;
				}
				else{
					console.log('Unknown Error');
					$('.nonteachinglogin small').text('Unknown Error! Please try again.');
					return false;
				}
			},
			success: function(data) {
				if (data === 'success') {
					console.log(data);
					$('.nonteachinglogin .fa-spinner').fadeIn(100);
					$('.nonteachinglogin small').text('');
					window.location.href = "http://localhost:3000/staff/Home";
					return false;
				}
			}
		});
	}
});


//password strength checker for signup

//student password
$('#student-progress').strengthMeter('progressBar', {
	container: $('#student-progress-container'),
	base: 80,
	hierarchy: {
		'0': 'progress-bar bg-danger',
		'25': 'progress-bar bg-warning',
		'50': 'progress-bar bg-success'
	},
	passwordScore: {
		options: [],
		append: true
	}
});

//faculty password
$('#faculty-progress').strengthMeter('progressBar', {
	container: $('#faculty-progress-container'),
	base: 80,
	hierarchy: {
		'0': 'progress-bar bg-danger',
		'25': 'progress-bar bg-warning',
		'50': 'progress-bar bg-success'
	},
	passwordScore: {
		options: [],
		append: true
	}
});

//nonteaching password
$('#nonteaching-progress').strengthMeter('progressBar', {
	container: $('#nonteaching-progress-container'),
	base: 80,
	hierarchy: {
		'0': 'progress-bar bg-danger',
		'25': 'progress-bar bg-warning',
		'50': 'progress-bar bg-success'
	},
	passwordScore: {
		options: [],
		append: true
	}
});

//parent password
$('#parent-progress').strengthMeter('progressBar', {
	container: $('#parent-progress-container'),
	base: 80,
	hierarchy: {
		'0': 'progress-bar bg-danger',
		'25': 'progress-bar bg-warning',
		'50': 'progress-bar bg-success'
	},
	passwordScore: {
		options: [],
		append: true
	}
});

//student registration validation...
$('#studentsignupbutton').click(function(e) {
	e.preventDefault();

	var name = document.studentsignup.name.value;
	var gender = document.studentsignup.gender.value;
	var dep = document.studentsignup.dep.value;
	var batch = document.studentsignup.batch.value;
	var id = document.studentsignup.id.value;
	var Last_year = document.studentsignup.Lyear.value;
	var email = document.studentsignup.email.value;
	var mobile = document.studentsignup.mobile.value;
	var pass1 = document.studentsignup.password.value;
	var pass2 = document.studentsignup.password2.value;
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (name && gender && dep && batch && id && Last_year && email && mobile && pass1 && pass2 ) {

		if (re.test(email) == false) {
			$('.student-reg-form small').text('Please enter a valid Email Address!');
			return false;
		}

		else if (pass1 != pass2) {
			$('.student-reg-form small').text('Passwords don\'t match!');
			return false;
		}

		// else if (cdate <= 2000 || cdate >=9999) {
		// 	$('.student-reg-form small').text('Please enter a valid Course Completion Date!');
		// 	return false;
		// }

		else if ($("#student-progress-container .progress .bg-danger").length > 0){ 
			$('.student-reg-form small').text('Password too Weak!');
			return false;
		}

		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				name: name,
				gender: gender,
				dep: dep,
				batch: batch,
				id: id,
				Last_year: Last_year,
				email: email,
				mobile: mobile,
				password: pass1,
				password2: pass2
			},
		    url: 'http://localhost:3000/Student/register', //node.js server is running
		    error: function(error){
		    	if (error.responseText == 'already reg not verified') {
		    		console.log(error.responseText);
		    		$('.student-reg-form small').text('User already registered but Email not verified.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered and verified Waiting for admin approval') {
		    		console.log(error.responseText);
		    		$('.student-reg-form small').text('User already registered and waiting for Admin approval.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered,verified and admin approved. Now you can Login') {
		    		console.log(error.responseText);
		    		$('.student-reg-form small').text('User already registered. Please Login.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered,verified but admin rejected') {
		    		console.log(error.responseText);
		    		$('.student-reg-form small').text('User already registered but Rejected by Admin.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered but access terminated') {
		    		console.log(error.responseText);
		    		$('.student-reg-form small').text('User already registered but access Terminated.');
		    		return false;
		    	}
		    	else if (error.responseText == 'mail error') {
		    		console.log(error.responseText);
		    		$('.student-reg-form small').text('Not able to send verification mail. Please check Email Address and Try Again..');
		    		return false;
		    	}
		    	else if (error.responseText == 'someone already logged in') {
		    		console.log(error.responseText);
		    		$('.student-reg-form small').text('Someone already logged in!');
		    		return false;
		    	}
		    	else{
		    		console.log(error.responseText);
		    		$('.student-reg-form small').text('Unknown Error! Try again.');
		    		return false;
		    	}
		    },
		    success: function(data) {
		    	console.log('success');
		    	$('.student-reg-form small').text('');
		    	$('.student-reg-form .fa-spinner').fadeIn(100);
		    	Swal.fire({
		    		position: 'center',
		    		type: 'success',
		    		title: 'Successfully Registered!',
		    		text: 'Please verify your Email Address.',
		    		showConfirmButton: true
		    	}).then(function(){
		    		location.reload();
		    	});
		    	return false;
		    }
		});
	}else{
		$('.student-reg-form small').text('Please fill all the fields!');
		return false;
	}
});

//faculty registration validation...
$('#facultysignupbutton').click(function(e) {
	e.preventDefault();

	var name = document.facultysignup.name.value;
	var gender = document.facultysignup.gender.value;
	var dep = document.facultysignup.dep.value;
	var id = document.facultysignup.id.value;
	var desig = document.facultysignup.desig.value;
	var email = document.facultysignup.email.value;
	var mobile = document.facultysignup.mobile.value;
	var pass1 = document.facultysignup.password.value;
	var pass2 = document.facultysignup.password2.value;
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (name && gender && dep && id && desig && email && mobile && pass1 && pass2 ) {

		if (re.test(email) == false) {
			$('.faculty-reg-form small').text('Please enter a valid Email Address!');
			return false;
		}

		else if (pass1 != pass2) {
			$('.faculty-reg-form small').text('Passwords don\'t match!');
			return false;
		}

		else if ($("#faculty-progress-container .progress .bg-danger").length > 0){ 
			$('.faculty-reg-form small').text('Password too Weak!');
			return false;
		}

		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				name: name,
				gender: gender,
				dep: dep,
				id: id,
				desig: desig,
				email: email,
				mobile: mobile,
				password: pass1,
				password2: pass2
			},
		    url: 'http://localhost:3000/faculty/register', //node.js server is running
		    error: function(error){
		    	if (error.responseText == 'already reg not verified') {
		    		console.log(error.responseText);
		    		$('.faculty-reg-form small').text('User already registered but Email not verified.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered and verified Waiting for admin approval') {
		    		console.log(error.responseText);
		    		$('.faculty-reg-form small').text('User already registered and waiting for Admin approval.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered,verified and admin approved. Now you can Login') {
		    		console.log(error.responseText);
		    		$('.faculty-reg-form small').text('User already registered. Please Login.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered,verified but admin rejected') {
		    		console.log(error.responseText);
		    		$('.faculty-reg-form small').text('User already registered but Rejected by Admin.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered but access terminated') {
		    		console.log(error.responseText);
		    		$('.faculty-reg-form small').text('User already registered but access Terminated.');
		    		return false;
		    	}
		    	else if (error.responseText == 'mail error') {
		    		console.log(error.responseText);
		    		$('.faculty-reg-form small').text('Not able to send verification mail. Please check Email Address and Try Again..');
		    		return false;
		    	}
		    	else if (error.responseText == 'someone already logged in') {
		    		console.log(error.responseText);
		    		$('.faculty-reg-form small').text('Someone already logged in!');
		    		return false;
		    	}
		    	else{
		    		console.log(error.responseText);
		    		$('.faculty-reg-form small').text('Unknown Error! Try again.');
		    		return false;
		    	}
		    },
		    success: function(data) {
		    	console.log('success');
		    	$('.faculty-reg-form small').text('');
		    	$('.faculty-reg-form .fa-spinner').fadeIn(100);
		    	Swal.fire({
		    		position: 'center',
		    		type: 'success',
		    		title: 'Successfully Registered!',
		    		text: 'Please verify your Email Address.',
		    		showConfirmButton: true
		    	}).then(function(){
		    		location.reload();
		    	});
		    	return false;
		    }
		});
	}else{
		$('.faculty-reg-form small').text('Please fill all the fields!');
		return false;
	}
});

//parent registration validation...
$('#parentsignupbutton').click(function(e) {
	e.preventDefault();

	var name = document.parentsignup.name.value;
	var id = document.parentsignup.id.value;
	var Last_year = document.parentsignup.Lyear.value;
	var relation = document.parentsignup.relation.value;
	var email = document.parentsignup.email.value;
	var mobile = document.parentsignup.mobile.value;
	var pass1 = document.parentsignup.password.value;
	var pass2 = document.parentsignup.password2.value;
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (name && id && Last_year && relation && email && mobile && pass1 && pass2 ) {

		if (re.test(email) == false) {
			$('.parent-reg-form small').text('Please enter a valid Email Address!');
			return false;
		}

		else if (pass1 != pass2) {
			$('.parent-reg-form small').text('Passwords don\'t match!');
			return false;
		}

		// else if (cdate >= 9999 || cdate <= 2000) {
		// 	$('.parent-reg-form small').text('Please enter a valid Course Completion Date!');
		// 	return false;
		// }

		else if ($("#parent-progress-container .progress .bg-danger").length > 0){ 
			$('.parent-reg-form small').text('Password too Weak!');
			return false;
		}

		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				name: name,
				relation: relation,
				id: id,
				Last_year: Last_year,
				email: email,
				mobile: mobile,
				password: pass1,
				password2: pass2
			},
		    url: 'http://localhost:3000/Parent/register', //node.js server is running
		    error: function(error){
		    	if (error.responseText == 'already reg not verified') {
		    		console.log(error.responseText);
		    		$('.parent-reg-form small').text('User already registered but Email not verified.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered and verified Waiting for admin approval') {
		    		console.log(error.responseText);
		    		$('.parent-reg-form small').text('User already registered and waiting for Admin approval.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered,verified and admin approved. Now you can Login') {
		    		console.log(error.responseText);
		    		$('.parent-reg-form small').text('User already registered. Please Login.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered,verified but admin rejected') {
		    		console.log(error.responseText);
		    		$('.parent-reg-form small').text('User already registered but Rejected by Admin.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered but access terminated') {
		    		console.log(error.responseText);
		    		$('.parent-reg-form small').text('User already registered but access Terminated.');
		    		return false;
		    	}
		    	else if (error.responseText == 'mail error') {
		    		console.log(error.responseText);
		    		$('.parent-reg-form small').text('Not able to send verification mail. Please check Email Address and Try Again..');
		    		return false;
		    	}
		    	else if (error.responseText == 'someone already logged in') {
		    		console.log(error.responseText);
		    		$('.parent-reg-form small').text('Someone already logged in!');
		    		return false;
		    	}
		    	else{
		    		console.log(error.responseText);
		    		$('.parent-reg-form small').text('Unknown Error! Try again.');
		    		return false;
		    	}
		    },
		    success: function(data) {
		    	console.log('success');
		    	$('.parent-reg-form small').text('');
		    	$('.parent-reg-form .fa-spinner').fadeIn(100);
		    	Swal.fire({
		    		position: 'center',
		    		type: 'success',
		    		title: 'Successfully Registered!',
		    		text: 'Please verify your Email Address.',
		    		showConfirmButton: true
		    	}).then(function(){
		    		location.reload();
		    	});
		    	return false;
		    }
		});
	}else{
		$('.parent-reg-form small').text('Please fill all the fields!');
		return false;
	}
});

//nonteaching registration validation...
$('#nonteachingsignupbutton').click(function(e) {
	e.preventDefault();

	var name = document.nonteachingsignup.name.value;
	var gender = document.nonteachingsignup.gender.value;
	var dep = document.nonteachingsignup.dep.value;
	var id = document.nonteachingsignup.id.value;
	var desig = document.nonteachingsignup.desig.value;
	var email = document.nonteachingsignup.email.value;
	var mobile = document.nonteachingsignup.mobile.value;
	var pass1 = document.nonteachingsignup.password.value;
	var pass2 = document.nonteachingsignup.password2.value;
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (name && gender && dep && id && desig && email && mobile && pass1 && pass2 ) {

		if (re.test(email) == false) {
			$('.nonteaching-reg-form small').text('Please enter a valid Email Address!');
			return false;
		}

		else if (pass1 != pass2) {
			$('.nonteaching-reg-form small').text('Passwords don\'t match!');
			return false;
		}

		else if ($("#nonteaching-progress-container .progress .bg-danger").length > 0){ 
			$('.nonteaching-reg-form small').text('Password too Weak!');
			return false;
		}

		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				name: name,
				gender: gender,
				dep: dep,
				id: id,
				desig: desig,
				email: email,
				mobile: mobile,
				password: pass1,
				password2: pass2
			},
		    url: 'http://localhost:3000/staff/register', //node.js server is running
		    error: function(error){
		    	if (error.responseText == 'already reg not verified') {
		    		console.log(error.responseText);
		    		$('.nonteaching-reg-form small').text('User already registered but Email not verified.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered and verified Waiting for admin approval') {
		    		console.log(error.responseText);
		    		$('.nonteaching-reg-form small').text('User already registered and waiting for Admin approval.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered,verified and admin approved. Now you can Login') {
		    		console.log(error.responseText);
		    		$('.nonteaching-reg-form small').text('User already registered. Please Login.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered,verified but admin rejected') {
		    		console.log(error.responseText);
		    		$('.nonteaching-reg-form small').text('User already registered but Rejected by Admin.');
		    		return false;
		    	}
		    	else if (error.responseText == 'Already Registered but access terminated') {
		    		console.log(error.responseText);
		    		$('.nonteaching-reg-form small').text('User already registered but access Terminated.');
		    		return false;
		    	}
		    	else if (error.responseText == 'mail error') {
		    		console.log(error.responseText);
		    		$('.nonteaching-reg-form small').text('Not able to send verification mail. Please check Email Address and Try Again..');
		    		return false;
		    	}
		    	else if (error.responseText == 'someone already logged in') {
		    		console.log(error.responseText);
		    		$('.nonteaching-reg-form small').text('Someone already logged in!');
		    		return false;
		    	}
		    	else{
		    		console.log(error.responseText);
		    		$('.nonteaching-reg-form small').text('Unknown Error! Try again.');
		    		return false;
		    	}
		    },
		    success: function(data) {
		    	console.log('success');
		    	$('.nonteaching-reg-form small').text('');
		    	$('.nonteaching-reg-form .fa-spinner').fadeIn(100);
		    	Swal.fire({
		    		position: 'center',
		    		type: 'success',
		    		title: 'Successfully Registered!',
		    		text: 'Please verify your Email Address.',
		    		showConfirmButton: true
		    	}).then(function(){
		    		location.reload();
		    	});
		    	return false;
		    }
		});
	}else{
		$('.nonteaching-reg-form small').text('Please fill all the fields!');
		return false;
	}
});



//Forgot Password Validation
$('#Student_forgotpass').click(function(e) {
	e.preventDefault();
	var a = document.Student_forgotpass.email.value;
			//var b = document.nonteachinglogin.password.value;

			if (a=="") {
				$('#forgotemail .fa-times').removeClass('hide');
				$('#forgotemail').addClass('wrong').removeClass('correct');

			}

			if(a!=""){

				$('#forgotemail .fa-times').addClass('hide');


				$.ajax({
					type: 'post',
					datatype: "json",
					data: {
						id: a,
					},
							 url: 'http://localhost:3000/Student/forgot_pass', //node.js server is running
							 error: function(error){
							 	if(error.responseText == 'Unauthorized User'){
							 		console.log(error.responseText);
							 		$('#forgotemail').addClass('wrong').removeClass('correct');
							 		$('#forgotemail .fa-times').removeClass('hide');
							 		$('#forgotemail .fa-check').addClass('hide');
							 		return false;
							 	}
											/*else if (error.responseText == 'pass') {
												console.log(error.responseText);
												$('#forgotemail').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-check').removeClass('hide');
												$('#forgotemail .fa-times').addClass('hide');
											}*/
											else{
												console.log('Unknown Error');
												$('#nonteachingerror').text('unknown error! please try again.');
											}
										},
										success: function(data) {
											if (data === 'success') {
												console.log(data);
												$('#forgotemail, #nonteachingpass').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-times, #nonteachingpass .fa-times').addClass('hide');
												$('#forgotemail .fa-check, #nonteachingpass .fa-check').removeClass('hide');
												alert('New Password Emailed');
												window.location.href = "http://localhost:3000";
												return false;
											}
										}
									});

			}
		});


$('#Staff_forgotpass').click(function(e) {
	e.preventDefault();
	var a = document.Staff_forgotpass.email.value;
			//var b = document.nonteachinglogin.password.value;

			if (a=="") {
				$('#forgotemail .fa-times').removeClass('hide');
				$('#forgotemail').addClass('wrong').removeClass('correct');

			}

			if(a!=""){

				$('#forgotemail .fa-times').addClass('hide');


				$.ajax({
					type: 'post',
					datatype: "json",
					data: {
						id: a,
					},
							 url: 'http://localhost:3000/staff/forgot_pass', //node.js server is running
							 error: function(error){
							 	if(error.responseText == 'Unauthorized User'){
							 		console.log(error.responseText);
							 		$('#forgotemail').addClass('wrong').removeClass('correct');
							 		$('#forgotemail .fa-times').removeClass('hide');
							 		$('#forgotemail .fa-check').addClass('hide');
							 		return false;
							 	}
											/*else if (error.responseText == 'pass') {
												console.log(error.responseText);
												$('#forgotemail').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-check').removeClass('hide');
												$('#forgotemail .fa-times').addClass('hide');
											}*/
											else{
												console.log('Unknown Error');
												$('#nonteachingerror').text('unknown error! please try again.');
											}
										},
										success: function(data) {
											if (data === 'success') {
												console.log(data);
												$('#forgotemail, #nonteachingpass').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-times, #nonteachingpass .fa-times').addClass('hide');
												$('#forgotemail .fa-check, #nonteachingpass .fa-check').removeClass('hide');
												alert('New Password Emailed');
												window.location.href = "http://localhost:3000";
												return false;
											}
										}
									});

			}
		});


$('#Parent_forgotpass').click(function(e) {
	e.preventDefault();
	var a = document.Parent_forgotpass.email.value;
			//var b = document.nonteachinglogin.password.value;

			if (a=="") {
				$('#forgotemail .fa-times').removeClass('hide');
				$('#forgotemail').addClass('wrong').removeClass('correct');

			}

			if(a!=""){

				$('#forgotemail .fa-times').addClass('hide');


				$.ajax({
					type: 'post',
					datatype: "json",
					data: {
						id: a,
					},
							 url: 'http://localhost:3000/Parent/forgot_pass', //node.js server is running
							 error: function(error){
							 	if(error.responseText == 'Unauthorized User'){
							 		console.log(error.responseText);
							 		$('#forgotemail').addClass('wrong').removeClass('correct');
							 		$('#forgotemail .fa-times').removeClass('hide');
							 		$('#forgotemail .fa-check').addClass('hide');
							 		return false;
							 	}
											/*else if (error.responseText == 'pass') {
												console.log(error.responseText);
												$('#forgotemail').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-check').removeClass('hide');
												$('#forgotemail .fa-times').addClass('hide');
											}*/
											else{
												console.log('Unknown Error');
												$('#nonteachingerror').text('unknown error! please try again.');
											}
										},
										success: function(data) {
											if (data === 'success') {
												console.log(data);
												$('#forgotemail, #nonteachingpass').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-times, #nonteachingpass .fa-times').addClass('hide');
												$('#forgotemail .fa-check, #nonteachingpass .fa-check').removeClass('hide');
												alert('New Password Emailed');
												window.location.href = "http://localhost:3000";
												return false;
											}
										}
									});

			}
		});


$('#Faculty_forgotpass').click(function(e) {
	e.preventDefault();
	var a = document.Faculty_forgotpass.email.value;
			//var b = document.nonteachinglogin.password.value;

			if (a=="") {
				$('#forgotemail .fa-times').removeClass('hide');
				$('#forgotemail').addClass('wrong').removeClass('correct');

			}

			if(a!=""){

				$('#forgotemail .fa-times').addClass('hide');


				$.ajax({
					type: 'post',
					datatype: "json",
					data: {
						id: a,
					},
							 url: 'http://localhost:3000/faculty/forgot_pass', //node.js server is running
							 error: function(error){
							 	if(error.responseText == 'Unauthorized User'){
							 		console.log(error.responseText);
							 		$('#forgotemail').addClass('wrong').removeClass('correct');
							 		$('#forgotemail .fa-times').removeClass('hide');
							 		$('#forgotemail .fa-check').addClass('hide');
							 		return false;
							 	}
											/*else if (error.responseText == 'pass') {
												console.log(error.responseText);
												$('#forgotemail').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-check').removeClass('hide');
												$('#forgotemail .fa-times').addClass('hide');
											}*/
											else{
												console.log('Unknown Error');
												$('#nonteachingerror').text('unknown error! please try again.');
											}
										},
										success: function(data) {
											if (data === 'success') {
												console.log(data);
												$('#forgotemail, #nonteachingpass').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-times, #nonteachingpass .fa-times').addClass('hide');
												$('#forgotemail .fa-check, #nonteachingpass .fa-check').removeClass('hide');
												alert('New Password Emailed');
												window.location.href = "http://localhost:3000";
												return false;
											}
										}
									});

			}
		});


$('#Admin_forgotpass').click(function(e) {
	e.preventDefault();
	var a = document.Admin_forgotpass.email.value;
	if (a=="") {
		$('#forgotemail .fa-times').removeClass('hide');
		$('#forgotemail').addClass('wrong').removeClass('correct');

	}

	if(a!=""){

		$('#forgotemail .fa-times').addClass('hide');


		$.ajax({
			type: 'post',
			datatype: "json",
			data: {
				id: a,
			},
							 url: 'http://localhost:3000/Admin/forgot_pass', //node.js server is running
							 error: function(error){
							 	if(error.responseText == 'Unauthorized User'){
							 		console.log(error.responseText);
							 		$('#forgotemail').addClass('wrong').removeClass('correct');
							 		$('#forgotemail .fa-times').removeClass('hide');
							 		$('#forgotemail .fa-check').addClass('hide');
							 		return false;
							 	}

							 	else{
							 		console.log('Unknown Error');
							 		$('#nonteachingerror').text('unknown error! please try again.');
							 	}
							 },
							 success: function(data) {
							 	if (data === 'success') {
							 		console.log(data);
							 		$('#forgotemail, #nonteachingpass').removeClass('wrong').addClass('correct');
							 		$('#forgotemail .fa-times, #nonteachingpass .fa-times').addClass('hide');
							 		$('#forgotemail .fa-check, #nonteachingpass .fa-check').removeClass('hide');
							 		alert('New Password Emailed');
							 		window.location.href = "http://localhost:3000";
							 		return false;
							 	}
							 }
							});

	}
});


$('#Gcm_forgotpass').click(function(e) {
	e.preventDefault();
	var a = document.Gcm_forgotpass.email.value;
			//var b = document.nonteachinglogin.password.value;

			if (a=="") {
				$('#forgotemail .fa-times').removeClass('hide');
				$('#forgotemail').addClass('wrong').removeClass('correct');

			}

			if(a!=""){

				$('#forgotemail .fa-times').addClass('hide');


				$.ajax({
					type: 'post',
					datatype: "json",
					data: {
						id: a,
					},
							 url: 'http://localhost:3000/Members/forgot_pass', //node.js server is running
							 error: function(error){
							 	if(error.responseText == 'Unauthorized User'){
							 		console.log(error.responseText);
							 		$('#forgotemail').addClass('wrong').removeClass('correct');
							 		$('#forgotemail .fa-times').removeClass('hide');
							 		$('#forgotemail .fa-check').addClass('hide');
							 		return false;
							 	}
											/*else if (error.responseText == 'pass') {
												console.log(error.responseText);
												$('#forgotemail').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-check').removeClass('hide');
												$('#forgotemail .fa-times').addClass('hide');
											}*/
											else{
												console.log('Unknown Error');
												$('#nonteachingerror').text('unknown error! please try again.');
											}
										},
										success: function(data) {
											if (data === 'success') {
												console.log(data);
												$('#forgotemail, #nonteachingpass').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-times, #nonteachingpass .fa-times').addClass('hide');
												$('#forgotemail .fa-check, #nonteachingpass .fa-check').removeClass('hide');
												alert('New Password Emailed');
												window.location.href = "http://localhost:3000";
												return false;
											}
										}
									});

			}
		});


$('#mngmnt_forgotpass').click(function(e) {
	e.preventDefault();
	var a = document.mngmnt_forgotpass.email.value;
			//var b = document.nonteachinglogin.password.value;

			if (a=="") {
				$('#forgotemail .fa-times').removeClass('hide');
				$('#forgotemail').addClass('wrong').removeClass('correct');

			}

			if(a!=""){

				$('#forgotemail .fa-times').addClass('hide');


				$.ajax({
					type: 'post',
					datatype: "json",
					data: {
						id: a,
					},
							 url: 'http://localhost:3000/mngmnt/forgot_pass', //node.js server is running
							 error: function(error){
							 	if(error.responseText == 'Unauthorized User'){
							 		console.log(error.responseText);
							 		$('#forgotemail').addClass('wrong').removeClass('correct');
							 		$('#forgotemail .fa-times').removeClass('hide');
							 		$('#forgotemail .fa-check').addClass('hide');
							 		return false;
							 	}
											/*else if (error.responseText == 'pass') {
												console.log(error.responseText);
												$('#forgotemail').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-check').removeClass('hide');
												$('#forgotemail .fa-times').addClass('hide');
											}*/
											else{
												console.log('Unknown Error');
												$('#nonteachingerror').text('unknown error! please try again.');
											}
										},
										success: function(data) {
											if (data === 'success') {
												console.log(data);
												$('#forgotemail, #nonteachingpass').removeClass('wrong').addClass('correct');
												$('#forgotemail .fa-times, #nonteachingpass .fa-times').addClass('hide');
												$('#forgotemail .fa-check, #nonteachingpass .fa-check').removeClass('hide');
												alert('New Password Emailed');
												window.location.href = "http://localhost:3000";
												return false;
											}
										}
									});

			}
		});
