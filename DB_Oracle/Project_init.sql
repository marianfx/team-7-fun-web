-- ############# Initial Drops ##########

DROP TABLE GameUsers CASCADE CONSTRAINTS;/

DROP TABLE Friends CASCADE CONSTRAINTS;/

DROP TABLE PlayersStatistics CASCADE CONSTRAINTS;/

DROP TABLE Inventories CASCADE CONSTRAINTS;/

DROP TABLE Items CASCADE CONSTRAINTS;/

DROP TABLE Guilds CASCADE CONSTRAINTS;/

DROP TABLE Players CASCADE CONSTRAINTS;/

DROP TABLE Questions CASCADE CONSTRAINTS;/

DROP TABLE COURSES CASCADE CONSTRAINTS;/

DROP TABLE Rounds CASCADE CONSTRAINTS;/

DROP TABLE BattlesHistory CASCADE CONSTRAINTS;/

DROP TABLE LOGGER_TABLE CASCADE CONSTRAINTS;/
/

CREATE TABLE COURSES
(
    COURSEID INT PRIMARY KEY NOT NULL,
    TITLE VARCHAR2(500) NOT NULL,
    SHORTDESC VARCHAR2(1000) NOT NULL,
    HASHTAG VARCHAR2(100) NOT NULL,
    PHOTOURL VARCHAR2(500) DEFAULT '/images/courses/defaultCourse.png',
    AUTHOR VARCHAR2(200) DEFAULT 'Community',
    CREATIONDATE DATE DEFAULT sysdate
)
/

INSERT INTO COURSES(COURSEID, TITLE, SHORTDESC, HASHTAG, PHOTOURL) VALUES(1, 'Welcome to Fun Web', 'The ''Intro'' into the fun', '#FUNWEB' , 'images/courses/welcome.png')
/
COMMIT;
/

-- ############# Rounds Table ##########
CREATE TABLE Rounds (
	  roundID INT NOT NULL PRIMARY KEY
	, NAME VARCHAR2(100) NOT NULL
  , nrOfQuestions INT DEFAULT 5 NOT NULL
	, course VARCHAR2(4000) NOT NULL
	, roundTime INT DEFAULT 300
  , courseId INT NOT NULL
  , points INT DEFAULT 100 NOT NULL

  ,  FOREIGN KEY (courseId) REFERENCES COURSES(courseId)
	)
/

INSERT INTO ROUNDS(roundID, NAME, NROFQUESTIONS, COURSE, COURSEID) VALUES(1, 'DEFAULT', 5, 'Welcome, we chose a small number of start-up questions for you (PS: You can win some bonuses..)' , 1)
/
COMMIT;
/

-- ############# Questions Table ##########
CREATE TABLE Questions (
	  questionID INT NOT NULL PRIMARY KEY
	, question VARCHAR2(2000) NOT NULL
  , difficulty VARCHAR2(10) DEFAULT 'medium' NOT NULL
	, answerA VARCHAR2(2000) NOT NULL
	, answerB VARCHAR2(2000) NOT NULL
	, answerC VARCHAR2(2000) NOT NULL
	, answerD VARCHAR2(2000) NOT NULL
	, correctAnswer INT NOT NULL
	, roundID INT NOT NULL

	, FOREIGN KEY (roundID) REFERENCES Rounds(roundID)
	)
/

ALTER TABLE Questions ADD CONSTRAINT CK_CORRECT_ANSWER CHECK
(
  1 <= CORRECTANSWER
  AND
  4 >= CORRECTANSWER
)
ENABLE;

ALTER TABLE Questions ADD CONSTRAINT CK_DIFFICULTY CHECK
(
  DIFFICULTY IN('easy','medium','hard')
)
ENABLE;
/


-- ############# Guilds Table ##########
CREATE TABLE Guilds (
	  guildID INT NOT NULL PRIMARY KEY
	, NAME VARCHAR2(100) NOT NULL
	, description VARCHAR2(1000)
	, wins INT DEFAULT 0 NOT NULL
	, loses INT DEFAULT 0 NOT NULL
	)
/

ALTER TABLE Guilds ADD CONSTRAINT CK_WINS_POSITIVITY CHECK
(
  WINS >= 0
)
ENABLE;

ALTER TABLE Guilds ADD CONSTRAINT CK_LOSES_POSITIVITY CHECK
(
  LOSES >= 0
)
ENABLE;
/




-- ############# GameUsers Table ##########
CREATE TABLE GameUsers (
	  playerID INT NOT NULL PRIMARY KEY
	, username VARCHAR2(100) NOT NULL
	, email VARCHAR2(100) NOT NULL
	, password VARCHAR2(100) NOT NULL
	, facebookID VARCHAR2(1000)
	, accessToken VARCHAR2(1000)
	, registrationDate DATE DEFAULT SYSDATE NOT NULL

  , CONSTRAINT user_unique UNIQUE (username)
	, CONSTRAINT email_unique UNIQUE (email)
	)
/
ALTER TABLE GameUsers ADD CONSTRAINT CK_EMAIL_VALID CHECK
(
  REGEXP_LIKE (email , '^[a-zA-Z][a-zA-Z0-9_\.\-]+@([a-zA-Z0-9-]{2,}\.)+([a-zA-Z]{2,4}|[a-zA-Z]{2}\.[a-zA-Z]{2})$')
)
ENABLE;
/
-- ############# Players Table ##########
CREATE TABLE Players (
	  playerID INT NOT NULL PRIMARY KEY
	, playerName VARCHAR2(100) NOT NULL
	, photoURL VARCHAR2(1000) DEFAULT '/images/avatars/defaultPlayer.png' NOT NULL
	, experience INT DEFAULT 0 NOT NULL
	, playerLevel INT DEFAULT 0 NOT NULL
	, cookies INT DEFAULT 0 NOT NULL
	, s_luck INT DEFAULT 0 NOT NULL
	, s_time INT DEFAULT 0 NOT NULL
	, s_cheat INT DEFAULT 0 NOT NULL
  , skillPoints INT DEFAULT 0 NOT NULL
	, lastRoundID INT DEFAULT 1 REFERENCES Rounds(roundID)
	, lastRoundStart DATE
	, guildID INT REFERENCES Guilds(guildID)

	, FOREIGN KEY (playerID) REFERENCES GameUsers(playerID)
	)
