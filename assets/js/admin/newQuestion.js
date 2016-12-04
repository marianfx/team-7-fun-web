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
  var _roundid = $('#roundST').val();
  var _question = $('#questionTB').val();
  var _answerA = $('#answerATB').val();
  var _answerB = $('#answerBTB').val();
  var _answerC = $('#answerCTB').val();
  var _answerD = $('#answerDTB').val();
  var _correctAns = $('#correctAnsTB').val();

  var postForm = { //Fetch form data
    question: _question.toString(),
    answerA: _answerA.toString(),
    answerB: _answerB.toString(),
    answerC: _answerC.toString(),
    answerD: _answerD.toString(),
    correctAnswer: _correctAns.toString(),
    roundID: _roundid.toString()
  };

  console.log(postForm);



  $.ajax({
    type: "POST", // type of request
    url: '/addQuestion', //path of the request
    data: postForm, //the data to send to the server (JSON)
    contentType: "application/x-www-form-urlencoded;odata=verbose", // data content type (header)

    // the function called on Success (no error returned bu the server)
    success: function(result) {
      // success on login, so redirect. This does not affect the session. If user tricks this, still cannot access the game because of the policies.
      swal({
          title: "Felicitări",
          text: "Ai creat o noua Intrebare.",
          type: "success",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: true
      },	function(){
          setTimeout(function(){
            window.location.href = "/addQuestion";
          },
          3000);
      });
    },
    // the function called on error (error returned from server or TimeOut Expired)
    error: function(err) {

      console.log(err);
      var response = {};
      try {
        response = JSON.parse(err.responseText);
      } catch (e) {
        if (err.responseText) { //this is not null
          response = err.responseText;
        } else {
          response.message = 'Cannot fullfill request.';
        }
      }

      var $htmlToDisplay = $('<span class="white-text" id = "error-message">' + response.message + '</span>');
      Materialize.toast($htmlToDisplay, 2000, 'card-panel red'); //create a toast 1\with class = card-panel red class, 2 seconds

      if (response && response.field) {
        var meWithError = "." + response.field;
        $(meWithError).removeClass('valid').addClass('invalid');

        $(meWithError).parent().children(':nth-child(4)').append('<div class="invalid error">*' + response.message + '</div>');
      }
    },
    timeout: 3000 // the time limit to wait for a response from the server, milliseconds
  });
}



function Validation() {


  $('#registerForm').validate({
    rules: {
      roundST: "required",
      questionTB: {
        required: true,
        minlength: 3,
        maxlength: 1000
      },
      answerATB: {
        required: true,
        minlength: 5

      },
      answerBTB: {
        required: true,
        minlength: 5
      },
      answerCTB: {
        required: true,
        minlength: 5

      },
      answerDTB: {
        required: true,
        minlength: 5

      },
      correctAnsTB: {
        required: true

      }
    },
    messages: {

      questionTB: {
        required: "*Please fill in Question.",
        minlength: "*Please put in this a longer Question",
        maxlength: "*Oh! no, no, no. To loog Question"
      },
      answerATB: {
        required: "*Please add AnswerA",
        minlength: "the answer shoud have at least 5 characters"
      },
      answerBTB: {
        required: "*Please add AnswerB",
        minlength: "the answer shoud have at least 5 characters"
      },
      answerCTB: {
        required: "*Please add AnswerC",
        minlength: "the answer shoud have at least 5 characters"
      },
      answerDTB: {
        required: "*Please add AnswerD",
        minlength: "the answer shoud have at least 5 characters"
      },
      correctAnsTB: {
        required: "*Hey you, don't forget to chose the right Answer number at 1 to 4",

      },
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
