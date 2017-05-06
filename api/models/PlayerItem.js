module.exports = {

    tableName: 'INVENTORIES',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false,
	
	attributes: {

		playerID: {
            required: true,
            type: 'integer',
			columnName: 'PLAYERID',
			model: 'player'
		},

		itemID: {
            required: true,
            type: 'integer',
			columnName: 'ITEMID',
			model: 'item'
		},
		
	}
};