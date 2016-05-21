$( document ).ready(function() {
    //
    $("#submitBtn").click(function(){
        doLogin();
	});
});

function doLogin()
{
    var User = $('#userTB').val();
	var Pass = $('#passTB').val();

	var postForm = { //Fetch form data
            username : "" + User + "",
			password : "" + Pass + "",
        };

	$.ajax({
        type: "POST",                                          // type of request
        url: '/auth/local',                                    //path of the request
        data: postForm,                                        //the data to send to the server (JSON)
		contentType: "application/x-www-form-urlencoded;charset=utf-16",  // data content type (header)

        // the function called on Success (no error returned bu the server)
        success: function (result) {
            var $htmlToDisplay = $('<span class="white-text" id = "error-message">' + result.text  +'</span>');
    		Materialize.toast($htmlToDisplay, 4000, 'card-panel red col s4');//create a toast 1\with class = card-panel red class, 4 seconds

            // success on login, so redirect. This does not affect the session. If user tricks this, still cannot access the game because of the policies.
            if(result.status == 1){
                window.location.href = "/game";
            }
        },

        // the function called on error (error returned from server or TimeOut Expired)
        error: function (result) {
            var $htmlToDisplay = $('<span class="white-text" id = "error-message">' + result.text  +'</span>');
    		Materialize.toast($htmlToDisplay, 4000, 'card-panel red');//create a toast 1\with class = card-panel red class, 4 seconds
        },

		timeout: 3000                                         // the time limit to wait for a response from the server, milliseconds

		}).done(function(){

		}).fail(function(jqXHR, textStatus){
            var $htmlToDisplay = $('<span class="white-text" id = "error-message"> Failed to do the request. Text status: ' + textStatus + '</span>');
    		Materialize.toast($htmlToDisplay, 4000, 'card-panel red');//create a toast 1\with class = card-panel red class, 4 seconds
		});
}
