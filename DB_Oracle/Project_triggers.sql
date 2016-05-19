--Trigger when user is deleted ( delete from GameUsers => delete from players and playersStatistics)
CREATE OR REPLACE TRIGGER GameUsers_delet
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
commit;