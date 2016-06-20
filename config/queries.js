
module.exports.queries = {

    // FX
    friends_paginated: 'SELECT * FROM (SELECT P.PLAYERID, P.PLAYERNAME, P.PHOTOURL FROM FRIENDS F INNER JOIN PLAYERS P ON P.PLAYERID = F.PLAYER2ID WHERE F.PLAYER1ID = :me AND P.PLAYERID > :llast ORDER BY P.PLAYERID ASC) WHERE ROWNUM <= :llimit',

    all_friends: 'SELECT P.PLAYERID, P.PLAYERNAME, P.PHOTOURL FROM FRIENDS F INNER JOIN PLAYERS P ON P.PLAYERID = F.PLAYER2ID WHERE F.PLAYER1ID = :me',

    user_details: 'SELECT P.PLAYERID, G.USERNAME, G.EMAIL, G.REGISTRATIONDATE, P.PLAYERNAME, P.PHOTOURL, P.EXPERIENCE, P.PLAYERLEVEL, P.COOKIES, P.S_LUCK, P.S_TIME, P.S_CHEAT, P.SKILLPOINTS, P.LASTROUNDID, P.GUILDID, PS.WINS, PS.LOSES, PS.PERFECTROUNDS, PS.DAILYLOGINS, PS.LASTLOGINDATE FROM GAMEUSERS G JOIN PLAYERS P ON G.PLAYERID = P.PLAYERID JOIN PLAYERSSTATISTICS PS ON PS.PLAYERID = P.PLAYERID WHERE G.PLAYERID = :id',

    user_lastround: 'SELECT LASTROUNDID FROM PLAYERS WHERE PLAYERID = :id',

    all_courses: 'SELECT C.COURSEID, C.TITLE, C.SHORTDESC, C.HASHTAG, C.PHOTOURL, C.AUTHOR, TO_CHAR(C.CREATIONDATE, \'Day-MM-YYYY, HH:MI\') CREATIONDATE, R.ROUNDID, R.NAME FROM COURSES C JOIN ROUNDS R ON C.COURSEID = R.COURSEID ORDER BY C.COURSEID ASC, R.ROUNDID ASC',

    courses_upon_x: 'SELECT C.COURSEID, C.TITLE, C.SHORTDESC, C.HASHTAG, C.PHOTOURL, C.AUTHOR, TO_CHAR(C.CREATIONDATE, \'Day-MM-YYYY, HH:MI\') CREATIONDATE, R.ROUNDID, R.NAME FROM COURSES C JOIN ROUNDS R ON C.COURSEID = R.COURSEID WHERE R.ROUNDID < :id ORDER BY C.COURSEID ASC, R.ROUNDID ASC',

    specifid_course: 'SELECT C.COURSEID, C.TITLE, C.SHORTDESC, C.HASHTAG, C.PHOTOURL, C.AUTHOR, C.CREATIONDATE, R.ROUNDID, R.NAME, R.NROFQUESTIONS, R.COURSE, R.ROUNDTIME FROM COURSES C JOIN ROUNDS R ON C.COURSEID = R.COURSEID WHERE C.COURSEID = :id',

    player_inv: 'SELECT I.ITEMID, IT.NAME, IT.DESCRIPTION, IT.SKILL, IT.SKILLPOINTS, IT.COOKIESCOST, IT.FILEPATH FROM INVENTORIES I JOIN ITEMS IT ON IT.ITEMID = I.ITEMID WHERE I.PLAYERID = :id',

    questions_loader: "BEGIN Game_Managament.loadQuestions(:p_roundID,:nr_questions,:cursor); END;",


    // GRZ
    update_starttime: 'BEGIN UPDATE PLAYERS SET LASTROUNDSTART=SYSDATE WHERE PLAYERID = :id;  COMMIT; END;',

    null_starttime: 'BEGIN UPDATE PLAYERS SET LASTROUNDSTART=NULL WHERE PLAYERID = :id;  COMMIT; END;',

    getpast_roundtime: 'SELECT round((sysdate - LASTROUNDSTART) * (60 * 60 * 24), 2) AS DIFFERENCE from PLAYERS WHERE PLAYERID = :id',

    get_roundrow: 'SELECT * FROM ROUNDS WHERE ROUNDID=:id',

    update_experience: 'BEGIN  PLAYER_PACKAGE.UPDATE_EXPERIENCE(:playerid, :roundid, :precent); COMMIT; END;',

    get_lastroundstart: 'SELECT LASTROUNDSTART FROM PLAYERS WHERE PLAYERID= :id',

    get_round_course: 'SELECT COURSE FROM ROUNDS WHERE ROUNDID = :roundid ',

    add_time_player:'BEGIN PLAYER_PACKAGE.ADD_TIME(:playerid); COMMIT; END;',

    update_skill:'BEGIN PLAYER_PACKAGE.UPDATE_SKILL(:playerid, :skillname, :skillpoints ); COMMIT; END;',

    // CZR
    get_friends_count: 'SELECT COUNT(*) AS FRIENDSCOUNT FROM FRIENDS WHERE PLAYER1ID = :id',

    are_friends: 'SELECT 1 AS YES FROM FRIENDS WHERE PLAYER1ID = :id1 AND PLAYER2ID = :id2',

    use_luck: 'BEGIN Game_Managament.useLuck(:id, :random1, :random2, :what); END;',

    add_skill: 'BEGIN Game_Managament.addSkillTransaction(:id,:skillName); END;',

    load_skills: 'SELECT SKILLPOINTS, S_CHEAT, S_LUCK, S_TIME, PLAYERLEVEL FROM PLAYERS WHERE PLAYERID = :id',

    top_players: 'SELECT PHOTOURL, PLAYERNAME, @COLUMNNAME AS VALUE FROM (SELECT * FROM PLAYERS p JOIN playersstatistics s ON p.PLAYERID = s.PLAYERID ' +
                 ' ORDER BY @COLUMNNAME DESC) WHERE ROWNUM <= 10',

    reload_shop: 'SELECT * FROM ITEMS WHERE COOKIESCOST <> 0 AND ITEMID <= :last AND ITEMID NOT IN ' +
                '(SELECT it.ITEMID FROM ITEMS it JOIN INVENTORIES inv ON it.ITEMID = inv.ITEMID AND inv.PLAYERID = :id)',

    get_shop: 'SELECT * FROM (SELECT * FROM ITEMS WHERE COOKIESCOST <> 0 AND ITEMID NOT IN ' +
            '(SELECT it.ITEMID FROM ITEMS it JOIN INVENTORIES inv ON it.ITEMID = inv.ITEMID AND inv.PLAYERID = :id) ' +
            'AND ITEMID > :last ORDER BY ITEMID ASC) WHERE ROWNUM <= :limit',

    buy_item: 'BEGIN Game_Managament.itemTransaction(:playerID,:itemID); END;',

    //DRN
    getminRound: 'BEGIN Game_Managament.getMinRoundID(:str, :cursor); END;',

    update_end_battle:'BEGIN player_package.UPDATE_BATTLE_END(:id, :flag); COMMIT; END;',

    decremente_S_TIME: 'BEGIN UPDATE PLAYERS SET S_TIME= :timepoints WHERE PLAYERID = :id;  COMMIT; END;'

};
