$('#adminlogin').click(function(e) {
	e.preventDefault();
	var a = document.adminlogin.id.value;
	var b = document.adminlogin.password.value;

	if (a=="") {
		$('#adminid .fa-times').removeClass('hide');
		$('#adminid .fa-times').attr('title', 'Please Enter Username');
		$('#adminid').addClass('wrong').removeClass('correct');

		if (b=="") {
			$('#adminpass .fa-times').removeClass('hide');
			$('#adminpass .fa-times').attr('title', 'Please Enter Password');
			$('#adminpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#adminpass .fa-times').addClass('hide');
		}

	}

	if(a!=""){

		$('#adminid .fa-times').addClass('hide');

		if (b=="") {
			$('#adminpass .fa-times').removeClass('hide');
			$('#adminpass .fa-times').attr('title', 'Please Enter Password');
			$('#adminpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#adminpass .fa-times').addClass('hide');

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
				     		$('#adminid').addClass('wrong').removeClass('correct');
				     		$('#adminid .fa-times').removeClass('hide');
				     		$('#adminid .fa-times').attr('title', 'Unauthorized User');
				     		$('#adminid .fa-check').addClass('hide');
				     		return false;
				     	}
				     	else if (error.responseText == 'pass') {
				     		console.log(error.responseText);
				     		$('#adminpass').addClass('wrong');
				     		$('#adminpass .fa-times').removeClass('hide');
				     		$('#adminpass .fa-times').attr('title', 'Invalid Password');
				     		$('#adminid').removeClass('wrong').addClass('correct');
				     		$('#adminid .fa-check').removeClass('hide');
				     		$('#adminid .fa-times').addClass('hide');
				     	}
				     	else if (error.responseText == 'some') {
				     		console.log(error.responseText);
				     		$('#adminerror').text('Someone already logged in!');
				     	}
				     	else{
				     		console.log('Unknown Error');
				     		$('#adminerror').text('unknown error! please try again.');
				     	}
				     },
				     success: function(data) {
				     	if (data === 'success') { 
				     		console.log(data);
				     		$('#adminid, #adminpass').removeClass('wrong').addClass('correct');
				     		$('#adminid .fa-times, #adminpass .fa-times').addClass('hide');
				     		$('#adminid .fa-check, #adminpass .fa-check').removeClass('hide');
				     		window.location.href = "http://localhost:3000/Admin/Home";
				     		return false;
				     	}
				     }
				 });
		}
	}
});


$('#mngmntlogin').click(function(e) {
	e.preventDefault();
	var a = document.mngmntlogin.id.value;
	var b = document.mngmntlogin.password.value;

	if (a=="") {
		$('#mngmntid .fa-times').removeClass('hide');
		$('#mngmntid').addClass('wrong').removeClass('correct');

		if (b=="") {
			$('#mngmntpass .fa-times').removeClass('hide');
			$('#mngmntpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#mngmntpass .fa-times').addClass('hide');
		}

	}

	if(a!=""){

		$('#mngmntid .fa-times').addClass('hide');

		if (b=="") {
			$('#mngmntpass .fa-times').removeClass('hide');
			$('#mngmntpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#mngmntpass .fa-times').addClass('hide');


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
				     		$('#mngmntid').addClass('wrong').removeClass('correct');
				     		$('#mngmntid .fa-times').removeClass('hide');
				     		$('#mngmntid .fa-check').addClass('hide');
				     		return false;
				     	}
				     	else if (error.responseText == 'pass') {
				     		console.log(error.responseText);
				     		$('#mngmntpass').addClass('wrong');
				     		$('#mngmntpass .fa-times').removeClass('hide');
				     		$('#mngmntid').removeClass('wrong').addClass('correct');
				     		$('#mngmntid .fa-check').removeClass('hide');
				     		$('#mngmntid .fa-times').addClass('hide');
				     	}
				     	else if (error.responseText == 'some') {
				     		console.log(error.responseText);
				     		$('#mngmnterror').text('Someone already logged in!');
				     	}
				     	else{
				     		console.log('Unknown Error');
				     		$('#mngmnterror').text('unknown error! please try again.');
				     	}
				     },
				     success: function(data) {
				     	if (data === 'success') { 
				     		console.log(data);
				     		$('#mngmntid, #mngmntpass').removeClass('wrong').addClass('correct');
				     		$('#mngmntid .fa-times, #mngmntpass .fa-times').addClass('hide');
				     		$('#mngmntid .fa-check, #mngmntpass .fa-check').removeClass('hide');
				     		window.location.href = "http://localhost:3000/mngmnt/Home";
				     		return false;
				     	}
				     }
				 });
		}
	}
});



