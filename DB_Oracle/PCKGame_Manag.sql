
DROP PACKAGE Game_Managament;/
CREATE OR REPLACE PACKAGE Game_Managament
IS
    TYPE general_cursor is REF CURSOR;
    PROCEDURE itemTransaction(p_playerID INT, p_itemID INT);
    PROCEDURE loadQuestions(p_roundID INT, x INT, p_recordset OUT Game_Managament.general_cursor);
    PROCEDURE offsetNextPlayers(pageNumber INT, p_number_rows INT, p_recordset OUT Game_Managament.general_cursor);
    PROCEDURE saveGameHistory(p_playerID1 INT, p_playerID2 INT, p_winnerID INT);
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
    
    SELECT CASE
         WHEN EXISTS(SELECT playerID
                     FROM Players
                     WHERE playerID=p_playerID
         )
           THEN 1
         ELSE 0
         END
     INTO counter
     FROM dual;
     
    IF counter=0 THEN
          raise TWExceptions.inexistent_user;
    END IF; 
    
     SELECT CASE
         WHEN EXISTS(SELECT itemID
                     FROM Items
                     WHERE itemID=p_itemID
         )
           THEN 1
         ELSE 0
         END
     INTO counter
     FROM dual;
     
    IF counter=0 THEN
          raise TWExceptions.inexistent_item;
    END IF; 
    
        SELECT cookies INTO  v_cookiesPlayer FROM Players 
          WHERE playerID=p_playerID;
          
        SELECT cookiesCost, skill, skillPoints INTO v_cookiesCost, v_skill, v_skillPoints from Items
          WHERE itemID=p_itemID;
        
        IF  v_cookiesPlayer-v_cookiesCost<0 THEN
          raise TWExceptions.insufficient_funds;
        END IF;
       
        
       EXECUTE IMMEDIATE 'UPDATE Players 
                            SET '||v_skill||'='||v_skill||'+ :1 ,
                                cookies = cookies - :2 
                           WHERE playerID = :3' 
               USING v_skillPoints, v_cookiesCost, p_playerID; 
       INSERT INTO Inventories VALUES (p_playerID, p_itemID);
                  
    EXCEPTION
    WHEN TWExceptions.inexistent_user 
        THEN RAISE_APPLICATION_ERROR (-20001,'invalid username');
    WHEN TWExceptions.inexistent_item
        THEN RAISE_APPLICATION_ERROR (-20003,'inexistent_item'); 
    WHEN TWExceptions.insufficient_funds
        THEN RAISE_APPLICATION_ERROR (-20004,'insufficient_funds');     
          
    END itemTransaction;
    PROCEDURE loadQuestions(p_roundID INT, x INT, p_recordset OUT Game_Managament.general_cursor)
    IS
        v_nr_questions INT;
        counter INT;
    BEGIN
    
    SELECT CASE
         WHEN EXISTS(SELECT roundID
                     FROM Rounds
                     WHERE roundID=p_roundID
         )
           THEN 1
         ELSE 0
         END
     INTO counter
     FROM dual;
        IF counter=0 THEN
          RAISE TWExceptions.inexistent_round; 
        END IF;
        
    IF x IS NULL THEN
        --## WHEN X IS NULL IT MEANS THAT THE QUESTIONS ARE FOR COURSE ##--
        
        SELECT nrOfQuestions INTO v_nr_questions FROM Rounds
            WHERE ROUNDID = p_roundID;
        OPEN p_recordset FOR
          SELECT * FROM (
                        SELECT *
                        FROM   Questions
                        WHERE  roundID=p_roundID
                        ORDER BY dbms_random.value
                        )
          WHERE ROWNUM<=v_nr_questions;
            
    ELSE    
        --## WHEN X IS NOT NULL IT MEANS THAT THE QUESTIONS ARE FOR BATTLE ##--
        v_nr_questions:=x;
        OPEN p_recordset FOR
          SELECT * FROM (
                        SELECT *
                        FROM   Questions
                        WHERE  roundID<=p_roundID
                        ORDER BY dbms_random.value
                        )
          WHERE ROWNUM<=v_nr_questions;
            
    END IF;
    
                
                      
    END loadQuestions;
   --## procedure for loading pages for top players by experience##--
  PROCEDURE offsetNextPlayers(pageNumber INT, p_number_rows INT, p_recordset OUT Game_Managament.general_cursor)
	IS
		
		countBefore INT;
	
    BEGIN 
        countBefore := (pageNumber - 1) * p_number_rows;
        OPEN p_recordset FOR
        SELECT *
                  FROM ( SELECT experience, playerID, rownum rn
                           FROM ( SELECT experience, playerID
                                    FROM Players
                                   ORDER BY experience DESC
                                ) tmp
                          WHERE rownum <=countBefore + p_number_rows
                       )
                 WHERE rn > countBefore;

    END offsetNextPlayers;
   
   --## WINER ID OR 0(ZERO) WHEN RESULT IS EQUAL ##--
   PROCEDURE saveGameHistory(p_playerID1 INT, p_playerID2 INT, p_winnerID INT)
   IS
   
   BEGIN
        INSERT INTO BattlesHistory (player1ID, player2ID,winner) VALUES(p_playerID1, p_playerID2 , p_winnerID);
        
        IF p_playerID1=p_winnerID 
        THEN
            --#### PLAYER 1 WINS ####--
            PLAYER_PACKAGE.update_battle_end(p_playerID1,1);            
            PLAYER_PACKAGE.update_battle_end(p_playerID2,-1);     
                
        END IF;       
        
        IF p_playerID2=p_winnerID 
        THEN
            --#### PLAYER 2 WINS ####--
            PLAYER_PACKAGE.update_battle_end(p_playerID1,-1);            
            PLAYER_PACKAGE.update_battle_end(p_playerID2,1);     
                
        END IF;        
        
        IF p_winnerID=0 
        THEN
            --#### EQUAL REUSULTS ####--
            PLAYER_PACKAGE.update_battle_end(p_playerID1,0);            
            PLAYER_PACKAGE.update_battle_end(p_playerID2,0);     
                
        END IF;        
        
   END saveGameHistory;

END Game_Managament;
