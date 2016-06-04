/**
 * Player.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName: 'PLAYERS',

	attributes: {

		playerID: {
			type: 'integer',
			primaryKey: true,
			required: true,
			columnName: 'PLAYERID'
		},

		playerName: {
			type: 'string',
			required: true,
			columnName: 'PLAYERNAME'
		},

		photoURL: {
			type: 'string',
			required: true,
			columnName: 'PHOTOURL'
		},

		experience: {
			type: 'integer',
			required: true,
			columnName: 'EXPERIENCE'
		},

		playerLevel: {
			type: 'integer',
			required: true,
			columnName: 'PLAYERLEVEL'
		},

		cookies: {
			type: 'integer',
			required: true,
			columnName: 'COOKIES'
		},

		s_luck: {
			type: 'integer',
			required: true,
			columnName: 'S_LUCK'
		},

		s_time: {
			type: 'integer',
			required: true,
			columnName: 'S_TIME'
		},

		s_cheat: {
			type: 'integer',
			required: true,
			columnName: 'S_CHEAT'
		},

		skillPoints: {
			type: 'integer',
			required: true,
			columnName: 'SKILLPOINTS'
		},

		lastRoundID: {
			type: 'integer',
			columnName: 'LASTROUNDID'
		},

		guildID: {
			type: 'integer',
			columnName: 'GUILDID'
		},

		items: {
			collection: 'item',
			via: 'playerID',
			through: 'playeritem'
		}
  }
};