$('#facultylogin').click(function(e) {
	e.preventDefault();
	var a = document.facultylogin.id.value;
	var b = document.facultylogin.password.value;

	if (a=="") {
		$('#facultyid .fa-times').removeClass('hide');
		$('#facultyid').addClass('wrong').removeClass('correct');

		if (b=="") {
			$('#facultypass .fa-times').removeClass('hide');
			$('#facultypass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#facultypass .fa-times').addClass('hide');
		}

	}

	if(a!=""){

		$('#facultyid .fa-times').addClass('hide');

		if (b=="") {
			$('#facultypass .fa-times').removeClass('hide');
			$('#facultypass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#facultypass .fa-times').addClass('hide');


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
				     		$('#facultyid').addClass('wrong').removeClass('correct');
				     		$('#facultyid .fa-times').removeClass('hide');
				     		$('#facultyid .fa-check').addClass('hide');
				     		return false;
				     	}
				     	else if (error.responseText == 'pass') {
				     		console.log(error.responseText);
				     		$('#facultypass').addClass('wrong');
				     		$('#facultypass .fa-times').removeClass('hide');
				     		$('#facultyid').removeClass('wrong').addClass('correct');
				     		$('#facultyid .fa-check').removeClass('hide');
				     		$('#facultyid .fa-times').addClass('hide');
				     	}
				     	else if (error.responseText == 'some') {
				     		console.log(error.responseText);
				     		$('#facultyerror').text('Someone already logged in!');
				     	}
				     	else if (error.responseText == 'not apprv') {
				     		console.log(error.responseText);
				     		$('#facultyerror').text('Waiting for approval!');
				     	}
				     	else{
				     		console.log('Unknown Error');
				     		$('#facultyerror').text('unknown error! please try again.');
				     	}
				     },
				     success: function(data) {
				     	if (data === 'success') { 
				     		console.log(data);
				     		$('#facultyid, #facultypass').removeClass('wrong').addClass('correct');
				     		$('#facultyid .fa-times, #facultypass .fa-times').addClass('hide');
				     		$('#facultyid .fa-check, #facultypass .fa-check').removeClass('hide');
				     		window.location.href = "http://localhost:3000/faculty/Home";
				     		return false;
				     	}
				     }
				 });
		}
	}
});



$('#gcmlogin').click(function(e) {
	e.preventDefault();
	var a = document.gcmlogin.id.value;
	var b = document.gcmlogin.password.value;

	if (a=="") {
		$('#gcmid .fa-times').removeClass('hide');
		$('#gcmid').addClass('wrong').removeClass('correct');

		if (b=="") {
			$('#gcmpass .fa-times').removeClass('hide');
			$('#gcmpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#gcmpass .fa-times').addClass('hide');
		}

	}

	if(a!=""){

		$('#gcmid .fa-times').addClass('hide');

		if (b=="") {
			$('#gcmpass .fa-times').removeClass('hide');
			$('#gcmpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#gcmpass .fa-times').addClass('hide');


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
				     		$('#gcmid').addClass('wrong').removeClass('correct');
				     		$('#gcmid .fa-times').removeClass('hide');
				     		$('#gcmid .fa-check').addClass('hide');
				     		return false;
				     	}
				     	else if (error.responseText == 'pass') {
				     		console.log(error.responseText);
				     		$('#gcmpass').addClass('wrong');
				     		$('#gcmpass .fa-times').removeClass('hide');
				     		$('#gcmid').removeClass('wrong').addClass('correct');
				     		$('#gcmid .fa-check').removeClass('hide');
				     		$('#gcmid .fa-times').addClass('hide');
				     	}
				     	else if (error.responseText == 'some') {
				     		console.log(error.responseText);
				     		$('#gcmerror').text('Someone already logged in!');
				     	}
				     	else{
				     		console.log('Unknown Error');
				     		$('#gcmerror').text('unknown error! please try again.');
				     	}
				     },
				     success: function(data) {
				     	if (data === 'success') { 
				     		console.log(data);
				     		$('#gcmid, #gcmpass').removeClass('wrong').addClass('correct');
				     		$('#gcmid .fa-times, #gcmpass .fa-times').addClass('hide');
				     		$('#gcmid .fa-check, #gcmpass .fa-check').removeClass('hide');
				     		window.location.href = "http://localhost:3000/Members/Home";
				     		return false;
				     	}
				     }
				 });
		}
	}
});


