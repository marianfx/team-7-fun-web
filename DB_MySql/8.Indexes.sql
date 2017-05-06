DROP PROCEDURE IF EXISTS CreateIndex;
CREATE PROCEDURE CreateIndex(i_name VARCHAR(1000), t_name VARCHAR(1000), c_name VARCHAR(1000))
BEGIN
  DECLARE is_here INT;
  DECLARE query_str VARCHAR(1000);
  select count(*) INTO is_here from INFORMATION_SCHEMA.statistics where table_name = t_name and index_name = i_name and table_schema = database();
  IF is_here > 0 THEN
    SELECT 'Index already exists' AS Message from dual;
  ELSE
    SET query_str = CONCAT('CREATE INDEX ', i_name, ' ON ', t_name, ' (', c_name, ')');
    CALL executeImmediate(query_str);
  END IF;
END;


CALL CreateIndex('Question_RoundID_INDEX', 'questions', 'ROUNDID');
CALL CreateIndex('Experience_Player_INDEX', 'Players', 'Experience');
CALL CreateIndex('Oldest_Player_INDEX', 'GameUsers', 'RegistrationDate');
CALL CreateIndex('ORDER_GUILDS_INDEX', 'Guilds', 'Wins DESC, Loses ASC');
