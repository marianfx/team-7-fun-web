create or replace PACKAGE authentication IS
  bonusDaily INT := 5;
  FUNCTION loginUser(p_username VARCHAR2,p_password VARCHAR2) RETURN INT;
  FUNCTION loginAdmin(p_password VARCHAR2) RETURN INT;
  PROCEDURE registerUser( p_playerID INT, p_username VARCHAR2); --here you don't need the id (generated automatically), but other info for GameUsers table
  PROCEDURE updateOnLogin(p_playerID INT);
END authentication;
/
create or replace PACKAGE BODY authentication IS

  FUNCTION loginUser(p_username VARCHAR2, p_password VARCHAR2 )
    RETURN INT 
    AS
      v_password GameUsers.password%TYPE;
      
    BEGIN
        SELECT password INTO  v_password from GameUsers
          where USERNAME=p_username;
         
        IF(v_password=p_password) THEN
          return 1;
        ELSE
          return 0;
        END IF;
        EXCEPTION WHEN NO_DATA_FOUND THEN
          SYS.DBMS_OUTPUT.PUT_LINE('wrong password or username');
          return 0;
        
    END loginUser;
  FUNCTION loginAdmin(p_password VARCHAR2) 
    RETURN INT
   IS
    v_password GameUsers.password%TYPE;
   BEGIN
        SELECT password INTO v_password from GameUsers
          where USERNAME='admin';
         
        IF(v_password=p_password) THEN
          return 1;
        ELSE
          return 0;
        END IF;
        EXCEPTION WHEN NO_DATA_FOUND THEN
          SYS.DBMS_OUTPUT.PUT_LINE('wrong password for admin');
          return 0;
      
        
    END loginAdmin; 
  PROCEDURE registerUser( p_playerID INT, p_username VARCHAR2)
  IS
  BEGIN
    INSERT INTO Players (playerName) VALUES (p_username);
    INSERT INTO PlayersStatistics (playerID) VALUES(p_playerID);
  END registerUser;
  
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
    
    UPDATE PLAYERS
        SET experience=experience+v_bonus
        WHERE playerID=p_playerID;   
       
  END updateOnLogin;
END authentication;
/

BEGIN
 
 -- INSERT INTO GameUsers (username, email,password) VALUES ('tuxi','tuxi@gmail.com','123');
  AUTHENTICATION.UPDATEONLOGIN(1); 
END;