$('#studentlogin').click(function(e) {
	e.preventDefault();
	var a = document.studentlogin.id.value;
	var b = document.studentlogin.password.value;

	if (a=="") {
		$('#studentid .fa-times').removeClass('hide');
		$('#studentid').addClass('wrong').removeClass('correct');

		if (b=="") {
			$('#studentpass .fa-times').removeClass('hide');
			$('#studentpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#studentpass .fa-times').addClass('hide');
		}

	}

	if(a!=""){

		$('#studentid .fa-times').addClass('hide');

		if (b=="") {
			$('#studentpass .fa-times').removeClass('hide');
			$('#studentpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#studentpass .fa-times').addClass('hide');


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
				     		$('#studentid').addClass('wrong').removeClass('correct');
				     		$('#studentid .fa-times').removeClass('hide');
				     		$('#studentid .fa-check').addClass('hide');
				     		return false;
				     	}
				     	else if (error.responseText == 'pass') {
				     		console.log(error.responseText);
				     		$('#studentpass').addClass('wrong');
				     		$('#studentpass .fa-times').removeClass('hide');
				     		$('#studentid').removeClass('wrong').addClass('correct');
				     		$('#studentid .fa-check').removeClass('hide');
				     		$('#studentid .fa-times').addClass('hide');
				     	}
				     	else if (error.responseText == 'some') {
				     		console.log(error.responseText);
				     		$('#studenterror').text('Someone already logged in!');
				     	}
				     	else{
				     		console.log('Unknown Error');
				     		$('#studenterror').text('unknown error! please try again.');
				     	}
				     },
				     success: function(data) {
				     	if (data === 'success') { 
				     		console.log(data);
				     		$('#studentid, #studentpass').removeClass('wrong').addClass('correct');
				     		$('#studentid .fa-times, #studentpass .fa-times').addClass('hide');
				     		$('#studentid .fa-check, #studentpass .fa-check').removeClass('hide');
				     		window.location.href = "http://localhost:3000/Student/Home";
				     		return false;
				     	}
				     }
				 });
		}
	}
});



$('#parentlogin').click(function(e) {
	e.preventDefault();
	var a = document.parentlogin.id.value;
	var b = document.parentlogin.password.value;

	if (a=="") {
		$('#parentid .fa-times').removeClass('hide');
		$('#parentid').addClass('wrong').removeClass('correct');

		if (b=="") {
			$('#parentpass .fa-times').removeClass('hide');
			$('#parentpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#parentpass .fa-times').addClass('hide');
		}

	}

	if(a!=""){

		$('#parentid .fa-times').addClass('hide');

		if (b=="") {
			$('#parentpass .fa-times').removeClass('hide');
			$('#parentpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#parentpass .fa-times').addClass('hide');


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
				     		$('#parentid').addClass('wrong').removeClass('correct');
				     		$('#parentid .fa-times').removeClass('hide');
				     		$('#parentid .fa-check').addClass('hide');
				     		return false;
				     	}
				     	else if (error.responseText == 'pass') {
				     		console.log(error.responseText);
				     		$('#parentpass').addClass('wrong');
				     		$('#parentpass .fa-times').removeClass('hide');
				     		$('#parentid').removeClass('wrong').addClass('correct');
				     		$('#parentid .fa-check').removeClass('hide');
				     		$('#parentid .fa-times').addClass('hide');
				     	}
				     	else if (error.responseText == 'some') {
				     		console.log(error.responseText);
				     		$('#parenterror').text('Someone already logged in!');
				     	}
				     	else{
				     		console.log('Unknown Error');
				     		$('#parenterror').text('unknown error! please try again.');
				     	}
				     },
				     success: function(data) {
				     	if (data === 'success') { 
				     		console.log(data);
				     		$('#parentid, #parentpass').removeClass('wrong').addClass('correct');
				     		$('#parentid .fa-times, #parentpass .fa-times').addClass('hide');
				     		$('#parentid .fa-check, #parentpass .fa-check').removeClass('hide');
				     		window.location.href = "http://localhost:3000/Parent/Home";
				     		return false;
				     	}
				     }
				 });
		}
	}
});



