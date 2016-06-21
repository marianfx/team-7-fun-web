var playerCtrl = require('./../controllers/PlayerController');
var Messages = sails.config.messages;


// return gameID
let getFreeRoom = function() {
  return Game.activeGames;
};

// this function will be called for every second
let startClock = function(gameID) {
  var currentPlayers = Game.games.get(gameID).players;
  var endRound = true;
  var auxtimer = null;

  //check if there is at least one player who have time to respond
  // decrement number of second for every player
  for (var [key, value] of currentPlayers) {
    var time = Game.Users.get(String(key)).time;
    auxtimer = time - 1;
    changePropertyUser(key, "time", time - 1);
    if (time > 1) {
      endRound = false;
    }
  }
  //************
  //AFISARE!!!
  //************
  sails.log.debug(auxtimer);


  // if remain one player in game the game si end
  if (currentPlayers.size === 1) {
    clearTimeout(Game.games.get(gameID).roundInterval);
    roundTop(gameID,
      function(gameID, topPlayers) {

        // create an array with name, answers and id of players of this game
        var bigTop = [];
        for (var j in topPlayers) {
          var myPlayer = Game.Users.get(String(topPlayers[j].id));

          var aux = {
            id: myPlayer.id,
            nrAnswer: myPlayer.answers,
            name: myPlayer.name
          };
          bigTop.push(aux);
        }

        var swig = require('swig');
        var result = swig.renderFile('./views/multiplayer/top.swig', {
          top: bigTop,
          type: "Final Top"
        });

        // create an array with winners
        var winners = [];
        for (j in bigTop) {

          if (bigTop[j].nrAnswer === bigTop[0].nrAnswer) {
            winners.push(bigTop[j]);
          } else {
            break;
          }
        }
        var gamePlayers = [];
        for (var [key, val] of Game.games.get(gameID).players) {
          gamePlayers.push(key);
        }

        //create an array just with  winnersId and update in database number of winners and looses for all players
        var winnersID = [];
        for (j in winners) {
          winnersID.push(winners[j].id);
        }
        update_end_battle(gamePlayers, winnersID, 0);

        var WinnerSwig = swig.renderFile('./views/multiplayer/top.swig', {
          top: winners,
          type: "Winners"
        });

        sails.sockets.broadcast("game_" + gameID, "endGame", {
          data: result,
          winners: WinnerSwig
        });
      });


    //************
    //AFISARE!!!
    //************
    sails.log.debug("END ROUND AND GAME");
    return;


  }



  // check if the round is end: if time had passed for all players or if all give an answer
  endRound = endRound || sails.services.arena.checkEndRound(gameID);

  // if round is end, reset timer and send all answers
  if (endRound) {
    roundTop(gameID,
      function(gameID, topPlayers) {

        var currentGame = Game.games.get(gameID);
        var gamePlayers = currentGame.players;
        var answers = [];
        // create an array with id an answers
        for (var [key2, value2] of gamePlayers) {
          var data = {};

          data.id = value2;
          data.currAnswer = Game.Users.get(String(value2)).answerdQ;

          answers.push(data);
        }



        // create an array with id, number of answers currentAnswer and name
        var bigTop = [];
        for (var j in topPlayers) {
          for (var i in answers)

            if (answers[i].id == topPlayers[j].id) {
            var myPlayer = Game.Users.get(String(topPlayers[j].id));

            var aux = {
              id: answers[i].id,
              nrAnswer: topPlayers[j].nrAnswer,
              currAnswer: answers[i].currAnswer,
              name: myPlayer.name
            };
            bigTop.push(aux);
          }
        }

        var swig = require('swig');
        var result = swig.renderFile('./views/multiplayer/top.swig', {
          top: bigTop,
          type: "Current Top"
        });

        sails.sockets.broadcast("game_" + gameID, "endRound", {
          data: result
        });
      });

    //
    clearTimeout(Game.games.get(gameID).roundInterval);
    sails.log.debug("End Round");


    setTimeout(function() {
      sails.services.arena.startRound(gameID);
    }, 2000, gameID);

  }


};

