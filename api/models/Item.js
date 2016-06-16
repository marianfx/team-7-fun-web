/**
 * Items.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName: "ITEMS",
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
	
	attributes: {

		itemID: {
			type: 'integer',
			primaryKey: true,
			required: true,
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
