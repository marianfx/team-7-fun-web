$( document ).ready( function() {

	Validation();

	$( "#submitBtn" ).click( function() {
		// Validate the form and retain the result.
		var isValid = $( "#registerForm" ).valid();

		// If the form didn't validate, prevent the
		//  form submission.
		if ( isValid ) {
			doRegister();
		}
	} );

} );


function doRegister() {
	var _username = $( '#userTB' ).val();
	var _email = $( '#emailTB' ).val();
	var _password = $( '#passTB' ).val();

	var postForm = { //Fetch form data
		username: _username.toString(),
		email:    _email.toString(),
		password: _password.toString()
	};



	$.ajax( {
		type: "POST", // type of request
		url: '/register', //path of the request
		data: postForm, //the data to send to the server (JSON)
		contentType: "application/x-www-form-urlencoded;charset=utf-16", // data content type (header)

		// the function called on Success (no error returned bu the server)
		success: function( result ) {
			// success on login, so redirect. This does not affect the session. If user tricks this, still cannot access the game because of the policies.
      swal({
					title: "Felicitări",
					text: "Te-ai înregistrat cu succes. Te redirectăm pe pagina de login..",
					type: "success",
					allowEscapeKey: false,
					allowOutsideClick: false,
					showConfirmButton: false
			});

			setTimeout(function(){
				swal.close();
				setTimeout(function(){
					window.location.href = "/signin";
				}, 1000);
			}, 3000);
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
			userTB: {
				required: true,
				minlength: 3,
				maxlength: 50
			},
			emailTB: {
				required: true,
				email: true
			},
			passTB: {
				required: true,
				minlength: 6
			},
			passagainTB: {
				required: true,
				minlength: 6,
				equalTo: '#passTB'
			}
		},
		messages: {
			userTB: {
				required: "*Please fill in your user name.",
				minlength: "*In our opinion, your name should have at least 3 characters.",
				maxlength: "*In our opinion your name should have at most 50 characters."
			},
			emailTB: {
				required: "*Please fill in your email adress.",
				email: "*You know this is supposed to be an email adress, right?"
			},
			passTB: {
				required: "*SO, you dont't want a password?",
				minlength: "*Please put a decent password (at least 6 characters long). No birthdays or '123456' please."
			},
			passagainTB: {
				required: "*If the password can't be empty, the password retyped can't be empty neither, right?",
				minlength: "*f the password must be at least 6 characters, the password retyped should be the same, right?",
				equalTo: '*This must be the same as the password (we\'re making sure you\'re not drunk).'
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
