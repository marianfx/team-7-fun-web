module.exports = {

	tableName: 'INVENTORIES',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
	
	attributes: {

		playerID: {
			type:'integer',
			required: true,
			columnName: 'PLAYERID',
			model: 'player'
		},

		itemID: {
			type: 'integer',
			required: true,
			columnName: 'ITEMID',
			model: 'item'
		},
		
	}
};