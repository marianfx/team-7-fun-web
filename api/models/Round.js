/**
 * Round.js
 *
 * @description :: This is the model representing the round
 */

module.exports = {

    tableName: 'ROUNDS',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {

        roundid: {
            primaryKey: true,
            type: 'integer',
            columnName: 'ROUNDID'
        },
        name: {
            type: 'string',
            columnName: 'NAME'
        },
        nrofquestions: {
            type: 'integer',
            columnName: 'NROFQUESTIONS'
        },
        course: {
            type: 'string',
            columnName: 'COURSE'
        },
        roundTime: {
            type: 'integer',
            columnName: 'ROUNDTIME'
        },
        courseId: {
            type: 'integer',
            columnName: 'COURSEID'
        },
        points: {
            columnName: 'POINTS'
        },
    }
};
