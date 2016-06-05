
module.exports.queries = {

    friends_paginated: 'SELECT * FROM (SELECT P.PLAYERID, P.PLAYERNAME, P.PHOTOURL FROM FRIENDS F INNER JOIN PLAYERS P ON P.PLAYERID = F.PLAYER2ID WHERE F.PLAYER1ID = :me AND P.PLAYERID > :llast ORDER BY P.PLAYERID ASC) WHERE ROWNUM <= :llimit',

    user_details: 'SELECT P.PLAYERID, G.USERNAME, G.EMAIL, G.REGISTRATIONDATE, P.PLAYERNAME, P.PHOTOURL, P.EXPERIENCE, P.PLAYERLEVEL, P.COOKIES, P.S_LUCK, P.S_TIME, P.S_CHEAT, P.SKILLPOINTS, P.LASTROUNDID, P.GUILDID, PS.WINS, PS.LOSES, PS.PERFECTROUNDS, PS.DAILYLOGINS, PS.LASTLOGINDATE FROM GAMEUSERS G JOIN PLAYERS P ON G.PLAYERID = P.PLAYERID JOIN PLAYERSSTATISTICS PS ON PS.PLAYERID = P.PLAYERID WHERE G.PLAYERID = :id',

    user_lastround: 'SELECT LASTROUNDID FROM PLAYERS WHERE PLAYERID = :id',

    player_inv: 'SELECT I.ITEMID, IT.NAME, IT.DESCRIPTION, IT.SKILL, IT.SKILLPOINTS, IT.COOKIESCOST, IT.FILEPATH FROM INVENTORIES I JOIN ITEMS IT ON IT.ITEMID = I.ITEMID WHERE I.PLAYERID = :id',

    questions_loader: "BEGIN Game_Managament.loadQuestions(:p_roundID,:nr_questions,:cursor); END;",

};
