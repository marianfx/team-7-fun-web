
DROP PACKAGE Game_Managament;/
CREATE OR REPLACE PACKAGE Game_Managament
IS
    TYPE general_cursor is REF CURSOR;
    PROCEDURE itemTransaction(p_playerID INT, p_itemID INT);
    PROCEDURE addSkillTransaction(p_playerID INT, p_skill_name VARCHAR2);
    PROCEDURE useLuck(p_playerID IN INT, p_random1 OUT INT, p_random2 OUT INT, p_what OUT INT);
    PROCEDURE loadQuestions(p_roundID INT, x INT, p_recordset OUT Game_Managament.general_cursor);
    PROCEDURE offsetNextPlayers(pageNumber INT, p_number_rows INT, p_recordset OUT Game_Managament.general_cursor);
    PROCEDURE saveGameHistory(p_playerID1 INT, p_playerID2 INT, p_winnerID INT);
    PROCEDURE getMinRoundID(str varchar2, p_recordset OUT Game_Managament.general_cursor);
END Game_Managament;
/
CREATE OR REPLACE PACKAGE BODY Game_Managament IS

    PROCEDURE useLuck(p_playerID IN INT, p_random1 OUT INT, p_random2 OUT INT, p_what OUT INT)
    IS
    v_prize_value INT;
    v_prize VARCHAR2(20);
    v_luck INT;
    v_level INT;
    v_needed_luck INT;
    BEGIN

      SELECT S_LUCK, PLAYERLEVEL INTO v_luck, v_level FROM PLAYERS WHERE PLAYERID = p_playerID;

      v_needed_luck := CEIL(v_level / 3);

      IF (v_luck < v_needed_luck) THEN
        raise TWExceptions.insufficient_luck_points;
      END IF;

      p_random1 := TRUNC(DBMS_RANDOM.VALUE(1,7));
      p_random2 := TRUNC(DBMS_RANDOM.VALUE(1,7));

      UPDATE PLAYERS SET S_LUCK = (S_LUCK - v_needed_luck) WHERE PLAYERID = p_playerID;

      IF (p_random1 = p_random2) THEN

        p_what := TRUNC(DBMS_RANDOM.VALUE(0,2));

        IF (p_what = 0) THEN
          v_prize := 'COOKIES';
          v_prize_value := 10 * p_random1;

        ELSE
          v_prize := 'SKILLPOINTS';
          v_prize_value := 3 * p_random1;
        END IF;

        EXECUTE IMMEDIATE 'UPDATE PLAYERS SET ' || v_prize || '= ' || v_prize || '+ :1 WHERE PLAYERID = :2'
        USING v_prize_value, p_playerID;

      ELSE
        p_what := 2;
      END IF;

      COMMIT;

      EXCEPTION
        WHEN TWExceptions.insufficient_luck_points THEN
          RAISE_APPLICATION_ERROR (-20009,'Insufficient luck points.');

    END useLuck;

    PROCEDURE addSkillTransaction(p_playerID INT, p_skill_name VARCHAR2)
    IS
    v_total_skill_points INT;
    BEGIN

      SELECT SKILLPOINTS INTO  v_total_skill_points FROM PLAYERS
          WHERE PLAYERID = p_playerID;

      IF(v_total_skill_points < 1) THEN
        raise TWExceptions.insufficient_skill_points;
      END IF;

      EXECUTE IMMEDIATE 'UPDATE Players
                            SET '||p_skill_name||'='||p_skill_name||'+1 ,
                                SKILLPOINTS = SKILLPOINTS - 1
                           WHERE playerID = :1'
               USING p_playerID;

      COMMIT;
      EXCEPTION
        WHEN TWExceptions.insufficient_skill_points THEN
          RAISE_APPLICATION_ERROR (-20008,'Insufficient skill points.');

    END addSkillTransaction;

    PROCEDURE itemTransaction(p_playerID INT, p_itemID INT)
    IS
       v_cookiesPlayer INT;
       v_cookiesCost INT;
       v_skill VARCHAR2(100);
       v_skillPoints INT;
       counter INT;
    BEGIN

    SELECT CASE
         WHEN EXISTS(SELECT playerID
                     FROM Players
                     WHERE playerID=p_playerID
         )
           THEN 1
         ELSE 0
         END
     INTO counter
     FROM dual;

    IF counter=0 THEN
          raise TWExceptions.inexistent_user;
    END IF;

     SELECT CASE
         WHEN EXISTS(SELECT itemID
                     FROM Items
                     WHERE itemID=p_itemID
         )
           THEN 1
         ELSE 0
         END
     INTO counter
     FROM dual;

    IF counter=0 THEN
          raise TWExceptions.inexistent_item;
    END IF;

        SELECT cookies INTO  v_cookiesPlayer FROM Players
          WHERE playerID=p_playerID;

        SELECT cookiesCost, skill, skillPoints INTO v_cookiesCost, v_skill, v_skillPoints from Items
          WHERE itemID=p_itemID;

        IF  v_cookiesPlayer-v_cookiesCost<0 THEN
          raise TWExceptions.insufficient_funds;
        END IF;


       EXECUTE IMMEDIATE 'UPDATE Players
                            SET '||v_skill||'='||v_skill||'+ :1 ,
                                cookies = cookies - :2
                           WHERE playerID = :3'
               USING v_skillPoints, v_cookiesCost, p_playerID;
       INSERT INTO Inventories VALUES (p_playerID, p_itemID);

    COMMIT;

    EXCEPTION
    WHEN TWExceptions.inexistent_user
        THEN RAISE_APPLICATION_ERROR (-20001,'Invalid user.');
    WHEN TWExceptions.inexistent_item
        THEN RAISE_APPLICATION_ERROR (-20003,'Invalid item.');
    WHEN TWExceptions.insufficient_funds
        THEN RAISE_APPLICATION_ERROR (-20004,'Insufficient funds.');

    END itemTransaction;


    PROCEDURE loadQuestions(p_roundID INT, x INT, p_recordset OUT Game_Managament.general_cursor)
    IS
        v_nr_questions INT;
        counter INT;
    BEGIN

    SELECT CASE
         WHEN EXISTS(SELECT roundID
                     FROM Rounds
                     WHERE roundID=p_roundID
         )
           THEN 1
         ELSE 0
         END
     INTO counter
     FROM dual;
        IF counter=0 THEN
          RAISE TWExceptions.inexistent_round;
        END IF;

    IF x=0 THEN
        --## WHEN X IS NULL IT MEANS THAT THE QUESTIONS ARE FOR COURSE ##--

        SELECT nrOfQuestions INTO v_nr_questions FROM Rounds
            WHERE ROUNDID = p_roundID;
        OPEN p_recordset FOR
          SELECT * FROM (
                        SELECT *
                        FROM   Questions
                        WHERE  roundID=p_roundID
                        ORDER BY dbms_random.value
                        )
          WHERE ROWNUM<=v_nr_questions;

    ELSE
        --## WHEN X IS NOT NULL IT MEANS THAT THE QUESTIONS ARE FOR BATTLE ##--
        v_nr_questions:=x;
        OPEN p_recordset FOR
          SELECT * FROM (
                        SELECT *
                        FROM   Questions
                        WHERE  roundID<=p_roundID
                        ORDER BY dbms_random.value
                        )
          WHERE ROWNUM<=v_nr_questions;

    END IF;



    END loadQuestions;
   --## procedure for loading pages for top players by experience##--
  PROCEDURE offsetNextPlayers(pageNumber INT, p_number_rows INT, p_recordset OUT Game_Managament.general_cursor)
	IS

		countBefore INT;

    BEGIN
        countBefore := (pageNumber - 1) * p_number_rows;
        OPEN p_recordset FOR
        SELECT *
                  FROM ( SELECT experience, playerID, rownum rn
                           FROM ( SELECT experience, playerID
                                    FROM Players
                                   ORDER BY experience DESC
                                ) tmp
                          WHERE rownum <=countBefore + p_number_rows
                       )
                 WHERE rn > countBefore;

    END offsetNextPlayers;

   --## WINER ID OR 0(ZERO) WHEN RESULT IS EQUAL ##--
   PROCEDURE saveGameHistory(p_playerID1 INT, p_playerID2 INT, p_winnerID INT)
   IS

   BEGIN
        INSERT INTO BattlesHistory (player1ID, player2ID,winner) VALUES(p_playerID1, p_playerID2 , p_winnerID);

        IF p_playerID1=p_winnerID
        THEN
            --#### PLAYER 1 WINS ####--
            PLAYER_PACKAGE.update_battle_end(p_playerID1,1);
            PLAYER_PACKAGE.update_battle_end(p_playerID2,-1);

        END IF;

        IF p_playerID2=p_winnerID
        THEN
            --#### PLAYER 2 WINS ####--
            PLAYER_PACKAGE.update_battle_end(p_playerID1,-1);
            PLAYER_PACKAGE.update_battle_end(p_playerID2,1);

        END IF;

        IF p_winnerID=0
        THEN
            --#### EQUAL REUSULTS ####--
            PLAYER_PACKAGE.update_battle_end(p_playerID1,0);
            PLAYER_PACKAGE.update_battle_end(p_playerID2,0);

        END IF;

   END saveGameHistory;

   PROCEDURE getMinRoundID(str varchar2, p_recordset OUT Game_Managament.general_cursor)
   AS
   stmt_str    VARCHAR2(20000);
   BEGIN
   stmt_str := 'SELECT LASTROUNDID FROM( SELECT LASTROUNDID from  PLAYERS WHERE PLAYERID in ('||str||')
              ORDER BY LASTROUNDID asc)
              WHERE ROWNUM<2';

    OPEN p_recordset FOR stmt_str;
   END getMinRoundID;

END Game_Managament;
/
commit;
