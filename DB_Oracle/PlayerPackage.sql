DROP PACKAGE player_package;/
CREATE OR REPLACE PACKAGE player_package IS

  v_exp_round INT:=50;
  PROCEDURE  update_battle_end  (p_playerID INT, p_winnerflag INT);
  -- procent 100% = 1 ;
  PROCEDURE  update_experience (p_playerid INT, p_roundid INT, p_procent INT);
  PROCEDURE  update_skill  (p_playerid INT, p_skillname VARCHAR2, p_skillpoints INT);
  PROCEDURE   add_time (p_playerid INT);

END player_package;
/
create or replace PACKAGE BODY player_package IS

 PROCEDURE  update_battle_end (p_playerID INT,p_winnerflag INT)
  IS
    v_guild_id PLAYERS.guildid%TYPE;
    v_wins playersstatistics.wins%type;
    v_loses playersstatistics.loses%type;
  BEGIN
    SELECT guildid INTO v_guild_id
    FROM players
    WHERE playerid=p_playerID;


    IF (p_winnerflag =1) THEN

          UPDATE playersstatistics SET wins=wins+1 WHERE playerid=p_playerid;

          IF(v_guild_id IS NOT NULL ) THEN
              UPDATE GUILDS SET wins=wins+1 WHERE guildid=v_guild_id;
          END IF;

    END IF;

    IF (p_winnerflag=-1) THEN

           UPDATE playersstatistics SET loses=loses+1 WHERE playerid=p_playerid;

          IF(v_guild_id IS NOT NULL ) THEN
              UPDATE GUILDS SET loses=loses+1 WHERE guildid=v_guild_id;
          END IF;

    END IF;
    COMMIT;

  END update_battle_end;

  PROCEDURE update_experience(p_playerid INT, p_roundid INT, p_procent INT)
    IS
    v_lastRoundID Players.lastRoundId%TYPE;
    v_punctaj Players.experience%TYPE;
    v_max_experience Players.experience%TYPE;
    v_current_exp Players.experience%TYPE;
    v_level Players.playerlevel%TYPE;
    v_max_round Rounds.roundid%TYPE;
    BEGIN
      SELECT lastRoundId,playerLevel,experience into
             v_lastRoundID,v_level,v_current_exp
          from Players
          where playerId=p_playerid;
      SELECT points into v_punctaj FROM ROUNDS
        WHERE roundid=p_roundid;

       --verifica daca a mai facut aceasta runda
      IF(p_roundid<v_lastRoundID) THEN
        v_punctaj:=v_punctaj*0.2;
      END IF;
      -- verifica daca procentul 100%
      IF(p_procent=100) THEN
        v_punctaj:=v_punctaj+v_punctaj*0.5;
        UPDATE PlayersStatistics
        SET PerfectRounds=PerfectRounds+1
        WHERE playerid=p_playerid;
      END IF;
      IF (p_procent>70) THEN
        SELECT max(roundid) INTO v_max_round  FROM rounds;
          IF(v_lastRoundID+1<=v_max_round)THEN
          UPDATE PLAYERS
            SET LASTROUNDID = LASTROUNDID+1
          WHERE PLAYERID=p_playerid;
        END IF;
      END IF;

      v_current_exp:=v_current_exp+v_punctaj;

      v_max_experience:=v_exp_round* POWER(2,v_level);
      UPDATE Players
      SET Experience=v_current_exp
      WHERE playerid=p_playerid;

      if(v_current_exp>v_max_experience) THEN
        UPDATE Players SET
        PlayerLevel=PlayerLevel+1
        WHERE playerid=p_playerid;

        UPDATE Players SET
        SKILLPOINTS=SKILLPOINTS+(3*(v_level+1)),
        COOKIES=COOKIES+10*(v_level+1)
        WHERE playerid=p_playerid;

        --have to increment user's money
      END IF;
      COMMIT;
    END update_experience;


  PROCEDURE  update_skill  (p_playerid INT, p_skillname VARCHAR2, p_skillpoints INT)
   IS
  v_aux VARCHAR2(200);
  v_skill_points players.skillpoints%TYPE;
  BEGIN
    SELECT skillpoints into v_skill_points from players where playerid=p_playerid;

    IF(p_skillpoints>v_skill_points) THEN -- you don't have such much avaible skillpoints
      RAISE TWExceptions.insufficient_points;
    END IF;


       EXECUTE IMMEDIATE 'UPDATE Players
                            SET '||p_skillname||'='||p_skillname||'+ :1 ,
                                SKILLPOINTS = SKILLPOINTS - ' || p_skillpoints ||
                           'WHERE playerID = :2'
               USING p_skillpoints, p_playerid;
    COMMIT;
    EXCEPTION
					WHEN TWExceptions.insufficient_points
								THEN RAISE_APPLICATION_ERROR(-20006, 'Not avaible this number of skillpoints');

  END update_skill;

  PROCEDURE   add_time (p_playerid INT)
  AS
    v_level_time NUMBER;
    v_level NUMBER;
    add_time INT;
  BEGIN
    select s_time, PLAYERLEVEL into v_level_time, v_level FROM PLAYERS
    where playerid=p_playerid;

    add_time:=5*CEIL(v_level/3);

    UPDATE players
    SET LASTROUNDSTART = LASTROUNDSTART + (add_time/(24*60*60)),
        S_TIME=S_TIME-CEIL(v_level/3)
    WHERE PLAYERID=p_playerid;
  EXCEPTION
  when NO_DATA_FOUND then
  null;
  END add_time;
END player_package;
/
commit;
