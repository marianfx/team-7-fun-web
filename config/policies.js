/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  //everything needs passport && session
  '*': ['passport', 'sessionAuth'],

  //the auth controller needs only passport
  AuthController: {
    '*': ['passport']
  },
  GameController: {
    '*': ['passport']
  },
  // the Admin controller ned to be Admin
  //
  AdminController: {
    renderCourse: ['passport', 'sessionAuth', 'isAdmin'],
    renderRound: ['passport', 'sessionAuth', 'isAdmin'],
    createCourse: ['passport', 'sessionAuth', 'isAdmin'],
    createRound: ['passport', 'sessionAuth', 'isAdmin'],
    createQuestion: ['passport', 'sessionAuth', 'isAdmin']
  },
  // this next polocy allows only authenticated users to find
  UserController: {
    'update': ['passport', 'itsMe'],
    'destroy': ['passport', 'itsMe'],
    'create': true
  },
  FriendController: {
    '*': false,
    'create': ['passport', 'sessionAuth'],
    'find': ['passport', 'sessionAuth']
  },
  QuestionController: {
    '*': false,
    'create': ['passport', 'sessionAuth'],
    'render': ['passport', 'sessionAuth'],
    'submmitRoundAnswers': ['passport', 'sessionAuth']

  }
};
