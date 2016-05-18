CREATE OR REPLACE PACKAGE Game_Managament
IS
    PROCEDURE itemTransaction(p_playerID INT, p_itemID INT);
    --PROCEDURE loadQuestions(p_roundID INT, x INT);
    --PROCEDURE saveGameHistory(p_playerID1 INT, p_playerID2 INT, p_winnerID INT);
END Game_Managament;
/
CREATE OR REPLACE PACKAGE BODY Game_Managament IS

    PROCEDURE itemTransaction(p_playerID INT, p_itemID INT)
    IS
       v_cookiesPlayer INT;
       v_cookiesCost INT;  
       v_skill VARCHAR2(100);
       v_skillPoints INT;
       counter INT;
    BEGIN
        select count(playerID) into counter from Players
          where playerID=p_playerID;
    if counter=0 then
          raise TWExceptions.inexistent_user;
    END IF; 
    
        select count(itemID) into counter from Items
          where itemID=p_itemID;
    if counter=0 then
          raise TWExceptions.inexistent_item;
    END IF; 
    
        select cookies into  v_cookiesPlayer from Players 
          where playerID=p_playerID;
          
        select cookiesCost, skill, skillPoints into v_cookiesCost, v_skill, v_skillPoints from Items
          where itemID=p_itemID;
        
        IF  v_cookiesPlayer-v_cookiesCost<0 THEN
          raise TWExceptions.insufficient_funds;
        END IF;
       
        
       EXECUTE IMMEDIATE 'UPDATE Players 
                            SET '||v_skill||'='||v_skill||'+ :1 ,
                                cookies = cookies - :2 
                           WHERE playerID = :3' 
               USING v_skillPoints, v_cookiesCost, p_playerID; 
                  
    EXCEPTION
    WHEN TWExceptions.inexistent_user 
        THEN RAISE_APPLICATION_ERROR (-20001,'invalid username');
    WHEN TWExceptions.inexistent_item
        THEN RAISE_APPLICATION_ERROR (-20003,'inexistent_item'); 
    WHEN TWExceptions.insufficient_funds
        THEN RAISE_APPLICATION_ERROR (-20004,'insufficient_funds');     
          
    END itemTransaction;
   -- PROCEDURE loadQuestions(p_roundID INT, x INT);
   -- PROCEDURE saveGameHistory(p_playerID1 INT, p_playerID2 INT, p_winnerID INT);

END Game_Managament;
