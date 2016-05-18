CREATE OR REPLACE PACKAGE TWExceptions IS
  
  inexistent_user EXCEPTION;
  PRAGMA EXCEPTION_INIT(inexistent_user, -20001);
  wrong_password EXCEPTION;
  PRAGMA EXCEPTION_INIT(wrong_password, -20002);
  
  

END TWExceptions;