/**
 * index.js
 *
 * @description :: Specifies what this folder exports when called by require('protocols')
 */

module.exports = {
     local: require('./local'),
     oauth2: require('./oauth2')
};
