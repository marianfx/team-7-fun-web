SET DEFINE OFF;
INSERT INTO COURSES(COURSEID, TITLE, SHORTDESC, HASHTAG, PHOTOURL) VALUES(1, 'Welcome to Fun Web', 'The ''Intro'' into the fun', '#FUNWEB' , '/images/favicon/logo_152x152.png')
/
COMMIT;
/


INSERT INTO ROUNDS(roundID, NAME, NROFQUESTIONS, COURSE, COURSEID) VALUES(1, 'DEFAULT', 1, '<h1>Welcome to the <strong>Fun<strong>!</h1>

<h1>We glad to se you in our game, let start.</h1>

<h4>This is the game main page</h4>
<img src="/images/intro/intro0.png" style="width: 100%; margin:0px auto;" alt="blog-img">
<h4>
	In left you will found player menu
</h4>
	<img src="/images/intro/intro0.1.png" style="width: 100%; margin:0px auto;" alt="blog-img">
<h4>
In the top you have skill buttons, and other stuff like full-screen, shop, and Facebook social plugin
</h4>
<img src="/images/intro/intro0.2.png" style="width: 100%; margin:0px auto;" alt="blog-img">

<h4>
	And this is the Game Zone where you learn Courses
</h4>
	<img src="/images/intro/intro0.3.png" style="width: 100%; margin:0px auto;" alt="blog-img">


<h4>
	And this is <strong>Arena</strong> Button!
</h4>
	<img src="/images/intro/intro0.4.png" style="width: 100%; margin:0px auto;" alt="blog-img">
<hr>
<h4>
	And after presing that button you will enter in arena tadam
</h4>
	<img src="/images/intro/intro0.4.1.png" style="width: 100%; margin:0px auto;" alt="blog-img">

<hr>

<h4>
	This is you\''r profile Page
</h4>
	<img src="/images/intro/intro1.png" style="width: 100%; margin:0px auto;" alt="blog-img">

<hr>
<h4>
	and how it looks like
</h4>
	<img src="/images/intro/intro1.1.png" style="width: 100%; margin:0px auto;" alt="blog-img">

<hr>
<strong>
<h1>
	So to find how all these works pleas click everywere you want and ceckout what you will recieve.
<h1>
<strong>' , 1)
/
COMMIT;
/
INSERT INTO Questions (question,difficulty, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Do you love Web technology??'
              , 'medium'
              , 'A. No, no, no.'
              , 'B. Yes'
              , 'C. Maybe'
              , 'D.	Buraga :D'
              , 4
              ,roundID_seq.CURRVAL);
/
COMMIT;

INSERT INTO COURSES (TITLE, SHORTDESC, HASHTAG, PHOTOURL)
			VALUES ('HTML','HyperText Markup Language, commonly abbreviated as HTML,
						 is the standard markup language used to create web pages.','#HTML','/images/courses/html.png' );
-------------ROUND I COURSE 1-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,courseID)
       VALUES('INTRO HTML',4,'
<h3>Why learn HTML?</h3>
<p>Every webpage you look at is written in a language called HTML. You can think of HTML as the skeleton that gives every webpage structure. In this course, we will use HTML to add paragraphs, headings, images and links to a webpage.</p>
 <h1>What is HTML</h1>
<p>
HyperText Markup Language, commonly abbreviated as HTML, is the standard markup language used to create web pages. Along with CSS, and JavaScript, HTML is a cornerstone technology used to create web pages,[1] as well as to create user interfaces for mobile and web applications. Web browsers can read HTML files and render them into visible or audible web pages. HTML describes the structure of a website semantically and, before the advent of Cascading Style Sheets (CSS), included cues for the presentation or appearance of the document (web page), making it a markup language, rather than a programming language.
HTML elements form the building blocks of HTML pages.  </p>
<ol>
<li>Things inside <code class="xml"><span class="tag">&lt;&gt;</span></code>  are called <strong>tags</strong>.</li>
<li>Tags nearly always come in pairs: an opening tag and a closing tag.</li>
<li>Example of opening tag: <code class="xml"><span class="tag">&lt;<span class="title">html</span>&gt;</span></code></li>
<li>Example of closing tag: <code class="xml"><span class="tag">&lt;<span class="title">/html</span>&gt;</span></code></li>
</ol>

<p>You can think of tags as being like parentheses: whenever you open one, you should close it. Tags also <strong>nest</strong>, so you should close them in the right order</p>

<h1>Here some html tags</h1>


<table class="htmltags" border="1" cellspacing="0" cellpadding="4">
<tbody>
<tr valign="TOP">
<td style="background-color: #e6e6ff;"><b>Tag</b></td>
<td style="background-color: #e6e6ff;"><b>What it is</b></td>
<td style="background-color: #e6e6ff;"><b>When to use it</b></td>
</tr>
<tr valign="TOP">
<td style="background-color: #ffffcc;"><b> a </b></td>
<td style="background-color: #ffffcc;">Anchor (most commonly a link)</td>
<td style="background-color: #ffffcc;">Vital. Use to create links in content. Use the title attribute whenever the contents of the <b>&lt;a&gt;…&lt;/a&gt;</b> pair do not accurately describe what you’ll get from selecting the link. Title attribute often displays as a tooltip in visual browsers, which may be a helpful usability aid.</td>
<tr valign="TOP">
<td style="background-color: #ffffcc;"><b>strong</b></td>
<td style="background-color: #ffffcc;">Strong emphasis</td>
<td style="background-color: #ffffcc;">Use to to define important text.</td>
</tr>
<tr valign="TOP">
<td style="background-color: #ffffcc;"><b>h1</b></td>
<td style="background-color: #ffffcc;">Level 1 header</td>
<td style="background-color: #ffffcc;">Aim to have one H1 on each page, containing a description of what the page is about. Largest Hader</td>
</tr>
</tbody>
</table>',courseID_seq.CURRVAL);
/
INSERT INTO Questions (question,difficulty, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What does HTML stand for?'
              , 'medium'
              , 'A. Hyperlinks and Text Markup Language'
              , 'B. Hyper Text Markup Language'
              , 'C. Home Tool Markup Language'
              , 'D.	How to make love.'
              , 2
              ,roundID_seq.CURRVAL);
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Who is making the Web standards?'
              , 'A.	The World Wide Web Consortium'
              , 'B.	Microsoft'
              , 'C.	Google'
              , 'D. Mozilla'
              , 1
              ,roundID_seq.CURRVAL) ;
 /
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Choose the correct HTML element for the largest heading:'
              , 'A.	<heading>'
              , 'B. <h16>'
              , 'C. <h1>'
              , 'D.	<hand>'
              , 3
              ,roundID_seq.CURRVAL) ;
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Choose the correct HTML element to define important text'
              , 'A. <b>'
              , 'B.	<i>'
              , 'C.	<important>'
              , 'D.	<strong>'
              , 4
              ,roundID_seq.CURRVAL );

INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What is the correct HTML for creating a hyperlink?'
              , 'A. <a>http://www.w3schools.com</a>'
              , 'B.	<a name="http://www.w3schools.com">W3Schools.com</a>'
              , 'C.	<a url="http://www.w3schools.com">W3Schools.com</a>'
              , 'D.	<a href="http://www.w3schools.com">W3Schools</a>'
              , 4
              ,roundID_seq.CURRVAL );
/

-------------ROUND II COURSE 1-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID)
       VALUES('HTML2',4,'<h3>HTML lesson2</h3>
<hr>
<h4>Lists</h4>
<p>
Unordered lists and ordered lists work the same way, except that the former is used for non-sequential lists with list items usually preceded by bullets and the latter is for sequential lists, which are normally represented by incremental numbers.

The <strong>ul</strong> tag is used to define unordered lists and the <strong>ol</strong> tag is used to define ordered lists. Inside the lists, the <strong>li</strong> tag is used to define each list item.

<p>


<h4>Input</h4>

Definition and Usage <br>
The <strong><</strong>input<strong>></strong> tag specifies an input field where the user can enter data.

<strong><</strong>input<strong>></strong> elements are used within a <strong><</strong>form <strong>></strong> element to declare input controls that allow users to input data.

An input field can vary in many ways, depending on the type attribute.
</p>
<br>
<strong>
<span>
<strong><</strong>form action="demo_form.asp"<strong>></strong><br>
  First name: <strong><</strong>input type="text" name="fname"<strong>></strong><br>
  Last name: <strong><</strong>input type="text" name="lname"<strong>></strong><br>
  <strong><</strong>input type="submit" value="Submit"<strong>></strong><br>
<strong><</strong>/form<strong>></strong><br>
</span>

</strong>
<br>
<hr>
<h4>Image</h4>
<p>
The img tag is used to put an image in an HTML document and it looks like this:


<br>
<strong><</strong> <strong>img src="http://www.htmldog.com/badge1.gif" width="120" height="90" alt="HTML Dog"</strong><strong>></strong>
<br>
The src attribute tells the browser where to find the image. Like the a tag, this can be absolute, as the above example demonstrates, but is usually relative. For example, if you create your own image and save it as “alienpie.jpg��? in a directory called “images��? then the code would be
<strong><</strong> <strong>img src="images/alienpie.jpg"... </strong> <strong>></strong>
<br>

The <strong>width</strong>   and <strong>height</strong> attributes are necessary because if they are excluded, the browser will tend to calculate the size as the image loads, instead of when the page loads, which means that the layout of the document may jump around while the page is loading.

The alt attribute is the alternative description. This is an accessibility consideration, providing meaningful information for users who are unable to see the image (if they are visually impaired, for example).

</p>',courseID_seq.CURRVAL);
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
              ,roundID_seq.CURRVAL);
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What is the correct HTML for making a checkbox?'
              , 'A.	<check>'
              , 'B.	<checkbox>'
              , 'C.	<input type="check">'
              , 'D. <input type="checkbox">'
              , 4
              ,roundID_seq.CURRVAL) ;
 /
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What is the correct HTML for making a text input field?'
              , 'A.	<textfield>'
              , 'B. <input type="text">'
              , 'C.	<textinput type="text">'
              , 'D. <input type="textfield">'
              , 2
              ,roundID_seq.CURRVAL) ;
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' What is the correct HTML for inserting an image?'
              , 'A. <img href="image.gif" alt="MyImage">'
              , 'B.	<image src="image.gif" alt="MyImage">'
              , 'C.	<img src="image.gif" alt="MyImage">'
              , 'D.	<img alt="MyImage">image.gif</img>'
              , 3
              ,roundID_seq.CURRVAL) ;
