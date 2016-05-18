set serveroutput on;
create or replace PACKAGE authentication IS
  bonusDaily INT :=5;
  FUNCTION loginUser(p_username VARCHAR2,p_password VARCHAR2) RETURN INT;
  FUNCTION loginAdmin(p_password VARCHAR2) RETURN INT;
  PROCEDURE onUserRegister( p_playerID INT, p_username VARCHAR2);
  PROCEDURE updateOnLogin(p_playerID INT);
END authentication;
/
create or replace PACKAGE BODY authentication IS

  FUNCTION loginUser(p_username VARCHAR2, p_password VARCHAR2 )
    RETURN INT 
    AS
      v_password GameUsers.password%TYPE;
      counter INT;
      v_playerID INT;
    BEGIN
    
      select count(username) into counter from GameUsers
        where username=p_username;
      if counter=0 then
          raise TWExceptions.inexistent_user;
       
      END IF;  
      SELECT PLAYERID,password INTO v_playerID, v_password from GameUsers
          where USERNAME=p_username;
         
        IF(v_password=p_password) THEN
          AUTHENTICATION.UPDATEONLOGIN(v_playerID);
          return 1;
        ELSE
          raise TWExceptions.wrong_password;
          return 0;  
        END IF;
       
       EXCEPTION
       WHEN TWExceptions.inexistent_user 
        THEN RAISE_APPLICATION_ERROR (-20001,'invalid username');
       WHEN TWExceptions.wrong_password
        THEN RAISE_APPLICATION_ERROR (-20002,'wrong password'); 
        
    END loginUser;
  FUNCTION loginAdmin(p_password VARCHAR2) 
    RETURN INT
   IS
    v_password GameUsers.password%TYPE;
   BEGIN
        return loginUser('admin','admin'); 
   END loginAdmin; 
  PROCEDURE onUserRegister( p_playerID INT, p_username VARCHAR2)
  IS
  BEGIN
    INSERT INTO Players (playerName) VALUES (p_username);
    INSERT INTO PlayersStatistics (playerID) VALUES(p_playerID);
  END onUserRegister;
  
  PROCEDURE updateOnLogin(p_playerID INT)
  IS
    v_date_diff INT;
    v_dailyLogins INT;
    v_lastLoginDate DATE;
    v_bonus INT;
  BEGIN
 
    select LASTLOGINDATE , DAILYLOGINS into v_lastLoginDate,  v_dailyLogins from PLAYERSSTATISTICS
      where PLAYERID=p_playerID;
    
    
    UPDATE PLAYERSSTATISTICS
      SET lastLoginDate = sysdate 
      WHERE playerID=p_playerID;
    
    v_date_diff:=TRUNC(sysdate-v_lastLoginDate);
    
    if v_date_diff=1 THEN
      UPDATE PLAYERSSTATISTICS 
        SET dailyLogins=dailyLogins+1
        WHERE playerID=p_playerID;
    END IF;
    IF v_date_diff>1 THEN
      UPDATE PLAYERSSTATISTICS 
        SET dailyLogins=1
        WHERE playerID=p_playerID;
    END IF;
    
    v_bonus:=v_dailyLogins*bonusDaily;
    if v_date_diff>=1 THEN
    UPDATE PLAYERS
        SET experience=experience+v_bonus
        WHERE playerID=p_playerID;   
    END IF;   
  END updateOnLogin;
END authentication;
/
DECLARE
  v_login INT;
BEGIN
 
  --INSERT INTO GameUsers (username, email,password) VALUES ('tuxi','tuxi@gmail.com','123');
  --AUTHENTICATION.UPDATEONLOGIN(1);
  v_login:=AUTHENTICATION.LOGINUSER('tuxi','123');
  SYS.DBMS_OUTPUT.PUT_LINE(v_login);
END;

