<!DOCTYPE html>
<html>
  <head>
    <title>
      {% block title %} Fun@Web {% endblock %}
    </title>

    <!-- META -->
    <!-- Viewport mobile tag for sensible mobile support -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta charset="utf-8">



    {% block head %}
    <!--STYLES-->
    <!--Import Google Icon Font-->
    <link type="text/css" rel="stylesheet" href="styles/font.css">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="styles/materialize.min.css"  media="screen,projection"/>
    <!--STYLES END-->
    {% endblock %}


  </head>

  <body>

     {% block content %}{% endblock %}


     {% block footer %}
    <!--SCRIPTS-->
      <script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
      <script type="text/javascript" src="js/materialize.min.js"></script>
    <!--SCRIPTS END-->
    {% endblock %}
  </body>
</html>
