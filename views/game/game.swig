
{% extends '../mainlayout.swig' %}

{% block title %} Play Fun Web  {% parent %}{% endblock %}

{% block head %}
	{% parent %}
	<link type="text/css" rel="stylesheet" href="./styles/auth/game.css">
	<link type="text/css" rel="stylesheet" href="./styles/auth/game.style.css">
{% endblock %}

{% block content %}



{% endblock %}

{% block footer %}
	{% parent %}
	<!--Import script for this page-->
	<script type="text/javascript" src="./js/game/plugins.preparer.js"></script>
{% endblock %}
