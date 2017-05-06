
    DROP PROCEDURE IF EXISTS update_battle_end;
    CREATE PROCEDURE  update_battle_end (p_playerID INT, p_winnerflag INT)
    BEGIN
      DECLARE v_guild_id INT;

      SELECT guildid INTO v_guild_id
        FROM players
        WHERE playerid = p_playerID;

      IF (p_winnerflag = 1) THEN
        UPDATE playersstatistics SET wins = wins + 1 WHERE playerid = p_playerid;

        IF(v_guild_id IS NOT NULL ) THEN
            UPDATE GUILDS SET wins = wins + 1 WHERE guildid = v_guild_id;
        END IF;
      END IF;

      IF (p_winnerflag = -1) THEN
        UPDATE playersstatistics SET loses = loses + 1 WHERE playerid = p_playerid;

        IF(v_guild_id IS NOT NULL ) THEN
          UPDATE GUILDS SET loses = loses + 1 WHERE guildid = v_guild_id;
        END IF;
      END IF;

      COMMIT;
    END;


    DROP PROCEDURE IF EXISTS update_experience;
    CREATE PROCEDURE update_experience(p_playerid INT, p_roundid INT, p_procent INT)
    BEGIN
      DECLARE v_lastRoundID INT;
      DECLARE v_punctaj INT;
      DECLARE v_max_experience INT;
      DECLARE v_current_exp INT;
      DECLARE v_level INT;
      DECLARE v_max_round INT;
      DECLARE v_exp_round INT;
      SET v_exp_round = 50;

      SELECT
        lastRoundId,
        playerLevel,
        experience
      INTO
        v_lastRoundID, v_level, v_current_exp
      FROM Players
        WHERE playerId = p_playerid;

      SELECT points INTO v_punctaj
      FROM ROUNDS
        WHERE roundid = p_roundid;

      # verifica daca a mai facut aceasta runda
      IF(p_roundid < v_lastRoundID) THEN
        SET v_punctaj = v_punctaj * 0.2;
      END IF;

      # verifica daca procentul 100%
      IF(p_procent = 100) THEN
        SET v_punctaj = v_punctaj + v_punctaj * 0.5;

        UPDATE PlayersStatistics SET PerfectRounds = PerfectRounds + 1 WHERE playerid = p_playerid;
      END IF;

      IF (p_procent > 70) THEN
        SELECT max(roundid) INTO v_max_round  FROM rounds;
        IF(v_lastRoundID + 1 <= v_max_round) THEN
          UPDATE PLAYERS SET LASTROUNDID = LASTROUNDID + 1 WHERE PLAYERID = p_playerid;
        END IF;
      END IF;

      SET v_current_exp = v_current_exp + v_punctaj;
      SET v_max_experience = v_exp_round * POWER(2, v_level);

      UPDATE Players SET Experience = v_current_exp WHERE playerid = p_playerid;

      IF(v_current_exp > v_max_experience) THEN
        UPDATE Players SET PlayerLevel = PlayerLevel + 1 WHERE playerid = p_playerid;

        UPDATE Players SET SKILLPOINTS = SKILLPOINTS + (3 * (v_level + 1)), COOKIES = COOKIES + 10 * (v_level + 1)
        WHERE playerid = p_playerid;

        # have to increment user's money
      END IF;

      COMMIT;
    END;


    DROP PROCEDURE IF EXISTS update_skill;
    CREATE PROCEDURE update_skill(p_playerid INT, p_skillname VARCHAR(2000), p_skillpoints INT)
    BEGIN
      DECLARE v_aux VARCHAR(200);
      DECLARE v_skill_points INT;
      DECLARE query_str VARCHAR(2000);

      SELECT skillpoints into v_skill_points from players where playerid = p_playerid;

      IF(p_skillpoints > v_skill_points) THEN #you don't have such much avaible skillpoints
        SIGNAL SQLSTATE '45006' SET MESSAGE_TEXT = 'Insufficient skill points.';
      END IF;


      SET query_str = CONCAT('UPDATE Players SET ', p_skillname, ' = ', p_skillname, ' + ', p_skillpoints, ', SKILLPOINTS = SKILLPOINTS - ', p_skillpoints, 'WHERE playerID = ', p_playerid);
      CALL executeImmediate(query_str);
      COMMIT;
    END;


    DROP PROCEDURE IF EXISTS add_time;
    CREATE PROCEDURE add_time(p_playerid INT)
    BEGIN
      DECLARE v_level_time INT;
      DECLARE v_level INT;
      DECLARE add_time INT;

      SELECT s_time, PLAYERLEVEL into v_level_time, v_level FROM PLAYERS
      WHERE playerid = p_playerid;

      SET add_time = 5 * CEIL(v_level / 3);

      UPDATE players SET LASTROUNDSTART = LASTROUNDSTART + (add_time / (24 * 60 * 60)), S_TIME = S_TIME - CEIL(v_level / 3)
      WHERE PLAYERID = p_playerid;
    END;

COMMIT;
