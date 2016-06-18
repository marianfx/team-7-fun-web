--Trigger when user is deleted ( delete from GameUsers => delete from players and playersStatistics)

CREATE OR REPLACE TRIGGER GameUsers_delete
AFTER DELETE ON GameUsers
FOR EACH ROW
BEGIN
  AUTHENTICATION.onDeleteGameUser(:old.PLAYERID);
END;

/

--Trigger when user is iserted  in game-user (insert into GameUsers=> insert into playersStatistics and Players)
CREATE OR REPLACE TRIGGER GameUsers_ins_After
AFTER INSERT ON GameUsers
FOR EACH ROW
BEGIN
  AUTHENTICATION.onUserRegister(:new.PLAYERID,:new.username);
END;
/

-- THIS TRIGGER LOGS INFORMATION WHEN AN USER REGISTERS / UPDATES PERSONAL INFO / DELETES HIS ACCOUNT
CREATE OR REPLACE TRIGGER T_LOGGER_GAMEUSERS
      AFTER
        INSERT OR
        UPDATE OR
        DELETE
      ON GAMEUSERS
      FOR EACH ROW
DECLARE
      ALREADY_UPDATED   NUMBER(1);
      OPERATION         VARCHAR2(1000);
      DATE_TO_INSERT    DATE;
BEGIN
      CASE
        -- ####################################
        -- ######## ON INSERT #################
        -- ####################################
        WHEN INSERTING THEN

            -- add something default to data_notare if inexistent
           OPERATION := 'User with USERNAME ' || :NEW.USERNAME || ', MAIL ' || :NEW.EMAIL || ' registered. ID assigned: ' || :new.PLAYERID;

            EXECUTE IMMEDIATE 'INSERT INTO LOGGER_TABLE VALUES(:DATE_ADDED, :OPERATION)' USING SYSDATE, OPERATION;

        -- ####################################
        -- ######## ON UPDATE #################
        -- ####################################
        WHEN UPDATING THEN

            OPERATION := 'User with USERNAME ' || :old.USERNAME || ', MAIL ' || :old.EMAIL || ' updated info to: '  || :new.USERNAME || ', ' || :new.EMAIL || ', ' || :new.FACEBOOKID;

            EXECUTE IMMEDIATE 'INSERT INTO LOGGER_TABLE VALUES(:DATE_ADDED, :OPERATION)' USING SYSDATE, OPERATION;

        -- ####################################
        -- ######## ON DELETE #################
        -- ####################################
        WHEN DELETING THEN


          OPERATION := 'Player ' || :old.USERNAME || ' deleted his account.';
          EXECUTE IMMEDIATE 'INSERT INTO LOGGER_TABLE VALUES(:DATE_ADDED, :QUERY_STR)' USING SYSDATE, OPERATION;

      END CASE;
EXCEPTION
      -- EXCEPTION WHEN LOGGER TABLE DOES NOT EXIST. STILL, DO NOT INTRERUPT THE CURRENT OP.
      WHEN OTHERS THEN
          DBMS_OUTPUT.PUT_LINE('Cannot log info about operation because logger table does not exist.');
END;

/
-- THIS TRIGGER LOGS INFORMATION WHEN AN USER UPGRADES (PLAYERS TABLE)
CREATE OR REPLACE TRIGGER T_LOGGER_PLAYERS
      AFTER
        UPDATE
      ON PLAYERS
      FOR EACH ROW
DECLARE
      OPERATION         VARCHAR2(1000);
BEGIN
        -- ####################################
        -- ######## ON UPDATE #################
        -- ####################################

        IF TRIM(:OLD.PLAYERNAME) <> TRIM(:NEW.PLAYERNAME)
        THEN
            OPERATION := 'Player with name ' || :old.PLAYERNAME || ' just updated it''s player name to ' || :new.PLAYERNAME;
        ELSE
            OPERATION := 'User with USERNAME ' || :old.PLAYERNAME || ' just upgraded.
            New data: ' || :new.EXPERIENCE || ', ' || :NEW.PLAYERLEVEL || ', ' || :NEW.COOKIES || ', ' || :NEW.S_CHEAT || ', ' || :NEW.S_LUCK || ', ' || :NEW.S_TIME || ', ' || :NEW.SKILLPOINTS ;
        END IF;

        EXECUTE IMMEDIATE 'INSERT INTO LOGGER_TABLE VALUES(:DATE_ADDED, :OPERATION)' USING SYSDATE, OPERATION;