/
-------------ROUND III COURSE 1-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID)
       VALUES('HTML3',4,'<h3>Introduction to XML</h3>
<h4>Why Study XML?</h4>
<p>XML plays an important role in many IT systems.</p>
<p>For this reason, it is important for all software developers to have a good
understanding of XML.</p>
<p>Before you continue, you should also have a basic understanding of:</p>
<ul>
  <li>HTML</li>
  <li>JavaScript</li>
</ul>
<h4>What is XML?</h4>
<ul>
  <li>XML stands for EXtensible Markup Language</li>
  <li>XML is a markup language much like HTML</li>
  <li>XML was designed to store and transport data</li>
  <li>XML was designed to be self-descriptive</li>
  <li>XML is a W3C Recommendation</li>
</ul>
<hr>
<h4>The Difference Between XML and HTML</h4>

<p>XML and HTML were designed with different goals:</p>
<ul>
  <li>XML was designed to carry data - with focus on what data is</li>
  <li>HTML was designed to display data - with focus on how data looks</li>
  <li>XML tags are not predefined like HTML tags are</li>
</ul>
<hr>
<h4>XML Does Not Use Predefined Tags</h4>
<p>The XML language has no predefined tags.</p>
<p>The tags in the example above (like:  <span><</span>to<span>></span> and<span><</span>from <span>></span> ) are not defined in any XML standard. These tags are "invented" by the author of the XML document.</p>
<p>HTML works with predefined tags like: <span><</span>p<span>></span> ,<span><</span>h1<span>></span> ,<span><</span>table<span>></span> , etc.</p>
<p>With XML, the author must define both the tags and the document structure.</p>',courseID_seq.CURRVAL);
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
              ,roundID_seq.CURRVAL);
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Each list item in an ordered or unordered list has which tag?'
              , 'A.	<list>'
              , 'B.	<ls>'
              , 'C.	<li>'
              , 'D. <ol>'
              , 3
              ,roundID_seq.CURRVAL) ;
 /
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What is the <br> tag for?'
              , 'A.	Space'
              , 'B. Paragraph break'
              , 'C.	Line break'
              , 'D. Word break'
              , 3
              ,roundID_seq.CURRVAL) ;
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' What is the difference between XML and HTML?'
              , 'A. HTML is used for exchanging data, XML is not.'
              , 'B.	XML is used for exchanging data, HTML is not.'
              , 'C.	HTML can have user defined tags, XML cannot'
              , 'D.	Both b and c above'
              , 4
              ,roundID_seq.CURRVAL) ;
/



-------------ROUND IV COURSE 1-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID)
       VALUES('NEXT STEP HTML',4,'<h3>More Tags...</h3>
<p>Knowing a lot of html tags is helpfull...</p>
<a target="_blank" href="http://webdesignfromscratch.com/html-css/html-tags/">Full list of HTML tags</a>
<hr>
<h1>Some nice tags:</h1>
<table class="htmltags" border="1" cellspacing="0" cellpadding="4">
<tbody>
<tr valign="TOP">
<td style="background-color: #e6e6ff;"><b>Tag</b></td>
<td style="background-color: #e6e6ff;"><b>What it is</b></td>
<td style="background-color: #e6e6ff;"><b>When to use it</b></td>
</tr>
<tr valign="TOP">
<td style="background-color: #ffcc99;"><b>SUB</b></td>
<td style="background-color: #ffcc99;">Subscript text</td>
<td rowspan="2" bgcolor="#ffcc99">Arguably display info – recommend using alternative tags (e.g. <b>cite</b>). May be required in some academic uses, e.g. Chemical formulas.</td>
</tr>
<tr valign="TOP">
<td style="background-color: #ffcc99;"><b>SUP</b></td>
<td style="background-color: #ffcc99;">Superscript text</td>
</tr>
<tr valign="TOP">
<td style="background-color: #ffffcc;"><b>SCRIPT</b></td>
<td style="background-color: #ffffcc;">Inline script (e.g. JavaScript)</td>
<td style="background-color: #ffffcc;">It’s better to have all scripts as separate files than to write inline or in the <b>head</b>section, however still has its uses.</td>
</tr>
<tr valign="TOP">
<td style="background-color: #ffffcc;"><b>STRONG</b></td>
<td style="background-color: #ffffcc;">Strong emphasis</td>
<td style="background-color: #ffffcc;">Use this instead of the old <b><span><</span>b<span>></span></b> tag.</td>
</tr>
</tbody>
</table>',courseID_seq.CURRVAL);
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
              ,roundID_seq.CURRVAL);
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('HTML(Hypertext Markup Language) has language elements which permit certain actions other than describing the structure of the web document. Which one of the following actions is NOT supported by pure HTML (without any server or client side scripting)pages?'
              , 'A.	Embed web objects from different sites into the same page'
              , 'B.	Refresh the page automatically after a specified interval'
              , 'C.	Automatically redirect to another page upon download'
              , 'D. Display the client time as part of the page'
              , 4
              ,roundID_seq.CURRVAL) ;
 /
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which HTML tag would be used to display power in expression (A+B)^2 '
              , 'A.	<SUP>'
              , 'B. <SUB>'
              , 'C.	<B>'
              , 'D.	<P>'
              , 1
              ,roundID_seq.CURRVAL) ;
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Choose the correct HTML tag to make the text bold?'
              , 'A.	<B>'
              , 'B.	<BOLD>'
              , 'C.	<STRONG>'
              , 'D.	Both A) and C)'
              , 4
              ,roundID_seq.CURRVAL) ;
/
commit;

