/**
 * Round.js
 *
 * @description :: This is the model representing the round
 */

module.exports = {

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'ROUNDS',

  attributes: {

    roundid: {
      columnName: 'ROUNDID'
    },
    name: {
      columnName: 'NAME'
    },
    nrofquestions: {
      columnName: 'NROFQUESTIONS'
    },
    course: {
      columnName: 'COURSE'
    },
    roundTime: {
        columnName: 'ROUNDTIME'
    },
    courseId: {
        columnName: 'COURSEID'
    }
  }
};
