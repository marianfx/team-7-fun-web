/**
 * The Course MODEL
 *
 * @description :: [the Course model]
 */

module.exports = {

  tableName: 'COURSES',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    courseId: {
        primaryKey: true,
        autoIncrement: true,
        type: 'integer',
        columnName: 'COURSEID'
    },
    title: {
        type: 'string',
        columnName: 'TITLE'
    },
    shortdesc: {
        type: 'string',
        columnName: 'SHORTDESC'
    },
    hashtag: {
        type: 'string',
        columnName: 'HASHTAG'
    },
    photoUrl: {
          type: 'string',
          columnName: 'PHOTOURL'
    },
    author: {
        type: 'string',
        columnName: 'AUTHOR'
    },
    creationDate: {
        type: 'date',
       columnName: 'CREATIONDATE'
    }
  }

};