-- insert into course course 2 CSS ;
INSERT INTO COURSES (COURSEID, TITLE, SHORTDESC, HASHTAG, PHOTOURL)
			VALUES (2, 'CSS','Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of
							a document written in a markup language.Although most often used to set the visual style of web
							pages and user interfaces written in HTML and XHTML','#CSS','/images/courses/css.png' );
-------------ROUND I COURSE 2-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID)
       VALUES('INTRO CSS',4,'<h3>CSS Introduction</h3>
<h4>What is CSS?</h4>
<ul>
  <li><b>CSS</b> stands for <b>C</b>ascading <b>S</b>tyle <b>S</b>heets</li>
  <li>CSS describes <strong>how HTML elements are to be displayed on screen,
  paper, or in other media</strong></li>
  <li>CSS <strong>saves a lot of work</strong>. It can control the layout of
  multiple web pages all at once</li>
  <li>External stylesheets are stored in <b>CSS files</b></li>
</ul>
<hr>
<h4>CSS Syntax</h4>
<p><img src="http://www.w3schools.com/css/selector.gif" alt="CSS selector" style="width:90%;height:auto;" class="img-responsive"></p>
<p>The selector points to the HTML element you want to style.</p>
<p>The declaration block contains one or more declarations separated by
semicolons.</p>
<p>Each declaration includes a CSS property name and a value, separated by a colon.</p>
<p>A CSS declaration always ends with a semicolon, and declaration blocks are
surrounded by curly braces.</p>
<p>In the following example all <span><</span>p<span>></span> elements will be center-aligned, with a red
text color:</p>
<hr>

<h4>CSS Selectors:</h4>

<h5>The id Selector</h5>
<p>The id selector uses the id attribute of an HTML element to select a specific element.</p>
<p>The id of an element should be unique within a page, so the id selector is
used to
select one unique element!</p>
<p>To select an element with a specific id, write a hash (#) character, followed by
the id of the element.</p>
<hr>
<h5>The class Selector</h5>
<p>The class selector selects elements with a specific class attribute.</p>
<p>To select elements with a specific class, write a period (.) character, followed by the name of the class.</p>
<hr>
<h5>Type Selector</h5>
<p>The most general selector it can be used to matche all elements of a type: type</p>

<hr>

<h3>Three Ways to Insert CSS</h3>
<ul>
	<li>External style sheet</li>
	<li>Internal style sheet</li>
	<li>Inline style</li>
</ul>

<h4>External Style Sheet</h4>

<p>With an
external style sheet, you can change the look of an entire website by changing
just one file!</p>
<p>Each page must include a reference to the external style sheet file inside the <span><</span>link<span>></span>
element. The <span><</span>link<span>></span> element goes inside the <span></</span>head<span>></span> section:</p>
<hr>
<h4>Internal Style Sheet</h4>
<p>An internal style sheet may be used if one single page has a unique style.</p>
<p>Internal styles are defined within the <span></</span>style<span>></span> element, inside the <span></</span>head<span>></span> section of an HTML page:</p>
<hr>
<h4>Inline Styles</h4>
<p>An inline style may be used to apply a unique style for a single element.</p>
<hr>

<h3>CSS Colors</h3>
<p>Colors are displayed combining RED, GREEN, and BLUE light.</p>
<p>Colors in CSS are most often specified by:</p>
<ul>
	<li>a valid color name - like "red"</li>
	<li>an RGB value - like "rgb(255, 0, 0)"</li>
	<li>a HEX value - like "#ff0000"</li>
</ul>

<hr>
<h3>CSS Fonts</h3>

<h4>Difference Between Serif and Sans-serif Fonts</h4>

<img alt="Serif vs. Sans-serif" src="http://www.w3schools.com/css/serif.gif" width="398" height="142" style="max-width:100%;height:auto">

<h4>Font Family</h4>
<p>The font family of a text is set with the <code>font-family</code> property.</p>
<p>The <code>font-family</code> property should hold several font names as a "fallback" system.
If the browser does not support the first font, it tries the next font, and so
on.</p>
<p>Start with the font you want, and end with a generic family, to let the
browser pick a similar font in the generic family, if no other fonts are
available. </p>

<div  style="width:100%;border-width:1px;border-style:solid;padding:10px;">
<h3>CSS Dimension Properties</h3>
<p>The CSS dimension properties allow you to control the height and width of an element.</p>
<p>This element has a width of 100%.</p>
</div>
',courseID_seq.CURRVAL);
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
              ,roundID_seq.CURRVAL);
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following defines a measurement as a percentage relative to another value, typically an enclosing element?'
              , 'A.	%'
              , 'B.	cm'
              , 'C.	em'
              , 'D. ex'
              , 1
              ,roundID_seq.CURRVAL) ;
 /
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following is correct about RGB Values format of CSS colors?'
              , 'A. This color value is specified using the rgb( ) property.'
              , 'B. This property takes three values, one each for red, green, and blue.'
              , 'C. The value can be an integer between 0 and 255 or a percentage.'
              , 'D.	All of the above.'
              , 4
              ,roundID_seq.CURRVAL) ;
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' Which of the following property is used to change the face of a font?'
              , 'A. font-family'
              , 'B.	font-style'
              , 'C.	font-varian'
              , 'D.	font-weight'
              , 1
              ,roundID_seq.CURRVAL) ;

INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property is used to set the text direction?'
              , 'A. color'
              , 'B.	direction'
              , 'C.	letter-spacing'
              , 'D.	word-spacing'
              , 2
              ,roundID_seq.CURRVAL) ;