$('#nonteachinglogin').click(function(e) {
	e.preventDefault();
	var a = document.nonteachinglogin.id.value;
	var b = document.nonteachinglogin.password.value;

	if (a=="") {
		$('#nonteachingid .fa-times').removeClass('hide');
		$('#nonteachingid').addClass('wrong').removeClass('correct');

		if (b=="") {
			$('#nonteachingpass .fa-times').removeClass('hide');
			$('#nonteachingpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#nonteachingpass .fa-times').addClass('hide');
		}

	}

	if(a!=""){

		$('#nonteachingid .fa-times').addClass('hide');

		if (b=="") {
			$('#nonteachingpass .fa-times').removeClass('hide');
			$('#nonteachingpass').addClass('wrong').removeClass('correct');
			return false;
		}else{
			$('#nonteachingpass .fa-times').addClass('hide');


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
				     		$('#nonteachingid').addClass('wrong').removeClass('correct');
				     		$('#nonteachingid .fa-times').removeClass('hide');
				     		$('#nonteachingid .fa-check').addClass('hide');
				     		return false;
				     	}
				     	else if (error.responseText == 'pass') {
				     		console.log(error.responseText);
				     		$('#nonteachingpass').addClass('wrong');
				     		$('#nonteachingpass .fa-times').removeClass('hide');
				     		$('#nonteachingid').removeClass('wrong').addClass('correct');
				     		$('#nonteachingid .fa-check').removeClass('hide');
				     		$('#nonteachingid .fa-times').addClass('hide');
				     	}
				     	else if (error.responseText == 'some') {
				     		console.log(error.responseText);
				     		$('#nonteachingerror').text('Someone already logged in!');
				     	}
				     	else{
				     		console.log('Unknown Error');
				     		$('#nonteachingerror').text('unknown error! please try again.');
				     	}
				     },
				     success: function(data) {
				     	if (data === 'success') { 
				     		console.log(data);
				     		$('#nonteachingid, #nonteachingpass').removeClass('wrong').addClass('correct');
				     		$('#nonteachingid .fa-times, #nonteachingpass .fa-times').addClass('hide');
				     		$('#nonteachingid .fa-check, #nonteachingpass .fa-check').removeClass('hide');
				     		window.location.href = "http://localhost:3000/staff/Home";
				     		return false;
				     	}
				     }
				 });
		}
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
	var cdate = document.studentsignup.cdate.value;
	var email = document.studentsignup.email.value;
	var mobile = document.studentsignup.mobile.value;
	var pass1 = document.studentsignup.password.value;
	var pass2 = document.studentsignup.password2.value;
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (name && gender && dep && batch && id && cdate && email && mobile && pass1 && pass2 ) {

		if (re.test(email) == false) {
			$('.student-reg-form small').text('Please enter a valid Email Address!');
			return false;
		}

		else if (pass1 != pass2) {
			$('.student-reg-form small').text('Passwords don\'t match!');
			return false;
		}

		else if (cdate >= 9999 || cdate <= 2000) {
			$('.student-reg-form small').text('Please enter a valid Course Completion Date!');
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
				cdate: cdate,
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
		    	else if (error.responseText == 'already reg verified') {
		    		console.log(error.responseText);
		    		$('.student-reg-form small').text('User already registered and waiting for approval.');
		    		return false;
		    	}
		    	else if (error.responseText == 'mail error') {
		    		console.log(error.responseText);
		    		$('.student-reg-form small').text('Not able to send verification mail. Please check Email Address.');
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
				Swal.fire({
				  position: 'center',
				  type: 'success',
				  title: 'Successfully Registered!',
				  text: 'Please verify your Email Address.',
				  showConfirmButton: true,
				  timer: 5000
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


