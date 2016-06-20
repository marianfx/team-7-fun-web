
var answers = {};
var time;
var clock;
var isCancel;
var isPlaying = false;

function addTime() {

  var time = clock.getTime();
  // post ajax to server for time add
  // it means that i have to decrement from last round start x seconds on serverside and add x seconds to client's clock
  // update LASTROUNDSTART + (x / (24 * 60 * 60)) to playerid
  $.ajax({
    type: "POST",
    url: "/player/addTime",
    data: {message: "addTime"},
    contentType: "application/x-www-form-urlencoded;charset=utf-16",

    success: function(result) {
        console.log(result);
        if(result.flag) {
          clock.setTime(time.time + result.time);
          loadSkills();
        }
        else
        {
          var $htmlToDisplay = $('<span class="white-text" id = "error-message">' + "Insufficient points."  + '</span>');
          Materialize.toast($htmlToDisplay, 1000, 'card-panel red');
        }

    },
    error: function(result) {
      swal({
          title:"Error",
          text: "Cannot do that.",
          type: "error",
          allowEscapeKey: true,
          allowOutsideClick: true,
          showConfirmButton: true
        });
    },
    timeout: 5000
  });
}

/**
 * Start the single player round
 */
function startRounds() {

    isCancel = null;
    isPlaying = true;
    $('#addTimeButton').click(addTime);

    $(".qq").click(function() {
        doSelect(this);
    });

    $("#submmitBtn").click(function() {

      if(Object.keys(answers).length === 0)
        swal("Hey!", "You cannot submit an empty answer!", "warning");
      else
      {
          submmitAnswer();
          swal({
            title: "Wait... while we check your answers",
            text: "",
            imageUrl: "./images/waiting.gif",
            imageSize: '180x180',
            showConfirmButton: false,
            showCancelButton: false,
            showLoaderOnConfirm: true,
          });
      }
    });
}

/**
 * Visual selector for question answers.
 * @param  {[type]} me [description]
 * @return {[type]}    [description]
 */
function doSelect(me) {

    var parent = $(me).parent().attr("id");
    $(me).parent().children(".qq").removeClass("active");

    var classList = $(me).attr('class').split(" ");
    var index = classList.length - 1;
    var value = classList[index];

    $(me).addClass("active");

    answers[parent] = value;
}


/**
 * Calls the server for submitting an answer.
 */
function submmitAnswer() {

    isPlaying = false;
    $('#addTimeButton').unbind('click', addTime);

    $.ajax({
      type: "POST",
      url: "/questions/submmit",
      data: answers,
      contentType: "application/x-www-form-urlencoded;charset=utf-16",

      success: function(result) {
          setTimeout(swal.close, 1500);
          setTimeout(function() {
              processResponse(result);
            },
            3000);
      },

      error: function(result) {
          setTimeout(swal.close, 1500);

          setTimeout(function() {
            swal({
                title:"You failed this city.",
                text: "You think you're a hacker, ha?",
                type: "error",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false
              });
          },2000);

          setTimeout(function(){
              window.location.href = "/game";
          },
          3000);
      },
      timeout: 5000
    });
}


/**
 * After receiving response from server, visually update the answers.
 */
function processResponse(result) {

  isCancel = 'yes';
  clock.stop();//stops the clock, without showing warnings
  if (!result.flagTime) {
      swal({
        title: "Sorry..",
        text: "You exceeded your time!",
        type: "error",
        showConfirmButton: false
      });
  }
  else {
      if (result.flagnextRound){
        swal({
          title: "You're the best!",
          text: "You passed the exam...",
          type: "success",
          timer: 3000,
          showConfirmButton: false
        });
    }
    else {
        swal({
          title: "Oh, snap..",
          text: "You did not pass the exam... try again later!",
          type: "warning",
          timer: 3000,
          showConfirmButton: false
        });
    }

    var ans = result.correctAnswers;
    for (var x in ans) {
      var byID = "#" + x;
      var byClass = ans[x].correctNr;

      var elem = $('#' + x).children('.' + byClass)[0];
      $(elem).addClass('green');
      $(elem).addClass('white-text');
    }

    var home= $('<a id="homeBtn" class="waves-effect waves-light  btn">HOME</a>');
     $(".Questions").append(home);

     $("#homeBtn").click(function(){
          window.location.href = '/game';
     });
  }
}
