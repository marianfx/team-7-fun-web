

$(document).ready(function() {
    loadPlayerMenu();
    loadCourses();
});

/**
 * Loads the left aside menu with the player informations
 * @method loadPlayerMenu
 */
function loadPlayerMenu(){

  	$.ajax({
  		type: "GET", // type of request
  		url: '/render/me', //path of the request
  		contentType: "application/x-www-form-urlencoded;charset=utf-16", // data content type (header)

  		// the function called on Success (no error returned bu the server)
  		success: function(result) {
    			// success on login, so redirect. This does not affect the session. If user tricks this, still cannot access the game because of the policies.
    			$('#slide-out').html(result);

          // atasez click pt LoadCourse
          $('.lessonLoader').click(function(){
            loadCourse(this);
          });
          $('.collapsible').collapsible();
          pluginspreparer();
  		},
  		// the function called on error (error returned from server or TimeOut Expired)
  		error: function(err) {
          window.location.href = '/500';
  		},
  		timeout: 3000 // the time limit to wait for a response from the server, milliseconds
  	});
}


/**
 * Loads all the courses available for the current user
 * @method loadCourses
 */
function loadCourses(){

  	$.ajax({
  		type: "GET", // type of request
  		url: '/render/courses', //path of the request
  		contentType: "application/x-www-form-urlencoded;charset=utf-16", // data content type (header)

  		// the function called on Success (no error returned bu the server)
  		success: function(result) {
    			// success on login, so redirect. This does not affect the session. If user tricks this, still cannot access the game because of the policies.
    			$('#coursesContainer').html(result);

          // atasez click
          $('.playable').click(function(){
              loadRound(this);
          });
          // atasez click pt LoadCourse
          // $('.lessonLoader').click(function(){
          //   loadCourse(this);
          // });
          $('.collapsible').collapsible();
          pluginspreparer();
  		},
  		// the function called on error (error returned from server or TimeOut Expired)
  		error: function(err) {
  			   window.location.href = '/500';
  		},
  		timeout: 3000 // the time limit to wait for a response from the server, milliseconds
  	});
}


/**
 * Loads round from the database.
 * @method loadRound
 */
function loadRound(me){

    var id = $(me).attr('lessonId');
    console.log(id);
    var formData = {
      roundID: id,
      nrQuestions: 0
    };

    $.ajax({
  		type: "GET", // type of request
  		url: '/questions', //path of the request
      data: formData,
  		contentType: "application/x-www-form-urlencoded;charset=utf-16", // data content type (header)

  		// the function called on Success (no error returned bu the server)
  		success: function(result) {
    			// success on login, so redirect. This does not affect the session. If user tricks this, still cannot access the game because of the policies.
    			$('#contentContainer').html(result);

          $('.collapsible').collapsible();
          pluginspreparer();

          // atasez click
          startRounds();
  		},
  		// the function called on error (error returned from server or TimeOut Expired)
  		error: function(err) {
    			// window.location.href = '/500';
          swal({
            title: "Sorry..",
            text: "Cannot retrieve that round.",
            type: "error"
          });
  		},
  		timeout: 3000 // the time limit to wait for a response from the server, milliseconds
  	});
}


/**
 * Loads round from the database.
 * @method loadCourse
 */
function loadCourse(me){

    var id = $(me).attr('lessonId');
    console.log(id);
    var formData = {
      roundID: id,
    };

    $.ajax({
      type: "GET", // type of request
      url: '/course', //path of the request
      data: formData,
      contentType: "application/x-www-form-urlencoded;charset=utf-16", // data content type (header)

      // the function called on Success (no error returned bu the server)
      success: function(result) {
            // success on get course for roundID, so display modal.
          $('#modalContainer').html(result);
          $('#modalCourse').openModal();
      },
      // the function called on error (error returned from server or TimeOut Expired)
      error: function(err) {
          // window.location.href = '/500';
          swal({
            title: "Sorry..",
            text: "Cannot retrieve that course for that round.",
            type: "error"
          });
      },
      timeout: 3000 // the time limit to wait for a response from the server, milliseconds
    });



}
