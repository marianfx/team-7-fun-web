INSERT INTO COURSES (TITLE, SHORTDESC, HASHTAG)
			VALUES ('HTML','HyperText Markup Language, commonly abbreviated as HTML,
						 is the standard markup language used to create web pages.','#HTML' );
-------------ROUND I COURSE 1-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,courseID) 
       VALUES('INTRO HTML',4,'http://www.w3schools.com/html/',courseID_seq.CURRVAL);
/
INSERT INTO Questions (question,difficulty, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What does HTML stand for?'
              , 'medium'      
              , 'A. Hyperlinks and Text Markup Language'
              , 'B. Hyper Text Markup Language'
              , 'C. Home Tool Markup Language'
              , 'D.	How to make love.'
              , 1
              ,1); 
/
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Who is making the Web standards?'
              , 'A.	The World Wide Web Consortium'
              , 'B.	Microsoft'
              , 'C.	Google'
              , 'D. Mozilla'
              , 1
              ,1) ; 
 /      
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Choose the correct HTML element for the largest heading:'
              , 'A.	<heading>'
              , 'B. <h16>'
              , 'C. <h1>'
              , 'D.	<hand>'
              , 3
              ,1) ; 
/  
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Choose the correct HTML element to define important text'
              , 'A. <b>'
              , 'B.	<i>'
              , 'C.	<important>'
              , 'D.	<strong>'
              , 4
              ,1 ); 
			  
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What is the correct HTML for creating a hyperlink?'
              , 'A. <a>http://www.w3schools.com</a>'
              , 'B.	<a name="http://www.w3schools.com">W3Schools.com</a>'
              , 'C.	<a url="http://www.w3schools.com">W3Schools.com</a>'
              , 'D.	<a href="http://www.w3schools.com">W3Schools</a>'
              , 4
              ,1 ); 
/

-------------ROUND II COURSE 1-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID) 
       VALUES('HTML2',4,'http://www.w3schools.com/html/',courseID_seq.CURRVAL);
/
INSERT INTO Questions (question,difficulty, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('How can you make a bulleted list?'
              , 'medium'      
              , 'A. <list>'
              , 'B. <dl>'
              , 'C. <ol>'
              , 'D.	<ul>'
              , 4
              ,2); 
/
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What is the correct HTML for making a checkbox?'
              , 'A.	<check>'
              , 'B.	<checkbox>'
              , 'C.	<input type="check">'
              , 'D. <input type="checkbox">'
              , 4
              ,2) ; 
 /      
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What is the correct HTML for making a text input field?'
              , 'A.	<textfield>'
              , 'B. <input type="text">'
              , 'C.	<textinput type="text">'
              , 'D. <input type="textfield">'
              , 4
              ,2) ; 
/  
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' What is the correct HTML for inserting an image?'
              , 'A. <img href="image.gif" alt="MyImage">'
              , 'B.	<image src="image.gif" alt="MyImage">'
              , 'C.	<img src="image.gif" alt="MyImage">'
              , 'D.	<img alt="MyImage">image.gif</img>'
              , 3
              ,2) ; 
/
-------------ROUND III COURSE 1-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID) 
       VALUES('HTML2',4,'http://www.w3schools.com/html/',courseID_seq.CURRVAL);
/
INSERT INTO Questions (question,difficulty, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following attributes below are used for a font name??'
              , 'medium'      
              , 'A. <fontname>'
              , 'B. <fn>'
              , 'C. <font>'
              , 'D.	<face>'
              , 3
              ,3); 
/
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Each list item in an ordered or unordered list has which tag?'
              , 'A.	<list>'
              , 'B.	<ls>'
              , 'C.	<li>'
              , 'D. <ol>'
              , 3
              ,3) ; 
 /      
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What is the <br> tag for?'
              , 'A.	Space'
              , 'B. Paragraph break'
              , 'C.	Line break'
              , 'D. Word break'
              , 3
              ,3) ; 
/  
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' What is the difference between XML and HTML?'
              , 'A. HTML is used for exchanging data, XML is not.'
              , 'B.	XML is used for exchanging data, HTML is not.'
              , 'C.	HTML can have user defined tags, XML cannot'
              , 'D.	Both b and c above'
              , 4
              ,3) ; 
/



-------------ROUND IV COURSE 1-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID) 
       VALUES('NEXT STEP HTML',4,'http://www.w3schools.com/html/',courseID_seq.CURRVAL);
/
INSERT INTO Questions (question,difficulty, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following is an advantage of putting presentation information in a separate CSS file rather than in HTML itself?'
              , 'medium'      
              , 'A. The content becomes easy to manage'
              , 'B. Becomes easy to make site for different devices like mobile by making separate CSS files'
              , 'C. CSS Files are generally cached and therefore decrease server load and network traffic'
              , 'D.	All of the above'
              , 4
              ,4); 
/
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('HTML(Hypertext Markup Language) has language elements which permit certain actions other than describing the structure of the web document. Which one of the following actions is NOT supported by pure HTML (without any server or client side scripting)pages?'
              , 'A.	Embed web objects from different sites into the same page'
              , 'B.	Refresh the page automatically after a specified interval'
              , 'C.	Automatically redirect to another page upon download'
              , 'D. Display the client time as part of the page'
              , 4
              ,4) ; 
 /      
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Consider the three commands : PROMPT, HEAD and RCPT. Which of the following options indicate a correct association of these commands with protocols where these are used?'
              , 'A.	HTTP, SMTP, FTP'
              , 'B. FTP, HTTP, SMTP'
              , 'C.	HTTP, FTP, SMTP'
              , 'D.	SMTP, HTTP, FTP'
              , 2
              ,4) ; 
