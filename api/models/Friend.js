
module.exports = {
  //sails autogenerates the autocreated/updated at fields. uncomment to disable
      autoCreatedAt: false,
      autoUpdatedAt: false,

  //sails also generates the id field automatically (autoincrementing)
  //otherwise, if set to false, a column with the PK shall be specified
      autoPK: false,


  //for the object, there can be specified a connection (configured in /config/connections.js)
  //let connection = 'name-from-/connections.js';

  //for the object, there can be specified a table name from the db (can be also used with pre-existing tables)
      tableName: 'FRIENDS',

      attributes: {
            player1Id: {
                columnName: 'PLAYER1ID'
            },
            player2Id: {
                columnName: 'PLAYER2ID'
            }
      }
};