// recursive function: update  losses and winners to the database
let update_end_battle = function(gamePlayers, winners, i) {

  // stop condition
  if (i >= gamePlayers.length)
    return;

  // prepare statement
  var DB = new sails.services.databaseservice();
  var plsql = sails.config.queries.update_end_battle;
  var oracledb = DB.oracledb;


  // prepare bind variable
  // flag -1 = player with "id" lossed
  // flag 1 = palyer with "id" winn
  var bindvars = {
    id: gamePlayers[i],
    flag: -1
  };
  // check if current Player is winner
  if (winners.indexOf(String(gamePlayers[i])) > -1) {
    bindvars.flag = 1;
    //************
    //AFISARE!!!
    //************
    sails.log.debug("Player with ID:" + gamePlayers[i] + " win a game");
  }

  // call procedure from dataBase
  DB.procedureSimple(plsql, bindvars, function(err, rows) {

    if (err)
      sails.log.debug(err.message);
    return;
  });

  // update EXPERIENCE
  plsql = sails.config.queries.update_experience_battle;
  playerCtrl.getPlayer(gamePlayers[i], function(err, playerData) {
var user = Game.Users.get(String(gamePlayers[i]));


var experience = (25 * user.answers)+ playerData[0].EXPERIENCE;
var upLevel = playerData[0].PLAYERLEVEL;
if(experience> 50*Math.pow(2,playerData[0].PLAYERLEVEL))
{
  upLevel=upLevel+1;
}

  var bindvars2={
    id: gamePlayers[i],
    myexperience: experience,
    mylevel: upLevel
  };

  resetStatus(gamePlayers[i]);


  DB.procedureSimple(plsql, bindvars2, function(err, rows) {

    if (err)
      sails.log.debug(err.message);
    return;
  });


  //call this function for next player
  update_end_battle(gamePlayers, winners, i + 1);

});

};

//reset Status of a player: he is no longer in a game
let resetStatus = function(userID) {
  var user = Game.Users.get(String(userID));

  if (user == null)
    return;
  user.onGame = false;
  user.gameID = -1;
  user.answers = 0;
  Game.Users.set(String(userID), user);
};


//check if a game can start. If all players had responded to the invitation
let ceckOnReady = function(gameID) {

  return (Game.games.get(gameID).players.size == Game.games.get(gameID).nrOfInvitation) &&
    (Game.games.get(gameID).nrOfInvitation > 1);
};



let startGame = function(gameID) {

  //notify all player subscribed to the gameID that game is  going to start
  notifyStartGame(gameID);

  var currentGame = Game.games.get(gameID);
  var currPMap = Game.games.get(gameID).players;


  //creat an array with players from this game
  var currP = [];
  for (var [key, value] of currPMap) {
    currP.push(String(key));
  }

  var payersStr = currP.toString();

  //  prepare for get minim RoundID
  var DB = new sails.services.databaseservice();
  var plsql = sails.config.queries.getminRound;
  var oracledb = DB.oracledb;

  var bindvars = {
    str: payersStr,
    cursor: {
      type: oracledb.CURSOR,
      dir: oracledb.BIND_OUT
    }
  };

  DB.procedureFetch(plsql, bindvars, function(err, rows) {

    if (err) {
      sails.log.debug(Messages.round_not_found);
      return res.serverError(Messages.server_error_DB_fault);
    }


    var dB = new sails.services.databaseservice();
    dB.loadQuestions(rows[0].LASTROUNDID, gameID, function(err, gameID, questions) {

      //if don't found question in database the game will be abort
      if (questions == null) {
        notifyAbortGame(gameID);
        sails.log.debug(Messages.questions_not_found);
      }

      // add questions to the game
      var currentGame = Game.games.get(gameID);
      currentGame.questions = questions;
      Game.games.set(gameID, currentGame);

      startRound(gameID);

    });
  });





};

/**
 * this function will return top player of game with id's gameID
 * @param  {obj} body will contain values that need to the next function
 * @param  {function} next(gameID, topPlayers)
 *
 *
 */

let roundTop = function(gameID, next) {
  var currentGame = Game.games.get(gameID);

  var currPlayersMap = currentGame.players;

  //create array with players' id who are in this game
  var currPlayers = [];
  sails.log.debug(currPlayersMap);
  for (var [key2, value2] of currPlayersMap) {
    currPlayers.push(Game.Users.get(String(key2)));
  }


  //sort players and call next function
  currPlayers.sort(function(a, b) {
    return parseInt(b.answers) - parseInt(a.answers);
  });
  var topPlayers = [];
  sails.log.debug("Players sorted!!");
  for (var j of currPlayers) {
    var aux = {};
    aux.id = j.id;
    aux.nrAnswer = j.answers;
    topPlayers.push(aux);

  }
  return next(gameID, topPlayers);

};
let addTime = function(userID, res) {
  var user = Game.Users.get(String(userID));
  if (user == null) {
    return;
  }
  if (user.gameID !== -1) {
    playerCtrl.getPlayer(userID, function(err, playerData) {


      if (playerData[0].S_TIME > 0) {

        var update_time = user.time + (5 * Math.ceil(playerData[0].PLAYERLEVEL / 3));
        changePropertyUser(userID, "time", update_time);

        var DB = new sails.services.databaseservice();
        var plsql = sails.config.queries.decremente_S_TIME;
        var oracledb = DB.oracledb;

        var bindvars = {
          id: userID,
          timepoints: playerData[0].S_TIME - 1
        };
        DB.procedureSimple(plsql, bindvars, function(err, rows) {

          if (err)
            sails.log.debug(err.message);
          return res.json({
            time: update_time,
            flag: true
          });
        });

      } else {
        return res.json({
          time: user.time,
          flag: false
        });
      }

    });
  }
};

