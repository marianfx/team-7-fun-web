CREATE OR REPLACE PACKAGE Game_Managament
IS
    PROCEDURE itemTransaction(p_playerID INT, p_itemID INT);
    PROCEDURE loadQuestions(p_roundID INT, x INT);
    PROCEDURE saveGameHistory(p_playerID1 INT, p_playerID2 INT, p_winnerID INT);
END;