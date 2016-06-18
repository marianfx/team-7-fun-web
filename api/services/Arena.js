var Messages = sails.config.messages;


// return gameID
let getFreeRoom = function() {
  return Game.activeGames;
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

  //call this function for next player
  update_end_battle(gamePlayers, winners, i + 1);


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
  var currP = [];


  for (var [key, value] of currPMap) {
    currP.push(String(key));
  }

  var payersStr = currP.toString();

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
/**functia va returna topul jucatorilor din jocuri cu id-ul gameID
  body va fi un obiect ce contine alte valtori ce trebuie sa faca broadcast
 */
//
//
// next
//
/**
 * this function will return top player of game with id's gameID
 * @param  {obj} body will contain values that need to the next function
 * @param  {function} next
 *
 */

let roundTop = function(gameID, body, next) {
  var currentGame = Game.games.get(gameID);

  var currPlayersMap = currentGame.players;

  //conversie de la map la array
  var currPlayers = [];
  sails.log.debug(currPlayersMap);
  for (var [key2, value2] of currPlayersMap) {
    currPlayers.push(Game.Users.get(String(key2)));
  }

  //** simpla afisare la consola
  for (var i of currPlayers) {
    sails.log.debug(i.id);
    sails.log.debug(i.answers);
  }

  //sortare si returnare a topului
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
  return next(gameID, body, topPlayers);

};

/**
 * functia incepe runda din perspectiva serverului
 * @param  {int} gameID [numarul camerei de jog game_(gameID)]
 *
 */
let startRound = function(gameID) {


  var currentGame = Game.games.get(gameID);

  /*
      Verific daca nu cumva ai terminat rundele;
   */
  if (currentGame.currentQuestion >= currentGame.nrOfQuestions) {

    roundTop(gameID, null,
      function(gameID, body, topPlayers) {

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
        sails.log.debug("BIG TOP:");
        sails.log.debug(bigTop);

        var swig = require('swig');
        var result = swig.renderFile('./views/multiplayer/top.swig', {
          top: bigTop,
          type: "Final Top"
        });

        var winners = [];
        for (j in bigTop) {
          sails.log.debug("&&&&&&&");
          sails.log.debug(j);

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

        var winnersID = [];

        for (j in winners) {
          winnersID.push(winners[j].id);
        }
        // update in database number of winners for player
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
  sunt intr-o runda normala
   */


  // resetam timer-ul pentru fiecare jucator din currentGame la inceputul rundei;

  for (var [key, value] of currentGame.players) {
    changeRemainingTime(key, "time", 30);
    changePropertyUser(key, "answerdQ", false);

  }

  // declaram actiunea care scade din secunde in secuda timer-ul pentru fiecare jucator din  currentGame
  var roundInterval = setInterval(function() {
    var currentPlayers = Game.games.get(gameID).players;
    var endRound = true;
    var auxtimer = null;

    //verific daca mai exista macar un jucator care mai are timp disponibil
    for (var [key, value] of currentPlayers) {
      var time = Game.Users.get(String(key)).time;
      auxtimer = time - 1;
      changeRemainingTime(key, "time", time - 1);
      if (time > 1) {
        endRound = false;
      }
    }
    sails.log.debug(auxtimer);

    endRound = endRound || sails.services.arena.checkEndRound(gameID);


    var currPlayer = Game.games.get(gameID).players;

    if (currPlayer.size === 1) {
      clearTimeout(Game.games.get(gameID).roundInterval);
      sails.log.debug("S-a incheiat runda ");

    }
    // la finalul unei runde trimit fiecarui jucator o lista cu raspunsurile celorlalti!
    var gamePlayers = Game.games.get(gameID).players;
    var answers = [];
    for (var [key2, value2] of gamePlayers) {
      var data = {};
      data.id = value2;
      data.currAnswer = Game.Users.get(String(value2)).answerdQ;
      answers.push(data);
    }




    if (endRound) {
      roundTop(gameID, answers,
        function(gameID, answers, topPlayers) {

          var currentGame = Game.games.get(gameID);


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

          sails.log.debug("BIG TOP:");
          sails.log.debug(bigTop);

          var swig = require('swig');
          var result = swig.renderFile('./views/multiplayer/top.swig', {
            top: bigTop,
            type: "Current Top"
          });
          //sails.log.debug(result);
          sails.sockets.broadcast("game_" + gameID, "endRound", {
            data: result
          });
        });

      sails.log.debug("######## s-a terminat runda");
      clearTimeout(Game.games.get(gameID).roundInterval);
      sails.log.debug("S-a iincheiat runda ");


      setTimeout(function() {
        sails.services.arena.startRound(gameID);
      }, 2000, gameID);

    }


  }, 1000, gameID);

  currentGame.roundInterval = roundInterval;


  var round = currentGame.currentQuestion;



  //trec la runda urmatoare
  currentGame.currentQuestion++;
  Game.games.set(gameID, currentGame);


  // formam intrebare + raspunsurile pentru runda current din joc si o trimitem la clienti
  var questions = [];
  questions.push({
    QUESTIONID: currentGame.questions[round].QUESTIONID,
    QUESTION: currentGame.questions[round].QUESTION,
    ANSWERA: currentGame.questions[round].ANSWERA,
    ANSWERB: currentGame.questions[round].ANSWERB,
    ANSWERC: currentGame.questions[round].ANSWERC,
    ANSWERD: currentGame.questions[round].ANSWERD,
  });

  // construim un randar pentru intrebarea care urmeaza sa o trimitem la jucatorii currentGame-ului;
  var swig = require('swig');
  var result = swig.renderFile('./views/multiplayer/rounds.swig', {
    questions
  });
  //sails.log.debug(result);
  // trimitem la toti subscriberii intrebarea currenta;
  sails.sockets.broadcast("game_" + gameID, "getQuestion", {
    data: result
  });



};

/**
 * [actualizeaza atributul trimit pirn parametru cu noua valoare pentru userul cu userID din Game.Users]
 * @param  {int} userID   [identificam userul corespunzator ID-ului]
 * @param  {string} prop     [proprietatea care se doreste a fi actualizata ]
 * @param  {depinde de prop} newValue [noua voaloare a propietati
 */
let changeRemainingTime = function(userID, prop, newValue) {
  var user = Game.Users.get(String(userID));
  user[prop] = newValue;
  Game.Users.set(String(userID), user);
  //  sails.log.debug(Game.Users.get(String(userID)));
};

let changePropertyUser = function(userID, prop, newValue) {
  var user = Game.Users.get(String(userID));
  user[prop] = newValue;
  Game.Users.set(String(userID), user);
  //  sails.log.debug(Game.Users.get(String(userID)));
};

/**
 * [aceasta unctie e apelata cand user-ul iese din arena sau daca e deconectat socket-ul reseteaza statutul jucatorului etc.]
 * @param  {[int]} userID [id-ul user-ului caruia i se actualizeaza statusul;
 */
let leaveRoom = function(userID) {
  var user = Game.Users.get(String(userID));
  if (null == user) {
    sails.log.debug("Inexistent useer leave room");
    return null;
  }

  if (user.gameID != -1) {

    //the user is in a game now
    //Avertizez ceilalti jucatori ca jucatorul a plecat
    var game = Game.games.get(user.gameID);
    game.players.delete(userID);
    sails.log.debug("player after leaving room are");
    sails.log.debug(game.players);

    // the user to leave room need to be unsubscibed of gaame_room

    var roomName = "game_" + user.gameID;
    sails.sockets.leave(user.socket, roomName);
    //****
    //trebuie standardizat
    //
    //
    //
    sails.sockets.broadcast(roomName, "abordGame", {
      id: userID,
      message: "sory no one want to play"
    });

  }
  // aici sterg user-ul cu userID din tabela Game.Users => aidca a iesit din arena;
  Game.Users.delete(String(userID));

  for (var [key, value] of Game.Users) {
    //!!!! trebuie standardizat!!! la broadcast sa fie identic cu aux
    //!!!####################################
    //######################################
    sails.log.debug(value.id);
    sails.sockets.broadcast(value.id, "outUsersArena", {
      id: userID
    });

  }
};

let notifyAbortGame = function(gameID) {
  var gamePlayers = Game.games.get(gameID).players;

  for (var [key, value] of gamePlayers) {
    sails.log.debug(value);
    resetStatus(value);
    ////// nu trebuia leave?
    sails.sockets.removeRoomMembersFromRooms(key, "game_" + gameID);
  }


  sails.log.debug("broadcast to all game_" + gameID + " declineChallenge GAME");
  sails.sockets.broadcast("game_" + gameID, "declineChallenge", {
    flag: "declineChallenge",
    message: "sory no one want to play"
  });
};



let notifyStartGame = function(gameID) {
  sails.log.debug("broadcast to all game_" + gameID + "subscribers START GAME");
  var currPlayers = Game.games.get(gameID).players;

  var onGame = [];
  for (var [key, value] of currPlayers) {
    onGame.push(key);

  }
  // trimit lista cu jucatorii care intra intr-un duel tuturor celorlalti jucatori
  for (var [key2, value2] of Game.Users) {
    if (!(currPlayers.has(key2))) {
      sails.log.debug("trimit lista cu cei care incep jocul la:" + key2);
      sails.sockets.broadcast(key2, 'inGameArena', {
        vec: onGame
      });
    }
  }

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
  sails.log.debug("BIG TOP:");
  sails.log.debug(bigTop);

  var swig = require('swig');
  var result = swig.renderFile('./views/multiplayer/top.swig', {
    top: bigTop,
    type: "Start Top"
  });

  sails.sockets.broadcast("game_" + gameID, "startGame", {
    data: result
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
  changeRemainingTime,
  leaveRoom,
  notifyAbortGame,
  notifyStartGame,
  changePropertyUser,
  checkEndRound,
  startRound
};
