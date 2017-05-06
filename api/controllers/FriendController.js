
module.exports = {

    /**
     * [Creates a friend pair, meaning adding the pair pair1 - pair2, pair2 - pair1 into the DB]
     * @method function
     */
    create: function(req, res, next){

        // check valid data
        if (!(req.body && req.body.playerId))
          return res.badRequest({message: 'Friend should be specified when submitting a request.'});

        var fp = req.user.id;
        var sp = req.body.playerId;

        // check not adding myself to the friends list
        if(fp == sp)
          return res.badRequest({message: 'You cannot add yourself to your friends, right?'});

        sails.controllers.friend.createHandler(fp, sp, function(error){
            if(error){
                sails.log.debug(error.message);
                return res.serverError({message: error.message});
            }

            return res.ok({message: "Success."});
        });
    },


    /**
     * Actually creates the user
     * @method function
     * @param  {[type]}   fp   [description]
     * @param  {[type]}   sp   [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    createHandler: function(fp, sp, next){

      var firstPair = { player1Id: fp, player2Id: sp };
      var secondPair = { player1Id: sp, player2Id: fp };

      var query = [];
      query.push(firstPair);
      query.push(secondPair);

      sails.log.debug(query);
      // sails.log.debug(query.length);

      // create first friendship
      sails.models.friend.create(query)
          .then( function (_created) {
              //OK
              return next(null);
            })
          .catch( function(_err) {
            if(_err.toString().search('TypeError') != -1)// stupid oracle error
                return next(null);

            sails.log.debug(_err);
            return next(new Error('Cannot fullfill the request (PS: maybe you tried something wrong.)'));
          });
    },

    /**
     * [The functions finds and returns all the friends of an user to the user. Works with pagination.]
     */
    find: function(req, res){

        var _me = req.user.id;
        var _last;
        var _limit;

        // try getting the _last id
        try {
            _last = parseInt(req.params.last);
        } catch (e) {
            _last = 0;
        }

        // try getting the limit
        try {
            _limit = parseInt(req.params.limit);
        } catch (e) {
            _limit = 10;
        }


        var query = sails.config.queries.friends_paginated;

        var db = new sails.services.databaseservice();

        var bindParams = [_me, _last, _limit];

        db.executeQuery(query, bindParams, function(err, result){
              if(err){
                  sails.log.debug(err);
                  return res.serverError("Could not fetch friends. We're sorry for the inconvenience.");
              }

              return res.ok(result);
        });
    }
};
