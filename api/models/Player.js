/**
 * Player.js
 *
 * @description ::
 */

module.exports = {

	tableName: 'PLAYERS',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,

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
		}
  }
};
