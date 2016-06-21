$(document).ready(function() {

  $('select').material_select();

  Validation();

  $("#submitBtn").click(function() {
    // Validate the form and retain the result.
    var isValid = $("#registerForm").valid();

    // If the form didn't validate, prevent the
    //  form submission.
    if (isValid) {
      doCreate();
    }
  });

});


function doCreate() {
  var _courseid = $('#courseST').val();
  var _roundname = $('#nameTB').val();
  var _nrq = $('#nrQTB').val();
  var _course = $('#courseCTB').val();
  var _time = $('#timeTB').val();
  var _points = $('#pointsTB').val();

  var postForm = { //Fetch form data
    name: _roundname.toString(),
    nrofquestions: _nrq.toString(),
    course: _course.toString(),
    roundTime: _time.toString(),
    courseId: _courseid.toString(),
    points: _points.toString(),
  };

  console.log(postForm);



  $.ajax( {
  	type: "POST", // type of request
  	url: '/addRound', //path of the request
  	data: postForm, //the data to send to the server (JSON)
  	contentType: "application/x-www-form-urlencoded;charset=utf-16", // data content type (header)

  	// the function called on Success (no error returned bu the server)
  	success: function( result ) {
  		// success on login, so redirect. This does not affect the session. If user tricks this, still cannot access the game because of the policies.
      swal({
  				title: "Felicitări",
  				text: "Ai creat o noua Runda.",
  				type: "success",
  				allowEscapeKey: false,
  				allowOutsideClick: false,
  				showConfirmButton: true
  		},	function(){
  				setTimeout(function(){
  	 				window.location.href = "/addRound";
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

  $('#registerForm').validate({
    rules: {
      courseST:"required" ,
      nameTB: {
        required: true,
        minlength: 3,
        maxlength: 100
      },
      nrQTB: {
        required: true,
        minlength: 1
      },
      courseCTB: {
        required: true,
        minlength: 10,
        maxlength: 4000
      },
      timeTB: {
        required: true,
        minlength: 3
      },
      pointsTB: {
        required: true,
        minlength: 3
      }
    },
    messages: {
      nameTB: {
        required: "*Please fill in round Name.",
      },
      nrQTB: {
        required: "*Please fill in Number of questions for this round",
        minlength: "*.Please put at least at 1 to 9 questions"
      },
      courseCTB: {
        required: "*Where HTML for that course  ha???",
        minlength: "* Course have to have al least an link that mean 10 chars",
        maxlength: "* But no more 4000 "
      },
      timeTB: {
        required: "*Please fill in time for this round in Seconds ",
        minlength: "*Please fill at least 100 seconds"
      },
      pointsTB: {
        required: "*Please give us the points for that round to user recive when round is passed",
        minlength: "*Please fill at least 100 points"

      }


    },
    validClass: 'valid',
    errorClass: 'invalid error',
    errorElement: 'div',
    errorPlacement: function(error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(element).parent().children(':nth-child(4)').empty();
        $(placement).append(error);
      } else {
        $(element).parent().children(':nth-child(4)').empty();
        error.insertAfter(element);
      }
    },
    unhighlight: function(element, errorClass, validClass) {

      $(element).removeClass(errorClass).addClass(validClass);
      $(element.form).find("label[for=" + element.id + "]")
        .removeClass(errorClass);
      $(element).parent().children(':nth-child(4)').empty();
    }
  });

}