/

-------------ROUND II COURSE 2------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID)
       VALUES('CSS2',4,'<h3>CSS lesson 2<h3>

<h4>CSS Borders</h4>
<div style="width:100%;border:15px groove #73AD21;padding:15px;" class="w3-theme-border">
<h4>CSS Border Properties</h4>
<p>The CSS <code>border</code> properties allow you to specify the style, width, and color of an elements border.</p>
<p>This element has a groove border that is 15px wide and green.</p>
</div>
<hr>
<h4>Border Style</h4>
<p>The <code>border-style</code> property specifies what kind of border to display.</p>
<p>The following values are allowed:</p>
<ul>
	<li><code>dotted</code> - Defines a dotted border</li>
	<li><code>dashed</code> - Defines a dashed border</li>
	<li><code>solid</code> - Defines a solid border</li>
	<li><code>double</code> - Defines a double border</li>
	<li>...</li>
</ul>
<p>The <code>border-style</code> property can have from one to four values (for
the top border, right border, bottom border, and the left border).</p>
<hr>

<h4>Border Width</h4>

<p>The <code>border-width</code> property specifies the width of the four borders.</p>
<p>The width can be set as a specific size (in px, pt, cm, em, etc) or by using one of the three pre-defined values:
thin, medium, or thick.</p>
<p>The <code>border-width</code> property can have from one to four values (for
the top border, right border, bottom border, and the left border).</p>
<div style="border:5px solid black;padding:8px;">5px border-width</div>
<hr>
<h4>Border Color</h4>
<p>The <code>border-color</code> property is used to set the color of the four borders.</p>
<p>The color can be set by:</p>
<ul>
	<li>name - specify a color name, like "red"</li>
	<li>Hex - specify a hex value, like "#ff0000"</li>
	<li>RGB - specify a RGB value, like "rgb(255,0,0)"</li>
	<li>transparent</li>
</ul>

<p>The <code>border-color</code> property can have from one to four values (for
the top border, right border, bottom border, and the left border) </p>
<p>If <code>border-color</code> is not set, it inherits the color of the element.</p>
<div style="border:5px solid red;padding:8px;">Red border</div>
<hr>
<h4>Border style</h4>
<p>If the <code>border-style</code> property has four values:</p>
<ul>
	<li><b>border-style: dotted solid double dashed; </b>
	<ul><li>top border is dotted</li>
	<li>right border is solid</li>
	<li>bottom border is double</li>
	<li>left border is dashed</li>
	</ul>
	</li>
</ul>
<p>If the <code>border-style</code> property has three values:</p>
<ul>
	<li><b>border-style: dotted solid double;</b>
	<ul><li>top border is dotted</li>
	<li>right and left borders are solid</li>
	<li>bottom border is double</li></ul>
    </li>
</ul>
<p>If the <code>border-style</code> property has two values:</p>
<ul>
	<li><b>border-style: dotted solid;</b>
	<ul><li>top and bottom borders are dotted</li>
	<li>right and left borders are solid</li></ul>
	</li>
</ul>
<p>If the <code>border-style</code> property has one value:</p>
<ul>
	<li><b>border-style: dotted;</b><ul><li>all four borders are dotted</li></ul>
	</li>
</ul>
<hr>
<h5>HTML Lists and CSS List Properties</h5>
<p>In HTML, there are two main types of lists:</p>
<ul>
  <li>unordered lists (<span><</span>ul<span>></span>) - the list items are marked with bullets</li>
  <li>ordered lists (<span><</span>ol<span>></span>) - the list items are marked with numbers or letters</li>
</ul>
<h5>Different List Item Markers</h5>
<p>The <code>list-style-type</code> property specifies the type of list item
marker.</p>
<h5>Position The List Item Markers</h5>
<p>The <code>list-style-position</code> property specifies whether the list-item markers should appear inside or outside the content flow:</p>
<h5>An Image as The List Item Marker</h5>
<p>The <code>list-style-image</code> property specifies an image as the list
item marker:</p>',courseID_seq.CURRVAL);
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
              ,roundID_seq.CURRVAL);
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property of a table element specifies the width that should appear between table cells?'
              , 'A. :border-collapse'
              , 'B.	:border-spacing'
              , 'C.	:caption-side'
              , 'D. :empty-cells'
              , 2
              ,roundID_seq.CURRVAL) ;
 /
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property changes the style of left border?'
              , 'A.	:border-bottom-style'
              , 'B. :border-top-style'
              , 'C.	:border-left-style'
              , 'D. :border-right-style'
              , 3
              ,roundID_seq.CURRVAL) ;
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('  Which of the following property specifies an image for the marker rather than a bullet point or number?'
              , 'A. list-style-type'
              , 'B.	list-style-position'
              , 'C.	list-style-image'
              , 'D.	list-style'
              , 1
              ,roundID_seq.CURRVAL) ;
