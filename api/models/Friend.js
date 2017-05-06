
module.exports = {
    tableName: 'FRIENDS',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {
        player1Id: {
            primaryKey: true,
            columnName: 'PLAYER1ID'
        },
        player2Id: {
            primaryKey: true,
            columnName: 'PLAYER2ID'
        }
    }
};
