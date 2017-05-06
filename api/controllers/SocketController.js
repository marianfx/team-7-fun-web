var Arena = require('./../services/Arena');
var playerCtrl = require('./PlayerController');
var Messages = sails.config.messages;


// notify all players that a new USer have joined in the arena
let ArenaUsers = function (res, newUser) {

  // make an array with player' s id
  var avaibleP = [];
  var currID = newUser.id;
  for (var [key, value] of Game.Users) {

    var aux = {
      playerID: parseInt(key)
    };
    avaibleP.push(aux);
  }


  // find players with id in the array "AvaibleP" in database

  sails.models.player.find({
    or: avaibleP
  }, currID).exec(function (err, players) {

    if (err) {
      sails.log(err.message);
      return res.serverError(Messages.server_error_DB_fault);
    }

    // select current player from the list from the database
    var aux23 = players.filter(function (obj) {
      return obj.playerID == currID;
    });
    var currentPlayer = aux23[0];

    // initializate one variable with attributes of the currentplayer
    var currP = {
      id: currentPlayer.playerID,
      name: currentPlayer.playerName,
      photoURL: currentPlayer.photoURL
    };

    //update all player

    var data = [];
    for (var x of players) {

      if (x.playerID !== currentPlayer.playerID) {
        var aux = {
          id: x.playerID,
          name: x.playerName,
          photoURL: x.photoURL
        };

        var currPlayer = Game.Users.get(String(x.playerID));
        if (currPlayer.onGame === false) {
          data.push(aux);
        }

        sails.sockets.broadcast(x.playerID, "inUsersArena", currP);

      }

    }


    return res.json(data);
  }, currID);


};
// notify currUser with all other players' answers
// this function is recursive
let notifyme = function (vect, currUser, i) {

  // stop condition:
  if (i >= vect.length) {
    return 0;
  }

  // get all information about player with id vect[i]
  playerCtrl.getPlayer(vect[i], function (err, playerData) {
    if (err) {
      console.log(err.msg);
    }
    var currPlayer = Game.Users.get(String(vect[i]));

    // if current player had answered and if he isn't player who need to received update
    if (currPlayer.answerdQ !== false && currPlayer.id !== currUser.id) {
      sails.sockets.broadcast(currUser.id, "newAnswer", {
        id: currPlayer.id,
        answer: currPlayer.answerdQ,
        avatar: playerData[0].PHOTOURL,
        name: playerData[0].PLAYERNAME
      });
    }
    // call recursive current function
    notifyme(vect, currUser, i + 1);
  });
};