/
-------------ROUND III COURSE 2-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID)
       VALUES('CSS3',4,'<h3>CSS lesson 3<h3>

<h4>CSS Padding</h4>
<div style="width:100%;border-width:1px;border-style:solid;padding:50px;">
<h2>CSS Padding Properties</h2>
<p>The CSS <code>padding</code> properties are used to generate space around content.</p>
<p>The padding properties set the size of the white space between the element content and the element border.</p>
<p>This element has a padding of 50px.</p>
</div>
<p>The CSS padding properties define the white space between the element content and the element border.</p>
<p>The padding clears an area around the content (inside the border) of an element.</p>
<p>With CSS, you have full control over the padding. There are CSS properties
for setting the padding for each side of an element (top, right, bottom, and left).</p>

<h5>Padding - Individual Sides</h5>
<p>CSS has properties for specifying the padding for each
side of an element:</p>
<ul>
	<li><code>padding-top</code></li>
	<li><code>padding-right</code></li>
	<li><code>padding-bottom</code></li>
	<li><code>padding-left</code></li>
</ul>
<p>All the padding properties can have the following values:</p>

<ul>
	<li><em>length</em> - specifies a padding in px, pt, cm, etc.</li>
	<li><em>%</em> - specifies a padding in % of the width of the containing element</li>
	<li>inherit - specifies that the padding should be inherited from the parent element</li>
</ul>
<hr>
<h5>Padding - Shorthand Property</h5>
<p>To shorten the code, it is possible to specify all the padding properties in
one property.</p>
<p>The <code>padding</code> property is a shorthand property for the following individual
padding properties:</p>
<ul>
	<li><code>padding-top</code></li>
	<li><code>padding-right</code></li>
	<li><code>padding-bottom</code></li>
	<li><code>padding-left</code></li>
</ul>
<p>If the <code>padding</code> property has four values:</p>
<ul>
	<li><b>padding: 25px 50px 75px 100px; </b>
	<ul><li>top padding is 25px</li>
	<li>right padding is 50px</li>
	<li>bottom padding is 75px</li>
	<li>left padding is 100px</li></ul>
	</li>
</ul>
',courseID_seq.CURRVAL);
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
              ,roundID_seq.CURRVAL);
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following is a way to associate styles with your HTML document?'
              , 'A.	External CSS - The Element'
              , 'B. Imported CSS - @import Rule'
              , 'C.	Both of the above'
              , 'D. None of the above.'
              , 3
              ,roundID_seq.CURRVAL) ;
 /
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property specifies the left padding of an element?'
              , 'A.	padding-bottom'
              , 'B. padding-top'
              , 'C.	padding-left'
              , 'D. padding-right'
              , 3
              ,roundID_seq.CURRVAL) ;
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' Which of the following selector selects all paragraph elements with a lang attribute?'
              , 'A. p[lang]'
              , 'B.	p[lang="fr"]'
              , 'C.	p[lang~="fr"]'
              , 'D.	p[lang|="fr"]'
              , 1
              ,roundID_seq.CURRVAL) ;
/



-------------ROUND IV COURSE 2-------------------------
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID)
       VALUES('NEXT STEP CSS',4,'<h3>CSS lesson 4<h3>
<h4>CSS Backgrounds</h4>
<h5>Background Color</h5>
<p>The <code>background-color</code> property specifies the background color of an element.</p>
<p>With CSS, a color is most often specified by:</p>
<ul>
	<li>a valid color name - like "red"</li>
	<li>a HEX value - like "#ff0000"</li>
	<li>an RGB value - like "rgb(255,0,0)"</li>
</ul>

<h5>Background Image</h5>
<p>The <code>background-image</code> property specifies an image to use as the background of an element.</p>
<p>By default, the image is repeated so it covers the entire element.</p>

<h5>Background Image - Repeat Horizontally or Vertically</h5>
<p>By default, the <code>background-image</code> property repeats an image both horizontally and vertically.</p>

<h5>Background Image - Set position and no-repeat</h5>
<p>Showing the background image only once is also specified by the <code>background-repeat</code> property:</p>

<h5>Background Image - Fixed position</h5>
<p>To specify that the background image should be fixed (will not scroll with the rest of the page),
use the <code>background-attachment</code> property:</p>

<p>
When using the shorthand property the order of the property values is:</p>
<ul>
	<li><code>background-color</code></li>
	<li><code>background-image</code></li>
	<li><code>background-repeat</code></li>
	<li><code>background-attachment</code></li>
	<li><code>background-position</code></li>
</ul>
<h4>CSS Margin</h4>
<div class="w3-theme-border" style="border-width:1px;border-style:solid;padding:10px;margin:80px;">
<h2 style="word-break:break-all;">CSS Margin Properties</h2>
<p>The CSS <code>margin</code> properties are used to generate space around elements.</p>
<p>The margin properties set the size of the white space OUTSIDE the border.</p>
<p>This element has a margin of 80px.</p>
</div>

<h5>Margin - Individual Sides</h5>
<p>CSS has properties for specifying the margin for each
side of an element:</p>
<ul>
	<li><code>margin-top</code></li>
	<li><code>margin-right</code></li>
	<li><code>margin-bottom</code></li>
	<li><code>margin-left</code></li>
</ul>

<hr>

<h5>Margin - Shorthand Property</h5>
<p>To shorten the code, it is possible to specify all the margin properties in
one property.</p>
<p>The <code>margin</code> property is a shorthand property for the following individual margin properties:</p>
<ul>
	<li><code>margin-top</code></li>
	<li><code>margin-right</code></li>
	<li><code>margin-bottom</code></li>
	<li><code>margin-left</code></li>
</ul>

<p>If the <code>margin</code> property has four values:</p>
<ul>
	<li><b>margin: 25px 50px 75px 100px; </b>
	<ul><li>top margin is 25px</li>
	<li>right margin is 50px</li>
	<li>bottom margin is 75px</li>
	<li>left margin is 100px</li></ul>
	</li>
</ul>
<hr>
<h5>Use of The auto Value</h5>
<p>You can set the margin property to <code>auto</code> to horizontally center the element within its container.</p>
<p>The element will then take up the specified width, and the remaining space will be split equally between the
left and right margins:</p>
',courseID_seq.CURRVAL);
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
              ,roundID_seq.CURRVAL);
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following value of cursor shows it as an arrow?'
              , 'A.	crosshair'
              , 'B. default'
              , 'C.	pointer'
              , 'D. move'
              , 2
              ,roundID_seq.CURRVAL) ;
 /
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property is used to set the opacity of an image?'
              , 'A.	border'
              , 'B. height'
              , 'C.	width'
              , 'D. -moz-opacity'
              , 4
              ,roundID_seq.CURRVAL) ;
