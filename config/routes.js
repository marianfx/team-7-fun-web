/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
    'GET /': {
        view: 'game/game'
    },

    'GET /game': {
      controller: 'GameController',
      action: 'render'
    },
    'GET /arena': {
      controller: 'GameController',
      action: 'renderArena'
    },

    'GET /signup': {
        view: 'auth/signup'
    },
    'GET /signin': {
        view: 'auth/signin'
    },

    'POST /register': {
        controller: 'UserController',
        action: 'create'
    },
    '/logout': {
        controller: 'AuthController',
        action: 'logout'
    },

    'POST /auth/local': {
        controller: 'AuthController',
        action: 'callback'
    },
    'POST /auth/local/:action': {
        controller: 'AuthController',
        action: 'callback'
    },
    'GET /auth/:provider': {
        controller: 'AuthController',
        action: 'provider'
    },
    'GET /auth/:provider/callback': {
        controller: 'AuthController',
        action: 'callback'
    },
    'GET /auth/:provider/:action': {
        controller: 'AuthController',
        action: 'callback'
    },

    'GET /render/me': {
        controller: 'PlayerController',
        action: 'render'
    },
    'GET /render/courses': {
        controller: 'CourseController',
        action: 'render'
    },

    'GET /players/:id': {
        controller: 'PlayerController',
        action: 'find'
    },
    'POST /player/addTime':{
      controller:'PlayerController',
      action: 'addTime'
    },
    'POST /friends': {
        controller: 'FriendController',
        action: 'create'
    },
    'GET /friends/:last/:limit': {
          controller: 'FriendController',
          action: 'find'
    },

    'GET /questions':{
        controller: 'QuestionController',
        action: 'render'

      },

    'GET /course':{
        controller:'CourseController',
        action: 'renderModalCourse'
    },
      // post for subbmit ansfer in learning module

    'POST /questions/submmit':{
      controller: "QuestionController",
      action: 'submmitRoundAnswers'
    },

    /*CZR - SHOP, ITEMS, PLAYER*/

    'POST /shop' : {
      controller: 'ItemController',
      action: 'loadShop'
    },

    'GET /inventory' : {
      controller: 'PlayerController',
      action: 'loadInventory'
    },

    'GET /player' : {
      controller: 'PlayerController',
      action: 'getPlayer'
    },

    'POST /shop/buy' : {
      controller: 'PlayerController',
      action: 'buyItem'
    },

    'POST /reloadshop' : {
      controller: 'ItemController',
      action: 'reloadShop'
    },

    'POST /player/top' : {
      controller: 'PlayerController',
      action: 'loadTopPlayersBy'
    },

    'GET /skills' : {
      controller: 'PlayerController',
      action: 'loadSkills'
    },

    'POST /skills' : {
      controller: 'PlayerController',
      action: 'addSkill'
    },

    'GET /roll' : {
      controller: 'PlayerController',
      action: 'rollDice'
    },

    'GET /cookies' : {
      controller: 'PlayerController',
      action: 'loadCookies'
    },

    'GET /skillpoints' : {
      controller: 'PlayerController',
      action: 'loadSkillpoints'
    },

    'GET /profile' : {
      controller: 'PlayerController',
      action: 'loadProfile'
    },

    // DRN - SOCKET
    'POST /socket_connect': {
    controller: 'SocketController',
    action: 'socket_connect'
    },
    'POST /socket_challange': {
      controller: 'SocketController',
      action: 'socket_challange'
    },

    'POST /socket_disconnect': {
      controller: 'SocketController',
      action: 'socket_disconnect'
    },

    'POST /socket_response_challenge': {
      controller: 'SocketController',
      action: 'socket_response_challenge'
    },

    'POST /socket_submit_answer': {
      controller: 'SocketController',
      action: 'socket_submit_answer'
    }



};