EXCEPTION
      -- EXCEPTION WHEN LOGGER TABLE DOES NOT EXIST. STILL, DO NOT INTRERUPT THE CURRENT OP.
      WHEN OTHERS THEN
          DBMS_OUTPUT.PUT_LINE('Cannot log info about operation because logger table does not exist.');
END;

/
-- THIS TRIGGER LOGS INFORMATION WHEN AN USER wins / loses / logins (PLAYERS TABLE)
CREATE OR REPLACE TRIGGER T_LOGGER_STATISTICS
      AFTER
        UPDATE
      ON PLAYERSSTATISTICS
      FOR EACH ROW
DECLARE
      OPERATION         VARCHAR2(5000);
      P_PNAME           PLAYERS.PLAYERNAME%TYPE;
BEGIN
        SELECT PLAYERNAME INTO P_PNAME FROM PLAYERS WHERE PLAYERID = :OLD.PLAYERID;

        -- ####################################
        -- ######## ON UPDATE #################
        -- ####################################
        OPERATION := '';
        IF :OLD.WINS <> :NEW.WINS THEN
            OPERATION := 'Player named ' || P_PNAME || ' just WON a game.';
        END IF;

        IF :OLD.LOSES <> :NEW.LOSES THEN
            OPERATION := 'Player named ' || P_PNAME || ' just LOST a game.';
        END IF;

        IF :OLD.LASTLOGINDATE <> :NEW.LASTLOGINDATE THEN
            OPERATION := 'Player named ' || P_PNAME || ' just LOGGED IN.';
        END IF;

        IF :OLD.PERFECTROUNDS <> :NEW.PERFECTROUNDS THEN
            OPERATION := 'Player named ' || P_PNAME || ' upgraded perfect rounds.';
        END IF;

        IF OPERATION IS NOT NULL
        THEN
            EXECUTE IMMEDIATE 'INSERT INTO LOGGER_TABLE VALUES(:DATE_ADDED, :OPERATION)' USING SYSDATE, OPERATION;
        END IF;

EXCEPTION
      -- EXCEPTION WHEN LOGGER TABLE DOES NOT EXIST. STILL, DO NOT INTRERUPT THE CURRENT OP.
      WHEN NO_DATA_FOUND THEN
          DBMS_OUTPUT.PUT_LINE('Cannot retrieve data about the player from the players table;');
      WHEN OTHERS THEN
          DBMS_OUTPUT.PUT_LINE('Cannot log info about operation because logger table does not exist.');
END;

/
-- THIS TRIGGER LOGS INFORMATION WHEN two users became friends
CREATE OR REPLACE TRIGGER T_LOGGER_FRIENDS
      AFTER
        INSERT
      ON FRIENDS
      FOR EACH ROW
DECLARE
      OPERATION          VARCHAR2(1000);
      P_FPNAME           PLAYERS.PLAYERNAME%TYPE;
      P_SPNAME           PLAYERS.PLAYERNAME%TYPE;
BEGIN
        SELECT PLAYERNAME INTO P_FPNAME FROM PLAYERS WHERE PLAYERID = :NEW.PLAYER1ID;
        SELECT PLAYERNAME INTO P_SPNAME FROM PLAYERS WHERE PLAYERID = :NEW.PLAYER2ID;

        -- ####################################
        -- ######## ON UPDATE #################
        -- ####################################

        OPERATION := 'Player ' || P_FPNAME || ' just became friend with ' || P_SPNAME;

        EXECUTE IMMEDIATE 'INSERT INTO LOGGER_TABLE VALUES(:DATE_ADDED, :OPERATION)' USING SYSDATE, OPERATION;

EXCEPTION
      -- EXCEPTION WHEN LOGGER TABLE DOES NOT EXIST. STILL, DO NOT INTRERUPT THE CURRENT OP.
      WHEN NO_DATA_FOUND THEN
          DBMS_OUTPUT.PUT_LINE('Cannot retrieve data about the player from the players table;');
      WHEN OTHERS THEN
          DBMS_OUTPUT.PUT_LINE('Cannot log info about operation because logger table does not exist.');
END;

/
commit;
