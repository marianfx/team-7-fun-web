
-- ##### The Exceptions Package #####
CREATE OR REPLACE PACKAGE TWExceptions IS

  inexistent_user EXCEPTION;
  PRAGMA EXCEPTION_INIT(inexistent_user, -20001);

  wrong_password EXCEPTION;
  PRAGMA EXCEPTION_INIT(wrong_password, -20002);

  inexistent_item EXCEPTION;
  PRAGMA EXCEPTION_INIT(inexistent_item, -20003);

  insufficient_funds EXCEPTION;
  PRAGMA EXCEPTION_INIT(insufficient_funds, -20004);
  
  inexistent_round EXCEPTION;
  PRAGMA EXCEPTION_INIT(inexistent_round, -20005);
  
  
  insufficient_points EXCEPTION;
  PRAGMA EXCEPTION_INIT(insufficient_points, -20006);


  TABLE_INEXISTENT EXCEPTION;
  PRAGMA EXCEPTION_INIT(TABLE_INEXISTENT, -20007);
  
  insufficient_skill_points EXCEPTION;
  PRAGMA EXCEPTION_INIT(insufficient_skill_points, -20008);
  
  insufficient_luck_points EXCEPTION;
  PRAGMA EXCEPTION_INIT(insufficient_luck_points, -20009);

END TWExceptions;
