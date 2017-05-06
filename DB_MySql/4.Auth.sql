
########## The Authentication Package - HEAD #########
	# bonusDaily INT := 5;
########## The Authentication Package - BODY #########
######## Basic functions ########

# Function for user login. Throws exception with messages. If OK => updateOnLogin
DROP FUNCTION IF EXISTS loginUser;
CREATE FUNCTION loginUser(p_username VARCHAR(2000), p_password VARCHAR(2000))
  RETURNS INT
BEGIN
  DECLARE counter    INT;
  DECLARE v_playerID INT;
  DECLARE v_password VARCHAR(100);

  SELECT CASE
     WHEN EXISTS(SELECT username
                 FROM GameUsers
                 WHERE username = p_username
     )
       THEN 1
     ELSE 0
     END
  INTO counter
  FROM dual;

  IF counter = 0 THEN
        SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'Invalid username.';
  END IF;

  SELECT
      PLAYERID,
      password
  INTO v_playerID, v_password
      FROM GameUsers
      WHERE USERNAME = p_username;

    IF (v_password <> p_password) THEN
        SIGNAL SQLSTATE '45002' SET MESSAGE_TEXT = 'Wrong password.';
    END IF;

    CALL updateOnLogin(v_playerID);
    RETURN v_playerID;
END;


# Special function for admin login
DROP FUNCTION IF EXISTS loginAdmin;
CREATE FUNCTION loginAdmin(p_password VARCHAR(100))
	RETURNS INT
BEGIN
		RETURN loginUser('admin', p_password);
END;


# Executed when a users logins. Updates daily statistics.
DROP PROCEDURE IF EXISTS updateOnLogin;
CREATE PROCEDURE updateOnLogin(p_playerID INT)
BEGIN
	DECLARE v_date_diff     INT;
	DECLARE v_dailyLogins   INT;
	DECLARE v_lastLoginDate TIMESTAMP;
	DECLARE v_bonus         INT;
	DECLARE bonusDaily INT;
	SET bonusDaily = 5;

	SELECT
		LASTLOGINDATE,
		DAILYLOGINS
	INTO v_lastLoginDate, v_dailyLogins
	FROM PLAYERSSTATISTICS
	WHERE PLAYERID = p_playerID;


	UPDATE PLAYERSSTATISTICS SET lastLoginDate = NOW() WHERE playerID = p_playerID;

	SET v_date_diff = FLOOR(NOW() - v_lastLoginDate);

	IF v_date_diff = 1 THEN
			SET v_dailyLogins = v_dailyLogins + 1;
			SET v_bonus = v_dailyLogins * bonusDaily;

			UPDATE PLAYERSSTATISTICS SET dailyLogins = dailyLogins + 1 WHERE playerID = p_playerID;

			UPDATE PLAYERS SET experience = experience + v_bonus WHERE playerID = p_playerID;
	END IF;

	IF v_date_diff > 1 THEN
			UPDATE PLAYERSSTATISTICS SET dailyLogins = 1 WHERE playerID = p_playerID;
	END IF;

END;


#### For Triggers ###
# Trigger when user registers (insert into GameUsers => insert in 2x tables too)
DROP PROCEDURE IF EXISTS onUserRegister;
CREATE PROCEDURE onUserRegister(p_playerID INT, p_username VARCHAR(100))
BEGIN
    INSERT INTO Players (playerID, playerName) VALUES (p_playerID, p_username);
    INSERT INTO PlayersStatistics (playerID) VALUES (p_playerID);
END;

# Trigger when user is deleted ( delete from GameUsers => delete from players and playersStatistics)
DROP PROCEDURE IF EXISTS onDeleteGameUser;
CREATE PROCEDURE onDeleteGameUser(p_playerID INT)
BEGIN
    DECLARE query_str VARCHAR(2000);
    SET query_str = CONCAT('DELETE FROM PLAYERSSTATISTICS WHERE PLAYERID = ', p_playerID);
    CALL executeImmediate(query_str);

    SET query_str = CONCAT('DELETE FROM PLAYERS WHERE PLAYERID = ', p_playerID);
    CALL executeImmediate(query_str);

    SET query_str = CONCAT('DELETE FROM INVENTORIES WHERE PLAYERID = ', p_playerID);
    CALL executeImmediate(query_str);
END;

COMMIT;
