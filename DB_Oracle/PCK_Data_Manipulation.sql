-- ########## The Data Manipulation Package - HEAD #########
-- Obs - a folder  C:\odata is required --
DROP PACKAGE data_manipulation;/
CREATE OR REPLACE PACKAGE data_manipulation IS

		-- holds an object with a name, optional type, and code (eg. comma separated values)
		TYPE KVPAIR IS RECORD (
															NAME VARCHAR2(100)
														, OTYPE VARCHAR2(100)
														, CODE VARCHAR2(32767)
													);
		-- the table of that object
		TYPE KVDICT IS TABLE OF KVPAIR;


		PROCEDURE WRITE_TO_FILE(DICTIONARY IN KVDICT, FILE_NAME VARCHAR2);
		PROCEDURE WRITE_DATA_TO_CSV(TAB_NAME IN VARCHAR2);
		PROCEDURE EXPORT_ALL_TABLES_TO_CSV;

    PROCEDURE READ_FROM_FILE(DICTIONARY OUT KVDICT, FILE_NAME VARCHAR2);
		PROCEDURE LOAD_DATA_FROM_CSV(FILE_NAME VARCHAR2, TAB_NAME VARCHAR2);
		FUNCTION  ISDATE(P_DATE VARCHAR2) RETURN INTEGER;

		PROCEDURE GET_OBJECT_INFO(OBJECTTYPE IN VARCHAR2, OBJECTNAME IN VARCHAR2, LISTTOADDIN IN OUT KVDICT);
    PROCEDURE ADD_INDEXES_TO_DICT(DICTIONARY IN OUT KVDICT);
    PROCEDURE DROP_INDEXES;
    PROCEDURE ADD_INDEXES_BACK(DICTIONARY IN KVDICT);

		PROCEDURE  populate_players;
		PROCEDURE  populate_questions;
		PROCEDURE  populate_rounds;

END data_manipulation;
/


-- ########## The Authentication Package - BODY #########

