
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

END TWExceptions;
