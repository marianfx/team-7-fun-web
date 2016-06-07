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
        columnName: 'HASHTAG'
    },
    photoUrl: {
          columnName: 'PHOTOURL'
    },
    author: {
        columnName: 'AUTHOR'
    },
    creationDate: {
        type: 'date',
       columnName: 'CREATIONDATE'
    }
  }

};
