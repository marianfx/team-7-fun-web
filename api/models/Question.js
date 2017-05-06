/**
 * Question.js
 *
 * @description :: [the Question model]
 */

module.exports = {

    tableName: 'QUESTIONS',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {
        questionID: {
            unique: true,
            required: true,
            type: 'integer',
            columnName: 'QUESTIONID'
        },
        question: {
            type: 'string',
            required: true,
            unique: true,
            columnName: 'QUESTION'
        },
        difficulty: {
            type: 'string',
            required: true,
            columnName: 'DIFFICULTY'
        },
        answerA: {
            type: 'string',
            required: true,
            columnName: 'ANSWERA'
        },
        answerB: {
            type: 'string',
            required: true,
            columnName: 'ANSWERB'
        },
        answerC: {
            type: 'string',
            required: true,
            columnName: 'ANSWERC'
        },
        answerD: {
            type: 'string',
            required: true,
            columnName: 'ANSWERD'
        },
        correctAnswer: {
            type: 'integer',
            required: true,
            columnName: 'CORRECTANSWER'
        },
        roundID: {
            required: true,
            type: 'integer',
            columnName: 'ROUNDID'
        }

    }
};
