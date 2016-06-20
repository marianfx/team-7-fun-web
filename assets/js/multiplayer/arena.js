var answer;
var clock;
var answerSend=false;

function startArena() {

  connectToSocket();

  $("#challangeBtn").click(challengeOpponent);

  $("#submitAnswer").click(submitAnswer);

  $("#acceptBtn").click(acceptChallenge);

  $("#declineBtn").click(declineChallenge);
}

// a user enter in arena
io.socket.on('inUsersArena', function(msg) {
  appendArenaUser(msg);
});

// a user left arena
io.socket.on('outUsersArena', function(msg) {
  console.log('User leaved Arena:');
  console.log(msg.id);
  $('#' + msg.id).parents('li').remove();
});

// a user enter in a Game
io.socket.on('inGameArena', function(msg) {
  for (var i in msg.vec) {
    $('#' + msg.vec[i]).parent().remove();
  }

});

io.socket.on('gameInvite', function(msg) {
  console.log(msg);
  swal({
    title: "A new Challange received",
    text: "Player " + msg.from + "whants to play with you",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Accept",
    cancelButtonText: "Decline",
    closeOnConfirm: false,
    closeOnCancel: true
  }, function(isConfirm) {
    if (isConfirm) {
      acceptChallenge();
      swal({
            title: "Wait...",
            text: "The game will start",
            imageUrl: "./images/waiting.gif",
            imageSize: '180x180',
            showConfirmButton: false,
            showCancelButton: false,
            showLoaderOnConfirm: true,
          });
    } else {
      declineChallenge();
    }
  });
});
// when a player left a game
io.socket.on('abordGame', function(msg) {
  var mesaj = msg.name + ' just left the game';
  Materialize.toast(mesaj, 4000);
});

io.socket.on('newAnswer', function(msg) {

  var element = $("#Questions").find("."+msg.answer);

  var insertPic='<img height="21" width="21"  style="position: relative; margin-left: 0px; margin-right: 30px;"\
  src="' + msg.avatar + '" alt="' + msg.name + '"class="circle right">';
  $(insertPic).appendTo(element);

});


io.socket.on('endRound', function(msg) {

  swal.close();

  $('#Top').html(msg.data);

});



io.socket.on('invitationExp', function(msg) {
  console.log("Invitatia a expirat!");
  swal.close();

});


io.socket.on('addTime', function(msg) {
  console.log('add time');
  console.log(msg.id);
  $('#' + msg.id).parents('li').remove();
});



io.socket.on('startGame', function(msg) {

  swal.close();
  $('#clock').html("<div class=clock style=width: 300px; margin: auto;></div>");
  $('#Top').html(msg.data);
  $('#onlinePlayers').css("display", "none");
  endFlag = false;
  playing = true;

});

io.socket.on('declineChallenge', function(msg) {
  console.log(msg);
    swal("Sorry!", "Your invitation was rejected!", "SUCCESS");
});

io.socket.on('getQuestion', function(msg) {
  console.log('am primit intrebarea!');
  clock = $('.clock').FlipClock(30, {
    clockFace: 'MinuteCounter',
    countdown: true,
    autoStart: true,
    defaultLanguage: 'ro',
    callbacks: {
      stop: function() {
        if(answerSend===false && clock.getTime().time === 0 )
            Materialize.toast("You are out of time", 4000);
      }
    }
  });


  $('#Questions').html(msg.data);

  $('.collapsible').collapsible({
    accordion: false
  });

  // assign events
  $(".qq").click(function() {
    doSelect(this);
  });

});


io.socket.on('endGame', function(msg) {

    clock.stop();
    $('#clock').empty();
    swal.close();
    console.log("END GAME");
    $('#Questions').empty();
    $('#Top').html(msg.data);
    $('#Top').addClass("col s12 m6 l6");
    $('#Winners').html(msg.winners);
    $('#Winners').addClass("col s12 m6 l6");
    endFlag = true;
    playing = false;

});