/

ALTER TABLE Players ADD CONSTRAINT CK_SKILLPOINTS_AVAILABLE CHECK
(
  SKILLPOINTS >= 0
)
ENABLE;

ALTER TABLE Players ADD CONSTRAINT CK_EXPERIENCE_POSITIVITY CHECK
(
  EXPERIENCE >= 0
)
ENABLE;

ALTER TABLE Players  ADD CONSTRAINT CK_PLAYER_LEVEL_POSITIVITY CHECK
(
  PLAYERLEVEL >= 0
)
ENABLE;

ALTER TABLE Players  ADD CONSTRAINT CK_COOCKIES_POSITIVITY CHECK
(
  COOKIES >= 0
)
ENABLE;

ALTER TABLE Players  ADD CONSTRAINT CK_S_LUCK_POSITIVITY CHECK
(
  S_LUCK >= 0
)
ENABLE;

ALTER TABLE Players  ADD CONSTRAINT CK_S_TIME_POSITIVITY CHECK
(
  S_TIME >= 0
)
ENABLE;

ALTER TABLE Players  ADD CONSTRAINT CK_S_CHEAT_POSITIVITY CHECK
(
  S_CHEAT >= 0
)
ENABLE;

ALTER TABLE Players  ADD CONSTRAINT CK_LROUND_POSITIVITY CHECK
(
  lastRoundID >= 0
)
ENABLE;
/


-- ############# Friends Table ##########
CREATE TABLE Friends (
	  player1ID INT NOT NULL
	, player2ID INT NOT NULL

	, PRIMARY KEY  (
		              player1ID
		            , player2ID
		            )
	, FOREIGN KEY (player1ID) REFERENCES Players(playerID)
	, FOREIGN KEY (player2ID) REFERENCES Players(playerID)
	)
/


-- ############# PlayersStatistics Table ##########
CREATE TABLE PlayersStatistics (
	  playerID INT NOT NULL PRIMARY KEY
	, wins INT DEFAULT 0 NOT NULL
	, loses INT DEFAULT 0 NOT NULL
	, perfectRounds INT DEFAULT 0 NOT NULL
	, dailyLogins INT DEFAULT 1 NOT NULL
	, lastLoginDate DATE DEFAULT SYSDATE NOT NULL

	, FOREIGN KEY (playerID) REFERENCES Players(playerID)
	)
/

ALTER TABLE PlayersStatistics  ADD CONSTRAINT CK_STATISTIC_WINS_POSITIVITY CHECK
(
  WINS >= 0
)
ENABLE;

ALTER TABLE PlayersStatistics  ADD CONSTRAINT CK_STATISTIC_LOSES_POSITIVITY CHECK
(
  LOSES >= 0
)
ENABLE;

ALTER TABLE PlayersStatistics  ADD CONSTRAINT CK_DAILYLOGINS_POSITIVITY CHECK
(
  DAILYLOGINS >= 0
)
ENABLE;
/


-- ############# Items Table ##########
CREATE TABLE Items (
	  itemID INT NOT NULL PRIMARY KEY
	, name VARCHAR2(1000) NOT NULL
	, description VARCHAR2(2000) NOT NULL
	, skillPoints INT -- can be null when the item represents course notes
	, skill VARCHAR2(100) -- same
	, cookiesCost INT NOT NULL
	, filePath VARCHAR2(2000) DEFAULT '/images/items/defaultItem.png' NOT NULL
	)
/

ALTER TABLE Items ADD CONSTRAINT CK_SKILLPOINTS_POSITIVITY CHECK
(
  SKILLPOINTS >= 0
)
ENABLE;

ALTER TABLE Items ADD CONSTRAINT CK_SKILL_TYPE CHECK
(
  SKILL IN ('S_LUCK','S_TIME', 'S_CHEAT')
)
ENABLE;

ALTER TABLE Items ADD CONSTRAINT CK_COOKIESCOST_POSITIVITY CHECK
(
  COOKIESCOST >= 0
)
ENABLE;
/


-- ############# Inventories Table ##########
CREATE TABLE Inventories (
	  playerID INT NOT NULL
	, itemID INT NOT NULL

	, PRIMARY KEY (
		              playerID
		            , itemID
		            )
	, FOREIGN KEY (playerID) REFERENCES Players(playerID)
	, FOREIGN KEY (itemID) REFERENCES Items(itemID)
	)
/


-- ############# BattlesHistory Table ##########
CREATE TABLE BattlesHistory
(
    battleID INT NOT NULL PRIMARY KEY
  , player1ID INT NOT NULL REFERENCES Players(playerID)
  , player2ID INT NOT NULL REFERENCES Players(playerID)
  , winner INT
)
/

ALTER TABLE BattlesHistory ADD CONSTRAINT CK_VALID_WINNER CHECK
(
  WINNER IN (0,1,2)
)
ENABLE;


-- ############# lOGGER_table Table ##########
CREATE TABLE LOGGER_TABLE
(
      DATE_ADDED  DATE
    , OPERATION   VARCHAR2(1000)
)
/

COMMIT;
