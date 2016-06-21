
-- ########## The Authentication Package - HEAD #########
DROP PACKAGE authentication;
CREATE OR REPLACE PACKAGE authentication IS

	bonusDaily INT := 5;

	FUNCTION loginUser(p_username VARCHAR2, p_password VARCHAR2)
		RETURN INT;
	FUNCTION loginAdmin(p_password GameUsers.password%TYPE)
		RETURN INT;

	PROCEDURE onUserRegister(p_playerID INT, p_username VARCHAR2);
	PROCEDURE updateOnLogin(p_playerID INT);
  PROCEDURE onDeleteGameUser(p_playerID INT);


END authentication;
/


-- ########## The Authentication Package - BODY #########

CREATE OR REPLACE PACKAGE BODY authentication IS

	-- ######## Basic functions ########

	-- Function for user login. Throws exception with messages. If OK => updateOnLogin
	FUNCTION loginUser	(p_username VARCHAR2, p_password VARCHAR2)
		RETURN INT
	AS
		counter    INT;
		v_playerID INT;
		v_password GameUsers.password%TYPE;

	BEGIN

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

			IF counter = 0
			THEN
					RAISE TWExceptions.inexistent_user;
			END IF;

			SELECT
					PLAYERID,
					password
			INTO v_playerID, v_password
					FROM GameUsers
					WHERE USERNAME = p_username;

			IF (v_password <> p_password)
			THEN
          RAISE TWExceptions.wrong_password;
			END IF;

      AUTHENTICATION.UPDATEONLOGIN(v_playerID);
			RETURN v_playerID;

			EXCEPTION
					WHEN TWExceptions.inexistent_user
								THEN RAISE_APPLICATION_ERROR(-20001, 'invalid username');
					WHEN TWExceptions.wrong_password
								THEN RAISE_APPLICATION_ERROR(-20002, 'wrong password');

	END loginUser;


	-- Special function for admin login
	FUNCTION loginAdmin(p_password GameUsers.password%TYPE)
		RETURN INT
	IS
	BEGIN
			RETURN loginUser('admin', p_password);
	END loginAdmin;


	-- Executed when a users logins. Updates daily statistics.
	PROCEDURE updateOnLogin(p_playerID INT)
	IS
		v_date_diff     INT;
		v_dailyLogins   PLAYERSSTATISTICS.DAILYLOGINS%TYPE;
		v_lastLoginDate PLAYERSSTATISTICS.LASTLOGINDATE%TYPE;
		v_bonus         INT;
	BEGIN

			SELECT
				LASTLOGINDATE,
				DAILYLOGINS
			INTO v_lastLoginDate, v_dailyLogins
			FROM PLAYERSSTATISTICS
			WHERE PLAYERID = p_playerID;


			UPDATE PLAYERSSTATISTICS
			SET lastLoginDate = sysdate
			WHERE playerID = p_playerID;

			v_date_diff := TRUNC(sysdate - v_lastLoginDate);

			IF v_date_diff = 1
			THEN
					v_dailyLogins := v_dailyLogins + 1;
					v_bonus := v_dailyLogins * bonusDaily;

					UPDATE PLAYERSSTATISTICS
					SET dailyLogins = dailyLogins + 1
					WHERE playerID = p_playerID;


					UPDATE PLAYERS
					SET experience = experience + v_bonus
					WHERE playerID = p_playerID;

			END IF;

			IF v_date_diff > 1
			THEN
					UPDATE PLAYERSSTATISTICS
					SET dailyLogins = 1
					WHERE playerID = p_playerID;
			END IF;

	END updateOnLogin;


	-- #### For Triggers ###

	-- Trigger when user registers (insert into GameUsers => insert in 2x tables too)
	PROCEDURE onUserRegister(p_playerID INT, p_username VARCHAR2)
	IS
	BEGIN
			INSERT INTO Players (playerID, playerName) VALUES (p_playerID, p_username);
			INSERT INTO PlayersStatistics (playerID) VALUES (p_playerID);
	END onUserRegister;

  -- Trigger when user is deleted ( delete from GameUsers => delete from players and playersStatistics)

  PROCEDURE onDeleteGameUser(p_playerID INT)
  IS
  BEGIN
      EXECUTE IMMEDIATE 'DELETE FROM PLAYERSSTATISTICS WHERE PLAYERID = :PID' USING p_playerID;
      EXECUTE IMMEDIATE 'DELETE FROM PLAYERS WHERE PLAYERID = :PID' USING p_playerID;
		  EXECUTE IMMEDIATE 'DELETE FROM INVENTORIES WHERE PLAYERID = :PID ' USING p_playerID;
  END;
END authentication;
/


commit;