let timeOutInit = function (roomNumber) {

  //this function is call if and only if an invitation expired



  //************
  //AFISARE!!!
  //************
  console.log(Messages.invitation_exp + roomNumber);


  //initializate the game structured
  var currGame = Game.games.get(roomNumber);
  currGame.invitationExp = true;
  Game.games.set(roomNumber, currGame);



  //transform map into array witch contain IDs of players who accepted the invitation
  var acceptAnswerMap = Game.games.get(roomNumber).players;
  var acceptAnswer = [];

  for (var [key, value] of acceptAnswerMap) {
    acceptAnswer.push(String(key));
  }



  // Obtain an array with player who don't response to the invitation
  var withoutAnswer = Game.games.get(roomNumber).opponents.filter(function (x) {
    return acceptAnswer.indexOf(x) < 0;
  });


  //Send message to users who don't accept invitation and Time Expired
  for (var i = 0; i < withoutAnswer.length; i++) {
    sails.services.arena.resetStatus(withoutAnswer[i]);
    sails.sockets.broadcast(withoutAnswer[i], 'invitationExp', {
      message: 'Invitation Expired'
    });
  }

  //Check if we have minim two player in this game
  if (Game.games.get(roomNumber).players.size > 1) {
    sails.services.arena.startGame(roomNumber);
  } else sails.services.arena.notifyAbortGame(roomNumber);

};
module.exports = {

  socket_connect: function (req, res) {

    // Make sure this is a socket request (not traditional HTTP)

    if (!req.isSocket) {
      sails.log.debug(Messages.bad_req_not_socket_req);
      return res.badRequest();
    }

    // Check if this user is already in Arena
    if (Game.Users.get(String(req.user.id)) != null) {


      sails.log.debug(Messages.bad_req_already_in_arena);
      return res.badRequest(Messages.bad_req_already_in_arena);

    }


    // create a new User for Arena
    var newUser = {
      id: String(req.user.id),
      name: "",
      onGame: false,
      time: 30,
      answers: 0,
      gameID: -1,
      socket: req,
      answerdQ: -1
    };

    // get name for this new player from the dataBase
    playerCtrl.getPlayer(newUser.id, function (err, data) {
      if (err) {
        console.log(err.message);
      }
      newUser.name = data[0].PLAYERNAME;
    });

    //add new connected user to Users
    Game.Users.set(newUser.id, newUser);

    // join user to his roon for broadcast;
    sails.sockets.join(req, newUser.id, function (err) {

      if (err) {
        sails.log.debug(err.message);
        res.serverError(Messages.err_join_room);
      }

      // notify all players that a new USer have joined in the arena
      ArenaUsers(res, newUser);

    });
  },


  socket_challange: function (req, res) {

    // Make sure this is a socket request (not traditional HTTP)

    if (!req.isSocket) {
      sails.log.debug(Messages.bad_req_not_socket_req);
      return res.badRequest(Messages.bad_req_not_socket_req);
    }

    //check if challanger is in another game
    if (Game.Users.get(String(req.user.id)).onGame === true) {
      sails.log.debug(Messages.bad_req_challange_on_game);
      return res.badRequest(Messages.bad_req_challange_on_game);

    }

    //check if Challanger has opponents
    var opponents = req.body.opponents;
    if (opponents.length < 1) {
      sails.log.debug(Messages.bad_req_challange_on_game);
      return res.badRequest(Messages.bad_req_no_opponents);
    }
    // a player can challange maxim 4 player
    if (opponents.length > 4) {
      sails.log.debug(Messages.bad_req_max_opponents);
      return res.badRequest(Messages.bad_req_max_opponents);
    }

    // create a new battle
    Game.activeGames++;
    var roomNumber = sails.services.arena.getFreeRoom();
    var roomName = "game_" + roomNumber;


    //initializare timer for invitation
    var currTimer = setTimeout(function () {
        timeOutInit(roomNumber);
      },
      30000, roomNumber);

    //create a new game object
    var currentGame = {
      questions: [],
      invitationExp: false,
      opponents: req.body.opponents,
      nrOfInvitation: opponents.length + 1,
      nrOfQuestions: 5,
      currentQuestion: 0,
      start: false,
      players: new Map(),
      timer: currTimer,
      roundInterval: null,
      answersRecived: 0
    };

    //ceck if oponents are online;
    for (var i = 0; i < opponents.length; i++) {

      /**
       if an opponent is already in agame or is offline he cann't accept invitation so,
       we decremente number of invitation and delete them from the array with invitations

       also we decremente number of invitation if a player had challanged himself
       **/

      if (Game.Users.get(opponents[i]) == null || Game.Users.get(opponents[i]).onGame === true || opponents[i] == req.user.id) {
        currentGame.nrOfInvitation--;
        opponents.splice(i, 1);
        i--;

      }
    }

    // if there is no opponent we stop the game
    if (opponents.length < 1) {

      sails.log.debug(timmer_stop);
      clearTimeout(currentGame.timer);

      return res.json(res_no_opponent);
    }


    //join myself in a gameRoom
    sails.sockets.join(req, roomName, function (err) {
      if (err) {
        return res.serverError(err);
      }

      //add challanger to the current game
      currentGame.players.set(req.user.id, req.user.id);
      // memorate this game
      Game.games.set(roomNumber, currentGame);


      //update challanger status
      var challenger = Game.Users.get(String(req.user.id));
      challenger.onGame = true;
      challenger.gameID = roomNumber;
      Game.Users.set(String(req.user.id), challenger);


      //************
      //AFISARE!!!
      //************
      sails.log.debug("a user " + Game.Users.get(String(req.user.id)).id + " want to play");


      //add invited players to this game  and send invitations
      playerCtrl.getPlayer(req.user.id, function (err, data) {
        for (var i = 0; i < opponents.length; i++) {

          var rival = Game.Users.get(opponents[i]);
          rival.onGame = true;
          rival.gameID = roomNumber;
          Game.Users.set(opponents[i], rival);

          sails.sockets.broadcast(opponents[i], "gameInvite", {
            from: data[0].PLAYERNAME
          });
          var aux2 = opponents.length + 1;

        }

        return res.ok(Messages.res_subscribed + roomName + '!');
      });
    });
  },

  socket_response_challenge: function (req, res) {

    // Make sure this is a socket request (not traditional HTTP)
    if (!req.isSocket) {
      return res.badRequest();
    }

    var gameID = Game.Users.get(String(req.user.id)).gameID;
    var currentGame = Game.games.get(gameID);

    // if invitation expired sebd notify to the player and stop function
    if (currentGame.invitationExp === true) {
      sails.sockets.broadcast(req.user.id, 'invitationExp', {
        message: 'Invitation Expired'
      });
      return;
    }

    // if this player reject challange
    if (req.body.message != "YES") {
      //************
      //AFISARE!!!
      //************
      sails.log.debug("Inivattion was rejected by: " + req.user.id);

      // reset status of this player: he is no longer in a game
      sails.services.arena.resetStatus(req.user.id);

      // remove player from opponents list
      var opponents = currentGame.opponents;
      var index = opponents.indexOf(req.user.id);
      if (index > -1) {

        opponents.splice(index, 1);
        currentGame.opponents = opponents;

        Game.games.set(gameID, currentGame);
        currentGame = Game.games.get(gameID);
      }

      currentGame.nrOfInvitation--;

      // if only challanger remain
      if (currentGame.nrOfInvitation == 1) {

        //************
        //AFISARE!!!
        //************

        sails.log.debug("all opponents rejected invitation!");
        sails.log.debug(Messages.timmer_stop);

        sails.services.arena.notifyAbortGame(gameID);
        clearTimeout(currentGame.timer);
      }

      Game.games.set(gameID, currentGame);

      // if all players had responded to invitation
      if (sails.services.arena.ceckOnReady(gameID)) {
        //************
        //AFISARE!!!
        //************
        sails.log.debug("Start a game");


        sails.services.arena.startGame(gameID);
        sails.log.debug(Messages.timmer_stop);
        clearTimeout(currentGame.timer);
      }

      return res.json({
        message: "YOU have rejected an invitation!"
      });
    }
    // if this player accept the invitation


    currentGame = Game.games.get(gameID);

    //************
    //AFISARE!!!
    //************

    sails.log.debug("a user" + req.user.id + "accepted challange");


    // join this player to the room game
    sails.sockets.join(req, "game_" + gameID, function (err) {
      if (err) {
        return res.serverError(err.message);
      }

      //add this player to romm with number gameID
      currentGame.players.set(req.user.id, req.user.id);
      Game.games.set(gameID, currentGame);

      // if all players had responded to invitation
      if (sails.services.arena.ceckOnReady(gameID)) {
        sails.services.arena.startGame(gameID);

        sails.log.debug("Timer-ul a fost oprit");
        clearTimeout(currentGame.timer);
      }

      return res.json({
        message: 'wellcome to the game_' + gameID
      });


    });

  },


  socket_submit_answer: function (req, res) {

    //verific daca nu o depasit timpul
    // trimit time excited si nu ii dau puncte
    //

    var currUser = Game.Users.get(String(req.user.id));

    // if request is not from a user that is in the arena
    if (currUser == null) {

      return res.json({
        message: "You need to join in the arena!"
      });

    }

    // if current User isn't in a Game
    if ((currUser.onGame !== true) || (currUser.gameID == -1)) {
      return res.json({
        message: "You need to join in a game!"
      });
    }

    if (currUser.time < 0) {
      return res.badRequest({
        message: "You are out of time!"
      });
    }


    //if answer is null we accept another answer
    if (req.body.answer == null) {
      return res.badRequest({
        message: "Please choose an answer!"
      });
    }

    // if a player want to give another answer
    if (currUser.answerdQ > 0) {
      return res.badRequest({
        message: "You cannot answer two time to the same question!"
      });
    }

    var currGame = Game.games.get(currUser.gameID);
    var currQuestion = currGame.questions[currGame.currentQuestion - 1];

    // memorize the answer received
    sails.services.arena.changePropertyUser(req.user.id, "answerdQ", req.body.answer);


    // get information, from database, about player who answered and notify all other player who answered before
    playerCtrl.getPlayer(currUser.id, function (err, data) {

      for (var [key, value] of currGame.players) {

        var currPlayer = Game.Users.get(String(key));

        if (currPlayer.answerdQ !== false && currPlayer.id !== currUser.id) {


          sails.sockets.broadcast(currPlayer.id, "newAnswer", {
            id: currUser.id,
            answer: currUser.answerdQ,
            avatar: data[0].PHOTOURL,
            name: data[0].PLAYERNAME
          });

        }
      }

      // notify current player with all other players' answers
      var vectorPlayer = [];
      for (var [key2, value2] of currGame.players) {
        vectorPlayer.push(key2);
      }

      notifyme(vectorPlayer, currUser, 0);
    });


    // give a response with correct answer
    if (req.body.answer == currQuestion.CORRECTANSWER) {
      sails.services.arena.changePropertyUser(req.user.id, "answers", Game.Users.get(String(req.user.id)).answers + 1);

      return res.json({
        //message: "Ai raspuns corect",
        myAnser: req.body.answer,
        checkAnswer: true,
        correctAns: currQuestion.CORRECTANSWER
      });
    } else {
      console.log("Ai raspuns gresit!");

      return res.json({
        //message: "Ai raspuns gresit",
        myAnser: req.body.answer,
        checkAnswer: false,
        correctAnswer: currQuestion.CORRECTANSWER
      });
    }
  },
  socket_disconnect: function (req, res) {
    // vad daca sunt in joaca anunt pe ceilalti ca eu ies din joc, => cazuri aferente
    // daca nu sunt in joc
    //sails.services.arena.changeRemainingTime(req.user.id, "time", 30);



  },

  blueprints: {
    actions: true
  }
};
