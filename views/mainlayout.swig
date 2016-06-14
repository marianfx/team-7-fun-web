<!DOCTYPE html>
<html lang="en">

<!--================================================================================
  Name:  Main template for the Fun Game.
	Version: 0.0.1
	Author: Team 7
	Author URL: http://marianfx.github.io/team-7-fun-web/
================================================================================ -->

<head>
  <!-- Metadata fro the browser(s) -->
  <!-- Viewport mobile tag for sensible mobile support -->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="msapplication-tap-highlight" content="no">
  <meta name="description" content="Fun Web - the best game for learning Web Technologies. For free! ">
  <meta name="keywords" content="fun, web, game, learn, free, technologies, fii, iasi, faculty, fun, awesome">

  <title>
    {% block title %} - Fun@Web {% endblock %}
  </title>

  <!-- Favicons-->
  <link rel="icon" href="images/favicon/logo_32x32.png" sizes="32x32">
  <!-- Favicons - for iPhone-->
  <link rel="apple-touch-icon-precomposed" href="images/favicon/logo_152x152.png">
  <!-- Favicons - For Windows Phone-->
  <meta name="msapplication-TileColor" content="#00bcd4">
  <meta name="msapplication-TileImage" content="images/favicon/logo_144x144.png">

  {% block head %}
  <!--STYLES-->
  <!--Import Google Icon Font-->
  <link type="text/css" rel="stylesheet" href="./styles/font.css">
  <!--Import materialize.css-->
  <link type="text/css" rel="stylesheet" href="./styles/materialize.css" media="screen" />
  <!--Import sweetalert(swal).css-->
  <link type="text/css" rel="stylesheet" href="./styles/sweetalert.css" media="screen" />
  <!--Import perfect scrollbar.css-->
  <link type="text/css" rel="stylesheet" href="./styles/perfect-scrollbar.css">

  <!--STYLES END-->
  {% endblock %}


</head>

<body>

  {% block content %}{% endblock %} {% block footer %}

  <!--SCRIPTS-->
  <script src="./js/jquery-2.1.1.min.js"></script>
  <script src="./js/materialize.js"></script>
  <script src="./js/sweetalert.min.js"></script>
  <script src="./js/perfect-scrollbar.js"></script>
  <!--SCRIPTS END-->
  {% endblock %}
</body>

</html>