/**
 * this function start a round
 * @param  {int} gameID
 *
 */
let startRound = function(gameID) {


  var currentGame = Game.games.get(gameID);


  // if lastRound was already played, the game will be stopped
  if (currentGame.currentQuestion >= currentGame.nrOfQuestions) {

    // make Final top
    roundTop(gameID,
      function(gameID, topPlayers) {

        // create an array with name, answers and id of players of this game
        var bigTop = [];
        for (var j in topPlayers) {
          var myPlayer = Game.Users.get(String(topPlayers[j].id));

          var aux = {
            id: myPlayer.id,
            nrAnswer: myPlayer.answers,
            name: myPlayer.name
          };
          bigTop.push(aux);
        }

        var swig = require('swig');
        var result = swig.renderFile('./views/multiplayer/top.swig', {
          top: bigTop,
          type: "Final Top"
        });


        // create an array with winners
        var winners = [];
        for (j in bigTop) {

          if (bigTop[j].nrAnswer === bigTop[0].nrAnswer) {
            winners.push(bigTop[j]);
          } else {
            break;
          }
        }
        var gamePlayers =[];
        for( var [key,val] of Game.games.get(gameID).players)
        {
          gamePlayers.push(key);
        }
        var playerVec = [];
        for (var [key, value] of Game.games.get(gameID).players) {

          playerVec.push(key);
        }
        console.log("apelez functia recursiva pentru prima data");
        console.log(playerVec);
       gameOut(playerVec, 0);

        //create an array just with   winnersId and update in database number of winners for player
        var winnersID = [];
        for (j in winners) {
          winnersID.push(winners[j].id);
        }
        update_end_battle(gamePlayers, winnersID, 0);

        var WinnerSwig = swig.renderFile('./views/multiplayer/top.swig', {
          top: winners,
          type: "Winners"
        });

        sails.sockets.broadcast("game_" + gameID, "endGame", {
          data: result,
          winners: WinnerSwig
        });

      });
    return;
  }

  /*
    this is a normal round
   */


  // reset time-limit for every player at start of the round
  for (var [key, value] of currentGame.players) {
    changePropertyUser(key, "time", 30);
    changePropertyUser(key, "answerdQ", false);

  }

  // define a function who call startClock for every second
  var roundInterval = setInterval(function() {
    startClock(gameID);
  }, 1000, gameID);
  currentGame.roundInterval = roundInterval;

  var round = currentGame.currentQuestion;

  //increment number of current question
  currentGame.currentQuestion++;
  Game.games.set(gameID, currentGame);


  // creat a json object with current question
  var questions = [];
  questions.push({
    QUESTIONID: currentGame.questions[round].QUESTIONID,
    QUESTION: currentGame.questions[round].QUESTION,
    ANSWERA: currentGame.questions[round].ANSWERA,
    ANSWERB: currentGame.questions[round].ANSWERB,
    ANSWERC: currentGame.questions[round].ANSWERC,
    ANSWERD: currentGame.questions[round].ANSWERD,
  });


  //render current question and send to the players
  var swig = require('swig');
  var result = swig.renderFile('./views/multiplayer/rounds.swig', {
    questions
  });
  sails.sockets.broadcast("game_" + gameID, "getQuestion", {
    data: result
  });



};

/**
 *
 * [update the attribute send by parameter "prop" with new value for userID]
 * @param  {int} userID   [unique identifier for players]
 * @param  {string} prop     [the property we want to change ]
 * @param  {object} newValue [new value of the property]
 */

let changePropertyUser = function(userID, prop, newValue) {
  var user = Game.Users.get(String(userID));
  user[prop] = newValue;
  Game.Users.set(String(userID), user);
  //  sails.log.debug(Game.Users.get(String(userID)));
};

