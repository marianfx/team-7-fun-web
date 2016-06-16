DROP SEQUENCE playerID_seq;/
DROP SEQUENCE questionID_seq;/
DROP SEQUENCE roundID_seq;/
DROP SEQUENCE itemID_seq;/
DROP SEQUENCE guildID_seq;/
DROP SEQUENCE battleID_seq;/
DROP SEQUENCE courseID_seq;/
/

-- ##### Sequences for the required tables #####
CREATE SEQUENCE playerID_seq
  MINVALUE 1
  START WITH 1
  INCREMENT BY 1;
/
CREATE SEQUENCE questionID_seq
  MINVALUE 1
  START WITH 1
  INCREMENT BY 1;
/
CREATE SEQUENCE roundID_seq
  MINVALUE 1
  START WITH 1
  INCREMENT BY 1;
/
CREATE SEQUENCE itemID_seq
  MINVALUE 1
  START WITH 1
  INCREMENT BY 1;
/
CREATE SEQUENCE guildID_seq
  MINVALUE 1
  START WITH 1
  INCREMENT BY 1;
/
CREATE SEQUENCE battleID_seq
  MINVALUE 1
  START WITH 1
  INCREMENT BY 1;
/

CREATE SEQUENCE courseID_seq
  MINVALUE 1
  START WITH 1
  INCREMENT BY 1;

-- ##### Triggers for the sequences ####


CREATE OR REPLACE TRIGGER Question_ins
BEFORE INSERT ON Questions
FOR EACH ROW
BEGIN
  :new.questionID := questionID_seq.NEXTVAL;
END;
/


CREATE OR REPLACE TRIGGER Round_ins
BEFORE INSERT ON Rounds
FOR EACH ROW
BEGIN
  :new.roundID := roundID_seq.NEXTVAL;
END;
/


CREATE OR REPLACE TRIGGER Item_ins
BEFORE INSERT ON Items
FOR EACH ROW
BEGIN
  :new.itemID := itemID_seq.NEXTVAL;
END;
/


CREATE OR REPLACE TRIGGER Guild_ins
BEFORE INSERT ON Guilds
FOR EACH ROW
BEGIN
  :new.guildID := guildID_seq.NEXTVAL;
END;
/


CREATE OR REPLACE TRIGGER BattlesHistory_ins
BEFORE INSERT ON BattlesHistory
FOR EACH ROW
BEGIN
  :new.battleID := battleID_seq.NEXTVAL;
END;
/


CREATE OR REPLACE TRIGGER GameUsers_ins
BEFORE INSERT ON GameUsers
FOR EACH ROW
BEGIN
  :new.playerID := playerID_seq.NEXTVAL;
END;
/

CREATE OR REPLACE TRIGGER Courser_ins
BEFORE INSERT ON Courses
FOR EACH ROW
BEGIN
  :new.CourseID := courseID_seq.NEXTVAL;
END;
/


COMMIT;