/  
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('HELO and PORT, respectively, are commands from the protocols'
              , 'A.	FTP and HTTP'
              , 'B.	TELNET and POP3'
              , 'C.	HTTP and TELNET'
              , 'D.	SMTP and FTP'
              , 4
              ,4) ; 
/
commit;

-- insert into course course 2 CSS ;
INSERT INTO COURSES (COURSEID, TITLE, SHORTDESC, HASHTAG)
			VALUES (2, 'CSS','Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of 
							a document written in a markup language.Although most often used to set the visual style of web 
							pages and user interfaces written in HTML and XHTML','#CSS' );
-------------ROUND I COURSE 2-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID) 
       VALUES('INTRO CSS',4,'http://www.w3schools.com/css',courseID_seq.CURRVAL);
/
INSERT INTO Questions (question,difficulty, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following selector matches all elements of a type?'
              , 'medium'      
              , 'A. The Type Selector'
              , 'B. The Universal Selector'
              , 'C. The Descendant Selector'
              , 'D.	The Class Selector.'
              , 1
              ,5); 
/
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following defines a measurement as a percentage relative to another value, typically an enclosing element?'
              , 'A.	%'
              , 'B.	cm'
              , 'C.	em'
              , 'D. ex'
              , 1
              ,5) ; 
 /      
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following is correct about RGB Values format of CSS colors?'
              , 'A. This color value is specified using the rgb( ) property.'
              , 'B. This property takes three values, one each for red, green, and blue.'
              , 'C. The value can be an integer between 0 and 255 or a percentage.'
              , 'D.	All of the above.'
              , 4
              ,5) ; 
/  
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' Which of the following property is used to change the face of a font?'
              , 'A. font-family'
              , 'B.	font-style'
              , 'C.	font-varian'
              , 'D.	font-weight'
              , 1
              ,5) ; 
			  
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property is used to set the text direction?'
              , 'A. color'
              , 'B.	direction'
              , 'C.	letter-spacing'
              , 'D.	word-spacing'
              , 2
              ,5) ; 
/

-------------ROUND II COURSE 2------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID) 
       VALUES('CSS Part 2',4,'http://www.w3schools.com/html/',courseID_seq.CURRVAL);
/
INSERT INTO Questions (question,difficulty, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property is used to set the width of an image border?'
              , 'medium'      
              , 'A. border'
              , 'B. height'
              , 'C. width'
              , 'D.	moz-opacity'
              , 1
              ,6); 
/
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property of a table element specifies the width that should appear between table cells?'
              , 'A. :border-collapse'
              , 'B.	:border-spacing'
              , 'C.	:caption-side'
              , 'D. :empty-cells'
              , 2
              ,6) ; 
 /      
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property changes the style of left border?'
              , 'A.	:border-bottom-style'
              , 'B. :border-top-style'
              , 'C.	:border-left-style'
              , 'D. :border-right-style'
              , 3
              ,6) ; 
/  
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('  Which of the following property specifies an image for the marker rather than a bullet point or number?'
              , 'A. list-style-type'
              , 'B.	list-style-position'
              , 'C.	list-style-image'
              , 'D.	list-style'
              , 3
              ,6) ; 
/
-------------ROUND III COURSE 2-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID) 
       VALUES('CSS 3',4,'http://www.w3schools.com/html/',courseID_seq.CURRVAL);
/
INSERT INTO Questions (question,difficulty, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' Which of the following selector matches all elements of a type?'
              , 'medium'      
              , 'A.  The Type Selector'
              , 'B.  The Universal Selector'
              , 'C.  The Descendant Selector'
              , 'D.  The Class Selector'
              , 1
              ,7); 
/
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following is a way to associate styles with your HTML document?'
              , 'A.	External CSS - The Element'
              , 'B. Imported CSS - @import Rule'
              , 'C.	Both of the above'
              , 'D. None of the above.'
              , 3
              ,7) ; 
 /      
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property specifies the left padding of an element?'
              , 'A.	padding-bottom'
              , 'B. padding-top'
              , 'C.	padding-left'
              , 'D. padding-right'
              , 3
              ,7) ; 
/  
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' Which of the following selector selects all paragraph elements with a lang attribute?'
              , 'A. p[lang]'
              , 'B.	p[lang="fr"]'
              , 'C.	p[lang~="fr"]'
              , 'D.	p[lang|="fr"]'
              , 1
              ,7) ; 
/



-------------ROUND IV COURSE 2-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID) 
       VALUES('NEXT STEP HTML',4,'http://www.w3schools.com/html/',courseID_seq.CURRVAL);
/
INSERT INTO Questions (question,difficulty, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property is used to control the scrolling of an image in the background?'
              , 'medium'      
              , 'A. background-attachment'
              , 'B. background'
              , 'C. background-repeat'
              , 'D.	background-position'
              , 1
              ,8); 
/
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following value of cursor shows it as an arrow?'
              , 'A.	crosshair'
              , 'B. default'
              , 'C.	pointer'
              , 'D. move'
              , 2
              ,8) ; 
 /      
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property is used to set the opacity of an image?'
              , 'A.	border'
              , 'B. height'
              , 'C.	width'
              , 'D. -moz-opacity'
              , 4
              ,8) ; 
/  
INSERT INTO Questions (question, answerA, answerB, 
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property specifies a shorthand property for setting the margin properties in one declaration?'
              , 'A. :margin'
              , 'B.	:margin-bottom'
              , 'C.	:margin-top'
              , 'D.	:margin-left'
              , 1
              ,8) ; 
/
commit;