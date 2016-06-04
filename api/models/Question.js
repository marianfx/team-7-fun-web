/**
 * Question.js
 *
 * @description :: [the Question model]
 */

module.exports = {

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'QUESTIONS',

  attributes: {
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
         type: 'integer',
         required: true,
         columnName: 'ROUNDID'
      }

  }
};