/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Which of the following property specifies a shorthand property for setting the margin properties in one declaration?'
              , 'A. :margin'
              , 'B.	:margin-bottom'
              , 'C.	:margin-top'
              , 'D.	:margin-left'
              , 1
              ,roundID_seq.CURRVAL) ;
/

INSERT INTO COURSES (TITLE, SHORTDESC, HASHTAG,PHOTOURL)
			VALUES ('JavaScript','JavaScript is an interpreted programming or script language from Netscape. It is somewhat similar in capability to Microsoft Visual Basic, Sun Tcl,
					the UNIX-derived Perl, and IBMs REXX. ','#JS','/images/courses/js.png' );
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID)
       VALUES('INTRO JS',4,' <h3>Java Script lesson 1</h3>
       	<h4>JavaScript Statements</h4>
<p>In HTML, JavaScript statements are "instructions" to be "executed" by the web
browser.</p>
<p>This statement tells the browser to write "Hello Dolly." inside an HTML
element with id="demo":</p>
<h5>Example</h5>
<p><span style="color:black">
document.getElementById(<span style="color:brown">"demo"</span>).innerHTML = <span style="color:brown">"Hello Dolly."</span>;</span></p>

<h4>JavaScript Statement Identifiers</h4>
<p>JavaScript statements often start with a <strong>statement identifier</strong>
to identify the JavaScript action to be performed.</p>
<p>Statement identifiers are reserved words and cannot be used as variable names
(or any other things).</p>

<h4>JavaScript <span class="color_h1">if/else</span> Statement</h4>
<h5>Example</h5>
<p>If the current time (HOUR) is less than 20:00, output "Good
day" in an element with id="demo":</p>

<span style="color:black">
	<span style="color:mediumblue">var</span> time = <span style="color:mediumblue">new</span> Date().getHours(); <br><span style="color:mediumblue">if</span> (time &lt; <span style="color:red">20</span>) {<br><span style="color:red">
	</span>&nbsp;&nbsp;&nbsp; document.getElementById(<span style="color:brown">"demo"</span>).innerHTML = <span style="color:brown">"Good day"</span>;<br><span style="color:red">
	</span>}</span>

<h4>Definition and Usage</h4>
<p>The if/else statement executes a block of code if a specified condition is
true. If the condition is false, another block of code can be executed.</p>
<p>The if/else statement is a part of JavaScript "Conditional" Statements,
which are used to perform different actions based on different conditions.</p>
<p>In JavaScript we have the following conditional statements:</p>
<ul>
	<li>Use<b> if </b>to specify a block of code to be executed, if a specified
	condition is true</li>
	<li>Use <b>else</b> to specify a block of code to be executed, if the same
	condition is false</li>
	<li>Use <b>else if</b> to specify a new condition to test, if the first
	condition is false</li>
	<li>Use <b><a href="jsref_switch.asp">switch</a></b> to select one of many
	blocks of code to be
	executed</li>
</ul>

<h5>From java script you have acces to browser window </h5>
<h4>Window <span class="color_h1">alert()</span> Method</h4>
<p>The alert() method displays an alert box with a specified message and an OK button.</p>
<p>An alert box is often used if you want to make sure information comes through to the user.</p>
<p><strong>Note:</strong> The alert box takes the focus away from the current window, and forces the
browser to read the message. Do not overuse this method, as it prevents the user
from accessing other parts of the page until the box is closed.</p>

<h4>Syntax</h4>
<div>
	alert(<em>message</em>)
</div>

',courseID_seq.CURRVAL);

INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('Inside which HTML element do we put the JavaScript?'
              , 'A. <scripting>'
              , 'B.	<js>'
              , 'C.	<javascript>'
              , 'D.	<script>'
              , 4
              ,roundID_seq.CURRVAL) ;

/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES('What is the correct JavaScript syntax to change the content of the HTML element below?


<p id="demo">This is a demonstration.</p>'
              , 'A. document.getElement("p").innerHTML = "Hello World!";'
              , 'B.	document.getElementByName("p").innerHTML = "Hello World!";'
              , 'C.	#demo.innerHTML = "Hello World!";'
              , 'D.	document.getElementById("demo").innerHTML = "Hello World!";'
              , 4
              ,roundID_seq.CURRVAL) ;

/

INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' How do you write "Hello World" in an alert box?'
              , 'A. msgBox("Hello World");'
              , 'B.	alert("Hello World");'
              , 'C.	alertBox("Hello World");'
              , 'D.	msg("Hello World");'
              , 2
              ,roundID_seq.CURRVAL) ;

/
INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' How to write an IF statement in JavaScript?'
              , 'A. if i = 5 then'
              , 'B. if i = 5'
              , 'C.	if i == 5 then'
              , 'D.	if (i == 5)'
              , 4
              ,roundID_seq.CURRVAL) ;

