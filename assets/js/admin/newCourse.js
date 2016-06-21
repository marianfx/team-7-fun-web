$( document ).ready( function() {

	Validation();

	$( "#submitBtn" ).click( function() {
		// Validate the form and retain the result.
		var isValid = $( "#registerForm" ).valid();

		// If the form didn't validate, prevent the
		//  form submission.
		if ( isValid ) {
			doCreate();
		}
	} );

} );


function doCreate() {
	var _coursename = $( '#courseTB' ).val();
	var _description = $( '#descTB' ).val();
	var _hashtag = $( '#hashTB' ).val();
	var _photo = $( '#photoTB' ).val();
	var _author = $( '#authorTB' ).val();

	var postForm = { //Fetch form data
		title: 		_coursename.toString(),
		shortdesc: 		_description.toString(),
		hashtag: 	_hashtag.toString(),
		photoUrl: _photo.toString() ,
		author : _author.toString(),
	};

	console.log(postForm);



	$.ajax( {
		type: "POST", // type of request
		url: '/addCourse', //path of the request
		data: postForm, //the data to send to the server (JSON)
		contentType: "application/x-www-form-urlencoded;charset=utf-16", // data content type (header)

		// the function called on Success (no error returned bu the server)
		success: function( result ) {
			// success on login, so redirect. This does not affect the session. If user tricks this, still cannot access the game because of the policies.
      swal({
					title: "Felicitări",
					text: "Ai creat un nou curs.",
					type: "success",
					allowEscapeKey: false,
					allowOutsideClick: false,
					showConfirmButton: true
			},
			function(){
				setTimeout(function(){
	 				window.location.href = "/addCourse";
				},
				3000);
			});
	},
		// the function called on error (error returned from server or TimeOut Expired)
		error: function( err ) {

			console.log(err);
			var response = {};
			try {
					response = JSON.parse( err.responseText );
			} catch (e) {
					if (err.responseText) {//this is not null
							response = err.responseText;
					} else {
						response.message = 'Cannot fullfill request.';
					}
			}

			var $htmlToDisplay = $( '<span class="white-text" id = "error-message">' + response.message + '</span>' );
			Materialize.toast( $htmlToDisplay, 2000, 'card-panel red' ); //create a toast 1\with class = card-panel red class, 2 seconds

			if(response && response.field){
				var meWithError = "." + response.field;
				$(meWithError).removeClass('valid').addClass('invalid');

				$(meWithError).parent().children(':nth-child(4)').append('<div class="invalid error">*' + response.message + '</div>');
			}
		},
		timeout: 3000 // the time limit to wait for a response from the server, milliseconds
	} );
}



function Validation() {
	$( '#registerForm' ).validate( {
		rules: {
			courseTB: {
				required: true,
				minlength: 3,
				maxlength: 50
			},
			descTB: {
				required: true,
        minlength: 3,
				maxlength: 1000
			},
			hashTB: {
				required: true,
				minlength: 3
			},
			photoTB: {
				required: true,
				minlength: 6,
			},
			authorTB:{
				required: true,
				minlength: 6,
			}
		},
		messages: {
			courseTB: {
				required: "*Please fill in  the  course name.",
				minlength: "*In our opinion, your name should have at least 3 characters.",
				maxlength: "*In our opinion your name should have at most 50 characters."
			},
			descTB: {
				required: "*Please fill in course description for course.",
				email: "*You know this is supposed to be an email adress, right?"
			},
			hashTB: {
				required: "*SO, you dont Hash Tag for Course?",
				minlength: "*Please put de #(tagName)."
			},
			photoTB: {
				required: "*Where is the photo url for that course???",
			},
			authorTB:{
				required: "Please fill in Course's Author Name..."
			}

		},
		validClass: 'valid',
		errorClass: 'invalid error',
		errorElement: 'div',
		errorPlacement: function( error, element ) {
			var placement = $( element ).data( 'error' );
			if ( placement ) {
				$(element).parent().children(':nth-child(4)').empty();
				$( placement ).append( error );
			} else {
				$(element).parent().children(':nth-child(4)').empty();
				error.insertAfter( element );
			}
		},
		unhighlight: function(element, errorClass, validClass) {

		    $(element).removeClass(errorClass).addClass(validClass);
		    $(element.form).find("label[for=" + element.id + "]")
		      .removeClass(errorClass);
				$(element).parent().children(':nth-child(4)').empty();
  	}
	} );
}