function challengeOpponent(){

  if(playing)
  {
      Materialize.toast("You are already in a game!", 4000);
      return;
  }
    var oponentID = $('#userTB').val();
    var vec = [];

    // check all checkbox and count them
    $('input:checkbox.player').each(function() {
      if (this.checked) {
        vec.push($(this).attr('id'));
      }
    });

    if(vec.length>4)
    {
      Materialize.toast("You cannot challange more than 4 players ", 4000);
      return;
    }

    // send a post to the server with a list of players
    //
    io.socket.post('/socket_challange', {
        opponents: vec
      },
      function gotResponse(body, response) {
        console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
      });
}


function connectToSocket(){

    io.socket.post('/socket_connect', {
      message: " on arena"
    }, function gotResponse(body, response) {

      // if something bad happend to server show the error to the user
      if (response.statusCode != 200) {
        console.log(response.body);
        return;
      }
      //append user who is avaible in Arena
      for (var i = 0; i < body.length; i++) {
        appendArenaUser(body[i]);
      }
    });
}


function submitAnswer(){
    var selectedAnswer = answer;
    answer=null;
    if(selectedAnswer == null)
    {
      Materialize.toast("Select an answer", 4000);
      return;
    }
    io.socket.post('/socket_submit_answer', {
        answer: selectedAnswer
      },
      function gotResponse(body, response) {
        console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
        console.log('raspunsul tau este: ' + body.checkAnswer);
        swal.disableButtons();

        if(response.statusCode!=200){
          Materialize.toast(body.message, 4000);
        return;
      }
      clock.stop();
      answerSend=true;

      //  $('#Questions').empty();
      var myAnswer = $("#Questions").find("."+selectedAnswer);

        if (body.checkAnswer === true) {
          $(myAnswer).addClass("green");

        } else {
          $(myAnswer).addClass("red");
          var correctAnswer=$("#Questions").find("."+body.correctAnswer);
          $(correctAnswer).addClass("green");
        }

      });
}


function resetArena() {

   $('#Questions').empty();
   $('#Top').empty();

}



function appendArenaUser(msg) {
  console.log('New user has entered in Arena:');
  console.log(msg);
  var srcdiv = $('#onlinePlayers');

  var txt = '<li style="margin-left: 0px; padding-left: 0px;" \
  class="collection-item avatar dismissable valign-wrapper"> \
       	<img  style="position: relative; margin-left: 0px; margin-right: 30px;" \
        src="' + msg.photoURL + '" alt="player' + msg.name + '" class="circle valign left">\
      	<input class="player valign" style="float: left;" type="checkbox" id="' + msg.id + '">\
            <label for="' + msg.id + '" style="text-decoration: none;"> ';
  txt += msg.name;
  txt += '</label></li>';

  $(txt).appendTo(srcdiv);

}

function firstConnect() {

  var userID = $('#textArea').val();
  var room = userID;


  io.socket.post('/socket_connect', {
    user: "" + userID + "",
    roomID: "" + room + ""
  }, function gotResponse(body, response) {
    console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
  });
}

function chalangeSomebody() {
  var oponentID = $('#oponent').val();

  io.socket.post('/socket_challange', {
      oponent: oponentID
    },
    function gotResponse(body, response) {
      console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
    });
}


function leaveArena() {
  io.socket.post('/socket_disconnect', {}, function gotResponse(body, response) {
    console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
    console.log("Ai iesit din arena!");
  });
}



function acceptChallenge() {
  io.socket.post('/socket_response_challenge', {
    message: "YES"
  }, function gotResponse(body, response) {
    console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
  });
}

function declineChallenge() {
  io.socket.post('/socket_response_challenge', {
    message: "NO"
  }, function gotResponse(body, response) {
    console.log('Server responded with status code ' + response.statusCode + ' and data: ', body);
  });
}


function doSelect(me) {
  var parent = $(me).parent().attr("id");
  $(me).parent().children(".qq").removeClass("active");
  console.log("me " + me);
  console.log("parent " + parent);


  var classList = $(me).attr('class').split(" ");
  var index = classList.length - 1;
  var value = classList[index];
  console.log("numarul raspunsuluu:" + value);

  $(me).addClass("active");
  answer=value;


}
