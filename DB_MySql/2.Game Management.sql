
    DROP FUNCTION IF EXISTS randomInt;
		CREATE FUNCTION randomInt(pmin INTEGER, pmax INTEGER)
			RETURNS INTEGER(11)
			DETERMINISTIC
			NO SQL
			SQL SECURITY DEFINER
		BEGIN
			RETURN floor(pmin+RAND()*(pmax-pmin));
		END;

    DROP PROCEDURE IF EXISTS executeImmediate;
		CREATE PROCEDURE executeImmediate(_query MEDIUMTEXT)
		MODIFIES SQL DATA
		SQL SECURITY DEFINER
		BEGIN
			SET @sqlText = _query;
			PREPARE stmt FROM @sqlText;
			EXECUTE stmt;
			DEALLOCATE PREPARE stmt;
			COMMIT;
		END;


    #TYPE general_cursor is REF CURSOR;
    DROP PROCEDURE IF EXISTS useLuck;
		CREATE PROCEDURE useLuck(IN p_playerID INT, OUT p_random1 INT, OUT p_random2 INT, OUT p_what INT)
    BEGIN
			DECLARE v_prize_value INT;
			DECLARE v_prize VARCHAR(20);
			DECLARE v_luck INT;
			DECLARE v_level INT;
			DECLARE v_needed_luck INT;
      DECLARE query_str VARCHAR(2000);

      SELECT S_LUCK, PLAYERLEVEL INTO v_luck, v_level FROM PLAYERS WHERE PLAYERID = p_playerID;

      SET v_needed_luck = CEIL(v_level / 3);

      IF v_luck < v_needed_luck THEN
        SIGNAL SQLSTATE '45009' SET MESSAGE_TEXT = 'Insufficient luck points.';
      END IF;

			SET  p_random1 =  randomInt(1, 7);
      SET p_random2 =  randomInt(1, 7);

      UPDATE PLAYERS SET S_LUCK = (S_LUCK - v_needed_luck) WHERE PLAYERID = p_playerID;

      IF p_random1 = p_random2 THEN
			  SET p_what = randomInt(0, 2);

        IF (p_what = 0) THEN
          SET v_prize = 'COOKIES';
          SET v_prize_value = 10 * p_random1;
        ELSE
          SET v_prize = 'SKILLPOINTS';
          SET v_prize_value = 3 * p_random1;
        END IF;

				SET query_str = CONCAT('UPDATE PLAYERS SET ', v_prize , ' = ', v_prize, ' + ', v_prize_value, ' WHERE PLAYERID = ', p_playerID);
        CALL executeImmediate(query_str);
      ELSE
        SET p_what = 2;
      END IF;

      COMMIT;
    END;


    DROP PROCEDURE IF EXISTS addSkillTransaction;
    CREATE PROCEDURE addSkillTransaction(p_playerID INT, p_skill_name VARCHAR(1000))
    BEGIN
    DECLARE v_total_skill_points INT;
    DECLARE query_str VARCHAR(2000);

    SELECT SKILLPOINTS INTO  v_total_skill_points FROM PLAYERS
          WHERE PLAYERID = p_playerID;

      IF(v_total_skill_points < 1) THEN
        SIGNAL SQLSTATE '45008' SET MESSAGE_TEXT = 'Insufficient skill points.';
      END IF;

      SET query_str = CONCAT('UPDATE Players SET ', p_skill_name, ' = ', p_skill_name, ' + 1, SKILLPOINTS = SKILLPOINTS - 1 WHERE playerID = ', p_playerID);
      CALL executeImmediate(query_str);

      COMMIT;
    END;


    DROP PROCEDURE IF EXISTS itemTransaction;
    CREATE PROCEDURE itemTransaction(p_playerID INT, p_itemID INT)
    BEGIN
      DECLARE v_cookiesPlayer INT;
      DECLARE v_cookiesCost INT;
      DECLARE v_skill VARCHAR(100);
      DECLARE v_skillPoints INT;
      DECLARE counter INT;
    DECLARE query_str VARCHAR(2000);

      SELECT CASE
           WHEN EXISTS(SELECT playerID
                       FROM Players
                       WHERE playerID = p_playerID
           )
             THEN 1
           ELSE 0
           END
      INTO counter
      FROM dual;

      IF counter=0 THEN
          SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Invalid user.';
      END IF;

      SELECT CASE
         WHEN EXISTS(SELECT itemID
                     FROM Items
                     WHERE itemID = p_itemID
         )
           THEN 1
         ELSE 0
         END
      INTO counter
      FROM dual;

      IF counter = 0 THEN
          SIGNAL SQLSTATE '45003' SET MESSAGE_TEXT = 'Invalid item.';
      END IF;

      SELECT cookies INTO  v_cookiesPlayer FROM Players
          WHERE playerID = p_playerID;

      SELECT cookiesCost, skill, skillPoints INTO v_cookiesCost, v_skill, v_skillPoints from Items
          WHERE itemID = p_itemID;

      IF  v_cookiesPlayer-v_cookiesCost<0 THEN
          SIGNAL SQLSTATE '45004' SET MESSAGE_TEXT = 'Insufficient funds.';
      END IF;


      SET query_str = CONCAT('UPDATE Players SET ', v_skill, ' = ', v_skill, ' + ', v_skillPoints, ', cookies = cookies - ', v_cookiesCost, ' WHERE playerID = ', p_playerID);
      CALL executeImmediate(query_str);
      INSERT INTO Inventories VALUES (p_playerID, p_itemID);

    COMMIT;
    END;


    DROP PROCEDURE IF EXISTS loadQuestions;
    CREATE PROCEDURE loadQuestions(p_roundID INT, x INT)
      MODIFIES SQL DATA
    BEGIN
      DECLARE v_nr_questions INT;
      DECLARE counter INT;
      DECLARE query_str VARCHAR(2000);

      SELECT CASE
             WHEN EXISTS(SELECT roundID
                         FROM Rounds
                         WHERE roundID = p_roundID
             )
               THEN 1
             ELSE 0
             END
      INTO counter
      FROM dual;

      IF counter = 0 THEN
        SIGNAL SQLSTATE '45005' SET MESSAGE_TEXT = 'Inexistent round.';
      END IF;

      IF x = 0 THEN
        ## WHEN X IS NULL IT MEANS THAT THE QUESTIONS ARE FOR COURSE ##
        SELECT nrOfQuestions INTO v_nr_questions FROM Rounds
            WHERE ROUNDID = p_roundID;

        SELECT *
        FROM Questions
        WHERE roundID = p_roundID
        ORDER BY RAND()
        LIMIT v_nr_questions;

      ELSE
        ## WHEN X IS NOT NULL IT MEANS THAT THE QUESTIONS ARE FOR BATTLE ##
        SET v_nr_questions = x;
        SELECT *
        FROM Questions
        WHERE roundID <= p_roundID
        ORDER BY RAND()
        LIMIT v_nr_questions;
      END IF;
    END;


  ## procedure for loading pages for top players by experience##
    DROP PROCEDURE IF EXISTS offsetNextPlayers;
    CREATE PROCEDURE offsetNextPlayers(pageNumber INT, p_number_rows INT)
    BEGIN
      DECLARE countBefore INT;
      SET countBefore = (pageNumber - 1) * p_number_rows;

      SELECT
        experience,
        playerID
      FROM Players
      ORDER BY experience DESC
      LIMIT countBefore, p_number_rows;
    END;

   ## WINNER ID OR 0(ZERO) WHEN RESULT IS EQUAL ##
    DROP PROCEDURE IF EXISTS saveGameHistory;
    CREATE PROCEDURE saveGameHistory(p_playerID1 INT, p_playerID2 INT, p_winnerID INT)
    BEGIN
        INSERT INTO BattlesHistory (player1ID, player2ID, winner) VALUES(p_playerID1, p_playerID2 , p_winnerID);

        IF p_playerID1 = p_winnerID THEN
            #### PLAYER 1 WINS ####
            CALL update_battle_end(p_playerID1, 1);
            CALL update_battle_end(p_playerID2, -1);
        END IF;

        IF p_playerID2 = p_winnerID THEN
            #### PLAYER 2 WINS ####
            CALL update_battle_end(p_playerID1, -1);
            CALL update_battle_end(p_playerID2, 1);
        END IF;

        IF p_winnerID = 0 THEN
            #### EQUAL RESULTS ####
            CALL update_battle_end(p_playerID1,0);
            CALL update_battle_end(p_playerID2,0);
        END IF;

    END;


    DROP PROCEDURE IF EXISTS getMinRoundID;
    CREATE PROCEDURE getMinRoundID(str VARCHAR(2000))
    BEGIN
      DECLARE stmt_str    VARCHAR(4000);
      SET stmt_str = CONCAT('SELECT LASTROUNDID from PLAYERS WHERE PLAYERID in (', str, ') ORDER BY LASTROUNDID asc LIMIT 1');
      CALL executeImmediate(stmt_str);
    END;

commit;
