CREATE OR REPLACE PACKAGE player_package IS
  
  v_exp_round INT:=50;
  PROCEDURE  update_battle_end  (p_playerID INT, p_winnerflag INT);
  -- procent 100% = 1 ;
  PROCEDURE  update_experience  (p_playerid INT, p_roundid INT, p_procent INT, p_punctaj INT);
  PROCEDURE  update_skill  (p_playerid INT, p_skillname VARCHAR2, p_skillpoints INT);
  
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
              UPDATE GUILDS SET wins=wins+1 WHERE guildid=v_guild_id;
          END IF;
           
    END IF;
    
  
  END update_battle_end;
  
  PROCEDURE update_experience(p_playerid INT, p_roundid INT, p_procent INT, p_punctaj INT)
  IS
  v_lastRoundID Players.lastRoundId%TYPE;
  v_punctaj Players.experience%TYPE;
  v_max_experience Players.experience%TYPE;
  v_current_exp Players.experience%TYPE;
  v_level Players.playerlevel%TYPE;
  
  BEGIN
    SELECT lastRoundId,playerLevel,experience into 
           v_lastRoundID,v_level,v_current_exp 
        from Players  
        where playerId=p_playerid;
        
     --verifica daca a mai facut aceasta runda   
    IF(p_roundid<=v_lastRoundID) THEN
      v_punctaj:=p_punctaj*0.2;
    ELSE
      v_punctaj:=p_punctaj;
    END IF;
    -- verifica daca procentul e 100%
    IF(p_procent=1) THEN
    
      v_punctaj:=v_punctaj+v_punctaj*0.5;
      
      UPDATE PlayersStatistics 
      SET PerfectRounds=PerfectRounds+1 
      WHERE playerid=p_playerid;
      
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
    END IF;
    
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
    
    EXCEPTION
					WHEN TWExceptions.insufficient_points
								THEN RAISE_APPLICATION_ERROR(-20006, 'Not avaible this number of skillpoints');
  END update_skill;
  
END player_package;

