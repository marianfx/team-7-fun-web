
module.exports = {

    tableName: "ITEMS",
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false,
	
	attributes: {

        itemID: {
            primaryKey: true,
            autoIncrement: true,
            required: true,
            type: 'integer',
			columnName: 'ITEMID'
		},

		name: {
			type: 'string',
			required: true,
			columnName: "NAME"
		},

		description: {
			type: 'string',
			required: true,
			columnName: 'DESCRIPTION'
		},

		skillPoints: {
			type: 'integer',
			columnName: 'SKILLPOINTS'
		},

		skill: {
			type: 'string',
			columnName: 'SKILL'
		},

		cookiesCost: {
			type: 'integer',
			required: true,
			columnName: 'COOKIESCOST'
		},

		filePath: {
			type: 'string',
			required: true,
			columnName: 'FILEPATH'
		},

		owners: {
			collection: 'player',
			via: 'itemID',
			through: 'playeritem'
		}

  }
};
