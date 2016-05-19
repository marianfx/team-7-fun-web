DROP INDEX Question_RoundID_INDEX;
DROP INDEX Experience_Player_INDEX;
DROP INDEX Oldest_Player_INDEX;
DROP INDEX ORDER_GUILDS_INDEX;

CREATE INDEX Question_RoundID_INDEX ON Questions (RoundID);
CREATE INDEX Experience_Player_INDEX ON Players (Experience);
CREATE INDEX Oldest_Player_INDEX ON GameUsers (RegistrationDate);
CREATE INDEX ORDER_GUILDS_INDEX ON Guilds (Wins DESC, Loses ASC); 