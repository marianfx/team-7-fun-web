var util = require('util');
var _ = require('lodash');

/**
 * VError
 *
 * Dress up an error to relay authentication/authorisation related errors
 * without revealing sensitive information.
 *
 * @param  {Object} properties
 * @constructor {VError}
 */
function VError (properties) {

  // Call superclass (Error)
  VError.super_.call(this, properties);

  // Merge the properties into the error instance
  properties || (properties = { });
  _.extend(this, properties);

  var err = this.originalError.toString();

  // E_UNKNOWN usually comes from Oracle. Parse the ORA error (mostly unique)
  if(err.search('E_UNKNOWN') != -1 && err.search("ORA") != -1){

    var ERR_FLAG  = '';
    var ERR_FIELD   = '';
    var ERR_MSG = '';

    var strng = err.toString();
    var start = err.indexOf('ORA');
    start = err.indexOf('(', start) + 1;
    var end = err.indexOf(')', start);
    var final = err.substr(start, end - start).toLowerCase();

    var last_us = final.lastIndexOf('_') + 1;
    ERR_FLAG = final.substring(last_us, final.length);

    if(ERR_FLAG == "unique"){
      var fieldstart = final.indexOf('.') + 1;
      ERR_FIELD = final.substring(fieldstart, last_us - 1);
    }
    ERR_MSG = 'The ' + ERR_FIELD + ' should be ' + ERR_FLAG + '.';

    this.field  = ERR_FIELD.toLowerCase();
    this.reason = ERR_MSG;
  }
  else if(err.search("E_VALIDATION") != -1){// E_VALIDATION error usually comes from the model, as an vector-object with name = field, message = error msg (parse it)

        // Customize the `reason` based on the # of invalid attributes
        // (`reason` may not be overridden)
        var isSingular = this.length === 1;
        this.reason = util.format( '%d attribute%s %s invalid',
                                                	this.length,
                                                	isSingular ? '' : 's',
                                                	isSingular ? 'is' : 'are' );
      // Status may be overridden.
      this.status = properties.status || 400;


      if ( this.originalError ) {
      	if ( this.originalError.invalidAttributes ) {


          // transform into fields
      		this.reason = _.mapValues( this.originalError.invalidAttributes, function( n, k ) {
        			return _.map( n, function( i ) {

        				// Remove all elements but the message
        				_.forEach( _.without( _.keys( i ), 'message' ), function( key ) {
        					     delete i[ key ];
        				});

        				return i;
        			});
              return n;
      		});

          // get only the first field
          try {

            sails.log.debug("Encountered error E_VALIDATION.");

            String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1);
            };

            var firstKey = Object.keys(this.reason)[0];
            this.field = firstKey;

            var outp = firstKey;
            outp = this.reason[firstKey][0].message;
            var err_msg = '';

            // caut caracterul ce descrie eroare + pozitia la care incepe
            var charT = '';
            var commapoz = outp.search('`');
            if(commapoz == -1){
               commapoz = outp.search('"');
               if(commapoz != -1) charT = '"';
            }
            else charT = '`';

            if(commapoz == -1){
              this.reason = outp;
            }
            else{
              //iau cuvantul dintre charT
              var pstart = commapoz + 1;
              var pend = outp.indexOf(charT, pstart);
              var deff = outp.substring(pstart, pend);

              err_msg = firstKey + ' is ' + deff + '.';
              err_msg = err_msg.capitalize();
              this.reason = err_msg;
            }

          } catch (e) {
              this.reason = "Unknown error happened on the server. Mostly because you entered invalid attributes... :(";
              this.field = "none";
          }

      	}
      }
  }
  else{ // assure we treat all errors
    this.reason = "Unknown error happened on the server. Mostly because you entered invalid attributes... :(";
    this.field = "none";
  }

  // Always apply the 'E_VALIDATION' error code, even if it was overridden.
  this.code = 'E_VALIDATION';

  // Status may be overridden.
  this.status = properties.status || 400;

  }

util.inherits(VError, Error);

// Default properties
VError.prototype.status = 400;
VError.prototype.summary = 'Encountered an unexpected error';

/**
 * Override JSON serialization.
 * (i.e. when this error is passed to `res.json()` or `JSON.stringify`)
 *
 * For example:
 * ```json
 * {
 *   status: 400,
 *   code: 'E_UNKNOWN'
 * }
 * ```
 *
 * @return {Object}
 */
VError.prototype.toJSON =
VError.prototype.toPOJO =
  function () {

    var obj = {
      status: this.status,
      message: this.reason,
      field: this.field
    };
    return obj;
  };


module.exports = VError;
