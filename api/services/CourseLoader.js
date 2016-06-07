
module.exports = function(){

  /**
   * Given a course ID, load and return all the rounds for it.
   * @method loadRoundsForCourse
   * @param  {[integer]}            _courseId [The ID of the course]
   * @param  {Function(err, rounds)}          next
   */
  this.loadRoundsForCourse = function(_courseId, next){
    Round.find()
         .where({courseId: _courseId})
         .then( (_rounds) => {
              return next(null, _rounds);
         })
         .catch(next);
  };


  /**
   * Given a course ID, loads it's data from the DB
   * @method function
   * @param  {[integer]}   _courseId [description]
   * @param  {Function(err, course)} next
   */

  this.loadCourseData = function(_courseId, next){
    Course.findOne()
          .where({courseId: parseInt(_courseId)})
          .then( (_course) => {
              return next(null, _course);
          })
          .catch(next);
    };


  /**
   * Searches for the given course (id), returns it't data and then searches for it's rounds, and returns them too.
   * @method function
   * @param  {[type]}   _courseId [description]
   * @param  {Function(err, course, rounds)} next
   */
  this.findCourseAndLoadRounds = function(_courseId, next){

        // loads course data, then it's rounds. If we find errors, we send them to the next.
        this.loadCourseData(_courseId, (err, _course) => {
            if(err)
              return next(err);

            this.loadRoundsForCourse(_courseId, (err, _rounds) => {
                return next(err, _course, _rounds);
            });
        });
  };

  /**
   * Loads all courses plus their rounds from the database
   * @method function
   * @param  {Function(error, rows)} next
   */
  this.loadAllRounds = function(next, optional){

    var DB = new sails.services.databaseservice();
    var query = sails.config.queries.all_courses;
    var binds = {};
    DB.executeQuery(query, binds, (err, results) => {
        if(err)
          return next(err);
        return next(null, results);
    });

  };


    /**
     * Returns the rendered String containing the information about all courses
     * @method function
     */
    this.renderAll = function(me, next, upperBound){

          var object = {};

          var swig             = require('swig');
          var PlayerDataLoader = new sails.services.playerdataloader();

          PlayerDataLoader.getLastRound(me, (err, _roundId) => {
              if(err)
                return next(err);

              object.me = {lastRoundId: _roundId};
              this.loadAllRounds((err, result) => {

                    if(err)
                      return next(err);

                    // add course data
                    var _course = { courseId: -1 };
                    var courses = [];
                    var index = -1;

                    // add courses data
                    _.forEach(result, (value) => {

                        // check if need to update course (next one)
                        if(_course.courseId != value.COURSEID){
                            _course = {
                              courseId: value.COURSEID,
                              title: value.TITLE,
                              shortdesc: value.SHORTDESC,
                              hashtag: value.HASHTAG,
                              photoUrl: value.PHOTOURL,
                              author: value.AUTHOR,
                              creationDate: value.CREATIONDATE
                            };
                            courses.push({
                                course: _course,
                                rounds: []
                            });
                            index++;
                        }

                        var round = {
                            roundid: value.ROUNDID,
                            name: value.NAME
                        };

                        courses[index].rounds.push(round);

                        //check END
                        if(value == result[result.length - 1]){
                          object.courses = courses;
                          // sails.log.debug(JSON.stringify(object, null, 4));
                          var rendered = swig.renderFile('./views/game/course.swig', {data: object});
                          return next(null, rendered);
                        }
                    });

              });
          });
    };


  /**
   * Loads all the courses up until one round (aka use winned courses)
   * @method function
   * @param  {Function(error, rows)} next
   */
  this.loadRoundsUntilX = function(upperRound, next){

    var DB = new sails.services.databaseservice();
    var query = sails.config.queries.courses_upon_x;
    var binds = {id: upperRound};

    DB.executeQuery(query, binds, (err, results) => {
        if(err)
          return next(err);
        return next(null, results);
    });

  };


    /**
     * Returns the rendered String containing the information about all courses
     * @method function
     */
    this.renderRoundsUntilX = function(me, next){

          var object = {};

          // var swig             = require('swig');
          var PlayerDataLoader = new sails.services.playerdataloader();

          PlayerDataLoader.getLastRound(me, (err, _roundId) => {
              if(err)
                return next(err);

              this.loadRoundsUntilX(_roundId, (err, result) => {

                    if(err)
                      return next(err);

                    // add course data
                    var _course = { courseId: -1 };
                    var courses = [];
                    var index = -1;

                    if(result.length === 0)
                        return next(null, object);//empty return

                    // add courses data
                    _.forEach(result, (value) => {

                        // check if need to update course (next one)
                        if(_course.courseId != value.COURSEID){
                            _course = {
                              courseId: value.COURSEID,
                              title: value.TITLE,
                              shortdesc: value.SHORTDESC
                            };
                            courses.push({
                                course: _course,
                                rounds: []
                            });
                            index++;
                        }

                        var round = {
                            roundid: value.ROUNDID,
                            name: value.NAME
                        };

                        courses[index].rounds.push(round);

                        //check END
                        if(value == result[result.length - 1]){
                          object.courses = courses;
                          // sails.log.debug(JSON.stringify(object, null, 4));
                          return next(null, object);
                        }
                    });

              });
          });
    };
};