/
INSERT INTO ROUNDS (NAME,nrOfQuestions, course,COURSEID)
       VALUES('JS1',4,' <h3>Java Script lesson 2</h3>

<h4>JavaScript <span class="color_h1">Functions</span></h4>
<p class="intro">A JavaScript function is a block of code designed to perform a
particular task.</p>
<h4>JavaScript Function Syntax</h4>
<p>A JavaScript function is defined with the <strong>function</strong> keyword,
followed by a <strong>name</strong>, followed by parentheses <strong>()</strong>.</p>
<p>Function names can contain letters, digits, underscores, and dollar signs
(same rules as variables).</p>
<p>The parentheses may include parameter names separated by commas:<br>
<strong>(<em>parameter1, parameter2, ...</em>)</strong></p>

<p>The code to be executed, by the function, is placed inside curly brackets: <strong>{}</strong></p>

<span style="color:black">
<span style="color:mediumblue">function</span>
<em>name</em>(<em>parameter1, parameter2, parameter3</em>) {<br><span style="color:red">
</span> <em>code to be executed</em><br><span style="color:red">
</span>}
</span>

<h4>Function Invocation</h4>
<p>The code inside the function will execute when "something" <strong>invokes</strong> (calls) the
function:</p>
<ul>
<li>When an event occurs (when a user clicks a button)</li>
<li>When it is invoked (called) from JavaScript code</li>
<li>Automatically (self invoked)</li>
</ul>
<p><b>Anonymous function definition</b>:</p>
<div class="mw-highlight mw-content-ltr" dir="ltr">
<pre><span class="kd">var</span> <span class="nx">anon</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="nx">alert</span><span class="p">(</span><span class="s1">I am anonymous</span><span class="p">);</span>
<span class="p">};</span>
<span class="nx">anon</span><span class="p">();</span>
</pre></div>
<p>One common use for anonymous functions is as arguments to other functions. Another common use is as a closure, for which see also the <a href="/wiki/JavaScript/Closures" title="JavaScript/Closures">Closures</a> chapter.</p>
<p>Use as an <b>argument to other functions</b>:</p>

<h4>Lets talk about arrays</h4>
<p>Syntax: </p>
<div>
<span style="color:mediumblue">var</span> <em>array-name</em> = [<em>item1</em>, <em>item2</em>, ...]; <br>
</div>
<p>Example:</p>
<div>
<span style="color:mediumblue">var</span> cars = [<span style="color:brown">"Saab"</span>, <span style="color:brown">"Volvo"</span>, <span style="color:brown">"BMW"</span>];</div>
<h4>Adding Array Elements</h4>
<span style="color:black">
<span style="color:mediumblue">var</span> fruits = [<span style="color:brown">"Banana"</span>, <span style="color:brown">"Orange"</span>, <span style="color:brown">"Apple"</span>, <span style="color:brown">"Mango"</span>];<br>
fruits.push(<span style="color:brown">"Lemon"</span>);  <span style="color:green">// adds a new element (Lemon) to fruits</span></span>
<p>Reverse the order of the elements in an array:</p>
<span style="color:black">
<span style="color:mediumblue">var</span> fruits = [<span style="color:brown">"Banana"</span>, <span style="color:brown">"Orange"</span>, <span style="color:brown">"Apple"</span>, <span style="color:brown">"Mango"</span>];<br>
fruits.reverse();
</span>
<h4>String Methods and Properties</h4>
<h5>String Length</h5>
<span style="color:black">
<span style="color:mediumblue">var</span> txt = <span style="color:brown">"ABCDEFGHIJKLMNOPQRSTUVWXYZ"</span>;<br><span style="color:mediumblue">var</span> sln = txt.length;</span>
<h5>The concat() Method</h5>
<span style="color:black">
<span style="color:mediumblue">var</span> text = <span style="color:brown">"Hello"</span> + <span style="color:brown">" "</span> + <span style="color:brown">"World!"</span>;<br>
<span style="color:mediumblue">var</span> text = <span style="color:brown">"Hello"</span>.concat(<span style="color:brown">" "</span>,<span style="color:brown">"World!"</span>);</span>
',courseID_seq.CURRVAL);

INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' Which of the following is a valid type of function javascript supports?'
              , 'A. named function'
              , 'B. anonymous function'
              , 'C.	Both of the above'
              , 'D.	None of the above'
              , 3
              ,roundID_seq.CURRVAL) ;

 /
 INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' Which built-in method adds one or more elements to the end of an array and returns the new length of the array?'
              , 'A. last()'
              , 'B. push()'
              , 'C.	put()'
              , 'D.	None of the above'
              , 2
              ,roundID_seq.CURRVAL) ;

 /
 INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' Which of the following function of Array object reverses the order of the elements of an array?'
              , 'A. reverse()'
              , 'B. push()'
              , 'C. reduce()'
              , 'D.	reduceRight()'
              , 1
              ,roundID_seq.CURRVAL) ;

 /
 INSERT INTO Questions (question, answerA, answerB,
                       answerC, answerD, correctAnswer, roundID)
       VALUES(' Which built-in method combines the text of two strings and returns a new string?'
              , 'A. append()'
              , 'B. concat()'
              , 'C. attach()'
              , 'D.	None of the above.'
              , 2
              ,roundID_seq.CURRVAL) ;

 /




commit;