CREATE OR REPLACE PACKAGE BODY data_manipulation
IS

	-- writes to the specified file
	-- THE CREATION OF THE DIRECTORY
	----------------------------------
	-- CREATE OR REPLACE DIRECTORY ODATA AS 'C:\odata';
  -- GRANT READ ON DIRECTORY ODATA TO user_name;
  -- GRANT WRITE ON DIRECTORY ODATA TO user_name;
  -- GRANT EXECUTE ON SYS.utl_file TO user_name;
  -----------------------------------
	PROCEDURE WRITE_TO_FILE(DICTIONARY IN KVDICT, FILE_NAME VARCHAR2)
	IS
	  O_FILE UTL_FILE.FILE_TYPE;
	BEGIN
	    -- OPEN THE FILE
	    O_FILE := UTL_FILE.FOPEN('ODATA', FILE_NAME, 'W');

	    -- see about csv headers
      UTL_FILE.PUT_LINE(O_FILE, 'sep=,');

			FOR I IN 1..DICTIONARY.COUNT
			LOOP
					UTL_FILE.PUT_LINE(O_FILE, DICTIONARY(I).CODE);
			END LOOP;

			UTL_FILE.FCLOSE(O_FILE);
	END;


	-- COMPUTE THE DATA NEEDED FOR THE SPECIFIED TABLE, TO WRITE IT TO THE FILE (CSV-STYLE)
	-- CAN THROW TWEXCEPTIOS.TABLE_INEXISTENT
  PROCEDURE WRITE_DATA_TO_CSV(TAB_NAME IN VARCHAR2)
  IS
      REFCUR SYS_REFCURSOR;

      V_REFCUR_OUTPUT   VARCHAR2(32000);
      COL_NAME          USER_TAB_COLUMNS.COLUMN_NAME%TYPE;
      COL_TYPE          USER_TAB_COLUMNS.DATA_TYPE%TYPE;
      QSTR_ROW          VARCHAR2(32000);
      Q_QUERY           VARCHAR2(32000);
      Q_INSERT          VARCHAR2(32000);
      DICTIONARY        KVDICT;           -- THE DICT HOLDING ROWS FROM THE TABLE

      V_EXISTS INT;
  BEGIN

      DICTIONARY := KVDICT();

      -- CHECK TABLE EXISTANCE
      SELECT COUNT(1) INTO V_EXISTS FROM USER_TABLES WHERE TABLE_NAME = UPPER(TAB_NAME);
      IF(V_EXISTS = 0) THEN RAISE TWExceptions.TABLE_INEXISTENT; END IF;

      -- first, form the query string to collect data
      Q_QUERY := 'SELECT COLUMN_NAME, DATA_TYPE FROM USER_TAB_COLUMNS WHERE TABLE_NAME = ''' || UPPER(TAB_NAME) || ''' ';
      QSTR_ROW := '';
      OPEN REFCUR FOR Q_QUERY;
      LOOP
          FETCH REFCUR INTO COL_NAME, COL_TYPE;
          EXIT WHEN REFCUR%NOTFOUND;

          -- CHECK FOR DATE/DATETIME/TIMESTAMP, SO WE CAN NORMALIZE IT
          IF TRIM(COL_TYPE) IN ('DATE', 'DATETIME', 'TIMESTAMP')
          THEN
              QSTR_ROW := QSTR_ROW || 'TO_CHAR(' || COL_NAME || ', ''YYYY-MM-DD HH:MI:SS'')' || ' || '','' || ';
          ELSE
              QSTR_ROW := QSTR_ROW || COL_NAME || ' || '','' || ';
          END IF;
      END LOOP;
      QSTR_ROW := substr(QSTR_ROW, 0, LENGTH(QSTR_ROW) - 10);


      Q_QUERY := 'SELECT ' || QSTR_ROW || ' FROM ' || UPPER(TAB_NAME) ||'';
      -- DBMS_OUTPUT.PUT_LINE(Q_QUERY);

      Q_INSERT := '';

      OPEN REFCUR FOR Q_QUERY;
      LOOP
          FETCH REFCUR INTO V_REFCUR_OUTPUT;
          EXIT WHEN REFCUR%NOTFOUND;

          DICTIONARY.EXTEND;
          DICTIONARY(DICTIONARY.COUNT).NAME := 'ROW';
          DICTIONARY(DICTIONARY.COUNT).OTYPE := 'ROW';
          DICTIONARY(DICTIONARY.COUNT).CODE := V_REFCUR_OUTPUT;
      END LOOP;

      -- HERE, WRITE TO THE FILE
      WRITE_TO_FILE(DICTIONARY, UPPER(TAB_NAME) || '.csv');

  EXCEPTION
      WHEN TWExceptions.TABLE_INEXISTENT THEN
          RAISE_APPLICATION_ERROR(-20005, 'The table ' || TAB_NAME || ' does not exist.');
  END;


  -- writes the data from all the tables of the database to separate csv files
  -- because it calls WRITE_DATA_TO_CSV, it can also throw the TABLE_INEXISTENT exception
  PROCEDURE EXPORT_ALL_TABLES_TO_CSV
  IS
    OBJ_CURSOR SYS_REFCURSOR;
    QUERY_STR VARCHAR2(3000);
    OBJ_NAME USER_OBJECTS.OBJECT_NAME%TYPE;
  BEGIN

      QUERY_STR := 'SELECT OBJECT_NAME
                  FROM USER_OBJECTS WHERE OBJECT_NAME NOT LIKE ''SYS_C%'' AND OBJECT_TYPE = ''TABLE''';

      OPEN OBJ_CURSOR FOR QUERY_STR;
      LOOP
          FETCH OBJ_CURSOR INTO OBJ_NAME;
          EXIT WHEN OBJ_CURSOR%NOTFOUND;

          WRITE_DATA_TO_CSV(OBJ_NAME);
      END LOOP;
      CLOSE OBJ_CURSOR;
  END;


  -- RETURNS 1 IF THE GIVEN CHAR IS A DATE WITH THE FORMAT YYYY-MM-DD HH:MI:SS (AS SAVED), 0 OTHERWISE
  FUNCTION  ISDATE(P_DATE VARCHAR2) RETURN INTEGER
  IS
    V_DATE    DATE;
    V_RESULT  INTEGER;
  BEGIN
      BEGIN
          V_DATE := TO_DATE(P_DATE, 'YYYY-MM-DD HH:MI:SS');

          IF(TRIM(V_DATE) IS NOT NULL)
          THEN
              V_RESULT := 1;
          END IF;
      EXCEPTION
          WHEN OTHERS THEN
              V_RESULT := 0;
      END;

      RETURN V_RESULT;
  END;


  -- READS THE DATA FROM THE FILE INTO THE SPECIFIED DICTIONARY
  PROCEDURE READ_FROM_FILE(DICTIONARY OUT KVDICT, FILE_NAME VARCHAR2)
	IS
	  O_FILE  UTL_FILE.FILE_TYPE;
	  LINE    VARCHAR2(32000);
	BEGIN
	    -- OPEN THE FILE
	    O_FILE := UTL_FILE.FOPEN('ODATA', FILE_NAME, 'R');

      -- SEPARATOR
      UTL_FILE.GET_LINE(O_FILE, LINE);

      DICTIONARY := KVDICT();

      LOOP
          BEGIN
              UTL_FILE.GET_LINE(O_FILE, LINE);


              DICTIONARY.EXTEND;
              DICTIONARY(DICTIONARY.COUNT).NAME := 'ROW';
              DICTIONARY(DICTIONARY.COUNT).OTYPE := 'ROW';
              DICTIONARY(DICTIONARY.COUNT).CODE := LINE;

          EXCEPTION
              WHEN NO_DATA_FOUND THEN EXIT;
          END;

      END LOOP;

			UTL_FILE.FCLOSE(O_FILE);
	END;


  -- LOADS AND INSERTS THE DATA FROM THAT FILE INTO THE SPECIFIED TABLE
	PROCEDURE LOAD_DATA_FROM_CSV(FILE_NAME VARCHAR2, TAB_NAME VARCHAR2)
	IS
	  DICTIONARY  KVDICT;
	  V_EXISTS    INT;
	  Q_INSERT    VARCHAR2(32000);


    REFCUR SYS_REFCURSOR;
    Q_QUERY VARCHAR2(32000);
    V_REFCUR_OUTPUT VARCHAR2(10000);

	BEGIN

	    -- CHECK TABLE EXISTANCE
      SELECT COUNT(1) INTO V_EXISTS FROM USER_TABLES WHERE TABLE_NAME = UPPER(TAB_NAME);
      IF(V_EXISTS = 0) THEN RAISE TWExceptions.TABLE_INEXISTENT; END IF;

      -- 1. READ FROM FILE
      READ_FROM_FILE(DICTIONARY, FILE_NAME);

      -- 2. INSERT DATA
      FOR I IN 1..DICTIONARY.COUNT
      LOOP
          Q_INSERT := DICTIONARY(I).CODE;
          Q_INSERT := '''' || REPLACE(Q_INSERT, ',', ''',''') || '''';

          -- parse for dates
          Q_QUERY := 'select regexp_substr(''' || REPLACE(Q_INSERT, '''', '''''') || ''',''[^,]+'', 1, level) from dual connect by regexp_substr(''' || REPLACE(Q_INSERT, '''', '''''') || ''',''[^,]+'', 1, level) is not null';