/**
 * [this function will be called whenever a player leave arena]
 * @param  {int} userID [unique identifier for players]
 */
let leaveRoom = function(userID) {
  var user = Game.Users.get(String(userID));
  if (null == user) {
    //************
    //AFISARE!!!
    //************
    sails.log.debug("a user without socket connection leave the arena");
    return null;
  }

  // if user who left arena was in a game: allert his opponents
  if (user.gameID != -1) {


    var game = Game.games.get(user.gameID);
    game.players.delete(userID);

    // the user who leaved room is unsubscibed of game_room
    var roomName = "game_" + user.gameID;
    sails.sockets.leave(user.socket, roomName);


    // broadcast to the all member of the room and notify that a player left room
    playerCtrl.getPlayer(userID, function(err, playerData) {
      sails.sockets.broadcast(roomName, "abordGame", {
        name: playerData[0].PLAYERNAME
      });
    });

    // increment number of looses: he abort a game= he looses
    //

    var DB = new sails.services.databaseservice();
    var plsql = sails.config.queries.update_end_battle;
    var oracledb = DB.oracledb;
    var bindvars = {
      id: userID,
      flag: -1
    };

    DB.procedureSimple(plsql, bindvars, function(err, rows) {

      if (err)
        sails.log.debug(err.message);
      return;
    });


  }
  // the user who leaved room is delete from Game.Users
  Game.Users.delete(String(userID));

  // notify all players that this player got out from a game
  for (var [key, value] of Game.Users) {
    sails.sockets.broadcast(value.id, "outUsersArena", {
      id: userID
    });

  }
};

//notify that the game will be stopped
let notifyAbortGame = function(gameID) {
  var gamePlayers = Game.games.get(gameID).players;

  for (var [key, value] of gamePlayers) {
    resetStatus(value);
    sails.sockets.removeRoomMembersFromRooms(key, "game_" + gameID);
  }
  //************
  //AFISARE!!!
  //************
  sails.sockets.broadcast("game with id: " + gameID, "is aborted", {});
};


//notity all pleyers subscribed to a game that it is ready to Start
let notifyStartGame = function(gameID) {
  sails.log.debug("game with id: " + gameID + "starts");
  var currPlayers = Game.games.get(gameID).players;

  var onGame = [];
  for (var [key, value] of currPlayers) {
    onGame.push(key);

  }
  //remove from avaible players those who had subcribed in this game
  for (var [key2, value2] of Game.Users) {
    if (!(currPlayers.has(key2))) {
      sails.sockets.broadcast(key2, 'inGameArena', {
        vec: onGame
      });
    }
  }

  // create Start top
  var bigTop = [];
  for (var j in onGame) {
    var myPlayer = Game.Users.get(String(onGame[j]));
    var aux = {
      id: myPlayer.id,
      nrAnswer: 0,
      name: myPlayer.name
    };
    bigTop.push(aux);
  }

  var swig = require('swig');
  var result = swig.renderFile('./views/multiplayer/top.swig', {
    top: bigTop,
    type: "Start Top"
  });

  sails.sockets.broadcast("game_" + gameID, "startGame", {
    data: result
  });

};

let gameOut = function(playerVec, i) {
  if (i >= playerVec.length)
  {
    console.log("am terminat de parcurs functia recursiva!");
    return;
  }

  playerCtrl.getPlayer(playerVec[i], function(err, playerData) {

    if(err)
    {
      console.log(err.message);
      return;
    }
    var currP = {
      id: playerVec[i],
      name: playerData[0].PLAYERNAME,
      photoURL: playerData[0].PHOTOURL
    };

    for (var [x, y] of Game.Users) {

      if (y.id != playerVec[i]) {
        sails.sockets.broadcast(y.id, "inUsersArena", currP);
      } else {
        console.log("e acelasi nume");
        console.log(currP.name);
      }
    }
    console.log("apelez functia recursiva");
    gameOut(playerVec,i+1);
  });

};

let checkEndRound = function(gameID) {
  var isEndRound = true;
  for (var [key, value] of Game.games.get(gameID).players) {
    isEndRound = (isEndRound && Game.Users.get(String(key)).answerdQ);
  }
  return isEndRound;
};
export {
  getFreeRoom,
  resetStatus,
  ceckOnReady,
  startGame,
  leaveRoom,
  notifyAbortGame,
  notifyStartGame,
  changePropertyUser,
  checkEndRound,
  startRound,
  addTime
};
