

$(document).ready(function() {

    loadPlayerMenu();
    loadCourses();

    loadSkills();

    $('#openShopButton').click(openShop);
    $('#loadShopButton').click(loadShop);
    $('#rollDicesButton').click(rollDices);

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


          loadSkillpoints();
          loadCookies();

          $('#loadInventoryButton').click(loadInventory);
          $('.loadTopPlayersButton').click(loadTopPlayersBy);

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


function displaySwal(title, text, type, imageUrl) {

  var swalConfig = {
    title: title,
    text: text,
    showConfirmButton: false,
    showCancelButton: false,
    showLoaderOnConfirm: false
  };

  if(type) {
    swalConfig.type = type;
  }

  if(imageUrl) {
    swalConfig.imageUrl = imageUrl;
    swalConfig.imageSize = '180x180';
  }

  swal(swalConfig);

    setTimeout(function() { swal.close(); }, 3000);
}

function cheat() {

    var text = 'Tuxy doesn\'t like it when you try to cheat.';
    var imageUrl = './images/donotcheat.jpg';
    displaySwal('No no no...', text, null, imageUrl);
}

function loadCookies() {

  $('#toAppendCookies').empty();

  $.ajax({
    type: 'GET',
    url: '/cookies',
    contentType: 'application/x-www-form-urlencoded;charset=utf-16',

    success: function(result) {

      $('#toAppendCookies').html(result);
    },

    error: function(err) {

      $('#toAppendCookies').html('<p>Oops...</p>');
    },

    timeout: 3000
  });
}

function loadSkillpoints() {

  $('#toAppendSkillPoints').empty();

  $.ajax({
    type: 'GET',
    url: '/skillpoints',
    contentType: 'application/x-www-form-urlencoded;charset=utf-16',

    success: function(result) {

      $('#toAppendSkillPoints').html(result);
    },

    error: function(err) {

      $('#toAppendSkillPoints').html('<p>Oops...</p>');
    },

    timeout: 3000
  });
}

function loadInventory() {

  $('#toAppendInventory').empty();

  $.ajax({
    type: "GET", 
    url: '/inventory',
    contentType: "application/x-www-form-urlencoded;charset=utf-16", 

    success: function(result) {
      
      $('#toAppendInventory').html(result);
    },
    
    error: function(err) {

      $('#toAppendInventory').html("Could not load inventory.");
    },

    timeout: 3000 
  });
}

function loadTopPlayersBy() {

  $('#toAppendTopPlayers').empty();

  var byWhat = $(this).attr('by');  

  var postForm = {
    by : byWhat
  };

  $.ajax({
    type: "POST",
    url: '/player/top',
    data: postForm,
    contentType: "application/x-www-form-urlencoded;charset=utf-16",

    success: function(result) {
      
      $('#toAppendTopPlayers').html(result);
    },
    
    error: function(err) {

      $('#toAppendTopPlayers').html("Could not load top players.");
    },

    timeout: 3000
  });
}

function loadSkills() {

  $('#toAppendSkills').empty();

  $.ajax({
    type: "GET",
    url: '/skills',
    contentType: "application/x-www-form-urlencoded;charset=utf-16",

    success: function(result) {

      $('#toAppendSkills').html(result);

      /*actions*/
      $('.tooltipped').tooltip({delay: 50});

      $('#openLuckButton').leanModal();

/*      $('#openLuckButton').leanModal({
        dismissible: true,
        complete: function() {$('.lean-overlay').remove(); }
      });*/

      $('.addSkillPoint').click(addSkill);
      $('#cheatButton').click(cheat);
    },

    error: function(err) {

      window.location.href = '/500'; /*DISPLAY SOMETHING ELSE? TIMEOUT*/
    },

    timeout: 3000 
  });
}

function addSkill() {

  console.log(this);
  var skillName = $(this).attr('skill');

  var postForm = {
    skill : skillName
  };

  $.ajax({
    type: "POST",
    url: '/skills',
    data: postForm,
    contentType: "application/x-www-form-urlencoded;charset=utf-16",

    success: function(result) {

      loadSkills(); /*the lazy approach to just render all of them*/

      loadSkillpoints();
    },
    error: function(err) {

      displaySwal('No no no...', err.responseJSON.message, 'error', null);
    },
    timeout: 3000 

  });
}

function buyItem() {

  var id = $(this).attr('id');
  var startIdx = id.lastIndexOf('_') + 1;
  id = id.substr(startIdx, id.length);

  var postForm = {
    itemID : id
  };

  $.ajax({
    type: "POST", 
    url: '/shop/buy',
    data: postForm,
    contentType: "application/x-www-form-urlencoded;charset=utf-16",

    success: function(result) {
      
      var text = 'Your purchase has been succesful.';
      displaySwal('Congrats!', text, 'success', null);
      
      reloadShop();

      loadCookies();

      loadSkills(); /*the lazy approach to just render all of them*/
    },

    error: function(err) {

      displaySwal('No no no...', err.responseJSON.message, 'error', null);
    },

    timeout: 3000 
  });
}

function loadShop() {

  var lastItemID = $('#lastItemID').attr('value');
  var limit = $('#limit').attr('value');

  var postForm = {
    lastItemID : lastItemID,
    limit: limit
  };

  $.ajax({
    type: 'POST',
    url: '/shop',
    data: postForm,
    contentType: "application/x-www-form-urlencoded;charset=utf-16",

    success: function(result) {

      if(result.lastID !== null) {
        $('#toAppendShop').append(result.htmlToAppend);
        $('.buyButton').click(buyItem);
        $("#lastItemID").val(result.lastID);
      }
      else { //no more items to load

        if($.trim($("#toAppendShop").html()) === '') { //no more item from the start

          $('#toAppendShop').html('<h5 class="col s12 cyan-text text-darken-2">Out of stock.</h5>');
        } 
        else {

          var text = 'No more items to load.';
          displaySwal('No no no...', text, 'error', null);
        }
      }
    },
    
    error: function(err) {

      $('#toAppendShop').html("Could not load shop.");
    },

    timeout: 3000
  });
}

function openShop() {

  $('#toAppendShop').empty();
  $("#lastItemID").val(0);

  loadShop();
}

/*to call when an user buys an item to reload all the items in shop until the page he was*/
function reloadShop() {

  $('#toAppendShop').empty();

  var lastItemID = $('#lastItemID').attr('value');

  var postForm = {
    lastItemID : lastItemID
  };

  $.ajax({
    type: 'POST',
    url: '/reloadshop',
    data: postForm,
    contentType: "application/x-www-form-urlencoded;charset=utf-16",

    success: function(result) {
      
      if(result) {

        $('#toAppendShop').html(result);
        $('.buyButton').click(buyItem);
      }
      else { //no more items to load

        var text = 'No more items to load.';
        displaySwal('No no no...', text, 'error', null);
      }
    },
    
    error: function(err) {

      $('#toAppendShop').html("Could not load shop.");
    },

    timeout: 3000
  });

}

function rollDices() {

  $('#diceTower').empty();

    $.ajax({
    type: "GET",
    url: '/roll',
    contentType: "application/x-www-form-urlencoded;charset=utf-16",

    success: function(result) {

      $('#diceTower').append(result.html_firstDie);
      $('#diceTower').append(result.html_secondDie);

      var msg;

      if(result.what != 2) {

        if(result.what === 0) {

          msg = 'You got some some cookies.';
          loadCookies();
        }
        else if(result.what == 1) {

          msg = 'You got some skill points.';
          loadSkillpoints();
        }

        displaySwal('Yeeeey', msg, 'success', null);
      }

      loadSkills();
    },

    error: function(err) {

      resetDice();

      displaySwal('No no no...', err.responseJSON.message, 'error', null);
    },

    timeout: 3000
  });
}

function resetDice() {

  $('#diceTower').empty();
  $('#diceTower').append('<div class="die this6sided" data-dieType="6"><ul></ul></div>');
  $('#diceTower').append('<div class="die this6sided" data-dieType="6"><ul></ul></div>');
}