--           DBMS_OUTPUT.PUT_LINE(Q_QUERY);

          Q_INSERT := '';

          OPEN REFCUR FOR Q_QUERY;
          LOOP
              FETCH REFCUR INTO V_REFCUR_OUTPUT;
              EXIT WHEN REFCUR%NOTFOUND;

              IF(ISDATE(REPLACE(V_REFCUR_OUTPUT, '''', '')) = 1)
              THEN
                  Q_INSERT := Q_INSERT || ' TO_DATE(' || V_REFCUR_OUTPUT || ', ''YYYY-MM-DD HH:MI:SS'')' || ',' ;
              ELSE
                  Q_INSERT := Q_INSERT || ' ' || V_REFCUR_OUTPUT || ',' ;
              END IF;

          END LOOP;

          Q_INSERT := substr(Q_INSERT, 0, LENGTH(Q_INSERT) - 1);
--           DBMS_OUTPUT.PUT_LINE(Q_INSERT);

          Q_INSERT := 'INSERT INTO ' || TAB_NAME || ' VALUES(' || Q_INSERT || ')';
          EXECUTE IMMEDIATE Q_INSERT;

      END LOOP;

      EXECUTE IMMEDIATE 'COMMIT';
  EXCEPTION
      WHEN TWExceptions.TABLE_INEXISTENT THEN
          RAISE_APPLICATION_ERROR(-20005, 'The table ' || TAB_NAME || ' does not exist.');
	END LOAD_DATA_FROM_CSV;


	-- GETS THE INFO ABOUT AN OBJECT (DDL CODE) AND PUTS IT INSIDE THE LIST TO ADD IN
  PROCEDURE GET_OBJECT_INFO(
                              OBJECTTYPE IN VARCHAR2
                            , OBJECTNAME IN VARCHAR2
                            , LISTTOADDIN IN OUT KVDICT
                            )
  AS
    METADATA    VARCHAR2(32767);
    SCHEMA_NAME VARCHAR2(1000);
  BEGIN
      -- maybe there is something wrong with the metadata (object deprecately deleted or smth)
      SELECT USER INTO SCHEMA_NAME FROM DUAL;

      BEGIN
          METADATA := DBMS_METADATA.GET_DDL(OBJECTTYPE, OBJECTNAME);
          METADATA := REPLACE(METADATA, '"' || SCHEMA_NAME || '".', '');
      EXCEPTION
            WHEN OTHERS THEN
              METADATA := 'SELECT ''Wrong code metadata for ' || OBJECTNAME || ''' from dual;\';
              DBMS_OUTPUT.PUT_LINE('EXCEPTION CATCHED:');
              DBMS_OUTPUT.PUT_LINE( SQLERRM );
              DBMS_OUTPUT.PUT_LINE( DBMS_UTILITY.FORMAT_ERROR_BACKTRACE );
      END;

      LISTTOADDIN.EXTEND;
      LISTTOADDIN(LISTTOADDIN.COUNT).NAME := OBJECTNAME;
      LISTTOADDIN(LISTTOADDIN.COUNT).OTYPE := OBJECTTYPE;
      LISTTOADDIN(LISTTOADDIN.COUNT).CODE := METADATA;
  END;


  -- ADDS ALL INDEXES (THE ONES NOT PRIMARY KEYS) TO THE DICTIONARY
  PROCEDURE ADD_INDEXES_TO_DICT(DICTIONARY IN OUT KVDICT)
  IS
    OBJ_CURSOR SYS_REFCURSOR;
    OBJ_TYPE USER_OBJECTS.OBJECT_TYPE%TYPE;
    OBJ_NAME USER_OBJECTS.OBJECT_NAME%TYPE;
    QUERY_STR VARCHAR2(5000);
  BEGIN
      QUERY_STR := 'SELECT OBJECT_TYPE, OBJECT_NAME
                    FROM USER_OBJECTS WHERE OBJECT_TYPE = ''INDEX'' AND OBJECT_NAME NOT LIKE ''SYS_C%'' AND OBJECT_NAME NOT LIKE ''%UNIQUE''';

      QUERY_STR := QUERY_STR || ' ORDER BY OBJECT_ID';

      OPEN OBJ_CURSOR FOR QUERY_STR;
      LOOP
          FETCH OBJ_CURSOR INTO OBJ_TYPE, OBJ_NAME;
          EXIT WHEN OBJ_CURSOR%NOTFOUND;

          -- REPLACE SPACES WITH '-' - FOR DDL
          OBJ_TYPE := REPLACE(OBJ_TYPE, ' ', '_');

          GET_OBJECT_INFO(OBJ_TYPE, OBJ_NAME, DICTIONARY);
          dbms_output.PUT_LINE(DICTIONARY(DICTIONARY.COUNT).CODE);
      END LOOP;
      CLOSE OBJ_CURSOR;
  END;


  -- DROPS ALL NON PK INDEXES, SILENTLY CATCHING THE ERRORS
  PROCEDURE DROP_INDEXES
  IS
    OBJ_CURSOR SYS_REFCURSOR;
    OBJ_NAME USER_OBJECTS.OBJECT_NAME%TYPE;
    QUERY_STR VARCHAR2(5000);
  BEGIN
      QUERY_STR := 'SELECT OBJECT_NAME
                    FROM USER_OBJECTS WHERE OBJECT_TYPE = ''INDEX'' AND OBJECT_NAME NOT LIKE ''SYS_C%'' AND OBJECT_NAME NOT LIKE ''%UNIQUE''';

      QUERY_STR := QUERY_STR || ' ORDER BY OBJECT_ID';

      OPEN OBJ_CURSOR FOR QUERY_STR;
      LOOP
          FETCH OBJ_CURSOR INTO OBJ_NAME;
          EXIT WHEN OBJ_CURSOR%NOTFOUND;

          EXECUTE IMMEDIATE 'DROP INDEX ' || OBJ_NAME;
      END LOOP;

      CLOSE OBJ_CURSOR;

  EXCEPTION
      WHEN OTHERS THEN
          DBMS_OUTPUT.PUT_LINE(SQLERRM);
  END;


  -- ADD THE INDEXES BACK AFTER THE OPERATIONS. SILENTLY DISPLAYS EVENTUAL ERRORS TO NOT INTRERUPT THE EXECUTION
  PROCEDURE ADD_INDEXES_BACK(DICTIONARY IN KVDICT)
  IS
  BEGIN
      FOR I IN 1..DICTIONARY.COUNT
      LOOP
          EXECUTE IMMEDIATE DICTIONARY(I).CODE;
      END LOOP;
  EXCEPTION
      WHEN OTHERS THEN
          DBMS_OUTPUT.PUT_LINE(SQLERRM);
  END;


	-- POPULATES WITH RANDOM PLAYERS
	PROCEDURE  populate_players AS
	  v_level Players.playerlevel%TYPE;
	  v_max_player Players.playerID%TYPE:=playerID_seq.currval;
	  BEGIN
	    FOR i IN 1..5000 LOOP


	            EXECUTE IMMEDIATE 'INSERT INTO GameUsers (Username,Email,Password) VALUES('
	                           || ''''||dbms_random.string('U', 20)||''''|| ','
	                           || ''''||dbms_random.string('U', 20)||'@gmail.com'||''''|| ','
	                           || ''''||dbms_random.string('U', 20)||''''||
	                           ')';

	           v_level:=DBMS_RANDOM.value(1,10);
	           UPDATE players
	           SET experience=50* POWER(2,v_level-1), playerlevel=v_level
	           WHERE playerid=v_max_player+i;
	  END LOOP;
	END  populate_players;


	-- POPULATES THE QUESTIONS TABLE FROM THE DATABASE
	PROCEDURE  populate_questions
	AS
	BEGIN
		  FOR i IN 1 ..1000 LOOP
		        EXECUTE IMMEDIATE 'INSERT INTO questions (question,ANSWERA, ANSWERB,ANSWERC,ANSWERD,CORRECTANSWER,ROUNDID ) VALUES('
		                           || ''''||dbms_random.string('U', 20)||''''|| ','
		                           || ''''||dbms_random.string('L', 5)||''''|| ','
		                           || ''''||dbms_random.string('L', 5)||''''|| ','
		                           || ''''||dbms_random.string('L', 5)||''''|| ','
		                           || ''''||dbms_random.string('L', 5)||''''|| ','
		                           || ''''||dbms_random.VALUE(1, 4)||''''|| ','
		                           || ''''||dbms_random.VALUE(1, 100)||''''||
		                           ')';
		  END LOOP;
	END  populate_questions;


	-- POPULATES THE ROUNDS TABLE FROM THE DATABASE
	PROCEDURE  populate_rounds
	AS
  BEGIN
			FOR i IN 1..200 LOOP

	     EXECUTE IMMEDIATE 'INSERT INTO rounds (name,course) VALUES('
	                           || ''''||dbms_random.string('L', 20)||''''|| ','
	                           || ''''||dbms_random.string('U', 20)||''''||
	                           ')';
			 END LOOP;
	END  populate_rounds;

END data_manipulation;
/

commit;
